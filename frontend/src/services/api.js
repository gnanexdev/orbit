const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  } catch {
    throw new Error('Unable to connect to the ORBIT backend. Check that it is running and try again.');
  }

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    if ([502, 503, 504].includes(response.status)) {
      throw new Error('The ORBIT backend is unavailable. Check that it is running and try again.');
    }
    const detail = payload?.detail;
    const message = Array.isArray(detail)
      ? detail.map((error) => error.msg).join('; ')
      : detail;
    throw new Error(message || `The ORBIT backend returned an error (${response.status}).`);
  }
  return payload;
}

export const createTask = (task) => request('/tasks', {
  method: 'POST',
  body: JSON.stringify(task),
});

export const getTask = (taskId) => request(`/tasks/${encodeURIComponent(taskId)}`);

export const toWorkspaceTask = (task) => ({
  id: task.id,
  title: task.goal,
  type: task.task_type,
  status: task.status,
  progress: 0,
  currentStep: 'Plan generated. Execution has not started yet.',
  createdAt: new Date(task.created_at).toLocaleString(),
  resources: task.resources,
  executionPreference: task.execution_preference === 'ask_before'
    ? 'Ask before important actions'
    : 'Autonomous execution',
  autonomyLevel: task.execution_preference === 'ask_before' ? 'Approval required' : 'Autonomous',
  context: task.context,
  outputFormat: task.output_format,
  planSource: task.plan_source,
  planSummary: task.plan.summary,
  attachments: task.attachments || [],
  stepsCount: task.plan.steps.length,
  tokensUsed: '0',
  duration: '0s',
  plan: task.plan.steps,
  messages: [],
  artifacts: [],
  isPlanOnly: true,
});

export const toTaskRequest = ({ title, type, resources, executionPreference, context, outputFormat, attachments }) => ({
  goal: title,
  context: context || '',
  task_type: type === 'coding' ? 'software' : (type || 'other'),
  resources: resources || [],
  output_format: outputFormat || 'Best fit',
  execution_preference: /ask|sensitive/i.test(executionPreference || '') ? 'ask_before' : 'autonomous',
  attachments: attachments || [],
});