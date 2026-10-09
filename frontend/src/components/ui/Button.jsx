import { OrbitMark } from '../branding/OrbitMark';

export const Button = ({
  children,
  variant = 'primary', // 'primary', 'secondary', 'ghost', 'danger', 'outline'
  size = 'md', // 'sm', 'md', 'lg'
  icon: Icon,
  iconRight: IconRight,
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all select-none focus:outline-none';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-3.5 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5 font-semibold',
    icon: 'p-2 rounded-md',
  };

  const variantStyles = {
    primary: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-semibold border border-cyan-400/30 active:translate-y-0.5',
    secondary: 'bg-surface-elevated text-slate-200 border border-slate-700/50 hover:bg-surface-hover hover:border-slate-600 active:bg-surface-active',
    ghost: 'bg-transparent text-slate-400 hover:text-slate-100 hover:bg-surface-hover border border-transparent',
    danger: 'bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 hover:border-rose-500/50',
    outline: 'bg-transparent text-slate-300 border border-slate-700 hover:bg-surface-hover hover:border-slate-500',
  };

  // Specific inline overrides matching CSS variables
  const computedClass = `
    ${baseStyles}
    ${sizeStyles[size] || sizeStyles.md}
    ${disabled || isLoading ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
    ${className}
  `;

  const getStyle = () => {
    if (variant === 'primary') {
      return {
        backgroundColor: 'var(--brand-cyan)',
        color: 'var(--text-inverse)',
        border: '1px solid rgba(128, 217, 193, 0.35)',
      };
    }
    if (variant === 'secondary') {
      return {
        backgroundColor: 'var(--bg-surface-elevated)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-default)',
      };
    }
    if (variant === 'ghost') {
      return {
        backgroundColor: 'transparent',
        color: 'var(--text-secondary)',
        border: '1px solid transparent',
      };
    }
    if (variant === 'danger') {
      return {
        backgroundColor: 'rgba(244, 63, 94, 0.12)',
        color: '#fb7185',
        border: '1px solid rgba(244, 63, 94, 0.25)',
      };
    }
    return {
      backgroundColor: 'transparent',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-default)',
    };
  };

  return (
    <button
      type={type}
      className={computedClass}
      style={getStyle()}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <OrbitMark size="xs" animated />
      ) : (
        Icon && <Icon className="w-4 h-4 shrink-0" />
      )}
      <span>{children}</span>
      {IconRight && !isLoading && <IconRight className="w-4 h-4 shrink-0" />}
    </button>
  );
};
