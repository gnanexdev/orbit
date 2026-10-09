import os
from dataclasses import dataclass
from pathlib import Path
from typing import Protocol

from dotenv import load_dotenv
from openai import OpenAI

from app.models.task import AIPlanDraft, TaskPlanningInput


PLANNER_SYSTEM_INSTRUCTIONS = """You are ORBIT's planning intelligence.

Transform the user's desired outcome into a practical sequence of executable steps. Understand the desired outcome; identify important requirements and constraints; break the outcome into meaningful, logically ordered, actionable steps; include review or verification where appropriate; avoid unnecessary steps; and adapt the plan to the task type.

You are generating a PLAN, not performing the work. Never claim that a step has already been executed. You have no tools and must not attempt to execute shell commands, access files, browse the network, or perform actions. Return only the required structured plan. Do not include chain-of-thought or private reasoning; provide only a concise summary and final steps.
"""


@dataclass(frozen=True)
class AISettings:
    provider: str
    model: str
    api_key: str | None
    timeout_seconds: float


class AIProviderError(RuntimeError):
    """A safe provider-level error that contains no credentials or raw response."""


class PlanProvider(Protocol):
    def generate_plan(self, task: TaskPlanningInput) -> AIPlanDraft:
        """Return validated structured plan data without executing it."""


def load_ai_settings() -> AISettings:
    backend_root = Path(__file__).resolve().parents[3]
    load_dotenv(backend_root / ".env")
    try:
        timeout_seconds = float(os.getenv("AI_TIMEOUT_SECONDS", "25"))
    except ValueError:
        timeout_seconds = 25.0
    return AISettings(
        provider=os.getenv("AI_PROVIDER", "openai").strip().lower(),
        model=os.getenv("AI_MODEL", "gpt-4.1-mini").strip(),
        api_key=os.getenv("AI_API_KEY") or None,
        timeout_seconds=max(1.0, min(timeout_seconds, 60.0)),
    )


class OpenAIPlanProvider:
    def __init__(self, settings: AISettings) -> None:
        if not settings.api_key:
            raise AIProviderError("AI_API_KEY is not configured")
        self._model = settings.model
        self._client = OpenAI(
            api_key=settings.api_key,
            timeout=settings.timeout_seconds,
            max_retries=0,
        )

    def generate_plan(self, task: TaskPlanningInput) -> AIPlanDraft:
        task_context = task.model_dump(exclude={"attachments"})
        task_context["attachment_names"] = task.attachments
        response = self._client.responses.parse(
            model=self._model,
            input=[
                {"role": "system", "content": PLANNER_SYSTEM_INSTRUCTIONS},
                {
                    "role": "user",
                    "content": (
                        "Create a plan for this task context. Attachment entries are filenames only; "
                        "their contents are not available. Return only summary and steps matching "
                        "the supplied structured-output schema.\n"
                        f"Task context: {task_context}"
                    ),
                },
            ],
            text_format=AIPlanDraft,
        )
        if response.output_parsed is None:
            raise AIProviderError("The AI provider returned no structured plan")
        return response.output_parsed


def create_ai_provider() -> PlanProvider:
    settings = load_ai_settings()
    if settings.provider != "openai":
        raise AIProviderError("Configured AI provider is unsupported")
    return OpenAIPlanProvider(settings)