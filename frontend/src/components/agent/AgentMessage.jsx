import { User } from 'lucide-react';
import { ToolActivity } from './ToolActivity';
import { OrbitMark } from '../branding/OrbitMark';

export const AgentMessage = ({ message }) => {
  const isUser = message.sender === 'user';
  const isTool = message.sender === 'tool';
  const isAgent = message.sender === 'agent';

  if (isTool) {
    return (
      <div className="my-2 pl-8">
        <ToolActivity
          toolType={message.toolType}
          toolName={message.toolName}
          query={message.query}
          resultsCount={message.resultsCount}
          sources={message.sources}
          language={message.language}
          code={message.code}
          stdout={message.stdout}
          stderr={message.stderr}
          status={message.status}
          timestamp={message.timestamp}
        />
      </div>
    );
  }

  return (
    <div
      className={`agent-event flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
        isUser
          ? 'bg-slate-900/60 border-slate-800 ml-6 md:ml-12'
          : 'bg-surface-elevated/70 border-slate-800/80 mr-4 md:mr-8 shadow-sm'
      }`}
      style={{
        backgroundColor: isUser ? 'rgba(15, 23, 42, 0.4)' : 'var(--bg-surface-elevated)',
      }}
    >
      {/* Sender Avatar */}
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
          isUser
            ? 'bg-slate-800 text-slate-300 border border-slate-700'
            : 'bg-slate-900 border border-cyan-500/30 text-cyan-400 font-bold shadow-md shadow-cyan-500/20'
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <OrbitMark size="xs" />}
      </div>

      {/* Message Body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-200">
              {isUser ? 'You' : 'ORBIT'}
            </span>
            {message.statusText && !isUser && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {message.statusText}
              </span>
            )}
          </div>
          {message.timestamp && (
            <span className="text-[10px] font-mono text-slate-500">{message.timestamp}</span>
          )}
        </div>

        <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
          {message.text}
        </p>
      </div>
    </div>
  );
};
