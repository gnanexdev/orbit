import { OrbitMark } from './OrbitMark';

/**
 * OrbitLogo - Complete Brand Lockup (Mark + Typography)
 * 
 * Props:
 * - size: 'sm' | 'md' | 'lg' | 'xl'
 * - showWordmark: boolean (default true)
 * - showTagline: boolean (default false)
 * - animated: boolean (default false)
 * - status: 'idle' | 'planning' | 'executing' | 'verifying' | 'delivered' | 'failed'
 * - className: string
 */
export const OrbitLogo = ({
  size = 'md',
  showWordmark = true,
  showTagline = false,
  animated = false,
  status,
  variant = 'default',
  className = '',
  style = {},
}) => {
  const markSizeMap = {
    sm: 22,
    md: 30,
    lg: 40,
    xl: 56,
  };

  const textStyleMap = {
    sm: { title: 'text-sm tracking-wider', tag: 'text-[9px] tracking-widest' },
    md: { title: 'text-base tracking-widest', tag: 'text-[10px] tracking-widest' },
    lg: { title: 'text-xl tracking-widest', tag: 'text-xs tracking-widest' },
    xl: { title: 'text-3xl tracking-widest', tag: 'text-sm tracking-widest' },
  };

  const currentText = textStyleMap[size] || textStyleMap.md;
  const currentMarkSize = markSizeMap[size] || 30;

  return (
    <div
      className={`inline-flex items-center gap-2.5 select-none ${className}`}
      style={style}
    >
      <OrbitMark
        size={currentMarkSize}
        animated={animated}
        status={status}
        variant={variant}
      />

      {showWordmark && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-heading font-extrabold uppercase text-slate-100 ${currentText.title}`}
              style={{ letterSpacing: '0.12em' }}
            >
              ORBIT
            </span>
          </div>
          {showTagline && (
            <span
              className={`font-mono uppercase font-semibold text-cyan-400 ${currentText.tag} -mt-0.5`}
              style={{ letterSpacing: '0.18em' }}
            >
              Autonomous Intelligence
            </span>
          )}
        </div>
      )}
    </div>
  );
};
