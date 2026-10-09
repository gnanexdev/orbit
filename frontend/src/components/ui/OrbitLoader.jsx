import { OrbitMark } from '../branding/OrbitMark';

/**
 * OrbitLoader - Autonomous intelligence loading state powered by the ORBIT logo
 * Replaces generic spinners with orbital momentum and pulsing core intelligence.
 * 
 * Props:
 * - size: 'sm' | 'md' | 'lg' | 'xl'
 * - label: optional text prompt ("Initializing autonomous agent...", "Executing tools...")
 * - sublabel: optional secondary detail
 * - status: 'idle' | 'planning' | 'executing' | 'verifying' | 'delivered'
 * - variant: 'default' | 'cyan' | 'emerald' | 'amber'
 * - inline: boolean (for buttons or small cards)
 * - fullScreen: boolean (covers entire screen or container)
 * - className: string
 */
export const OrbitLoader = ({
  size = 'md',
  label,
  sublabel,
  status = 'executing',
  variant = 'default',
  inline = false,
  fullScreen = false,
  className = '',
}) => {
  const markSizeMap = {
    sm: 22,
    md: 36,
    lg: 52,
    xl: 72,
  };

  const labelSizeMap = {
    sm: 'text-xs',
    md: 'text-sm font-medium',
    lg: 'text-base font-semibold',
    xl: 'text-lg font-bold',
  };

  const markSize = markSizeMap[size] || 36;
  const labelClass = labelSizeMap[size] || 'text-sm font-medium';

  const loaderContent = (
    <div
      className={`flex ${inline ? 'flex-row items-center gap-2.5' : 'flex-col items-center justify-center gap-3.5 text-center'} ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <OrbitMark
          size={markSize}
          animated={true}
          status={status}
          variant={variant}
        />
      </div>

      {(label || sublabel) && (
        <div className={`flex flex-col ${inline ? 'text-left' : 'items-center text-center'} gap-0.5`}>
          {label && (
            <span className={`text-slate-200 tracking-wide font-heading ${labelClass}`}>
              {label}
            </span>
          )}
          {sublabel && (
            <span className="text-[11px] text-slate-400 font-mono">
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/85 backdrop-blur-md p-6">
        <div className="p-8 rounded-2xl border border-slate-800 bg-surface/90 shadow-2xl flex flex-col items-center">
          {loaderContent}
        </div>
      </div>
    );
  }

  return loaderContent;
};
