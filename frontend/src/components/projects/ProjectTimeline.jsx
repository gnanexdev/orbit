import { CheckCircle2, Circle, } from 'lucide-react';

export const ProjectTimeline = ({ milestones = [] }) => {
  if (!milestones || milestones.length === 0) {
    return <div className="text-xs text-slate-500 italic p-4">No milestones scheduled.</div>;
  }

  return (
    <div className="relative pl-6 border-l border-slate-800 space-y-6 py-2">
      {milestones.map((m, idx) => {
        const isCompleted = m.completed;
        const isActive = m.active;

        return (
          <div key={idx} className="relative group">
            {/* Status Node */}
            <div
              className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center border-2 border-slate-950 ${
                isCompleted
                  ? 'bg-emerald-500 text-slate-950'
                  : isActive
                  ? 'bg-cyan-500 text-slate-950 ring-4 ring-cyan-500/20'
                  : 'bg-slate-800 text-slate-500'
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-3 h-3 text-slate-950 stroke-[3]" />
              ) : isActive ? (
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
              ) : (
                <Circle className="w-2.5 h-2.5" />
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-semibold ${
                    isActive
                      ? 'text-cyan-300'
                      : isCompleted
                      ? 'text-slate-200'
                      : 'text-slate-500'
                  }`}
                >
                  {m.title}
                </span>
                <span className="text-[10px] font-mono text-slate-500">{m.date}</span>
              </div>
              <span className="text-[11px] text-slate-500">
                {isCompleted ? 'Phase verified & completed' : isActive ? 'Active execution phase' : 'Upcoming milestone'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
