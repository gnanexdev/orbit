import { useState } from 'react';
import {
  Search,
  Code2,
  FileText,
  GitBranch,
  Globe,
  Database,
  Zap,
  Layers,
  Settings2,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Toggle } from '../components/ui/Toggle';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';

export const Tools = () => {
  const { tools, toggleTool } = useApp();

  const [configuringTool, setConfiguringTool] = useState(null);
  const [configTimeout, setConfigTimeout] = useState('30s');
  const [configRateLimit, setConfigRateLimit] = useState('60 req/min');

  const getToolIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'web search':
        return <Search className="w-5 h-5 text-cyan-400" />;
      case 'code execution':
        return <Code2 className="w-5 h-5 text-amber-400" />;
      case 'file analysis':
        return <FileText className="w-5 h-5 text-emerald-400" />;
      case 'github':
        return <GitBranch className="w-5 h-5 text-purple-400" />;
      case 'browser automation':
        return <Globe className="w-5 h-5 text-blue-400" />;
      case 'database query':
        return <Database className="w-5 h-5 text-rose-400" />;
      case 'rest / graphql runner':
        return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'connected apps':
      default:
        return <Layers className="w-5 h-5 text-slate-400" />;
    }
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    setConfiguringTool(null);
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-100 font-heading">Agent Tools & Capabilities</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
              Sandbox Safe
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Toggle and configure the external tools, sandboxes, and APIs ORBIT can invoke autonomously.
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="p-5 rounded-2xl border border-slate-800 bg-surface hover:border-slate-700 transition-all flex flex-col justify-between gap-4 shadow-sm"
            style={{ backgroundColor: 'var(--bg-surface)' }}
          >
            {/* Top row: Icon, Name, and Toggle */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                  {getToolIcon(tool.name)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-100 font-heading">
                      {tool.name}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      {tool.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">{tool.category}</span>
                </div>
              </div>

              {/* Status Toggle */}
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-semibold ${tool.status ? 'text-cyan-400' : 'text-slate-500'}`}>
                  {tool.status ? 'ON' : 'OFF'}
                </span>
                <Toggle
                  checked={tool.status}
                  onChange={() => toggleTool(tool.id)}
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-400 leading-relaxed">
              {tool.description}
            </p>

            {/* Footer: Metrics and Configure Button */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
              <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
                <span>{tool.callsThisMonth} invocations/mo</span>
                <span>&bull;</span>
                <span>{tool.latency}</span>
              </div>

              <Button
                variant="outline"
                size="sm"
                icon={Settings2}
                onClick={() => setConfiguringTool(tool)}
              >
                Configure
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Configure Tool Modal */}
      <Modal
        isOpen={Boolean(configuringTool)}
        onClose={() => setConfiguringTool(null)}
        title={`Configure: ${configuringTool?.name}`}
        subtitle="Manage timeout limits, rate ceilings, and isolation constraints."
      >
        <form onSubmit={handleSaveConfig} className="flex flex-col gap-4">
          <Input
            label="Execution Timeout"
            value={configTimeout}
            onChange={(e) => setConfigTimeout(e.target.value)}
            placeholder="e.g. 30s"
          />

          <Input
            label="Invocation Rate Ceiling"
            value={configRateLimit}
            onChange={(e) => setConfigRateLimit(e.target.value)}
            placeholder="e.g. 60 req/min"
          />

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400">
            <span className="font-semibold text-slate-200 block mb-1">Security Isolation</span>
            All outputs are sanitized through ORBIT memory guards before returning to the agent.
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setConfiguringTool(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Configuration
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
