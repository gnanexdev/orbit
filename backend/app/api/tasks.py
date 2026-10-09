from uuid import UUID

from fastapi import APIRouter, HTTPException, status

from app.models.task import TaskCreateRequest, TaskResponse
from app.services.task_service import task_service


router = APIRouter(prefix="/api/tasks", tags=["tasks"])


@router.post("", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(request: TaskCreateRequest) -> TaskResponse:
    return task_service.create_task(request)


@router.get("/{task_id}", response_model=TaskResponse)
def get_task(task_id: UUID) -> TaskResponse:
    task = task_service.get_task(task_id)
    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task