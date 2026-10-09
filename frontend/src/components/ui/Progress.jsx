
export const Progress = ({
  value = 0,
  max = 100,
  variant = 'cyan', // 'cyan', 'emerald', 'amber', 'rose'
  size = 'md', // 'sm', 'md', 'lg'
  showLabel = false,
  animated = false,
  className = '',
}) => {
  const clampedValue = Math.min(max, Math.max(0, value));
  const percentage = Math.round((clampedValue / max) * 100);

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  const barColors = {
    cyan: '#38bdf8',
    emerald: '#10b981',
    amber: '#f59e0b',
    rose: '#f43f5e',
    purple: '#a855f7',
  };

  const selectedColor = barColors[variant] || barColors.cyan;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span>Progress</span>
          <span className="font-mono font-medium text-slate-200">{percentage}%</span>
        </div>
      )}
      <div
        className={`w-full ${heightStyles[size] || heightStyles.md} rounded-full overflow-hidden`}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${animated ? 'animate-pulse-subtle' : ''}`}
          style={{
            width: `${percentage}%`,
            backgroundColor: selectedColor,
            boxShadow: `0 0 10px -2px ${selectedColor}88`,
          }}
        />
      </div>
    </div>
  );
};
