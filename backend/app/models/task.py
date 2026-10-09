from datetime import datetime
from typing import Literal
from uuid import UUID

from pydantic import BaseModel, Field, field_validator, model_validator


PlanStepStatus = Literal["pending", "running", "completed", "failed", "skipped"]
PlanStepType = Literal["analysis", "research", "execution", "review", "delivery"]


class TaskCreateRequest(BaseModel):
    goal: str = Field(min_length=1, max_length=4000)
    context: str = Field(default="", max_length=8000)
    task_type: str = Field(default="other", max_length=64)
    resources: list[str] = Field(default_factory=list)
    attachments: list[str] = Field(default_factory=list)
    output_format: str = Field(default="Best fit", max_length=128)
    execution_preference: str = Field(default="autonomous", max_length=128)

    @field_validator("goal")
    @classmethod
    def goal_must_not_be_blank(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Goal must not be blank")
        return value


class PlanStep(BaseModel):
    id: str = Field(min_length=1, max_length=64)
    title: str = Field(min_length=1, max_length=160)
    description: str = Field(min_length=1, max_length=1000)
    type: PlanStepType = "analysis"
    status: PlanStepStatus = "pending"

    @field_validator("id", "title", "description", mode="before")
    @classmethod
    def trim_step_text(cls, value: str) -> str:
        return value.strip() if isinstance(value, str) else value


class TaskPlan(BaseModel):
    summary: str = Field(min_length=1, max_length=1000)
    steps: list[PlanStep] = Field(min_length=2, max_length=12)

    @field_validator("summary", mode="before")
    @classmethod
    def trim_summary(cls, value: str) -> str:
        return value.strip() if isinstance(value, str) else value


class AIPlanDraft(BaseModel):
    summary: str = Field(min_length=1, max_length=1000)
    steps: list[PlanStep] = Field(min_length=2, max_length=12)

    @field_validator("summary", mode="before")
    @classmethod
    def trim_summary(cls, value: str) -> str:
        return value.strip() if isinstance(value, str) else value

    @model_validator(mode="after")
    def step_ids_must_be_unique(self) -> "AIPlanDraft":
        step_ids = [step.id for step in self.steps]
        if len(step_ids) != len(set(step_ids)):
            raise ValueError("Plan step IDs must be unique")
        return self


class TaskPlanningInput(BaseModel):
    goal: str
    context: str
    task_type: str
    resources: list[str]
    attachments: list[str]
    output_format: str
    execution_preference: str


class TaskResponse(BaseModel):
    id: UUID
    goal: str
    context: str
    task_type: str
    resources: list[str]
    attachments: list[str]
    output_format: str
    execution_preference: str
    status: Literal["planned"]
    created_at: datetime
    plan_source: Literal["ai", "fallback"]
    plan: TaskPlan