import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Send,
  Sparkles,
  Clock,
  Zap,
  Play,
  Pause,
  Square,
  FastForward,
  Layers,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Code2,
  Search,
  BarChart3,
  Cpu,
  Download,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AgentPlan } from '../components/agent/AgentPlan';
import { AgentStatus } from '../components/agent/AgentStatus';
import { AgentMessage } from '../components/agent/AgentMessage';
import { ApprovalCard } from '../components/agent/ApprovalCard';
import { ArtifactCard } from '../components/artifacts/ArtifactCard';
import { ArtifactPreview } from '../components/artifacts/ArtifactPreview';
import  from '../components/ui/';
import { Button } from '../components/ui/Button';
import { OrbitMark } from '../components/branding/OrbitMark';
import { getTask, toWorkspaceTask } from '../services/api';

export const AgentWorkspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    tasks,
    advanceTaskStep,
    pauseTask,
    resumeTask,
    cancelTask,
    approveTaskAction,
    rejectTaskAction,
    sendUserMessage
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [activeRightTab, setActiveRightTab] = useState('plan'); // 'plan' or 'artifacts'
  const [activeZone, setActiveZone] = useState('activity');
  const [previewArtifact, setPreviewArtifact] = useState(null);
  const [remoteTask, setRemoteTask] = useState(null);
  const [isLoadingTask, setIsLoadingTask] = useState(true);
  const [loadError, setLoadError] = useState('');
  const messagesEndRef = useRef(null);
  const messagesScrollRef = useRef(null);

  const localTask = tasks.find((item) => item.id === id);
  const task = localTask || remoteTask;

  useEffect(() => {
    if (localTask) {
      setRemoteTask(null);
      setIsLoadingTask(false);
      setLoadError('');
      return undefined;
    }

    let isCurrent = true;
    setIsLoadingTask(true);
    setLoadError('');
    getTask(id)
      .then((response) => {
        if (isCurrent) setRemoteTask(toWorkspaceTask(response));
      })
      .catch((error) => {
        if (isCurrent) setLoadError(error.message || 'Unable to load this task.');
      })
      .finally(() => {
        if (isCurrent) setIsLoadingTask(false);
      });

    return () => { isCurrent = false; };
  }, [id, localTask]);

  // Auto-scroll messages to bottom
  useEffect(() => {
    const messagePane = messagesScrollRef.current;
    if (messagePane) {
      messagePane.scrollTo({ top: messagePane.scrollHeight, behavior: 'smooth' });
    }
  }, [task?.messages]);

  if (!task) {
    return (
      <div className="p-12 text-center text-slate-400">
        {isLoadingTask ? 'Loading task...' : loadError || 'Task not found.'}{' '}
        <button onClick={() => navigate('/app')} className="text-cyan-400 underline">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendUserMessage(task.id, inputMessage);
    setInputMessage('');
  };

  const isCompleted = task.status === 'completed';
  const isRunning = task.status === 'running';

  return (
    <div className="agent-workspace flex flex-col gap-4 -mt-2 -mx-2 md:-mx-4 h-[calc(100vh-84px)] min-h-[640px]">
      {/* Top Breadcrumb & Task Header Bar */}
      <div className="px-4 py-2 border-b border-slate-800 bg-surface flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => navigate('/app/tasks')}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors shrink-0"
            title="Back to Tasks"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 shrink-0">
              {task.id}
            </span>
            <h2 className="text-sm font-semibold text-slate-200 truncate font-heading">
              {task.title}
            </h2>
          </div>
        </div>

        {/* Global Agent Status strip */}
        <div className="flex items-center gap-2 shrink-0">
          <AgentStatus
            task={task}
            onPause={task.isPlanOnly ? undefined : () => pauseTask(task.id)}
            onResume={task.isPlanOnly ? undefined : () => resumeTask(task.id)}
            onCancel={task.isPlanOnly ? undefined : () => cancelTask(task.id)}
            onNextStep={task.isPlanOnly ? undefined : () => advanceTaskStep(task.id)}
          />
        </div>
      </div>

      {/* Main 3-Panel Agent Workspace Layout */}
      <nav className="workspace-zone-tabs" aria-label="Workspace panels">
        {[
          { id: 'goal', label: 'Goal' },
          { id: 'activity', label: 'Activity' },
          { id: 'plan', label: 'Plan & outputs' },
        ].map((zone) => (
          <button key={zone.id} type="button" aria-pressed={activeZone === zone.id} onClick={() => setActiveZone(zone.id)}>
            {zone.label}
          </button>
        ))}
      </nav>

      <div className="workspace-zones flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 px-4 overflow-hidden">
        {/* ======================================================== */}
        {/* LEFT PANEL: Task Context & Telemetry (Col 3)            */}
        {/* ======================================================== */}
        <div
          className={`workspace-zone workspace-goal lg:col-span-3 flex-col rounded-2xl border border-slate-800 bg-surface overflow-hidden shadow-sm ${activeZone === 'goal' ? 'is-mobile-active' : ''}`}
          style={{ backgroundColor: 'var(--bg-surface)' }}
        >
          {/* Header */}
          <div className="p-3.5 px-4 border-b border-slate-800 bg-surface-subtle flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Mission goal
            </span>
              <span className="text-[10px] font-mono text-slate-500">{task.createdAt}</span>
          </div>

          <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-4 text-xs">
            {/* Title & Type */}
            <div>
              <span className="eyebrow">USER GOAL</span>
              <p className="text-xs font-semibold text-slate-200 mt-1 leading-relaxed">
                {task.title}
              </p>
            </div>

            {task.context && (
              <div className="workspace-context-block">
                <span className="eyebrow">ADDITIONAL CONTEXT</span>
                <p>{task.context}</p>
              </div>
            )}
            {task.attachments?.length > 0 && (
              <div className="workspace-context-block">
                <span className="eyebrow">REFERENCE FILES</span>
                {task.attachments.map((fileName) => <span key={fileName} className="workspace-file-chip">{fileName}</span>)}
              </div>
            )}

            {/* Project affiliation */}
            {task.projectName && (
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="eyebrow">ASSOCIATED PROJECT</span>
                <p className="text-xs font-medium text-cyan-300 mt-0.5">{task.projectName}</p>
              </div>
            )}

            {/* Execution Properties */}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-slate-400">
                <span>Task Classification</span>
                <span className="font-semibold text-slate-200 capitalize">{task.type}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Autonomy Level</span>
                <span className="font-semibold text-cyan-400">{task.autonomyLevel || 'Autonomous'}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Execution Mode</span>
                <span className="font-mono text-slate-300 text-[11px]">{task.executionPreference}</span>
              </div>
            </div>

            {/* Connected Resources */}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/80">
              <span className="text-[10px] font-mono text-slate-500 uppercase">{task.isPlanOnly ? 'Requested Resources' : 'Granted Resources'}</span>
              <div className="flex flex-wrap gap-1.5">
                {task.resources && task.resources.map((res, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                  >
                    ✓ {res}
                  </span>
                ))}
              </div>
            </div>

            {/* Execution Telemetry */}
            {!task.isPlanOnly && <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/80">
              <span className="eyebrow">RUN TELEMETRY</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-mono">Tokens Used</span>
                  <p className="text-xs font-mono font-semibold text-slate-200 mt-0.5">{task.tokensUsed || '0'}</p>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-mono">Run Time</span>
                  <p className="text-xs font-mono font-semibold text-slate-200 mt-0.5">{task.duration || '0s'}</p>
                </div>
              </div>
              {task.outputFormat && task.outputFormat !== 'Best fit' && (
                <div className="flex items-center justify-between text-slate-400">
                  <span>Preferred output</span>
                  <span className="font-semibold text-slate-200">{task.outputFormat}</span>
                </div>
              )}
            </div>}

            {/* Simulation Helper Note */}
            <div className="mt-auto workspace-context-note">
              <div className="font-semibold mb-1 flex items-center gap-1.5">
                <OrbitMark size="xs" animated={isRunning} />
                <span>{task.isPlanOnly ? 'Execution status' : 'Execution mode'}</span>
              </div>
              {task.isPlanOnly ? 'Execution has not started yet.' : task.executionPreference || 'Autonomous execution'}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CENTER PANEL: Live Agent Activity Stream (Col 6)        */}
        {/* ======================================================== */}
        <div
          className={`workspace-zone workspace-activity col-span-1 lg:col-span-6 flex flex-col rounded-2xl border border-slate-800 bg-surface overflow-hidden shadow-sm ${activeZone === 'activity' ? 'is-mobile-active' : ''}`}
          style={{ backgroundColor: 'var(--bg-surface)' }}
        >
          {/* Stream Header */}
          <div className="p-3.5 px-4 border-b border-slate-800 bg-surface-subtle flex items-center justify-between">
            <div className="flex items-center gap-2">
              <OrbitMark size="sm" animated={isRunning} status={isCompleted ? 'delivered' : undefined} />
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                {task.isPlanOnly ? 'ORBIT task status' : 'ORBIT execution activity'}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              {task.messages?.length || 0} events
            </span>
          </div>

          <div className="execution-current-step">
            <span className="eyebrow">{task.isPlanOnly ? 'PLAN GENERATED' : isCompleted ? 'DELIVERED' : task.pendingApproval ? 'NEEDS APPROVAL' : 'CURRENT STAGE'}</span>
            <strong>{task.isPlanOnly ? 'Execution has not started yet.' : task.currentStep || 'Preparing execution plan'}</strong>
            {!task.isPlanOnly && <span>{task.progress}% complete</span>}
          </div>

          {/* Conversation & Tool Calls Scroll Area */}
          <div ref={messagesScrollRef} className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {task.isPlanOnly ? (
              <div className="workspace-context-note" role="status">Plan generated. Execution has not started yet.</div>
            ) : task.messages && task.messages.map((msg) => (
              <AgentMessage key={msg.id} message={msg} />
            ))}

            {/* Pending Human-In-The-Loop Approval Card */}
            {task.pendingApproval && (
              <div className="my-2">
                <ApprovalCard
                  approval={task.pendingApproval}
                  onApprove={() => approveTaskAction(task.id)}
                  onReject={() => rejectTaskAction(task.id)}
                />
              </div>
            )}

            {/* Pulsing indicator when agent is currently executing */}
            {!task.isPlanOnly && isRunning && !task.pendingApproval && (
              <div className="execution-thinking text-xs text-cyan-300">
                <OrbitMark size="sm" animated status="executing" />
                <span className="font-mono">{task.currentStep || 'Observing tool output & planning next action...'}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt / Instruction Input Bar */}
          {task.isPlanOnly ? (
            <div className="p-3 border-t border-slate-800 bg-surface-subtle text-xs text-slate-400">Execution has not started yet.</div>
          ) : <div className="p-3 border-t border-slate-800 bg-surface-subtle">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Add context or redirect the work..."
                className="flex-1 px-4 py-2.5 bg-input text-xs text-slate-100 placeholder-slate-500 rounded-xl border border-slate-800 focus:border-cyan-400 transition-colors"
                style={{ backgroundColor: 'var(--bg-input)' }}
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={!inputMessage.trim()}
                icon={Send}
              >
                Send
              </Button>
            </form>
          </div>}
        </div>

        {/* ======================================================== */}
        {/* RIGHT PANEL: Execution Plan & Artifacts (Col 3)         */}
        {/* ======================================================== */}
        <div
          className={`workspace-zone workspace-plan lg:col-span-3 flex-col rounded-2xl border border-slate-800 bg-surface overflow-hidden shadow-sm ${activeZone === 'plan' ? 'is-mobile-active' : ''}`}
          style={{ backgroundColor: 'var(--bg-surface)' }}
        >
          {/* Tab Switcher Header */}
          <div className="flex items-center border-b border-slate-800 bg-surface-subtle">
            <button
              onClick={() => setActiveRightTab('plan')}
              className={`flex-1 py-3 px-4 text-xs font-semibold font-heading transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
                activeRightTab === 'plan'
                  ? 'border-cyan-400 text-cyan-300 bg-surface'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Execution Plan</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-400 font-mono">
                {task.plan?.length || 0}
              </span>
            </button>
            <button
              onClick={() => setActiveRightTab('artifacts')}
              className={`flex-1 py-3 px-4 text-xs font-semibold font-heading transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
                activeRightTab === 'artifacts'
                  ? 'border-cyan-400 text-cyan-300 bg-surface'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Artifacts</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-400 font-mono">
                {task.artifacts?.length || 0}
              </span>
            </button>
          </div>

          {/* Right Panel Body */}
          <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3">
            {activeRightTab === 'plan' ? (
              <>
                {task.isPlanOnly && (
                  <div className="workspace-context-note">
                    <strong>{task.planSource === 'ai' ? 'Plan generated by ORBIT AI' : 'Deterministic planning fallback used'}</strong>
                    {task.planSummary && <p>{task.planSummary}</p>}
                  </div>
                )}
                <AgentPlan
                  plan={task.plan}
                  isPlanOnly={task.isPlanOnly}
                  onStepClick={(step) => {
                    console.log('Selected step:', step);
                  }}
                />
              </>
            ) : (
              <div className="flex flex-col gap-3">
                {task.artifacts && task.artifacts.length > 0 ? (
                  task.artifacts.map((art) => (
                    <ArtifactCard
                      key={art.id}
                      artifact={art}
                      onPreview={(a) => setPreviewArtifact(a)}
                    />
                  ))
                ) : (
                    <div className="p-8 text-center text-xs text-slate-500 italic">
                    <FileText className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                    {task.isPlanOnly ? 'No artifacts. Execution has not started.' : 'Artifacts are being generated as execution milestones complete.'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Artifact Preview Modal */}
      <ArtifactPreview
        artifact={previewArtifact}
        isOpen={Boolean(previewArtifact)}
        onClose={() => setPreviewArtifact(null)}
      />
    </div>
  );
};
