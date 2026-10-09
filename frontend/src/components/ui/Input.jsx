
export const Input = ({
  label,
  error,
  icon: Icon,
  rightElement,
  className = '',
  id,
  type = 'text',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-slate-300 select-none">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3 text-slate-500 pointer-events-none flex items-center">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={`w-full py-2 bg-input text-primary text-sm rounded-md transition-all ${Icon ? 'pl-9' : 'pl-3'} ${rightElement ? 'pr-10' : 'pr-3'} ${error ? 'border-rose-500/70 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-400'}`}
          style={{
            backgroundColor: 'var(--bg-input)',
            border: error ? '1px solid rgba(244, 63, 94, 0.6)' : '1px solid var(--border-default)',
            color: 'var(--text-primary)',
          }}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-2.5 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {error && <span className="text-xs text-rose-400">{error}</span>}
    </div>
  );
};
