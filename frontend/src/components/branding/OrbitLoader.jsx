import { OrbitMark } from './OrbitMark';

export const OrbitLoader = ({ size = 'md', label = 'ORBIT is working', className = '' }) => (
  <div className={`orbit-loader ${className}`} role="status" aria-live="polite">
    <OrbitMark size={size} animated />
    {label && <span className="orbit-loader__label">{label}</span>}
  </div>
);