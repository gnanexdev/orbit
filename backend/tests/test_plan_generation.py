import unittest
import logging
import os
from types import SimpleNamespace
from uuid import UUID
from unittest.mock import patch

from app.models.task import AIPlanDraft, PlanStep, TaskCreateRequest, TaskPlanningInput
from app.services.ai.ai_provider import AISettings, OpenAIPlanProvider, create_ai_provider
from app.services.ai.plan_generator import PlanGenerator
from app.services.task_service import TaskService


def make_draft(status: str = "completed") -> AIPlanDraft:
    return AIPlanDraft(
        summary="Inspect the request, build an approach, and review the result.",
        steps=[
            PlanStep(
                id="step-one",
                title="Understand the goal",
                description="Identify requirements and constraints.",
                type="analysis",
                status=status,
            ),
            PlanStep(
                id="step-two",
                title="Review the approach",
                description="Check the proposed work against the requirements.",
                type="review",
                status=status,
            ),
        ],
    )


class FakeProvider:
    def __init__(self, result):
        self.result = result
        self.received_task = None

    def generate_plan(self, task: TaskPlanningInput):
        self.received_task = task
        if isinstance(self.result, Exception):
            raise self.result
        return self.result


class PlanGenerationTests(unittest.TestCase):
    def test_openai_adapter_uses_structured_output_without_tools(self):
        captured = {}

        def parse_response(**kwargs):
            captured.update(kwargs)
            return SimpleNamespace(output_parsed=make_draft())

        client = SimpleNamespace(responses=SimpleNamespace(parse=parse_response))
        task_input = TaskPlanningInput(
            goal="Build a portfolio website",
            context="For an AI/ML student",
            task_type="software",
            resources=["Files"],
            attachments=["reference.pdf"],
            output_format="project",
            execution_preference="autonomous",
        )

        with patch("app.services.ai.ai_provider.OpenAI", return_value=client):
            provider = OpenAIPlanProvider(AISettings("openai", "gpt-4.1-mini", "test-key", 5))
            result = provider.generate_plan(task_input)

        self.assertEqual(result.summary, make_draft().summary)
        self.assertIs(captured["text_format"], AIPlanDraft)
        self.assertNotIn("tools", captured)
        user_content = captured["input"][1]["content"]
        self.assertIn("For an AI/ML student", user_content)
        self.assertIn("reference.pdf", user_content)
        self.assertIn("their contents are not available", user_content)

    def test_ai_plan_is_validated_and_execution_is_not_claimed(self):
        provider = FakeProvider(make_draft().model_dump())
        generator = PlanGenerator(provider_factory=lambda: provider)
        task_input = TaskPlanningInput(
            goal="Build a portfolio website",
            context="For an AI/ML student",
            task_type="software",
            resources=["Files"],
            attachments=["reference.pdf"],
            output_format="project",
            execution_preference="autonomous",
        )

        generated = generator.generate(task_input)

        self.assertEqual(generated.source, "ai")
        self.assertEqual(generated.plan.summary, make_draft().summary)
        self.assertTrue(all(step.status == "pending" for step in generated.plan.steps))
        self.assertEqual(provider.received_task.attachments, ["reference.pdf"])

    def test_missing_credentials_use_deterministic_fallback(self):
        with patch.dict(os.environ, {"AI_PROVIDER": "openai"}, clear=True):
            generated = PlanGenerator(provider_factory=create_ai_provider).generate(
                TaskPlanningInput(
                    goal="Research AI agent frameworks and create a comparison report",
                    context="",
                    task_type="research",
                    resources=[],
                    attachments=[],
                    output_format="Report",
                    execution_preference="autonomous",
                )
            )

        self.assertEqual(generated.source, "fallback")
        self.assertTrue(all(step.status == "pending" for step in generated.plan.steps))
        self.assertIn("research", generated.plan.steps[0].title.lower())

    def test_provider_failure_and_invalid_output_fall_back(self):
        for result in (
            TimeoutError("provider timed out"),
            RuntimeError("provider unavailable sk-test-secret-value"),
            {"summary": "missing steps"},
        ):
            with self.subTest(result=type(result).__name__):
                generated = PlanGenerator(
                    provider_factory=lambda result=result: FakeProvider(result)
                ).generate(
                    TaskPlanningInput(
                        goal="Analyze this dataset and identify important patterns",
                        context="",
                        task_type="analysis",
                        resources=["Files"],
                        attachments=["data.csv"],
                        output_format="Report",
                        execution_preference="autonomous",
                    )
                )
                self.assertEqual(generated.source, "fallback")
                self.assertIn("dataset", generated.plan.steps[1].title.lower())

    def test_fallback_logs_do_not_include_secret_like_error_text(self):
        provider = FakeProvider(RuntimeError("request failed sk-test-secret-value"))
        with self.assertLogs("app.services.ai.plan_generator", level=logging.WARNING) as logs:
            generated = PlanGenerator(provider_factory=lambda: provider).generate(
                TaskPlanningInput(
                    goal="Build a web application",
                    context="",
                    task_type="software",
                    resources=[],
                    attachments=[],
                    output_format="project",
                    execution_preference="autonomous",
                )
            )
        self.assertEqual(generated.source, "fallback")
        self.assertNotIn("sk-test-secret-value", " ".join(logs.output))

    def test_task_service_stores_generated_source_and_plan(self):
        service = TaskService(PlanGenerator(provider_factory=lambda: FakeProvider(make_draft("running"))))
        task = service.create_task(TaskCreateRequest(goal="Write a report"))

        self.assertIsInstance(task.id, UUID)
        self.assertEqual(task.status, "planned")
        self.assertEqual(task.plan_source, "ai")
        self.assertEqual(service.get_task(task.id).plan.steps[0].status, "pending")

    def test_duplicate_step_ids_are_rejected(self):
        with self.assertRaises(ValueError):
            AIPlanDraft(
                summary="A plan",
                steps=[
                    PlanStep(id="same", title="First", description="First step"),
                    PlanStep(id="same", title="Second", description="Second step"),
                ],
            )


if __name__ == "__main__":
    unittest.main()