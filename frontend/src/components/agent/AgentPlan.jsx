import { AlertCircle, Check, Circle, CircleAlert, LoaderCircle } from 'lucide-react';

const statusLabels = {
  pending: 'Queued',
  running: 'In progress',
  completed: 'Complete',
  active: 'In progress',
  needs_approval: 'Approval',
  blocked: 'Blocked',
  failed: 'Failed',
};

export const AgentPlan = ({ plan = [], onStepClick, className = '', isPlanOnly = false }) => {
  if (!plan.length) {
    return <div className="plan-empty"><Circle aria-hidden="true" /><span>ORBIT is shaping the execution plan.</span></div>;
  }

  const completedCount = plan.filter((step) => step.status === 'completed').length;
  const progressPercent = Math.round((completedCount / plan.length) * 100);

  return (
    <div className={`orbit-plan ${className}`}>
      <header className="orbit-plan__header">
        <div><span className="eyebrow">{isPlanOnly ? 'GENERATED PLAN' : 'EXECUTION PATH'}</span><strong>{isPlanOnly ? `${plan.length} steps` : <>{completedCount}<i> / {plan.length}</i></>}</strong></div>
        {isPlanOnly ? <span className="orbit-plan__percent">NOT STARTED</span> : <span className="orbit-plan__percent">{progressPercent}%</span>}
      </header>
      {!isPlanOnly && <div className="orbit-plan__track" aria-label={`Execution plan ${progressPercent}% complete`}>
        <span style={{ width: `${progressPercent}%` }} />
      </div>}
      <ol className="orbit-plan__steps">
        {plan.map((step, index) => {
          const status = statusLabels[step.status] ? step.status : 'pending';
          const Icon = status === 'completed' ? Check : status === 'active' ? LoaderCircle : status === 'failed' ? AlertCircle : status === 'needs_approval' || status === 'blocked' ? CircleAlert : Circle;
          return (
            <li key={step.id || index} className={`orbit-plan__step is-${status}`}>
              <button type="button" onClick={() => onStepClick?.(step, index)} disabled={!onStepClick}>
                <span className="orbit-plan__node"><Icon aria-hidden="true" /></span>
                <span className="orbit-plan__copy">
                  <span className="orbit-plan__title">{step.title}</span>
                  <span className="orbit-plan__meta">{step.description || statusLabels[status]}{step.duration && step.duration !== '-' ? ` · ${step.duration}` : ''}</span>
                </span>
                <span className="orbit-plan__index">{String(index + 1).padStart(2, '0')}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
