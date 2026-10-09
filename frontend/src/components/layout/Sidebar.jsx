import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  CheckSquare,
  FolderKanban,
  Brain,
  Wrench,
  Settings,
  Plus,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/useApp';
import { OrbitLogo } from '../branding/OrbitLogo';

export const Sidebar = () => {
  const { user, isSidebarCollapsed, setIsSidebarCollapsed } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

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
  ];

  const isActive = (path, exact) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className="app-sidebar hidden md:flex flex-col h-screen sticky top-0 z-30 transition-all duration-300 border-r select-none shrink-0"
      style={{
        width: isSidebarCollapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width-expanded)',
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between p-4 h-16 border-b border-slate-800/80">
        <NavLink to="/app" className="flex items-center gap-3 overflow-hidden text-decoration-none min-w-0">
          <OrbitLogo
            size={isSidebarCollapsed ? "sm" : "md"}
            showWordmark={!isSidebarCollapsed}
            showTagline={!isSidebarCollapsed}
          />
        </NavLink>

        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="p-1 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors shrink-0"
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* New Task Button */}
      <div className="p-3">
        <button
          onClick={() => navigate('/app/task/new')}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg font-semibold text-sm transition-all"
          style={{
            backgroundColor: 'var(--brand-cyan)',
            color: 'var(--text-inverse)',
          }}
          title="Create New Task"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          {!isSidebarCollapsed && <span>New Task</span>}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-2 flex flex-col gap-1 overflow-y-auto">
        {navSections.map((section) => (
          <div className="app-sidebar__section" key={section.label}>
            {!isSidebarCollapsed && <span className="app-sidebar__section-label">{section.label}</span>}
            {section.items.map((item) => {
              const active = isActive(item.path, item.exact);
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${active ? 'font-semibold' : 'hover:bg-slate-800/60 text-slate-400 hover:text-slate-200'}`}
                  style={{
                    backgroundColor: active ? 'var(--accent-wash)' : 'transparent',
                    color: active ? 'var(--brand-cyan)' : undefined,
                    border: active ? '1px solid var(--border-highlight)' : '1px solid transparent',
                  }}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                  {!isSidebarCollapsed && item.label === 'Tasks' && (
                    <span className="ml-auto text-[11px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-400 font-mono">6</span>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Agent Workflow Badge (when expanded) */}
      {!isSidebarCollapsed && (
        <div className="mx-3 my-2 p-3 rounded-lg border border-slate-800 bg-surface-subtle" style={{ backgroundColor: 'var(--bg-surface-subtle)' }}>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ORBIT Trajectory</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed font-mono">
            Goal &rarr; Plan &rarr; Execute &rarr; Verify &rarr; Deliver
          </p>
        </div>
      )}

      {/* Bottom Section */}
      <div className="p-3 border-t border-slate-800 flex flex-col gap-1">
        <NavLink
          to="/app/settings"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive('/app/settings') ? 'font-semibold' : 'hover:bg-slate-800/60 text-slate-400 hover:text-slate-200'}`}
          style={{
            backgroundColor: isActive('/app/settings') ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
            color: isActive('/app/settings') ? '#38bdf8' : undefined,
          }}
          title={isSidebarCollapsed ? 'Settings' : undefined}
        >
          <Settings className="w-4 h-4 shrink-0" />
          {!isSidebarCollapsed && <span>Settings</span>}
        </NavLink>

        {/* User Profile item */}
        <NavLink
          to="/app/profile"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/60 transition-colors mt-1"
          title={isSidebarCollapsed ? user.name : undefined}
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-7 h-7 rounded-full object-cover border border-slate-700 shrink-0"
          />
          {!isSidebarCollapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold text-slate-200 truncate">{user.name}</span>
              <span className="text-[10px] text-cyan-400 font-medium truncate">{user.plan}</span>
            </div>
          )}
        </NavLink>
      </div>
    </aside>
  );
};
