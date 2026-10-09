import { useState } from 'react';
import { AlertTriangle, RefreshCw, } from 'lucide-react';
import { Button } from './Button';

export const ErrorState = ({
  title = 'Something went wrong.',
  message = "ORBIT couldn't complete this task due to an unhandled exception.",
  details,
  onRetry,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="p-8 rounded-2xl border border-rose-500/30 bg-rose-950/10 flex flex-col items-center text-center max-w-md mx-auto my-6">
      <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mb-4">
        <AlertTriangle className="w-6 h-6" />
      </div>

      <h3 className="text-base font-semibold text-slate-100 font-heading">{title}</h3>
      <p className="text-xs text-slate-400 mt-1 mb-5 leading-relaxed">{message}</p>

      <div className="flex items-center gap-3">
        {onRetry && (
          <Button variant="primary" size="sm" icon={RefreshCw} onClick={onRetry}>
            Retry
          </Button>
        )}
        {details && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide Details' : 'View Details'}
          </Button>
        )}
      </div>

      {showDetails && details && (
        <div className="w-full mt-4 p-3 bg-slate-950 border border-rose-900/50 rounded-lg text-left font-mono text-[11px] text-rose-300 overflow-x-auto whitespace-pre-wrap">
          {details}
        </div>
      )}
    </div>
  );
};
