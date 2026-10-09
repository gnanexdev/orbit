import { useNavigate } from 'react-router-dom';
import { FolderKanban, ArrowRight} from 'lucide-react';
import { Progress } from '../ui/Progress';
import  from '../ui/';

export const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/app/projects/${project.id}`)}
      className="group p-5 rounded-xl border border-slate-800 hover:border-slate-700 bg-surface hover:bg-surface-elevated transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between gap-4"
      style={{ backgroundColor: 'var(--bg-surface)' }}
    >
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <FolderKanban className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors font-heading">
              {project.name}
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">{project.category}</span>
          </div>
        </div>

        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
          {project.progress}%
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
        {project.description}
      </p>

      {/* Tags */}
      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800/80 text-slate-400 font-mono"
            >
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* Progress & Task Counts */}
      <div className="flex flex-col gap-2 pt-3 border-t border-slate-800/60">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>{project.completedTasks} of {project.taskCount} tasks completed</span>
          <span className="text-slate-500 text-[11px]">{project.lastActivity}</span>
        </div>

        <Progress
          value={project.progress}
          variant={project.progress === 100 ? 'emerald' : 'cyan'}
          size="sm"
        />

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-slate-500">
            {project.artifactsCount || 0} artifacts produced
          </span>
          <span className="text-xs text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-semibold">
            Open Project <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
