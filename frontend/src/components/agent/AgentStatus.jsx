import {
  Play,
  Pause,
  Square,
  FastForward,
  Clock,
  Zap,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { OrbitMark } from '../branding/OrbitMark';

export const AgentStatus = ({
  task,
  onPause,
  onResume,
  onCancel,
  onNextStep,
}) => {
  if (!task) return null;

  const isRunning = task.status === 'running';
  const isPaused = task.status === 'paused';
  const isCompleted = task.status === 'completed';
  const isFailed = task.status === 'failed';
  const needsApproval = task.status === 'needs_approval';
  const isPlanned = task.status === 'planned';

  // Determine stage description
  const stepText = (task.currentStep || '').toLowerCase();
  let phaseLabel = isPlanned ? 'PLAN READY' : 'Executing Trajectory';
  let orbitStatus = 'executing';

  if (isCompleted) {
    phaseLabel = 'DELIVERED';
    orbitStatus = 'delivered';
  } else if (isFailed) {
    phaseLabel = 'HALTED';
    orbitStatus = 'failed';
  } else if (needsApproval) {
    phaseLabel = 'AWAITING APPROVAL';
    orbitStatus = 'needs_approval';
  } else if (isPaused) {
    phaseLabel = 'PAUSED';
    orbitStatus = 'idle';
  } else if (stepText.includes('plan') || stepText.includes('decompos')) {
    phaseLabel = 'Planning Trajectory';
    orbitStatus = 'planning';
  } else if (stepText.includes('verif') || stepText.includes('validat')) {
    phaseLabel = 'Verifying Results';
    orbitStatus = 'verifying';
  } else if (stepText.includes('search') || stepText.includes('code') || stepText.includes('tool')) {
    phaseLabel = 'Executing Tools';
    orbitStatus = 'executing';
  }

  const getStatusBadge = () => {
    if (isPlanned) {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs font-semibold">
          <OrbitMark size={15} variant="monochrome" />
          <span>PLAN READY</span>
        </div>
      );
    }
    if (isCompleted) {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold shadow-sm">
          <OrbitMark size={15} status="delivered" />
          <span>DELIVERED</span>
        </div>
      );
    }
    if (isRunning) {
      return (
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-semibold shadow-sm">
          <OrbitMark size={15} animated={true} status={orbitStatus} />
          <span>{phaseLabel}</span>
        </div>
      );
    }
    if (needsApproval) {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 font-mono text-xs font-semibold">
          <OrbitMark size={15} variant="amber" />
          <span>Awaiting Approval</span>
        </div>
      );
    }
    if (isPaused) {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs font-semibold">
          <OrbitMark size={15} variant="monochrome" />
          <span>Paused</span>
        </div>
      );
    }
    if (isFailed) {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 font-mono text-xs font-semibold">
          <OrbitMark size={15} variant="rose" />
          <span>Failed</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 font-mono text-xs font-medium">
        <OrbitMark size={15} variant="monochrome" />
        <span>Idle</span>
      </div>
    );
  };

  return (
    <div
      className="agent-status-card p-3 px-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md"
      style={{ backgroundColor: 'var(--bg-surface-elevated)' }}
    >
      {/* Left: Status & Active Step */}
      <div className="agent-status-overview flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2 shrink-0">
          {getStatusBadge()}
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">{isPlanned ? 'Task status:' : 'Current Step:'}</span>
            <span className="text-xs font-semibold text-slate-200 truncate">
              {task.currentStep || 'Initializing ORBIT trajectory...'}
            </span>
          </div>
          {!isPlanned && <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono mt-0.5">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>{task.tokensUsed || '0'} tokens</span>
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{task.duration || '0s'}</span>
            </span>
            <span>&bull;</span>
            <span>{task.progress}% done</span>
          </div>}
        </div>
      </div>

      {/* Right: Controls & Interactive simulation triggers */}
      <div className="agent-status-actions flex items-center gap-2 shrink-0">
        {/* Next step simulation button */}
        {!isPlanned && !isCompleted && !isFailed && onNextStep && (
          <Button
            variant="outline"
            size="sm"
            icon={FastForward}
            onClick={onNextStep}
            title="Advance ORBIT to next planned milestone"
          >
            Simulate Next Step
          </Button>
        )}

        {/* Pause / Resume */}
        {isRunning && onPause && (
          <Button
            variant="secondary"
            size="sm"
            icon={Pause}
            onClick={onPause}
            title="Pause ORBIT execution"
          >
            Pause
          </Button>
        )}

        {isPaused && onResume && (
          <Button
            variant="primary"
            size="sm"
            icon={Play}
            onClick={onResume}
            title="Resume ORBIT execution"
          >
            Resume
          </Button>
        )}

        {/* Abort */}
        {!isPlanned && !isCompleted && !isFailed && onCancel && (
          <Button
            variant="danger"
            size="sm"
            icon={Square}
            onClick={onCancel}
            title="Abort execution"
          >
            Stop
          </Button>
        )}
      </div>
    </div>
  );
};
