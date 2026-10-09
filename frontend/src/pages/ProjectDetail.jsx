import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FolderKanban,
  Plus
} from 'lucide-react';
import { useApp } from '../context/useApp';
import { Progress } from '../components/ui/Progress';
import { Button } from '../components/ui/Button';
import { TaskList } from '../components/tasks/TaskList';
import { ProjectTimeline } from '../components/projects/ProjectTimeline';
import { ArtifactCard } from '../components/artifacts/ArtifactCard';
import { ArtifactPreview } from '../components/artifacts/ArtifactPreview';

export const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, tasks, artifacts } = useApp();

  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks', 'artifacts', 'timeline'
  const [previewArtifact, setPreviewArtifact] = useState(null);

  const project = projects.find((p) => p.id === id) || projects[0];

  // Tasks associated with this project or fallback to related tasks
  const projectTasks = tasks.filter(t => t.projectId === project.id || t.projectName === project.name);
  const projectArtifacts = artifacts.filter(a => projectTasks.some(t => t.id === a.taskId));

  const completedTasks = projectTasks.filter(t => t.status === 'completed');
  const activeTasks = projectTasks.filter(t => t.status === 'running' || t.status === 'needs_approval');
  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Top back button */}
      <div>
        <button
          onClick={() => navigate('/app/projects')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </button>
      </div>

      {/* Project Banner Card */}
      <div
        className="p-6 md:p-8 rounded-2xl border border-slate-800 bg-surface relative overflow-hidden shadow-lg"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
              <FolderKanban className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                  {project.category}
                </span>
                <span className="text-xs text-slate-500">&bull; Updated {project.lastActivity}</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-100 font-heading">
                {project.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="primary"
              icon={Plus}
              onClick={() => navigate('/app/task/new')}
            >
              Add Task to Project
            </Button>
          </div>
        </div>

        {/* Progress & Milestone Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-500">Overall Progress</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-xl font-bold text-slate-100 font-mono">{project.progress}%</span>
            </div>
            <Progress value={project.progress} size="sm" className="mt-2" />
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-slate-500">Completed Tasks</span>
            <p className="text-xl font-bold text-emerald-400 font-mono mt-0.5">
              {project.completedTasks} <span className="text-xs text-slate-500 font-normal">/ {project.taskCount}</span>
            </p>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-slate-500">Active Tasks</span>
            <p className="text-xl font-bold text-cyan-400 font-mono mt-0.5">
              {project.activeTasks || 2}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-slate-500">Artifacts Produced</span>
            <p className="text-xl font-bold text-purple-400 font-mono mt-0.5">
              {project.artifactsCount || 6}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('tasks')}
          className={`px-4 py-2.5 text-xs font-semibold font-heading border-b-2 transition-colors ${
            activeTab === 'tasks'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Project Tasks ({projectTasks.length})
        </button>
        <button
          onClick={() => setActiveTab('artifacts')}
          className={`px-4 py-2.5 text-xs font-semibold font-heading border-b-2 transition-colors ${
            activeTab === 'artifacts'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Deliverable Artifacts ({projectArtifacts.length})
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-2.5 text-xs font-semibold font-heading border-b-2 transition-colors ${
            activeTab === 'timeline'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Milestone Timeline
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'tasks' && (
        <div className="flex flex-col gap-6">
          {/* Active Tasks */}
          {activeTasks.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono font-semibold uppercase text-cyan-400 tracking-wider">
                Active & Running Tasks ({activeTasks.length})
              </span>
              <TaskList tasks={activeTasks} />
            </div>
          )}

          {/* Completed Tasks */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono font-semibold uppercase text-emerald-400 tracking-wider">
              Completed Tasks ({completedTasks.length})
            </span>
            <TaskList tasks={completedTasks.length > 0 ? completedTasks : projectTasks} />
          </div>
        </div>
      )}

      {activeTab === 'artifacts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectArtifacts.length > 0 ? (
            projectArtifacts.map((art) => (
              <ArtifactCard
                key={art.id}
                artifact={art}
                onPreview={(a) => setPreviewArtifact(a)}
              />
            ))
          ) : (
            <div className="col-span-3 p-12 text-center text-xs text-slate-500 italic">
              Artifacts will accumulate here as tasks complete.
            </div>
          )}
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="p-6 rounded-2xl border border-slate-800 bg-surface">
          <ProjectTimeline milestones={project.milestones} />
        </div>
      )}

      {/* Artifact Preview Modal */}
      <ArtifactPreview
        artifact={previewArtifact}
        isOpen={Boolean(previewArtifact)}
        onClose={() => setPreviewArtifact(null)}
      />
    </div>
  );
};
