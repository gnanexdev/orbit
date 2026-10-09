
export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  highlight = false,
  style = {},
  onClick,
  ...props
}) => {
  const cardStyle = {
    backgroundColor: 'var(--bg-surface)',
    border: highlight ? '1px solid var(--border-highlight)' : '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    boxShadow: highlight ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  };

  return (
    <div
      className={`relative overflow-hidden ${hoverEffect ? 'hover:border-default hover:bg-surface-elevated' : ''} ${className}`}
      style={cardStyle}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', style = {} }) => (
  <div
    className={`p-4 border-b flex items-center justify-between ${className}`}
    style={{ borderColor: 'var(--border-subtle)', ...style }}
  >
    {children}
  </div>
);

export const CardContent = ({ children, className = '', style = {} }) => (
  <div className={`p-4 ${className}`} style={style}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '', style = {} }) => (
  <div
    className={`p-3 px-4 border-t flex items-center justify-between ${className}`}
    style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-surface-subtle)', ...style }}
  >
    {children}
  </div>
);
