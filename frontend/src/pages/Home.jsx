import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Search,
  Code2,
  BarChart3,
  FileText,
  Cpu,
  FolderKanban,
  Wrench
} from 'lucide-react';
import { useApp } from '../context/useApp';
import { TaskList } from '../components/tasks/TaskList';
import { Button } from '../components/ui/Button';
import { OrbitMark } from '../components/branding/OrbitMark';
import { ArtifactCard } from '../components/artifacts/ArtifactCard';
import { ArtifactPreview } from '../components/artifacts/ArtifactPreview';

export const Home = () => {
  const { user, tasks, projects, artifacts, tools, memories, createTask } = useApp();
  const navigate = useNavigate();
  const [taskPrompt, setTaskPrompt] = useState('');
  const [selectedType, setSelectedType] = useState('research');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewArtifact, setPreviewArtifact] = useState(null);
  const [submitError, setSubmitError] = useState('');

  // Time-aware greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const taskTypeShortcuts = [
    { id: 'research', label: 'Research', icon: Search, hint: 'Deep web analysis & synthesis' },
    { id: 'coding', label: 'Coding', icon: Code2, hint: 'Build, debug & test code' },
    { id: 'analysis', label: 'Analysis', icon: BarChart3, hint: 'Data modeling & telemetry' },
    { id: 'content', label: 'Create', icon: FileText, hint: 'Reports, roadmaps & docs' },
    { id: 'automation', label: 'Automation', icon: Cpu, hint: 'Scheduled workflows & bots' },
  ];

  const suggestedPrompts = [
    'Research the latest AI engineering skills and create a learning roadmap',
    'Build a high-throughput financial sentiment analysis pipeline with pgvector',
    'Analyze telemetry logs and detect latency anomalies from Friday afternoon',
    'Write complete developer documentation and an interactive SDK quickstart',
  ];

  const handleStartTask = async (e) => {
    e?.preventDefault();
    const promptToUse = taskPrompt.trim();
    if (!promptToUse || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const newTask = await createTask({
        title: promptToUse,
        type: selectedType,
        resources: ['Web', 'Files', 'GitHub'],
        executionPreference: 'Autonomous execution',
      });
      navigate(`/app/task/${newTask.id}`);
    } catch (error) {
      setSubmitError(error.message || 'Task creation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeTasks = tasks.filter((task) => ['running', 'needs_approval'].includes(task.status));
  const enabledTools = tools.filter((tool) => tool.status).length;

  return (
    <div className="mission-page">
      <header className="mission-header">
        <div>
          <div className="eyebrow"><OrbitMark size="xs" /> ORBIT / MISSION CONTROL</div>
          <h1>{getGreeting()}, {user.name}.</h1>
          <p>Set a goal. ORBIT will generate a plan for your review. Execution has not started yet.</p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => navigate('/app/task/new')}>
          Advanced task setup
        </Button>
      </header>

      <section className="mission-composer" aria-labelledby="mission-prompt-title">
        <div className="mission-composer__topline">
          <span className="eyebrow">01 / DEFINE YOUR MISSION</span>
          <span className="mission-autonomy"><span /> Plan generation</span>
        </div>
        <h2 id="mission-prompt-title">What do you want ORBIT to accomplish?</h2>
        <form onSubmit={handleStartTask}>
          <label className="sr-only" htmlFor="mission-prompt">Describe your goal</label>
          <textarea
            id="mission-prompt"
            rows={3}
            value={taskPrompt}
            onChange={(event) => setTaskPrompt(event.target.value)}
            placeholder="Research the best AI agent frameworks and create a comparison report."
            className="mission-input"
            required
          />
          <div className="mission-composer__actions">
            <div className="mission-types" role="group" aria-label="Task type">
              {taskTypeShortcuts.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={selectedType === id}
                  onClick={() => setSelectedType(id)}
                  className={selectedType === id ? 'mission-type is-selected' : 'mission-type'}
                >
                  <Icon aria-hidden="true" /> {label}
                </button>
              ))}
            </div>
            <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} iconRight={ArrowRight}>
              Generate plan
            </Button>
          </div>
        </form>
        {isSubmitting && <p className="task-draft-status" role="status">ORBIT is understanding your goal and creating a plan...</p>}
        {submitError && <p role="alert" className="task-submit-error">{submitError}</p>}
        <div className="mission-suggestions">
          <span>Try a goal</span>
          {suggestedPrompts.slice(0, 2).map((prompt) => (
            <button key={prompt} type="button" onClick={() => setTaskPrompt(prompt)}>{prompt}</button>
          ))}
        </div>
      </section>

      <section className="mission-signals" aria-label="Workspace status">
        <div><span>IN FLIGHT</span><strong>{activeTasks.length}</strong><small>active or waiting</small></div>
        <div><span>DELIVERED</span><strong>{tasks.filter((task) => task.status === 'completed').length}</strong><small>completed tasks</small></div>
        <div><span>CAPABILITIES</span><strong>{enabledTools}<small> / {tools.length}</small></strong><small>tools enabled</small></div>
        <div><span>CONTEXT</span><strong>{memories.length}</strong><small>saved memories</small></div>
      </section>

      <div className="mission-content-grid">
        <section className="mission-section">
          <div className="section-heading">
            <div><span className="eyebrow">EXECUTION HISTORY</span><h2>Recent tasks</h2></div>
            <button className="text-action" onClick={() => navigate('/app/tasks')}>All tasks <ArrowRight /></button>
          </div>
          {tasks.length ? <TaskList tasks={tasks.slice(0, 4)} /> : (
            <div className="mission-empty"><OrbitMark size="lg" /><p>Give ORBIT your first goal and watch it work.</p></div>
          )}
        </section>

        <aside className="mission-side-stack">
          <section className="mission-section">
            <div className="section-heading">
              <div><span className="eyebrow">OUTPUTS</span><h2>Recent artifacts</h2></div>
            </div>
            {artifacts.length ? (
              <div className="mission-artifacts">
                {artifacts.slice(0, 2).map((artifact) => (
                  <ArtifactCard key={artifact.id} artifact={artifact} onPreview={setPreviewArtifact} />
                ))}
              </div>
            ) : <p className="mission-note">Verified deliverables from completed work will appear here.</p>}
          </section>
          <section className="mission-status-row">
            <div className="mission-status-icon"><Activity /></div>
            <div><strong>ORBIT is ready</strong><p>{enabledTools} tools enabled · {projects.length} workspaces · {memories.length} memories available</p></div>
            <Wrench aria-hidden="true" />
          </section>
          {projects[0] && (
            <button className="mission-project-link" onClick={() => navigate(`/app/projects/${projects[0].id}`)}>
              <FolderKanban /><span><small>CONTINUE A PROJECT</small><strong>{projects[0].name}</strong></span><ArrowRight />
            </button>
          )}
        </aside>
      </div>
      <ArtifactPreview artifact={previewArtifact} isOpen={Boolean(previewArtifact)} onClose={() => setPreviewArtifact(null)} />
    </div>
  );
};
