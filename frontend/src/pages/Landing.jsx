import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Search,
  Code2,
  BarChart3,
  FileText,
  Cpu,
  Layers,
  CheckCircle2,
  Shield,
  Terminal,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { OrbitLogo } from '../components/branding/OrbitLogo';
import { OrbitMark } from '../components/branding/OrbitMark';

export const Landing = () => {
  const navigate = useNavigate();

  const workflowSteps = [
    {
      step: '01',
      title: 'Goal',
      desc: 'Give ORBIT a high-level objective in natural language instead of micro-managing prompts.',
      icon: Sparkles,
      preview: 'Research the current AI engineering skills and build a comprehensive 12-week learning roadmap.',
    },
    {
      step: '02',
      title: 'Plan',
      desc: 'ORBIT decomposes constraints, evaluates dependencies, and generates a verifiable multi-step trajectory.',
      icon: Terminal,
      preview: 'Step 1: Scrape 2026 tech job postings -> Step 2: Extract top frameworks -> Step 3: Compile milestone schedule.',
    },
    {
      step: '03',
      title: 'Execute',
      desc: 'Autonomous tool orchestration: web search, sandboxed code execution, APIs, and file analysis.',
      icon: Cpu,
      preview: '[Tool: Web Search] Found 16 verified sources.\n[Tool: Code Sandbox] Executing data clustering in Python 3.12.',
    },
    {
      step: '04',
      title: 'Verify',
      desc: 'Agent self-reflection evaluates output against source facts and tests code assertions before delivery.',
      icon: Shield,
      preview: 'Self-reflection: 100% of framework requirements validated. Zero hallucinated dependencies detected.',
    },
    {
      step: '05',
      title: 'Deliver',
      desc: 'Produces production-ready artifacts: Markdown reports, CSV datasets, runnable code repos, and decks.',
      icon: CheckCircle2,
      preview: 'Artifact ready: AI_Engineering_Roadmap_2026.md (18.4 KB), Skills_Demand_Matrix.csv (42.1 KB)',
    }
  ];

  const features = [
    {
      icon: Search,
      title: 'AI Research',
      desc: 'Performs deep web research, synthesizes hundreds of academic and market sources, and cites exact references.',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
    },
    {
      icon: Code2,
      title: 'Coding & Sandboxing',
      desc: 'Writes production code, executes tests in isolated microVMs, debugs compile errors, and creates PRs.',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
    },
    {
      icon: BarChart3,
      title: 'Data Analysis',
      desc: 'Ingests massive datasets, extracts statistical distributions, identifies telemetry anomalies, and generates charts.',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
    },
    {
      icon: FileText,
      title: 'Content & Docs Creation',
      desc: 'Drafts technical specs, developer documentation, executive briefs, and interactive curriculum roadmaps.',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: Cpu,
      title: 'Autonomous Automation',
      desc: 'Schedules recurring cron tasks, monitors competitor changelogs, triggers webhooks, and posts team digests.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Layers,
      title: 'File & Repo Analysis',
      desc: 'Analyzes PDFs, multi-gigabyte CSVs, and full GitHub codebases with semantic context indexing.',
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
    },
  ];

  return (
    <div className="min-h-screen bg-canvas text-primary flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Navbar */}
      <header className="h-20 px-6 md:px-12 flex items-center justify-between border-b border-slate-800/80 sticky top-0 z-40 backdrop-blur-lg bg-canvas/80">
        <div className="flex items-center gap-3">
          <OrbitLogo size="md" showTagline={true} />
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#how-it-works" className="hover:text-cyan-300 transition-colors">How It Works</a>
          <a href="#features" className="hover:text-cyan-300 transition-colors">Capabilities</a>
          <a href="#agent-workspace" className="hover:text-cyan-300 transition-colors">Agent Workspace</a>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/app')}
            iconRight={ArrowRight}
          >
            Enter App
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 md:px-12 max-w-6xl mx-auto text-center flex flex-col items-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-medium mb-6 animate-fade-in shadow-sm">
          <OrbitMark size={14} animated={true} />
          <span>ORBIT — Autonomous Intelligence & Execution Platform</span>
        </div>

        {/* Hero Headlines */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-100 tracking-tight font-heading max-w-4xl leading-[1.1] mb-6">
          GIVE IT A GOAL. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
            LET IT EXECUTE.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed mb-8">
          ORBIT is an autonomous AI execution platform. It plans, researches, executes, verifies, and delivers production-ready results.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/register')}
            iconRight={ArrowRight}
          >
            Start with ORBIT
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              const el = document.getElementById('how-it-works');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            See how it works
          </Button>
        </div>

        {/* Interactive Workspace Preview Mockup */}
        <div
          id="agent-workspace"
          className="w-full rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden text-left relative glass-panel"
          style={{
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px -10px rgba(56, 189, 248, 0.15)',
          }}
        >
          {/* Mock Window Titlebar */}
          <div className="p-3 px-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2 font-medium">orbit-core-v2.0 // autonomous_trajectory</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-800/40">
              <OrbitMark size={12} animated={true} />
              <span>Status: Active Orbit</span>
            </div>
          </div>

          {/* 3-Panel Mini Simulation Preview */}
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px] bg-slate-950">
            {/* Left Column: Goal Context */}
            <div className="md:col-span-3 p-4 border-r border-slate-800/80 flex flex-col justify-between gap-4 bg-surface-subtle">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">Active Goal</span>
                <h4 className="text-xs font-semibold text-slate-200 mt-1 font-heading">
                  AI Engineering 2026 Skills & Roadmap
                </h4>
                <div className="mt-3 flex flex-col gap-1.5 text-[11px] text-slate-400 font-mono">
                  <span>Type: Research & Synthesis</span>
                  <span>Autonomy: Autonomous</span>
                  <span>Tools: Web, Code Sandbox, Files</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                <span className="text-cyan-400 font-semibold">Live Progress: 68%</span>
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full w-[68%]" />
                </div>
              </div>
            </div>

            {/* Center Column: Live Agent Activity Stream */}
            <div className="md:col-span-6 p-4 flex flex-col gap-3 overflow-hidden bg-slate-950">
              <div className="p-3 rounded-lg bg-surface-elevated border border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-1">
                  <OrbitMark size={16} animated={true} />
                  <span>ORBIT Agent</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  I analyzed 16 verified industry sources. Top enterprise demands: Compound Agent Architectures, DSPy evals, and vLLM continuous batching.
                </p>
              </div>

              {/* Tool Execution Card */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="flex items-center gap-1.5 font-semibold text-amber-300 text-[11px]">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Sandboxed Code Execution (Python 3.12)</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">Passed</span>
                </div>
                <pre className="p-2 rounded bg-slate-950 font-mono text-[10px] text-slate-400 overflow-x-auto">
                  <code>{`curriculum = build_roadmap(pillars, duration_weeks=12)\nprint("Roadmap validated successfully.")`}</code>
                </pre>
              </div>

              <div className="mt-auto p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>[ Direct ORBIT or assign sub-goal... ]</span>
                <span className="text-cyan-400 font-mono text-[11px]">Auto-running &rarr;</span>
              </div>
            </div>

            {/* Right Column: Dynamic Plan */}
            <div className="md:col-span-3 p-4 border-l border-slate-800/80 bg-surface-subtle flex flex-col gap-2.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">Execution Plan</span>
              <div className="flex flex-col gap-2 text-[11px]">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Understand objective</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Formulate execution plan</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Search web sources</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-300 font-semibold bg-cyan-950/40 p-1.5 rounded-lg border border-cyan-800/30">
                  <OrbitMark size={14} animated={true} />
                  <span className="truncate">Analyze & synthesise</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-slate-700 shrink-0" />
                  <span className="truncate">Verify curriculum</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-slate-700 shrink-0" />
                  <span className="truncate">Deliver final artifacts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 md:px-12 max-w-6xl mx-auto w-full border-t border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">Execution Trajectory</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 font-heading mt-2 mb-4">
            Goal &rarr; Plan &rarr; Execute &rarr; Verify &rarr; Deliver
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Unlike traditional chatbots that simply spit out text responses, ORBIT treats your prompt as an autonomous execution mission.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {workflowSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="p-5 rounded-xl border border-slate-800 hover:border-slate-700 bg-surface hover:bg-surface-elevated transition-all flex flex-col justify-between gap-4 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                      {step.step}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-200 group-hover:text-slate-100 font-heading mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 font-mono text-[10px] text-slate-400 line-clamp-3">
                  {step.preview}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="orbit-purpose-section" aria-labelledby="orbit-purpose-title">
        <div className="orbit-purpose-heading">
          <span className="eyebrow">BUILT FOR MULTI-STEP WORK</span>
          <h2 id="orbit-purpose-title">An answer is a start. A finished result is the point.</h2>
          <p>ORBIT turns an objective into a managed run: it understands the outcome, maps the steps, selects capabilities, checks its work, and returns something useful.</p>
        </div>
        <div className="orbit-purpose-flow">
          <div className="orbit-purpose-compare is-muted"><span>TRADITIONAL AI</span><strong>Ask <i>→</i> Answer</strong><small>A response to your prompt</small></div>
          <div className="orbit-purpose-compare is-orbit"><span>ORBIT EXECUTION</span><strong>Goal <i>→</i> Plan <i>→</i> Act <i>→</i> Verify <i>→</i> Deliver</strong><small>Progress you can follow. Work you can use.</small></div>
        </div>
      </section>

      {/* Feature Capabilities Section */}
      <section id="features" className="py-20 px-6 md:px-12 max-w-6xl mx-auto w-full border-t border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">Specialized Capabilities</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 font-heading mt-2 mb-4">
            Engineered for Autonomous Intelligence
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Equipped with sandboxed tools, deep retrieval engines, code compilers, and deterministic safety checks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-800 hover:border-slate-700 bg-surface hover:bg-surface-elevated transition-all flex flex-col gap-3 group"
              >
                <div className={`w-10 h-10 rounded-xl ${feat.bgColor} border border-slate-700/60 flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${feat.color}`} />
                </div>
                <h3 className="text-base font-semibold text-slate-100 font-heading group-hover:text-cyan-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="orbit-learn-section" aria-labelledby="orbit-learn-title">
        <div>
          <span className="eyebrow">A SHORT READING LIST</span>
          <h2 id="orbit-learn-title">Learn about AI agents</h2>
          <p>Clear introductions to agent workflows, tool use, and the design choices behind reliable systems.</p>
        </div>
        <div className="orbit-learn-links">
          <a href="https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf" target="_blank" rel="noreferrer">OpenAI <span>A practical guide to building agents</span><ArrowRight aria-hidden="true" /></a>
          <a href="https://platform.openai.com/docs/guides/agents" target="_blank" rel="noreferrer">OpenAI Developers <span>Agents guide</span><ArrowRight aria-hidden="true" /></a>
          <a href="https://www.anthropic.com/engineering/building-effective-agents" target="_blank" rel="noreferrer">Anthropic <span>Building effective agents</span><ArrowRight aria-hidden="true" /></a>
          <a href="https://manus.im/docs/introduction/what-is-manus" target="_blank" rel="noreferrer">Manus <span>Agent documentation</span><ArrowRight aria-hidden="true" /></a>
        </div>
      </section>

      {/* Trust & Final CTA Banner */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto w-full text-center">
        <div
          className="p-10 md:p-14 rounded-3xl border border-cyan-500/30 relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl"
          style={{ boxShadow: '0 0 60px -10px rgba(56, 189, 248, 0.15)' }}
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[100px] pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 font-heading mb-4">
            Experience the Agentic Future with ORBIT.
          </h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed">
            Stop pasting prompts back and forth. Give ORBIT a goal and let it execute.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/app')}
            iconRight={ArrowRight}
          >
            Launch ORBIT Workspace
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 py-10 px-6 md:px-12 bg-slate-950 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <OrbitLogo size="sm" showTagline={false} />
            <span className="text-slate-600">&bull;</span>
            <span>Autonomous Intelligence & Execution Platform</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Documentation</span>
            <span className="hover:text-slate-300 cursor-pointer">Security Whitepaper</span>
            <span className="hover:text-slate-300 cursor-pointer">System Status</span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
          </div>

          <div>
            &copy; 2026 ORBIT. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
