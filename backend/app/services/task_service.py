from datetime import datetime, timezone
from uuid import UUID, uuid4

from app.models.task import TaskCreateRequest, TaskPlanningInput, TaskResponse
from app.services.ai.plan_generator import PlanGenerator, plan_generator


class TaskService:
    def __init__(self, planner: PlanGenerator = plan_generator) -> None:
        self._tasks: dict[UUID, TaskResponse] = {}
        self._planner = planner

    def create_task(self, request: TaskCreateRequest) -> TaskResponse:
        planning_input = TaskPlanningInput(
            goal=request.goal,
            context=request.context,
            task_type=request.task_type,
            resources=request.resources,
            attachments=request.attachments,
            output_format=request.output_format,
            execution_preference=request.execution_preference,
        )
        generated_plan = self._planner.generate(planning_input)
        task = TaskResponse(
            id=uuid4(),
            goal=request.goal,
            context=request.context,
            task_type=request.task_type,
            resources=request.resources,
            attachments=request.attachments,
            output_format=request.output_format,
            execution_preference=request.execution_preference,
            status="planned",
            created_at=datetime.now(timezone.utc),
            plan_source=generated_plan.source,
            plan=generated_plan.plan,
        )
        self._tasks[task.id] = task
        return task.model_copy(deep=True)

    def get_task(self, task_id: UUID) -> TaskResponse | None:
        task = self._tasks.get(task_id)
        return task.model_copy(deep=True) if task else None


task_service = TaskService()