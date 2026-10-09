import { useId } from 'react';

/**
 * OrbitMark - Visual Identity Mark for ORBIT
 * Represents autonomous intelligence: Central Intelligence Core + Orbital Trajectories + Active Node
 * 
 * Props:
 * - size: 'xs' (18px) | 'sm' (24px) | 'md' (32px) | 'lg' (48px) | 'xl' (64px) | number
 * - animated: boolean (continuous autonomous trajectory movement)
 * - variant: 'default' | 'emerald' | 'amber' | 'rose' | 'monochrome'
 * - status: 'idle' | 'planning' | 'executing' | 'verifying' | 'delivered' | 'failed'
 */
export const OrbitMark = ({
  size = 'md',
  animated = false,
  variant = 'default',
  status,
  className = '',
  style = {},
}) => {
  const uid = useId().replace(/:/g, '');

  // Resolve pixel dimension
  const sizeMap = {
    xs: 18,
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
  };
  const px = typeof size === 'number' ? size : sizeMap[size] || 32;

  // Determine active visual state based on status or variant
  const isDelivered = status === 'delivered' || variant === 'emerald';
  const isFailed = status === 'failed' || variant === 'rose';
  const isWarning = status === 'needs_approval' || variant === 'amber';
  const isExecuting = animated || ['planning', 'executing', 'verifying', 'running'].includes(status);

  // Palette resolution
  let coreColor = '#80d9c1';
  let coreInner = '#eafff8';
  let orbitColor1 = '#80d9c1';
  let orbitColor2 = '#4f9a88';
  let particleColor = '#b5f0df';

  if (isDelivered) {
    coreColor = '#10b981'; // Emerald
    coreInner = '#ecfdf5';
    orbitColor1 = '#34d399';
    orbitColor2 = '#059669';
    particleColor = '#6ee7b7';
  } else if (isFailed) {
    coreColor = '#f43f5e'; // Rose
    coreInner = '#fff1f2';
    orbitColor1 = '#fb7185';
    orbitColor2 = '#e11d48';
    particleColor = '#fda4af';
  } else if (isWarning) {
    coreColor = '#f59e0b'; // Amber
    coreInner = '#fffbeb';
    orbitColor1 = '#fbbf24';
    orbitColor2 = '#d97706';
    particleColor = '#fde68a';
  } else if (variant === 'monochrome') {
    coreColor = '#f8fafc';
    coreInner = '#ffffff';
    orbitColor1 = '#cbd5e1';
    orbitColor2 = '#64748b';
    particleColor = '#f1f5f9';
  }

  // Speed variations based on agent state
  const orbitSpeed = status === 'verifying' ? '3.5s' : status === 'executing' ? '2.2s' : status === 'planning' ? '2.8s' : '3s';

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: px, height: px, ...style }}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Gradients */}
          <radialGradient id={`coreGlow-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={coreColor} stopOpacity="0.8" />
            <stop offset="60%" stopColor={coreColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={coreColor} stopOpacity="0" />
          </radialGradient>

          <radialGradient id={`coreBody-${uid}`} cx="38%" cy="36%" r="65%">
            <stop offset="0%" stopColor={coreInner} />
            <stop offset="45%" stopColor={coreColor} />
            <stop offset="100%" stopColor={orbitColor2} />
          </radialGradient>

          <linearGradient id={`orbitGrad1-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={orbitColor1} stopOpacity="0.9" />
            <stop offset="50%" stopColor={orbitColor2} stopOpacity="0.4" />
            <stop offset="100%" stopColor={orbitColor1} stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id={`orbitGrad2-${uid}`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={orbitColor2} stopOpacity="0.75" />
            <stop offset="60%" stopColor={orbitColor1} stopOpacity="0.25" />
            <stop offset="100%" stopColor={orbitColor2} stopOpacity="0.05" />
          </linearGradient>

          <filter id={`glowFilter-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Scoped CSS animations */}
          <style>{`
            @keyframes orbit-spin-${uid} {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes orbit-spin-reverse-${uid} {
              from { transform: rotate(360deg); }
              to { transform: rotate(0deg); }
            }
            @keyframes orbit-pulse-${uid} {
              0%, 100% { transform: scale(1); opacity: 0.9; }
              50% { transform: scale(1.15); opacity: 1; }
            }
            @keyframes orbit-core-breathe-${uid} {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.08); }
            }
            .orbit-rotating-primary-${uid} {
              transform-origin: 24px 24px;
              animation: orbit-spin-${uid} ${orbitSpeed} cubic-bezier(0.4, 0, 0.4, 1) infinite;
            }
            .orbit-rotating-secondary-${uid} {
              transform-origin: 24px 24px;
              animation: orbit-spin-reverse-${uid} 6s linear infinite;
            }
            .orbit-pulse-core-${uid} {
              transform-origin: 24px 24px;
              animation: orbit-core-breathe-${uid} 2.4s ease-in-out infinite;
            }
            .orbit-particle-pulse-${uid} {
              animation: orbit-pulse-${uid} 1.6s ease-in-out infinite;
            }
            @media (prefers-reduced-motion: reduce) {
              .orbit-rotating-primary-${uid},
              .orbit-rotating-secondary-${uid},
              .orbit-pulse-core-${uid},
              .orbit-particle-pulse-${uid} {
                animation: none !important;
              }
            }
          `}</style>
        </defs>

        {/* Ambient Core Glow */}
        <circle
          cx="24"
          cy="24"
          r={isExecuting ? "16" : "13"}
          fill={`url(#coreGlow-${uid})`}
          className={isExecuting ? `orbit-pulse-core-${uid}` : ''}
        />

        {/* Secondary Elliptical Orbit (Inclined plane) */}
        <g
          transform="rotate(54 24 24)"
          className={isExecuting ? `orbit-rotating-secondary-${uid}` : ''}
          style={{ transformOrigin: '24px 24px' }}
        >
          <ellipse
            cx="24"
            cy="24"
            rx="18.5"
            ry="7.5"
            stroke={`url(#orbitGrad2-${uid})`}
            strokeWidth="1.2"
            strokeDasharray={isExecuting ? "3 3" : "none"}
            strokeLinecap="round"
          />
        </g>

        {/* Primary Dynamic Orbit (Main trajectory plane) */}
        <g
          transform="rotate(-28 24 24)"
          className={isExecuting ? `orbit-rotating-primary-${uid}` : ''}
          style={{ transformOrigin: '24px 24px' }}
        >
          <ellipse
            cx="24"
            cy="24"
            rx="19"
            ry="8.5"
            stroke={`url(#orbitGrad1-${uid})`}
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Traveling Satellite Node / Momentum Particle */}
          <circle
            cx="43"
            cy="24"
            r={isExecuting ? "2.6" : "2.2"}
            fill={particleColor}
            filter={`url(#glowFilter-${uid})`}
            className={isExecuting ? `orbit-particle-pulse-${uid}` : ''}
          />
          {/* Subtle trail particle */}
          {isExecuting && (
            <circle
              cx="41.5"
              cy="21.5"
              r="1.4"
              fill={particleColor}
              opacity="0.5"
            />
          )}
        </g>

        {/* Central Intelligence Core */}
        <g className={isExecuting ? `orbit-pulse-core-${uid}` : ''} style={{ transformOrigin: '24px 24px' }}>
          {/* Outer Core Border */}
          <circle
            cx="24"
            cy="24"
            r="6.5"
            fill={`url(#coreBody-${uid})`}
            stroke={coreColor}
            strokeWidth="1"
            filter={`url(#glowFilter-${uid})`}
          />
          {/* Inner Quantum Specular Highlight */}
          <circle
            cx="22.2"
            cy="22.2"
            r="2"
            fill={coreInner}
            opacity="0.85"
          />
        </g>

        {/* Calm Completed Alignment Ring when Delivered */}
        {isDelivered && (
          <circle
            cx="24"
            cy="24"
            r="20.5"
            stroke={coreColor}
            strokeWidth="1"
            strokeOpacity="0.4"
            strokeDasharray="2 4"
          />
        )}
      </svg>
    </div>
  );
};
