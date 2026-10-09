import { AlertTriangle, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';

export const ApprovalCard = ({
  approval,
  onApprove,
  onReject,
  className = '',
}) => {
  if (!approval) return null;

  const { title = 'ORBIT needs your approval', action, details, riskLevel = 'medium' } = approval;

  return (
    <div
      className={`rounded-xl border border-amber-500/40 p-4 relative overflow-hidden shadow-lg ${className}`}
      style={{
        backgroundColor: 'rgba(245, 158, 11, 0.05)',
        boxShadow: '0 0 24px -4px rgba(245, 158, 11, 0.15)',
      }}
    >
      {/* Top Banner */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className="p-1.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30">
          <ShieldAlert className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-amber-300 font-heading">{title}</h4>
          <span className="text-[11px] text-slate-400">Autonomous action paused pending human authorization</span>
        </div>
        <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
          {riskLevel} Risk
        </span>
      </div>

      {/* Action Description */}
      <div className="p-3 rounded-lg bg-slate-950/80 border border-amber-500/20 mb-3 flex flex-col gap-2">
        <div className="flex items-baseline gap-2">
          <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase">Action:</span>
          <span className="text-xs font-semibold text-slate-100">{action}</span>
        </div>

        {details?.target && (
          <div className="flex items-baseline gap-2 text-xs">
            <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase">Target:</span>
            <span className="text-xs text-slate-300">{details.target}</span>
          </div>
        )}

        {details?.statement && (
          <div className="flex flex-col gap-1 mt-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Command / Payload:</span>
            <pre className="p-2 bg-slate-900 border border-slate-800 rounded font-mono text-[11px] text-amber-200/90 overflow-x-auto whitespace-pre-wrap">
              <code>{details.statement}</code>
            </pre>
          </div>
        )}

        {details?.impact && (
          <div className="flex items-center gap-1.5 text-[11px] text-amber-300/80 mt-1">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span>Impact: {details.impact}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-2.5">
        <Button
          variant="ghost"
          size="sm"
          icon={XCircle}
          onClick={onReject}
        >
          Cancel Action
        </Button>
        <Button
          variant="primary"
          size="sm"
          icon={CheckCircle}
          onClick={onApprove}
          style={{
            backgroundColor: '#f59e0b',
            color: '#030712',
            borderColor: 'rgba(245, 158, 11, 0.5)',
            boxShadow: '0 0 16px -2px rgba(245, 158, 11, 0.4)',
          }}
        >
          Approve & Continue
        </Button>
      </div>
    </div>
  );
};
