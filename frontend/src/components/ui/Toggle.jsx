
export const Toggle = ({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  className = '',
}) => {
  return (
    <label
      className={`inline-flex items-center justify-between gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={(e) => {
        if (!disabled && onChange) {
          e.preventDefault();
          onChange(!checked);
        }
      }}
    >
      {(label || description) && (
        <div className="flex flex-col">
          {label && <span className="text-xs font-medium text-slate-200">{label}</span>}
          {description && <span className="text-xs text-slate-500">{description}</span>}
        </div>
      )}
      <div
        className="relative inline-flex items-center shrink-0 w-9 h-5 rounded-full transition-colors duration-200"
        style={{
          backgroundColor: checked ? '#38bdf8' : 'rgba(255, 255, 255, 0.12)',
          border: checked ? '1px solid rgba(56, 189, 248, 0.6)' : '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <span
          className="inline-block w-3.5 h-3.5 rounded-full bg-white transition-transform duration-200 shadow-sm"
          style={{
            transform: checked ? 'translateX(18px)' : 'translateX(2px)',
            backgroundColor: checked ? '#030712' : '#f8fafc',
          }}
        />
      </div>
    </label>
  );
};
