import { useState } from 'react';
import {
  Settings as Bot,
  Cpu,
  Brain,
  Bell,
  Palette,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Toggle } from '../components/ui/Toggle';
import { Button } from '../components/ui/Button';

export const Settings = () => {
  const { settings, updateSettings } = useApp();
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 font-heading">Platform Settings</h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure agent autonomy levels, runtime telemetry, memory policies, and UI preferences.
          </p>
        </div>

        {savedToast && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold animate-fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Preferences Saved</span>
          </div>
        )}
      </div>

      {/* 1. AGENT SETTINGS */}
      <div
        className="p-6 rounded-2xl border border-slate-800 bg-surface flex flex-col gap-4 shadow-sm"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <Bot className="w-5 h-5 text-cyan-400" />
          <div>
            <h2 className="text-sm font-semibold text-slate-100 font-heading">Agent Autonomy Level</h2>
            <p className="text-xs text-slate-400">Controls human-in-the-loop interception during task execution.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'always_ask', title: 'Always Ask', desc: 'Prompts before each milestone step and tool invocation.' },
            { id: 'ask_important', title: 'Ask on High Impact', desc: 'Auto-executes safe tools; pauses on DB/API changes.' },
            { id: 'autonomous', title: 'Fully Autonomous', desc: 'Full pipeline execution straight through to delivery.' },
          ].map((level) => {
            const isSelected = settings.autonomyLevel === level.id;
            return (
              <div
                key={level.id}
                onClick={() => updateSettings('autonomyLevel', level.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col gap-1.5 ${
                  isSelected
                    ? 'border-cyan-500/60 bg-cyan-950/20 shadow-sm'
                    : 'border-slate-800 hover:border-slate-700 bg-surface-subtle'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                    {level.title}
                  </span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400" />}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {level.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. EXECUTION SETTINGS */}
      <div
        className="p-6 rounded-2xl border border-slate-800 bg-surface flex flex-col gap-4 shadow-sm"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <Cpu className="w-5 h-5 text-amber-400" />
          <div>
            <h2 className="text-sm font-semibold text-slate-100 font-heading">Execution & Telemetry</h2>
            <p className="text-xs text-slate-400">Manage real-time execution outputs and verification steps.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-slate-200">Show execution plan</h4>
              <p className="text-[11px] text-slate-400">Display dynamic step breakdown panel in workspace</p>
            </div>
            <Toggle
              checked={settings.showExecutionPlan}
              onChange={(val) => updateSettings('showExecutionPlan', val)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-slate-200">Show tool activity</h4>
              <p className="text-[11px] text-slate-400">Display tool calls, queries, and code outputs in conversation</p>
            </div>
            <Toggle
              checked={settings.showToolActivity}
              onChange={(val) => updateSettings('showToolActivity', val)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-slate-200">Verify results</h4>
              <p className="text-[11px] text-slate-400">Perform self-reflection verification before exporting artifacts</p>
            </div>
            <Toggle
              checked={settings.verifyResults}
              onChange={(val) => updateSettings('verifyResults', val)}
            />
          </div>
        </div>
      </div>

      {/* 3. MEMORY SETTINGS */}
      <div
        className="p-6 rounded-2xl border border-slate-800 bg-surface flex flex-col gap-4 shadow-sm"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <Brain className="w-5 h-5 text-purple-400" />
          <div>
            <h2 className="text-sm font-semibold text-slate-100 font-heading">Personalized Memory</h2>
            <p className="text-xs text-slate-400">Determine how ORBIT indexes user preferences and learnings.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-slate-200">Use personal memory</h4>
              <p className="text-[11px] text-slate-400">Inject stored goals and skills into agent prompts</p>
            </div>
            <Toggle
              checked={settings.usePersonalMemory}
              onChange={(val) => updateSettings('usePersonalMemory', val)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-slate-200">Learn preferences automatically</h4>
              <p className="text-[11px] text-slate-400">Allow agent to extract formatting and tool preferences from tasks</p>
            </div>
            <Toggle
              checked={settings.learnPreferences}
              onChange={(val) => updateSettings('learnPreferences', val)}
            />
          </div>
        </div>
      </div>

      {/* 4. NOTIFICATIONS */}
      <div
        className="p-6 rounded-2xl border border-slate-800 bg-surface flex flex-col gap-4 shadow-sm"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <Bell className="w-5 h-5 text-blue-400" />
          <div>
            <h2 className="text-sm font-semibold text-slate-100 font-heading">Notifications & Alerts</h2>
            <p className="text-xs text-slate-400">Push notifications and desktop sound alerts.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-slate-200">Task completion alerts</h4>
              <p className="text-[11px] text-slate-400">Notify when autonomous tasks finish execution</p>
            </div>
            <Toggle
              checked={settings.notifyTaskCompletion}
              onChange={(val) => updateSettings('notifyTaskCompletion', val)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-slate-200">Approval requests</h4>
              <p className="text-[11px] text-slate-400">High-priority alert when a task requires your confirmation</p>
            </div>
            <Toggle
              checked={settings.notifyApprovalRequests}
              onChange={(val) => updateSettings('notifyApprovalRequests', val)}
            />
          </div>
        </div>
      </div>

      {/* 5. APPEARANCE */}
      <div
        className="p-6 rounded-2xl border border-slate-800 bg-surface flex flex-col gap-4 shadow-sm"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <Palette className="w-5 h-5 text-emerald-400" />
          <div>
            <h2 className="text-sm font-semibold text-slate-100 font-heading">Interface Appearance</h2>
            <p className="text-xs text-slate-400">Visual theme, layout density, and transitions.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-slate-200">Compact mode</h4>
              <p className="text-[11px] text-slate-400">Higher density table rows and workspace cards</p>
            </div>
            <Toggle
              checked={settings.compactMode}
              onChange={(val) => updateSettings('compactMode', val)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-slate-200">Micro-animations</h4>
              <p className="text-[11px] text-slate-400">Enable pulsing activity indicators and step transitions</p>
            </div>
            <Toggle
              checked={settings.animations}
              onChange={(val) => updateSettings('animations', val)}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <Button variant="primary" size="md" onClick={handleSave}>
          Save Preferences
        </Button>
      </div>
    </div>
  );
};
