import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  CheckSquare,
  FolderKanban,
  Brain,
  Wrench,
  Settings,
  X,
  Plus,
  UserRound
} from 'lucide-react';
import { useApp } from '../../context/useApp';
import { OrbitLogo } from '../branding/OrbitLogo';

export const MobileNav = () => {
  const { user, isMobileNavOpen, setIsMobileNavOpen } = useApp();
  const navigate = useNavigate();

  if (!isMobileNavOpen) return null;

  const navSections = [
    { label: 'Workspace', items: [
      { label: 'Home', path: '/app', icon: Home, exact: true },
      { label: 'Tasks', path: '/app/tasks', icon: CheckSquare },
      { label: 'Projects', path: '/app/projects', icon: FolderKanban },
    ] },
    { label: 'Resources', items: [
      { label: 'Memory', path: '/app/memory', icon: Brain },
      { label: 'Tools', path: '/app/tools', icon: Wrench },
    ] },
    { label: 'Account', items: [
      { label: 'Settings', path: '/app/settings', icon: Settings },
      { label: 'Profile', path: '/app/profile', icon: UserRound },
    ] },
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setIsMobileNavOpen(false)}
      />

      {/* Drawer */}
      <div
        className="relative w-72 max-w-[85vw] h-full flex flex-col border-r z-10 animate-fade-in"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-default)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <OrbitLogo size="sm" showWordmark={true} />
          <button
            onClick={() => setIsMobileNavOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Task CTA */}
        <div className="p-4">
          <button
            onClick={() => {
              setIsMobileNavOpen(false);
              navigate('/app/task/new');
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold text-sm bg-cyan-400 text-slate-950 shadow-md"
            style={{ backgroundColor: '#38bdf8' }}
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New Task</span>
          </button>
        </div>

        {/* Links */}
        <nav className="mobile-nav flex-1 px-3 py-2 overflow-y-auto" aria-label="Main navigation">
          {navSections.map((section) => (
            <div className="mobile-nav__section" key={section.label}>
              <h2 className="mobile-nav__section-label">{section.label}</h2>
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.exact}
                    onClick={() => setIsMobileNavOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'mobile-nav__link-active'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Profile Footer */}
        <div className="p-4 border-t border-slate-800 flex items-center gap-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover border border-slate-700"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-slate-200 truncate">{user.name}</span>
            <span className="text-[11px] text-cyan-400 truncate">{user.plan}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
