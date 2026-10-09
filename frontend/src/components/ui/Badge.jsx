
export const Badge = ({
  children,
  variant = 'default', // 'running', 'completed', 'failed', 'paused', 'warning', 'cyan', 'default', 'outline'
  size = 'md', // 'sm', 'md'
  icon: Icon,
  className = '',
  style = {},
  ...props
}) => {
  const sizeStyles = size === 'sm' ? 'text-xs px-2 py-0.5 gap-1' : 'text-xs px-2.5 py-1 gap-1.5 font-medium';

  const getVariantStyles = () => {
    switch (variant) {
      case 'running':
        return {
          backgroundColor: 'rgba(56, 189, 248, 0.12)',
          color: '#38bdf8',
          border: '1px solid rgba(56, 189, 248, 0.3)',
        };
      case 'completed':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          color: '#34d399',
          border: '1px solid rgba(16, 185, 129, 0.3)',
        };
      case 'failed':
        return {
          backgroundColor: 'rgba(244, 63, 94, 0.12)',
          color: '#fb7185',
          border: '1px solid rgba(244, 63, 94, 0.3)',
        };
      case 'paused':
        return {
          backgroundColor: 'rgba(148, 163, 184, 0.12)',
          color: '#cbd5e1',
          border: '1px solid rgba(148, 163, 184, 0.25)',
        };
      case 'warning':
      case 'needs_approval':
        return {
          backgroundColor: 'rgba(245, 158, 11, 0.14)',
          color: '#fbbf24',
          border: '1px solid rgba(245, 158, 11, 0.35)',
        };
      case 'cyan':
        return {
          backgroundColor: 'rgba(56, 189, 248, 0.15)',
          color: '#38bdf8',
          border: '1px solid rgba(56, 189, 248, 0.4)',
        };
      case 'purple':
        return {
          backgroundColor: 'rgba(168, 85, 247, 0.14)',
          color: '#c084fc',
          border: '1px solid rgba(168, 85, 247, 0.3)',
        };
      default:
        return {
          backgroundColor: 'var(--bg-surface-elevated)',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border-default)',
        };
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full select-none ${sizeStyles} ${className}`}
      style={{ ...getVariantStyles(), ...style }}
      {...props}
    >
      {variant === 'running' && (
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-subtle shrink-0" style={{ backgroundColor: '#38bdf8' }} />
      )}
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};
