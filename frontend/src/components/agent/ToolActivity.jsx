import { useState } from 'react';
import {
  Search,
  Code2,
  FileText,
  GitBranch,
  Globe,
  Database,
  Zap,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

export const ToolActivity = ({
  toolType = 'search',
  toolName = 'Web Search',
  query,
  resultsCount,
  sources = [],
  language = 'python',
  code,
  stdout,
  stderr,
  status = 'completed', // 'running', 'completed', 'failed'
  timestamp,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getToolIcon = () => {
    switch (toolType.toLowerCase()) {
      case 'search':
        return <Search className="w-4 h-4 text-cyan-400" />;
      case 'code':
        return <Code2 className="w-4 h-4 text-amber-400" />;
      case 'file':
        return <FileText className="w-4 h-4 text-emerald-400" />;
      case 'github':
        return <GitBranch className="w-4 h-4 text-purple-400" />;
      case 'browser':
        return <Globe className="w-4 h-4 text-blue-400" />;
      case 'database':
        return <Database className="w-4 h-4 text-rose-400" />;
      case 'api':
      default:
        return <Zap className="w-4 h-4 text-yellow-400" />;
    }
  };

  return (
    <div
      className={`tool-event rounded-lg border border-slate-800 bg-surface-subtle overflow-hidden transition-all text-xs ${className}`}
      style={{ backgroundColor: 'var(--bg-surface-subtle)' }}
    >
      {/* Tool Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setIsExpanded(!isExpanded); } }}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        className="flex items-center justify-between p-3 bg-surface hover:bg-surface-hover cursor-pointer border-b border-slate-800/60 select-none"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded bg-slate-900 border border-slate-800">
            {getToolIcon()}
          </div>
          <span className="font-semibold text-slate-200">{toolName}</span>
          {status === 'completed' && (
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3" />
              <span>Completed</span>
            </span>
          )}
          {status === 'running' && (
            <span className="flex items-center gap-1 text-[11px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Running...</span>
            </span>
          )}
          {status === 'failed' && (
            <span className="flex items-center gap-1 text-[11px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
              <AlertCircle className="w-3 h-3" />
              <span>Failed</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          {timestamp && <span className="text-[10px] font-mono">{timestamp}</span>}
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </div>
      </div>

      {/* Tool Content Accordion */}
      {isExpanded && (
        <div className="p-3 flex flex-col gap-2.5">
          {/* Web Search Tool Details */}
          {toolType === 'search' && (
            <>
              {query && (
                <div className="flex items-start gap-2">
                  <span className="text-slate-500 font-mono text-[11px] shrink-0">Query:</span>
                  <code className="text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 font-mono text-[11px] flex-1">
                    "{query}"
                  </code>
                </div>
              )}
              {resultsCount !== undefined && (
                <div className="text-[11px] text-slate-400 font-medium">
                  Found <span className="text-cyan-400 font-semibold">{resultsCount}</span> verified sources
                </div>
              )}
              {sources && sources.length > 0 && (
                <div className="flex flex-col gap-1.5 mt-1">
                  {sources.map((src, i) => (
                    <a
                      key={i}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 text-slate-300 hover:text-cyan-300 transition-colors flex flex-col gap-0.5 group"
                    >
                      <div className="flex items-center justify-between font-medium text-xs">
                        <span className="truncate">{src.title}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400 shrink-0 ml-1" />
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono truncate">{src.url}</span>
                      {src.snippet && (
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{src.snippet}</p>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Code Execution Details */}
          {toolType === 'code' && (
            <>
              {code && (
                <div className="relative group">
                  <div className="flex items-center justify-between px-3 py-1 bg-slate-950 border border-b-0 border-slate-800 rounded-t text-[10px] text-slate-400 font-mono">
                    <span>{language}</span>
                    <button
                      onClick={() => handleCopy(code)}
                      className="flex items-center gap-1 hover:text-slate-200"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-slate-950 border border-slate-800 rounded-b font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
                    <code>{code}</code>
                  </pre>
                </div>
              )}
              {stdout && (
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">stdout:</span>
                  <pre className="p-2.5 bg-slate-900 border border-slate-800 rounded font-mono text-[11px] text-emerald-300/90 overflow-x-auto">
                    <code>{stdout}</code>
                  </pre>
                </div>
              )}
              {stderr && (
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-rose-400 uppercase font-semibold">stderr:</span>
                  <pre className="p-2.5 bg-slate-900 border border-rose-900/40 rounded font-mono text-[11px] text-rose-300/90 overflow-x-auto">
                    <code>{stderr}</code>
                  </pre>
                </div>
              )}
            </>
          )}

          {/* Database Tool Details */}
          {toolType === 'database' && (
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase">SQL Statement:</span>
              <pre className="p-2.5 bg-slate-950 border border-slate-800 rounded font-mono text-[11px] text-cyan-300 overflow-x-auto">
                <code>{query}</code>
              </pre>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Rows updated: 2.4M (took 142ms)</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
