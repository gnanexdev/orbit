import {
  FileText,
  FileCode2,
  Table,
  BarChart,
  Presentation,
  Download,
  Eye,
  FileDown
} from 'lucide-react';
import  from '../ui/';

export const ArtifactCard = ({
  artifact,
  onPreview,
  className = '',
}) => {
  const getArtifactIcon = (type) => {
    switch (type) {
      case 'document':
        return <FileText className="w-5 h-5 text-cyan-400" />;
      case 'code':
        return <FileCode2 className="w-5 h-5 text-amber-400" />;
      case 'spreadsheet':
        return <Table className="w-5 h-5 text-emerald-400" />;
      case 'chart':
        return <BarChart className="w-5 h-5 text-purple-400" />;
      case 'presentation':
        return <Presentation className="w-5 h-5 text-pink-400" />;
      case 'pdf':
      default:
        return <FileDown className="w-5 h-5 text-rose-400" />;
    }
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    const blob = new Blob([artifact.content || 'ORBIT AI Output'], { type: 'text/plain' });
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
    <article
      onClick={() => onPreview && onPreview(artifact)}
      className={`artifact-card group p-4 rounded-xl border border-slate-800 hover:border-slate-700 bg-surface hover:bg-surface-elevated transition-all cursor-pointer flex flex-col justify-between gap-3 shadow-sm ${className}`}
      style={{ backgroundColor: 'var(--bg-surface)' }}
    >
      {/* Top: Icon & Type */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
            {getArtifactIcon(artifact.type)}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors truncate">
              {artifact.title}
            </h4>
            <span className="text-[10px] font-mono text-slate-500 uppercase">
              {artifact.type} &bull; {artifact.size} &bull; Verified
            </span>
          </div>
        </div>

        {artifact.updatedAt && (
          <span className="text-[10px] font-mono text-slate-500 shrink-0">
            {artifact.updatedAt}
          </span>
        )}
      </div>

      {/* Description */}
      {artifact.description && (
        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
          {artifact.description}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
        <span className="text-[11px] text-slate-500 truncate max-w-[150px]">
          {artifact.taskTitle ? `From: ${artifact.taskTitle.slice(0, 20)}...` : 'Generated deliverable'}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={handleDownload}
            className="p-1.5 rounded text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            title="Download artifact"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onPreview && onPreview(artifact)}
            className="p-1.5 rounded text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors flex items-center gap-1 text-[11px] font-medium"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        </div>
      </div>
    </article>
  );
};
