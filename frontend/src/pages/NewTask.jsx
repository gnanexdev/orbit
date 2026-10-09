import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Code2,
  Cpu,
  FileText,
  FolderOpen,
  GitBranch,
  Globe,
  Layers,
  Search,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Toggle } from '../components/ui/Toggle';
import { OrbitMark } from '../components/branding/OrbitMark';

export const NewTask = () => {
  const { createTask } = useApp();
  const navigate = useNavigate();
  const [draft] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('orbit-task-draft') || 'null');
    } catch {
      return null;
    }
  });
  const [prompt, setPrompt] = useState(draft?.prompt || '');
  const [contextNote, setContextNote] = useState(draft?.contextNote || '');
  const [outputFormat, setOutputFormat] = useState(draft?.outputFormat || 'Best fit');
  const [attachments, setAttachments] = useState(draft?.attachments || []);
  const [taskType, setTaskType] = useState(draft?.taskType || 'research');
  const [resources, setResources] = useState(draft?.resources || { web: true, files: true, github: true, connectedApps: false });
  const [executionPreference, setExecutionPreference] = useState(draft?.executionPreference || 'autonomous');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const taskTypes = [
    { id: 'research', label: 'Research', icon: Search, desc: 'Investigate a topic and produce a sourced report' },
    { id: 'coding', label: 'Coding', icon: Code2, desc: 'Build, test, or debug a software project' },
    { id: 'analysis', label: 'Analysis', icon: BarChart3, desc: 'Find patterns and explain what the data means' },
    { id: 'content', label: 'Create', icon: FileText, desc: 'Prepare a document, roadmap, or brief' },
    { id: 'automation', label: 'Automation', icon: Cpu, desc: 'Coordinate repeatable actions and workflows' },
    { id: 'other', label: 'Other', icon: Layers, desc: 'Plan and complete a multi-step objective' },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const finalPrompt = prompt.trim();
    if (!finalPrompt || isSubmitting) return;

    const activeResources = [];
    if (resources.web) activeResources.push('Web');
    if (resources.files) activeResources.push('Files');
    if (resources.github) activeResources.push('GitHub');
    if (resources.connectedApps) activeResources.push('Connected Apps');

    setIsSubmitting(true);
    setSubmitError('');
    try {
      const newTask = await createTask({
        title: finalPrompt,
        type: taskType,
        resources: activeResources,
        executionPreference: executionPreference === 'autonomous' ? 'Autonomous execution' : 'Ask before important actions',
        context: contextNote.trim(),
        outputFormat,
        attachments,
      });
      localStorage.removeItem('orbit-task-draft');
      navigate(`/app/task/${newTask.id}`);
    } catch (error) {
      setSubmitError(error.message || 'Task creation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem('orbit-task-draft', JSON.stringify({ prompt, contextNote, outputFormat, attachments, taskType, resources, executionPreference }));
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2200);
  };

  return (
    <div className="task-composer-page">
      <button className="back-link" onClick={() => navigate('/app')}>
        <ArrowLeft aria-hidden="true" /> Back to overview
      </button>

      <header className="task-composer-header">
        <span className="eyebrow"><OrbitMark size="xs" /> MISSION SETUP</span>
        <h1>Create a new task</h1>
        <p>Describe the outcome. ORBIT will generate an initial plan for your review.</p>
      </header>

      <form className="task-composer-form" onSubmit={handleSubmit}>
        {submitError && <p className="task-submit-error" role="alert">{submitError}</p>}
        {isSubmitting && <p className="task-draft-status" role="status">ORBIT is understanding your goal and creating a plan...</p>}
        <section className="task-goal-field">
          <label htmlFor="task-goal">What do you want ORBIT to accomplish?</label>
          <textarea
            id="task-goal"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Research the best AI agent frameworks and create a comparison report."
            rows={5}
            required
          />
          <div className="task-examples">
            <span>EXAMPLE GOALS</span>
            <button type="button" onClick={() => setPrompt('Research current AI engineering skills and create a learning roadmap')}>Build a learning roadmap</button>
            <button type="button" onClick={() => setPrompt('Analyze this quarter\'s support trends and recommend three product improvements')}>Analyze support trends</button>
          </div>
        </section>

        <details className="task-options">
          <summary>Execution options <span>Optional context, tools, and autonomy</span></summary>
          <div className="task-options__body">
            <div className="task-extra-fields">
              <label>
                <span>Additional context</span>
                <textarea value={contextNote} onChange={(event) => setContextNote(event.target.value)} rows={3} placeholder="Audience, constraints, or background ORBIT should know" />
              </label>
              <label className="task-file-field" htmlFor="task-files">
                <span>Reference files</span>
                <input id="task-files" type="file" multiple onChange={(event) => setAttachments(Array.from(event.target.files || []).map((file) => file.name))} />
                {attachments.length > 0 && <small>{attachments.join(', ')}</small>}
              </label>
              <label>
                <span>Preferred output</span>
                <select value={outputFormat} onChange={(event) => setOutputFormat(event.target.value)}>
                  <option>Best fit</option><option>Report</option><option>Code</option><option>Spreadsheet</option><option>Presentation</option>
                </select>
              </label>
            </div>

            <fieldset className="task-choice-group">
              <legend>Task type</legend>
              <div className="task-type-grid">
                {taskTypes.map(({ id, label, icon: Icon, desc }) => (
                  <button key={id} type="button" aria-pressed={taskType === id} onClick={() => setTaskType(id)} className={taskType === id ? 'task-type is-selected' : 'task-type'}>
                    <span><Icon aria-hidden="true" />{label}</span><small>{desc}</small>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="task-choice-group">
              <legend>Capabilities ORBIT can use</legend>
              <div className="task-resource-list">
                {[
                  { key: 'web', icon: Globe, title: 'Web research', detail: 'Search and source current information' },
                  { key: 'files', icon: FolderOpen, title: 'Files and datasets', detail: 'Use attached or workspace material' },
                  { key: 'github', icon: GitBranch, title: 'Code repositories', detail: 'Inspect and propose changes' },
                  { key: 'connectedApps', icon: Layers, title: 'Connected apps', detail: 'Use linked workspaces and services' },
                ].map(({ key, icon: Icon, title, detail }) => (
                  <label key={key} className="task-resource">
                    <Icon aria-hidden="true" /><span><strong>{title}</strong><small>{detail}</small></span>
                    <Toggle checked={resources[key]} onChange={() => setResources((previous) => ({ ...previous, [key]: !previous[key] }))} />
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="task-choice-group">
              <legend>Autonomy</legend>
              <div className="task-autonomy-grid">
                <button type="button" aria-pressed={executionPreference === 'autonomous'} onClick={() => setExecutionPreference('autonomous')} className={executionPreference === 'autonomous' ? 'task-autonomy is-selected' : 'task-autonomy'}>
                  <Zap aria-hidden="true" /><span><strong>Run autonomously</strong><small>ORBIT executes the plan and returns the result.</small></span>
                </button>
                <button type="button" aria-pressed={executionPreference === 'ask_before'} onClick={() => setExecutionPreference('ask_before')} className={executionPreference === 'ask_before' ? 'task-autonomy is-selected' : 'task-autonomy'}>
                  <ShieldCheck aria-hidden="true" /><span><strong>Ask before sensitive actions</strong><small>Pause for approval before consequential changes.</small></span>
                </button>
              </div>
            </fieldset>
          </div>
        </details>

        <footer className="task-submit-row">
          <span className="task-draft-status" role="status">{draftSaved ? 'Draft saved on this device' : ''}</span>
          <Button type="button" variant="secondary" onClick={handleSaveDraft}>Save as draft</Button>
          <Button type="button" variant="ghost" onClick={() => navigate('/app')}>Cancel</Button>
          <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} iconRight={ArrowRight}>Generate plan</Button>
        </footer>
      </form>
    </div>
  );
};
