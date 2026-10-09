
export const Textarea = ({
  label,
  error,
  helperText,
  rows = 4,
  className = '',
  id,
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
      <textarea
        id={inputId}
        rows={rows}
        className={`w-full p-3 bg-input text-primary text-sm rounded-md transition-all resize-y ${error ? 'border-rose-500/70 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-400'}`}
        style={{
          backgroundColor: 'var(--bg-input)',
          border: error ? '1px solid rgba(244, 63, 94, 0.6)' : '1px solid var(--border-default)',
          color: 'var(--text-primary)',
          lineHeight: '1.6',
        }}
        {...props}
      />
      {error && <span className="text-xs text-rose-400">{error}</span>}
      {helperText && !error && <span className="text-xs text-slate-500">{helperText}</span>}
    </div>
  );
};
