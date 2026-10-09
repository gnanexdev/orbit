import { useNavigate } from 'react-router-dom';
import {
  Clock,
  ArrowRight,
  Code2,
  Search,
  BarChart3,
  FileText,
  Cpu,
  Layers,
  } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';

export const TaskCard = ({ task, className = '' }) => {
  const navigate = useNavigate();

  const getTypeIcon = (type) => {
    switch (type) {
      case 'research':
        return <Search className="w-3.5 h-3.5 text-cyan-400" />;
      case 'coding':
        return <Code2 className="w-3.5 h-3.5 text-amber-400" />;
      case 'analysis':
        return <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />;
      case 'content':
        return <FileText className="w-3.5 h-3.5 text-purple-400" />;
      case 'automation':
        return <Cpu className="w-3.5 h-3.5 text-blue-400" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'running':
        return <Badge variant="running">Running</Badge>;
      case 'completed':
        return <Badge variant="completed">Completed</Badge>;
      case 'needs_approval':
        return <Badge variant="warning">Needs Approval</Badge>;
      case 'paused':
        return <Badge variant="paused">Paused</Badge>;
      case 'failed':
        return <Badge variant="failed">Failed</Badge>;
      case 'planned':
        return <Badge>Planned</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div
      onClick={() => navigate(`/app/task/${task.id}`)}
      className={`group p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 bg-surface hover:bg-surface-elevated transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between gap-3 ${className}`}
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: task.status === 'needs_approval' ? 'rgba(245, 158, 11, 0.4)' : undefined,
      }}
    >
      {/* Top row: Type & Status */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-300 capitalize">
          {getTypeIcon(task.type)}
          <span>{task.type}</span>
        </div>
        {getStatusBadge(task.status)}
      </div>

      {/* Task Title & Current Step */}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-2 font-heading">
          {task.title}
        </h3>
        {task.currentStep && (
          <p className="text-xs text-slate-400 line-clamp-1">
            {task.currentStep}
          </p>
        )}
      </div>

      {/* Progress & Metadata */}
      <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/60 mt-1">
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>{task.createdAt}</span>
          </span>
          <span className="font-semibold text-slate-300">{task.status === 'planned' ? 'Not started' : `${task.progress}%`}</span>
        </div>

        {task.status !== 'planned' && <Progress
          value={task.progress}
          variant={task.status === 'completed' ? 'emerald' : task.status === 'failed' ? 'rose' : 'cyan'}
          size="sm"
        />}

        {/* Footer info */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
          <span>{task.status === 'planned' ? `${task.stepsCount} plan steps` : `${task.stepsCount} steps • ${task.tokensUsed || '0'} tokens`}</span>
          <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-medium">
            Open Workspace <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};
