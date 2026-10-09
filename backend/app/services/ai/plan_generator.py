import logging
from dataclasses import dataclass
from typing import Callable

from openai import APITimeoutError
from pydantic import ValidationError

from app.models.task import AIPlanDraft, TaskPlan, TaskPlanningInput
from app.services.ai.ai_provider import AIProviderError, PlanProvider, create_ai_provider
from app.services.plan_generator import generate_plan as generate_fallback_steps


logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class GeneratedPlan:
    plan: TaskPlan
    source: str


class PlanGenerator:
    """Plan-only boundary between task creation and interchangeable planners."""

    def __init__(
        self,
        provider_factory: Callable[[], PlanProvider] = create_ai_provider,
    ) -> None:
        self._provider_factory = provider_factory

    def generate(self, task: TaskPlanningInput) -> GeneratedPlan:
        try:
            provider = self._provider_factory()
            draft = provider.generate_plan(task)
            validated = AIPlanDraft.model_validate(draft)
            plan = TaskPlan(
                summary=validated.summary.strip(),
                steps=[step.model_copy(update={"status": "pending"}) for step in validated.steps],
            )
            return GeneratedPlan(plan=plan, source="ai")
        except Exception as error:
            error_code = self._error_code(error)
            logger.warning(
                "AI plan generation failed; using deterministic fallback (reason=%s, error_type=%s)",
                error_code,
                type(error).__name__,
            )
            return self._fallback(task)

    @staticmethod
    def _error_code(error: Exception) -> str:
        if isinstance(error, ValidationError):
            return "invalid_structured_output"
        if isinstance(error, (APITimeoutError, TimeoutError)):
            return "provider_timeout"
        if isinstance(error, AIProviderError):
            return "provider_configuration_or_response"
        return "provider_request_failed"

    @staticmethod
    def _fallback(task: TaskPlanningInput) -> GeneratedPlan:
        steps = generate_fallback_steps(task.goal, task.task_type)
        plan = TaskPlan(
            summary="A deterministic initial plan was generated from the task goal and type.",
            steps=steps,
        )
        return GeneratedPlan(plan=plan, source="fallback")


plan_generator = PlanGenerator()