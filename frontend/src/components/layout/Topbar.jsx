import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Bell,
  Plus,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { useApp } from '../../context/useApp';
import { OrbitMark } from '../branding/OrbitMark';

export const Topbar = () => {
  const { user, notifications, isMobileNavOpen, setIsMobileNavOpen } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/app') return 'Agent Workspace Dashboard';
    if (path === '/app/tasks') return 'Task Management';
    if (path === '/app/task/new') return 'Initialize New Goal';
    if (path.startsWith('/app/task/')) return 'Autonomous Agent Workspace';
    if (path === '/app/projects') return 'Autonomous Projects';
    if (path.startsWith('/app/projects/')) return 'Project Detail';
    if (path === '/app/memory') return 'Epistemic Memory Engine';
    if (path === '/app/tools') return 'Agent Tools & Sandboxes';
    if (path === '/app/settings') return 'Platform Settings';
    if (path === '/app/profile') return 'Architect Profile';
    return 'ORBIT';
  };

  return (
    <header
      className="h-16 px-4 md:px-6 flex items-center justify-between border-b sticky top-0 z-20 backdrop-blur-md"
      style={{
        backgroundColor: 'rgba(15, 19, 28, 0.85)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      {/* Left: Mobile hamburger & breadcrumb/title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="md:hidden p-2 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800"
          aria-label={isMobileNavOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isMobileNavOpen}
        >
          {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 font-semibold">
            <OrbitMark size={14} />
            <span className="hidden sm:inline">ORBIT / OS</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">/</span>
          <h1 className="text-xs sm:text-sm font-semibold text-slate-200 truncate max-w-[34vw] sm:max-w-xs font-heading">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      {/* Center: System Status Pill with Animated Orbit Mark */}
      <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10">
        <OrbitMark size={14} animated={true} />
        <span className="text-xs text-cyan-300 font-mono font-medium">
          ORBIT Core: Active & Observing
        </span>
      </div>

      {/* Right: Actions, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* Quick New Task shortcut */}
        <button
          onClick={() => navigate('/app/task/new')}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-cyan-400" />
          <span>New Task</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors relative"
            title="Notifications"
            aria-label="Notifications"
            aria-expanded={showNotifications}
          >
            <Bell className="w-4 h-4" />
            {notifications.some(n => n.unread) && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-slate-950" />
            )}
          </button>

          {showNotifications && (
            <div
              className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-700/80 shadow-2xl p-3 z-50 animate-fade-in"
              style={{ backgroundColor: 'var(--bg-surface-elevated)' }}
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-200">System Notifications</span>
                <span className="text-[10px] text-cyan-400 cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="flex flex-col gap-2">
                {notifications.map(n => (
                  <div key={n.id} className="p-2 rounded-lg bg-surface hover:bg-surface-hover border border-slate-800/80 transition-colors">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-200">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-500">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User avatar dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-cyan-500/30 transition-all"
            aria-label="Open account menu"
            aria-expanded={showUserMenu}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-700"
            />
          </button>

          {showUserMenu && (
            <div
              className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-700/80 shadow-2xl p-2 z-50 animate-fade-in"
              style={{ backgroundColor: 'var(--bg-surface-elevated)' }}
            >
              <div className="p-2 border-b border-slate-800 mb-1">
                <p className="text-xs font-semibold text-slate-100">{user.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
              </div>
              <button
                onClick={() => { setShowUserMenu(false); navigate('/app/profile'); }}
                className="w-full text-left px-3 py-1.5 rounded-md text-xs text-slate-300 hover:bg-slate-800/70"
              >
                Profile & Usage
              </button>
              <button
                onClick={() => { setShowUserMenu(false); navigate('/app/settings'); }}
                className="w-full text-left px-3 py-1.5 rounded-md text-xs text-slate-300 hover:bg-slate-800/70"
              >
                Settings
              </button>
              <div className="border-t border-slate-800 my-1" />
              <button
                onClick={() => { setShowUserMenu(false); navigate('/'); }}
                className="w-full text-left px-3 py-1.5 rounded-md text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
