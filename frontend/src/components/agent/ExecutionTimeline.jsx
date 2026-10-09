export const ExecutionTimeline = ({ events = [], className = '' }) => {
  if (!events || events.length === 0) return null;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono mb-1">
        Execution Trace
      </span>
      <div className="relative pl-4 border-l border-slate-800 flex flex-col gap-3">
        {events.map((evt, idx) => (
          <div key={idx} className="relative flex flex-col gap-0.5">
            <span
              className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-slate-950"
              style={{
                backgroundColor: evt.status === 'completed' ? '#10b981' : evt.status === 'active' ? '#38bdf8' : '#64748b'
              }}
            />
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-200">{evt.title}</span>
              <span className="text-[10px] font-mono text-slate-500">{evt.time}</span>
            </div>
            {evt.detail && <p className="text-[11px] text-slate-400">{evt.detail}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};
