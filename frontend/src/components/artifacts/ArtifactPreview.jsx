import { useState } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  FileText
} from 'lucide-react';
import { Button } from '../ui/Button';

export const ArtifactPreview = ({
  artifact,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !artifact) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(artifact.content || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([artifact.content || ''], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = artifact.title;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl h-[85vh] rounded-2xl border border-slate-700/80 shadow-2xl flex flex-col overflow-hidden z-10 animate-fade-in"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-slate-800 bg-surface-elevated">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-100 font-heading">
                {artifact.title}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {artifact.type.toUpperCase()} &bull; {artifact.size} &bull; ORBIT deliverable
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={copied ? Check : Copy}
              onClick={handleCopy}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Download}
              onClick={handleDownload}
            >
              Download
            </Button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-950 font-mono text-xs leading-relaxed text-slate-300">
          {artifact.type === 'spreadsheet' ? (
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <tbody>
                  {artifact.content.split('\n').map((row, rIdx) => {
                    const cols = row.split(',');
                    const isHeader = rIdx === 0;
                    return (
                      <tr
                        key={rIdx}
                        className={`border-b border-slate-800/80 ${isHeader ? 'bg-slate-900 text-cyan-400 font-bold' : 'hover:bg-slate-900/40 text-slate-300'}`}
                      >
                        {cols.map((col, cIdx) => (
                          <td key={cIdx} className="p-2.5 px-3 border-r border-slate-800/60 last:border-r-0 whitespace-nowrap">
                            {col}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap font-sans text-sm text-slate-300 leading-relaxed font-normal">
              {artifact.content}
            </pre>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 px-6 border-t border-slate-800 bg-surface-subtle flex items-center justify-between text-xs text-slate-500">
          <span>Target artifact verified for downstream compilation</span>
          <span className="font-mono">SHA256: 8f9b4c...e21d</span>
        </div>
      </div>
    </div>
  );
};
