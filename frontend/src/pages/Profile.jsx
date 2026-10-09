import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Shield,
  Key,
  Layers,
  LogOut,
  Zap,
  Clock,
  CheckCircle2,
  ExternalLink,
  Bot
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const Profile = () => {
  const { user } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 font-heading">Architect Profile</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your account credentials, security preferences, and connected services.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold animate-fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile Updated</span>
          </div>
        )}
      </div>

      {/* User Identity Card */}
      <div
        className="p-6 rounded-2xl border border-slate-800 bg-surface flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 shadow-sm"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-700 shadow-md"
          />
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h2 className="text-xl font-bold text-slate-100 font-heading">{user.name}</h2>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                {user.plan}
              </span>
            </div>
            <p className="text-xs text-slate-400">{user.role}</p>
            <p className="text-xs text-slate-500 mt-0.5 font-mono">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="danger"
            size="sm"
            icon={LogOut}
            onClick={() => navigate('/')}
          >
            Sign Out
          </Button>
        </div>
      </div>

      {/* Usage & Platform Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-800 bg-surface flex flex-col gap-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Tasks Executed</span>
          <span className="text-xl font-bold text-slate-100 font-mono">{user.stats?.tasksCount || 148}</span>
          <span className="text-[10px] text-emerald-400">+12 this week</span>
        </div>
        <div className="p-4 rounded-xl border border-slate-800 bg-surface flex flex-col gap-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Tokens Processed</span>
          <span className="text-xl font-bold text-cyan-400 font-mono">{user.stats?.tokensUsed || '18.4M'}</span>
          <span className="text-[10px] text-slate-500">Autonomous synthesis</span>
        </div>
        <div className="p-4 rounded-xl border border-slate-800 bg-surface flex flex-col gap-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Autonomous Hours</span>
          <span className="text-xl font-bold text-purple-400 font-mono">{user.stats?.autonomousHours || 64.2}h</span>
          <span className="text-[10px] text-slate-500">Human time saved</span>
        </div>
        <div className="p-4 rounded-xl border border-slate-800 bg-surface flex flex-col gap-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Agent Credits</span>
          <span className="text-xl font-bold text-amber-400 font-mono">{user.credits || 8450}</span>
          <span className="text-[10px] text-slate-500">Renews May 1</span>
        </div>
      </div>

      {/* Account Settings Form */}
      <div
        className="p-6 rounded-2xl border border-slate-800 bg-surface flex flex-col gap-4 shadow-sm"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        <h3 className="text-sm font-semibold text-slate-100 font-heading pb-3 border-b border-slate-800">
          Personal Information
        </h3>

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Primary Work Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Job Title / Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <Input
              label="Timezone"
              defaultValue="UTC+05:30 (Asia/Kolkata)"
              disabled
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="primary" size="md">
              Update Profile
            </Button>
          </div>
        </form>
      </div>

      {/* Connected Applications */}
      <div
        className="p-6 rounded-2xl border border-slate-800 bg-surface flex flex-col gap-4 shadow-sm"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        <h3 className="text-sm font-semibold text-slate-100 font-heading pb-3 border-b border-slate-800">
          Connected Applications
        </h3>

        <div className="flex flex-col gap-3">
          {user.connectedApps.map((app) => (
            <div
              key={app.id}
              className="p-3.5 px-4 rounded-xl border border-slate-800 bg-surface-subtle flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-xs text-slate-200">
                  {app.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">{app.name}</h4>
                  <p className="text-[11px] text-slate-400 font-mono">{app.account}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    app.connected
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {app.connected ? 'Connected' : 'Disconnected'}
                </span>
                <Button variant="outline" size="sm">
                  {app.connected ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security & Sessions */}
      <div
        className="p-6 rounded-2xl border border-slate-800 bg-surface flex flex-col gap-4 shadow-sm"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        <h3 className="text-sm font-semibold text-slate-100 font-heading pb-3 border-b border-slate-800">
          Security & Access Tokens
        </h3>

        <div className="flex items-center justify-between text-xs">
          <div>
            <h4 className="font-semibold text-slate-200">Two-Factor Authentication (2FA)</h4>
            <p className="text-slate-400 mt-0.5 text-[11px]">Protect your agent workspace with hardware FIDO2 or TOTP.</p>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 font-semibold px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30">
            Enabled
          </span>
        </div>

        <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800/80">
          <div>
            <h4 className="font-semibold text-slate-200">ORBIT Agent CLI API Token</h4>
            <p className="text-slate-400 mt-0.5 text-[11px]">Personal access token for programmatic terminal dispatch.</p>
          </div>
          <Button variant="outline" size="sm" icon={Key}>
            Roll Token
          </Button>
        </div>
      </div>
    </div>
  );
};
