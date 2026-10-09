// ORBIT AI — Mock Data Store

export const currentUser = {
  id: 'usr_orbit_01',
  name: 'Dhanaraju',
  email: 'dhanaraju@orbit.ai',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'Staff AI Systems Architect',
  plan: 'Pro Autonomous',
  tier: 'Enterprise Suite',
  memberSince: 'January 2026',
  credits: 8450,
  stats: {
    tasksCount: 148,
    tokensUsed: '18.4M',
    autonomousHours: 64.2,
    activeWorkspaces: 5,
  },
  connectedApps: [
    { id: 'github', name: 'GitHub', account: 'dhanaraju-dev', connected: true, lastSync: '10m ago' },
    { id: 'gdrive', name: 'Google Drive', account: 'dhanaraju@orbit.ai', connected: true, lastSync: '1h ago' },
    { id: 'slack', name: 'Slack Workspace', account: 'ORBIT Team', connected: false, lastSync: 'Never' },
    { id: 'notion', name: 'Notion Workspace', account: 'Personal Knowledge', connected: true, lastSync: '3h ago' },
  ]
};

export const taskCategories = [
  { id: 'research', label: 'Research', icon: 'Search', desc: 'Deep market, scientific, or web investigations' },
  { id: 'coding', label: 'Coding', icon: 'Code2', desc: 'Software engineering, scripts, and debugging' },
  { id: 'analysis', label: 'Analysis', icon: 'BarChart3', desc: 'Data modeling, telemetry, and metrics synthesis' },
  { id: 'content', label: 'Create', icon: 'FileText', desc: 'Documentation, reports, roadmaps, and briefs' },
  { id: 'automation', label: 'Automation', icon: 'Cpu', desc: 'Scheduled workflows, scrapers, and pipelines' },
];

export const mockTasks = [
  {
    id: 'task-1',
    title: 'Research the current AI engineering skills and create a learning roadmap',
    type: 'research',
    status: 'running',
    progress: 68,
    currentStep: 'Synthesizing market demands & validating curriculum against 2026 industry standards',
    createdAt: '12 minutes ago',
    updatedAt: 'Just now',
    projectId: 'proj-1',
    projectName: 'AI Career & Mastery',
    resources: ['Web', 'Files', 'GitHub'],
    executionPreference: 'Autonomous execution',
    autonomyLevel: 'Autonomous',
    stepsCount: 6,
    tokensUsed: '42,890',
    duration: '3m 14s',
    plan: [
      { id: 'p1', title: 'Understand objective and decompose learning prerequisites', status: 'completed', duration: '12s' },
      { id: 'p2', title: 'Query latest 2026 AI engineering job specs and tech stacks', status: 'completed', duration: '45s' },
      { id: 'p3', title: 'Extract top tools: Agentic frameworks, LangGraph, vLLM, DSPy, Evals', status: 'completed', duration: '38s' },
      { id: 'p4', title: 'Structure 12-week comprehensive project-based learning roadmap', status: 'active', duration: 'Running...' },
      { id: 'p5', title: 'Synthesize recommended open-source code repos & benchmarks', status: 'pending', duration: '-' },
      { id: 'p6', title: 'Verify curriculum completeness and export deliverable artifacts', status: 'pending', duration: '-' },
    ],
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'Research the current AI engineering skills and create a learning roadmap. Focus on production agentic systems, evals, and multi-model routing.',
        timestamp: '12m ago',
      },
      {
        id: 'msg-2',
        sender: 'agent',
        statusText: 'Objective parsed',
        text: "I've analyzed your goal. I will decompose this into an industry-calibrated 12-week roadmap. I am activating the Web Search tool to crawl 2026 job listings from Anthropic, OpenAI, DeepMind, and top AI scale-ups.",
        timestamp: '11m ago',
      },
      {
        id: 'msg-3',
        sender: 'tool',
        toolType: 'search',
        toolName: 'Web Search',
        query: 'AI Engineer skills requirements 2026 agentic workflows evals',
        resultsCount: 16,
        sources: [
          { title: 'The 2026 AI Engineer Stack Report', url: 'https://latent.space/p/ai-engineer-2026', snippet: 'Shift from prompt engineering to compound AI systems, DSPy, and custom evals.' },
          { title: 'Anthropic Systems Engineering Guide', url: 'https://docs.anthropic.com/en/build/systems', snippet: 'Context windows, tool calling patterns, deterministic fallbacks, and memory persistence.' },
          { title: 'State of LLM Evaluation Frameworks', url: 'https://github.com/evals/benchmarks', snippet: 'Synthesizing benchmark harness and human-in-the-loop validation metrics.' }
        ],
        status: 'completed',
        timestamp: '9m ago',
      },
      {
        id: 'msg-4',
        sender: 'agent',
        text: "From 16 verified industry sources, I extracted 4 foundational pillars: (1) Compound Agent Architectures, (2) Deterministic Tool Calling & Sandboxing, (3) Synthetic Data & Continuous Evals, and (4) High-Throughput Inference (vLLM, TensorRT-LLM). Now compiling the 12-week milestone breakdown.",
        timestamp: '6m ago',
      },
      {
        id: 'msg-5',
        sender: 'tool',
        toolType: 'code',
        toolName: 'Code Execution',
        language: 'python',
        code: `def generate_curriculum_weights(pillars):\n    return {p: f"{w}% weightage" for p, w in pillars.items()}\n\npillars = {"Agent Loops": 35, "Evals & Guards": 25, "Inference Optimization": 20, "Vector & Memory": 20}\nprint(generate_curriculum_weights(pillars))`,
        stdout: `{'Agent Loops': '35% weightage', 'Evals & Guards': '25% weightage', 'Inference Optimization': '20% weightage', 'Vector & Memory': '20% weightage'}`,
        status: 'completed',
        timestamp: '3m ago',
      },
      {
        id: 'msg-6',
        sender: 'agent',
        statusText: 'Generating roadmap artifacts...',
        text: "Drafting the curriculum modules and generating interactive milestone deliverables. The final roadmap markdown and skills matrix spreadsheet are being assembled.",
        timestamp: 'Just now',
      }
    ],
    artifacts: [
      {
        id: 'art-1',
        title: 'AI Engineering 2026 Roadmap & Curriculum.md',
        type: 'document',
        size: '18.4 KB',
        updatedAt: '2m ago',
        description: 'Complete 12-week structured roadmap with weekly objectives, suggested repositories, and production capstone projects.',
      },
      {
        id: 'art-2',
        title: 'Industry Skills Demand Matrix.csv',
        type: 'spreadsheet',
        size: '42.1 KB',
        updatedAt: 'Just now',
        description: 'Structured database of 240 analyzed job specs categorizing tools by frequency, salary tier, and maturity.',
      },
      {
        id: 'art-3',
        title: 'Production Capstone Architecture.py',
        type: 'code',
        size: '6.8 KB',
        updatedAt: 'Just now',
        description: 'Skeleton evaluation harness and multi-agent supervisory routing script.',
      }
    ]
  },
  {
    id: 'task-2',
    title: 'Deploy High-Throughput Financial Sentiment Analysis Pipeline',
    type: 'coding',
    status: 'needs_approval',
    progress: 54,
    currentStep: 'Awaiting human authorization to run automated database migration',
    createdAt: '45 minutes ago',
    updatedAt: '5m ago',
    projectId: 'proj-2',
    projectName: 'Portfolio & Agent Showcase',
    resources: ['Web', 'GitHub', 'Connected Apps'],
    executionPreference: 'Ask before important actions',
    autonomyLevel: 'Semi-Autonomous',
    stepsCount: 5,
    tokensUsed: '61,420',
    duration: '8m 20s',
    pendingApproval: {
      id: 'appr-01',
      title: 'ORBIT needs your approval',
      action: 'Execute Production Database Schema Migration',
      riskLevel: 'high',
      details: {
        target: 'AWS RDS Postgres Production (cluster-us-east-1)',
        statement: 'ALTER TABLE market_sentiment_stream ADD COLUMN vector_embedding vector(1536), ADD COLUMN model_confidence_pct NUMERIC(5,2);',
        estimatedLockTime: '< 350ms',
        impact: 'Affects 2.4M rows. Table partition index will be refreshed concurrently.'
      }
    },
    plan: [
      { id: 'p2-1', title: 'Inspect existing sentiment microservice repo and dependency graph', status: 'completed', duration: '20s' },
      { id: 'p2-2', title: 'Generate optimized streaming tokenizer with batch fallback', status: 'completed', duration: '1m 15s' },
      { id: 'p2-3', title: 'Prepare PostgreSQL vector migration script', status: 'completed', duration: '35s' },
      { id: 'p2-4', title: 'Execute DB migration and verify zero-downtime replication', status: 'active', duration: 'Awaiting Approval' },
      { id: 'p2-5', title: 'Run stress-test harness across 10,000 synthetic filings', status: 'pending', duration: '-' },
    ],
    messages: [
      {
        id: 'm2-1',
        sender: 'user',
        text: 'Refactor the financial sentiment pipeline to support pgvector similarity search and live market streaming.',
        timestamp: '45m ago',
      },
      {
        id: 'm2-2',
        sender: 'agent',
        text: 'I have prepared the schema migration script and tested it against a local SQLite replica. Before touching the production RDS instance, I require your explicit authorization.',
        timestamp: '5m ago',
      }
    ],
    artifacts: [
      {
        id: 'art-201',
        title: '004_add_vector_embeddings.sql',
        type: 'code',
        size: '2.1 KB',
        updatedAt: '15m ago',
        description: 'Safe concurrent database migration script with rollback triggers.',
      }
    ]
  },
  {
    id: 'task-3',
    title: 'Dataset Analysis & Telemetry Anomaly Detection',
    type: 'analysis',
    status: 'completed',
    progress: 100,
    currentStep: 'Task verified & completed successfully',
    createdAt: '3 hours ago',
    updatedAt: '2 hours ago',
    projectId: 'proj-4',
    projectName: 'Autonomous Data Pipeline',
    resources: ['Files', 'Web'],
    executionPreference: 'Autonomous execution',
    autonomyLevel: 'Autonomous',
    stepsCount: 4,
    tokensUsed: '28,150',
    duration: '4m 12s',
    plan: [
      { id: 'p3-1', title: 'Ingest 500k event telemetry parquet snapshot', status: 'completed', duration: '18s' },
      { id: 'p3-2', title: 'Calculate z-scores and IQR clustering across endpoint latencies', status: 'completed', duration: '1m 20s' },
      { id: 'p3-3', title: 'Identify 3 correlated latency spikes with memory GC cycles', status: 'completed', duration: '45s' },
      { id: 'p3-4', title: 'Generate executive summary report with visualization artifacts', status: 'completed', duration: '1m 49s' },
    ],
    messages: [
      {
        id: 'm3-1',
        sender: 'user',
        text: 'Analyze the telemetry log dataset from our API gateway. Detect what caused the latency spikes on Friday afternoon.',
        timestamp: '3h ago'
      },
      {
        id: 'm3-2',
        sender: 'agent',
        text: 'Telemetry analysis is complete. The root cause was unindexed JSON payload queries triggering full table scans during simultaneous Node.js garbage collection passes.',
        timestamp: '2h ago'
      }
    ],
    artifacts: [
      {
        id: 'art-301',
        title: 'Telemetry_Anomaly_Report_Final.pdf',
        type: 'pdf',
        size: '1.4 MB',
        updatedAt: '2h ago',
        description: 'Executive anomaly report with distribution charts and remediation checklist.',
      },
      {
        id: 'art-302',
        title: 'latency_breakdown_visualizer.html',
        type: 'chart',
        size: '48.2 KB',
        updatedAt: '2h ago',
        description: 'Interactive HTML boxplot showing p50, p95, and p99 server response latencies.',
      }
    ]
  },
  {
    id: 'task-4',
    title: 'Developer Documentation & Interactive Sandbox for ORBIT SDK',
    type: 'content',
    status: 'completed',
    progress: 100,
    currentStep: 'Delivered documentation package',
    createdAt: 'Yesterday',
    updatedAt: 'Yesterday',
    projectId: 'proj-2',
    projectName: 'Portfolio & Agent Showcase',
    resources: ['GitHub', 'Files'],
    executionPreference: 'Autonomous execution',
    autonomyLevel: 'Autonomous',
    stepsCount: 5,
    tokensUsed: '52,900',
    duration: '5m 30s',
    plan: [
      { id: 'p4-1', title: 'Scan SDK method signatures and docstrings', status: 'completed', duration: '30s' },
      { id: 'p4-2', title: 'Generate interactive code examples for Python and TypeScript', status: 'completed', duration: '2m' },
      { id: 'p4-3', title: 'Write Quickstart Guide and Authentication documentation', status: 'completed', duration: '1m 30s' },
      { id: 'p4-4', title: 'Compile Mintlify-compatible documentation structure', status: 'completed', duration: '1m 30s' },
    ],
    messages: [
      {
        id: 'm4-1',
        sender: 'user',
        text: 'Write full developer documentation for the ORBIT Agent SDK with TypeScript and Python snippets.',
        timestamp: 'Yesterday'
      },
      {
        id: 'm4-2',
        sender: 'agent',
        text: 'Generated complete developer documentation bundle including quickstart, tool authoring tutorial, and error codes.',
        timestamp: 'Yesterday'
      }
    ],
    artifacts: [
      {
        id: 'art-401',
        title: 'ORBIT_SDK_Documentation.md',
        type: 'document',
        size: '34.2 KB',
        updatedAt: 'Yesterday',
        description: 'Comprehensive API reference, lifecycle hooks, and error code catalogue.',
      }
    ]
  },
  {
    id: 'task-5',
    title: 'Automate Daily Competitor Feature Scraping & Slack Digest',
    type: 'automation',
    status: 'paused',
    progress: 30,
    currentStep: 'Cron scheduled paused by user',
    createdAt: '2 days ago',
    updatedAt: '1 day ago',
    projectId: 'proj-3',
    projectName: 'Enterprise Market Intelligence',
    resources: ['Web', 'Connected Apps'],
    executionPreference: 'Autonomous execution',
    autonomyLevel: 'Autonomous',
    stepsCount: 4,
    tokensUsed: '14,200',
    duration: '1m 40s',
    plan: [
      { id: 'p5-1', title: 'Register list of 8 competitor changelog RSS feeds', status: 'completed', duration: '20s' },
      { id: 'p5-2', title: 'Configure markdown diff scraper', status: 'completed', duration: '40s' },
      { id: 'p5-3', title: 'Format Slack Block Kit digest layout', status: 'pending', duration: '-' },
      { id: 'p5-4', title: 'Activate daily 9:00 AM UTC execution trigger', status: 'pending', duration: '-' },
    ],
    messages: [
      {
        id: 'm5-1',
        sender: 'user',
        text: 'Monitor changelogs for the top 8 AI agent companies and send a daily summary to #product-intel.',
        timestamp: '2d ago'
      },
      {
        id: 'm5-2',
        sender: 'agent',
        text: 'Configured feeds and tested initial extraction. Paused waiting for final Slack webhook validation.',
        timestamp: '1d ago'
      }
    ],
    artifacts: []
  },
  {
    id: 'task-6',
    title: 'Refactor Legacy Microservice to Async Rust Pipeline',
    type: 'coding',
    status: 'failed',
    progress: 42,
    currentStep: 'Halted due to compiler borrow-checker conflict in multi-threaded channel',
    createdAt: '3 days ago',
    updatedAt: '3 days ago',
    projectId: 'proj-2',
    projectName: 'Portfolio & Agent Showcase',
    resources: ['GitHub', 'Files'],
    executionPreference: 'Ask before important actions',
    autonomyLevel: 'Autonomous',
    stepsCount: 5,
    tokensUsed: '38,100',
    duration: '6m 12s',
    plan: [
      { id: 'p6-1', title: 'Parse legacy Python multiprocessing architecture', status: 'completed', duration: '45s' },
      { id: 'p6-2', title: 'Initialize Cargo workspace with Tokio and Serde', status: 'completed', duration: '1m' },
      { id: 'p6-3', title: 'Implement async batch consumer channel', status: 'failed', duration: 'Failed at compile' },
      { id: 'p6-4', title: 'Benchmark throughput vs legacy pipeline', status: 'pending', duration: '-' },
    ],
    messages: [
      {
        id: 'm6-1',
        sender: 'user',
        text: 'Convert our ingestion service from Python to Rust using Tokio channels for 10x throughput.',
        timestamp: '3d ago'
      },
      {
        id: 'm6-2',
        sender: 'agent',
        text: 'Encountered a compile error: Arc<Mutex<T>> borrow cannot be transferred across Tokio spawn boundary without static lifetime guarantee. Click Retry to apply crossbeam-channel patch.',
        timestamp: '3d ago'
      }
    ],
    artifacts: []
  }
];

export const mockProjects = [
  {
    id: 'proj-1',
    name: 'AI Career & Mastery',
    description: 'Long-term roadmap, specialized agent engineering research, hands-on implementations, and portfolio validation.',
    progress: 78,
    taskCount: 12,
    completedTasks: 8,
    activeTasks: 2,
    upcomingTasks: 2,
    artifactsCount: 14,
    lastActivity: '12m ago',
    category: 'Career Growth',
    tags: ['Agentic AI', 'LLM Systems', 'Evals', 'Production'],
    milestones: [
      { title: 'Core LLM Foundations & Prompt Routing', completed: true, date: 'Feb 10, 2026' },
      { title: 'Agentic Tool Calling & Sandboxing', completed: true, date: 'Feb 28, 2026' },
      { title: 'Evaluation Harness & DSPy Optimization', completed: false, active: true, date: 'In Progress' },
      { title: 'Distributed Inference & Capstone System', completed: false, date: 'Apr 2026' }
    ]
  },
  {
    id: 'proj-2',
    name: 'Portfolio & Agent Showcase',
    description: 'Production-ready agentic showcase platform with live sandbox playgrounds, interactive demos, and SDK documentation.',
    progress: 52,
    taskCount: 6,
    completedTasks: 3,
    activeTasks: 2,
    upcomingTasks: 1,
    artifactsCount: 7,
    lastActivity: '45m ago',
    category: 'Engineering',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind'],
    milestones: [
      { title: 'Frontend UI/UX Specification', completed: true, date: 'Mar 1, 2026' },
      { title: 'Three-Panel Agent Workspace', completed: true, date: 'Mar 12, 2026' },
      { title: 'Interactive Tool Activity Stream', completed: false, active: true, date: 'In Progress' },
      { title: 'Live Agent Core Backend Integration', completed: false, date: 'May 2026' }
    ]
  },
  {
    id: 'proj-3',
    name: 'Enterprise Market Intelligence',
    description: 'Automated continuous surveillance on competitors, patents, research preprints, and foundation model pricing shifts.',
    progress: 100,
    taskCount: 5,
    completedTasks: 5,
    activeTasks: 0,
    upcomingTasks: 0,
    artifactsCount: 12,
    lastActivity: 'Yesterday',
    category: 'Market Research',
    tags: ['Automation', 'Scraping', 'Slack Bot', 'Executive Reports'],
    milestones: [
      { title: 'Competitor Feed Ingestion Pipeline', completed: true, date: 'Jan 15, 2026' },
      { title: 'Semantic Diff Summarizer', completed: true, date: 'Feb 02, 2026' },
      { title: 'Automated Daily Slack Dispatcher', completed: true, date: 'Feb 20, 2026' }
    ]
  },
  {
    id: 'proj-4',
    name: 'Autonomous Data Pipeline',
    description: 'Self-healing ETL telemetry pipeline with automated anomaly detection, schema drift mitigation, and alerts.',
    progress: 25,
    taskCount: 8,
    completedTasks: 2,
    activeTasks: 1,
    upcomingTasks: 5,
    artifactsCount: 4,
    lastActivity: '3h ago',
    category: 'Infrastructure',
    tags: ['Data Engineering', 'PostgreSQL', 'Parquet', 'Kafka'],
    milestones: [
      { title: 'Gateway Telemetry Mirroring', completed: true, date: 'Jan 28, 2026' },
      { title: 'Anomaly Detection Clustering Algorithm', completed: false, active: true, date: 'In Progress' },
      { title: 'Automated Rollback & Remediation Actions', completed: false, date: 'Apr 2026' }
    ]
  }
];

export const mockMemories = [
  {
    id: 'mem-1',
    category: 'Goals',
    content: 'Targeting Staff/Principal AI Systems Engineer roles focusing on autonomous multi-agent systems, deterministic routing, and high-throughput inference.',
    createdAt: 'Jan 12, 2026',
    sourceTask: 'Career Roadmap Formulation',
    importance: 'High',
  },
  {
    id: 'mem-2',
    category: 'Skills',
    content: 'Strong proficiency in Python, TypeScript, React, PyTorch, vLLM, LangGraph, PostgreSQL, Docker, and Kubernetes.',
    createdAt: 'Jan 14, 2026',
    sourceTask: 'Initial Profile Onboarding',
    importance: 'High',
  },
  {
    id: 'mem-3',
    category: 'Preferences',
    content: 'Prefers hands-on, project-based architectures with real runnable code over high-level conceptual slides. Wants concise technical rationale.',
    createdAt: 'Jan 20, 2026',
    sourceTask: 'Workspace Preference Setting',
    importance: 'Medium',
  },
  {
    id: 'mem-4',
    category: 'Preferences',
    content: 'Always format database scripts with explicit idempotent triggers (IF NOT EXISTS) and concurrent index creations.',
    createdAt: 'Feb 03, 2026',
    sourceTask: 'Financial Sentiment DB Migration',
    importance: 'High',
  },
  {
    id: 'mem-5',
    category: 'Learning',
    content: 'Currently studying agentic tree-of-thought search, DSPy metric optimization, and automated reflection loops.',
    createdAt: 'Feb 15, 2026',
    sourceTask: 'AI Skills Research Task',
    importance: 'Medium',
  },
  {
    id: 'mem-6',
    category: 'Projects',
    content: 'Leading the ORBIT AI frontend UI/UX platform development with dark-first design, three-panel agent workspace, and modular architecture.',
    createdAt: 'Feb 26, 2026',
    sourceTask: 'Project Setup ORBIT',
    importance: 'High',
  },
  {
    id: 'mem-7',
    category: 'Important Context',
    content: 'Primary development environment is Linux x86_64 with Node.js v24+, Vite, and Python 3.12. Prefers minimal external dependencies.',
    createdAt: 'Mar 01, 2026',
    sourceTask: 'System Environment Check',
    importance: 'Medium',
  }
];

export const mockTools = [
  {
    id: 'tool-search',
    name: 'Web Search',
    category: 'Core Capabilities',
    icon: 'Search',
    description: 'Searches the live public web, retrieves markdown documents, extracts structured data, and verifies source citations.',
    status: true,
    callsThisMonth: 1240,
    latency: '820ms',
    configured: true,
    badge: 'Production Ready',
  },
  {
    id: 'tool-code',
    name: 'Code Execution',
    category: 'Core Capabilities',
    icon: 'Code2',
    description: 'Executes Python, Node.js, and Bash commands in an isolated secure sandbox with memory & CPU constraints.',
    status: true,
    callsThisMonth: 890,
    latency: '450ms',
    configured: true,
    badge: 'Sandboxed',
  },
  {
    id: 'tool-file',
    name: 'File Analysis',
    category: 'Core Capabilities',
    icon: 'FileText',
    description: 'Extracts tokens, parses schemas, and reads documents from PDF, DOCX, CSV, JSON, and source repositories.',
    status: true,
    callsThisMonth: 412,
    latency: '310ms',
    configured: true,
    badge: 'Fast Parser',
  },
  {
    id: 'tool-database',
    name: 'Database Query',
    category: 'Developer Tools',
    icon: 'Database',
    description: 'Performs safe read-only queries against PostgreSQL, MySQL, and ClickHouse clusters with automated query plan analysis.',
    status: true,
    callsThisMonth: 154,
    latency: '95ms',
    configured: true,
    badge: 'Read-Replica Safe',
  },
  {
    id: 'tool-github',
    name: 'GitHub',
    category: 'Developer Tools',
    icon: 'GitBranch',
    description: 'Inspects commit histories, clones repositories, generates automated pull requests, and analyzes code diffs.',
    status: false,
    callsThisMonth: 0,
    latency: '1.2s',
    configured: false,
    badge: 'OAuth Needed',
  },
  {
    id: 'tool-browser',
    name: 'Browser Automation',
    category: 'Developer Tools',
    icon: 'Globe',
    description: 'Headless Chromium browser for multi-step authenticated workflows, visual screenshot inspection, and DOM interaction.',
    status: false,
    callsThisMonth: 0,
    latency: '2.4s',
    configured: false,
    badge: 'Headless VNC',
  },
  {
    id: 'tool-api',
    name: 'REST / GraphQL Runner',
    category: 'Integrations',
    icon: 'Zap',
    description: 'Invokes third-party HTTP endpoints with OAuth2, bearer token management, and JSON schema response validation.',
    status: false,
    callsThisMonth: 0,
    latency: '340ms',
    configured: false,
    badge: 'Configurable',
  },
  {
    id: 'tool-apps',
    name: 'Connected Apps',
    category: 'Integrations',
    icon: 'Layers',
    description: 'Bi-directional integrations with Google Drive, Slack, Notion, Jira, Linear, and Figma for workflow automation.',
    status: false,
    callsThisMonth: 0,
    latency: '-',
    configured: false,
    badge: 'Workspace Suite',
  }
];

export const mockArtifacts = [
  {
    id: 'art-1',
    taskId: 'task-1',
    taskTitle: 'Research the current AI engineering skills and create a learning roadmap',
    title: 'AI Engineering 2026 Roadmap & Curriculum',
    type: 'document',
    fileExtension: 'md',
    size: '18.4 KB',
    createdAt: '10 mins ago',
    summary: 'A 12-week comprehensive learning syllabus covering Compound AI Systems, DSPy, Sandboxed Code Execution, and High-Throughput vLLM Inferences.',
    content: `# AI Engineering 2026: Comprehensive Roadmap & Curriculum

## Executive Summary
In 2026, the transition from basic prompt engineering to **Compound AI Agent Architectures** is complete. Production AI engineers build systems governed by deterministic tool calling, continuous evaluation harnesses, and self-correcting execution loops.

---

## 12-Week Structured Milestones

### Phase 1: Foundations of Compound Systems (Weeks 1 - 3)
- **Week 1**: State Machines & Graph-based Orchestration (LangGraph, Temporal, Custom DAGs)
- **Week 2**: Tool Calling Protocols & Structured Output Validation (Pydantic V2, JSON Schema, Zod)
- **Week 3**: Sandboxed Runtime Isolation (Docker, Firecracker microVMs, WASM)

### Phase 2: Memory & Context Architectures (Weeks 4 - 6)
- **Week 4**: Hierarchical Memory: Short-term scratchpad vs Epistemic Long-term Memory
- **Week 5**: Hybrid Retrieval: Dense Embeddings + BM25 + Reciprocal Rank Fusion (RRF)
- **Week 6**: Dynamic Context Compaction & KV Cache Pruning

### Phase 3: Continuous Evals & Alignment (Weeks 7 - 9)
- **Week 7**: Synthesizing Golden Evaluation Datasets using Frontier Models
- **Week 8**: Prompt Optimization as a Search Problem (DSPy, GEval, Ragas)
- **Week 9**: Red-Teaming, Prompt Injection Defense, and Output Guardrails

### Phase 4: Production Scale & Capstone (Weeks 10 - 12)
- **Week 10**: High-Throughput Serving (vLLM, Speculative Decoding, Continuous Batching)
- **Week 11**: Multi-Agent Consensus & Supervisory Routing
- **Week 12**: Capstone: Deploying a Multi-Agent Autonomous Code Reviewer with Verification Loops

---

## Recommended Benchmark Repositories
1. \`github.com/vllm-project/vllm\`
2. \`github.com/stanfordnlp/dspy\`
3. \`github.com/langchain-ai/langgraph\`
`
  },
  {
    id: 'art-2',
    taskId: 'task-1',
    taskTitle: 'Research the current AI engineering skills and create a learning roadmap',
    title: 'Industry Skills Demand Matrix',
    type: 'spreadsheet',
    fileExtension: 'csv',
    size: '42.1 KB',
    createdAt: '8 mins ago',
    summary: 'Quantified market analysis across 240 enterprise AI job listings analyzing framework adoption, average compensation, and skill demand tiers.',
    content: `Skill / Framework,Category,Adoption Rate,Year-over-Year Growth,Median US Salary Tier
Compound Agent Graphs,Architecture,88%,+142%,$210k - $280k
DSPy / Prompt Optimization,Evals,64%,+210%,$195k - $260k
vLLM / TensorRT-LLM,Inference,79%,+95%,$220k - $310k
Structured Output / Pydantic,Reliability,96%,+45%,$180k - $240k
Sandboxed Code Execution,Security,72%,+160%,$205k - $275k
Vector DBs & RRF Hybrid,Data,85%,+30%,$175k - $235k
LangGraph / State Machines,Orchestration,81%,+115%,$190k - $255k`
  },
  {
    id: 'art-3',
    taskId: 'task-1',
    taskTitle: 'Research the current AI engineering skills and create a learning roadmap',
    title: 'Production Capstone Architecture Harness',
    type: 'code',
    fileExtension: 'py',
    size: '6.8 KB',
    createdAt: '4 mins ago',
    summary: 'A reference Python implementation demonstrating supervisory agent orchestration with self-reflection and deterministic fallback routing.',
    content: `"""
ORBIT AI — Reference Agent Harness
Pattern: Plan -> Execute -> Reflect -> Deliver
"""

import asyncio
from typing import List, Dict, Any
from dataclasses import dataclass

@dataclass
class AgentStep:
    name: str
    action: str
    status: str = "pending"

class AutonomousAgentHarness:
    def __init__(self, objective: str):
        self.objective = objective
        self.steps: List[AgentStep] = []
        self.memory: Dict[str, Any] = {}

    async def plan(self) -> List[AgentStep]:
        print(f"[ORBIT Core] Formulating dynamic execution plan for: '{self.objective}'")
        self.steps = [
            AgentStep("understand", "Analyze objective constraints"),
            AgentStep("research", "Query live web and reference corpora"),
            AgentStep("execute", "Execute synthesis code in sandbox"),
            AgentStep("verify", "Check citation accuracy and completeness"),
            AgentStep("deliver", "Export reproducible markdown and tabular artifacts")
        ]
        return self.steps

    async def run(self):
        steps = await self.plan()
        for step in steps:
            step.status = "running"
            print(f"[ORBIT Agent] Executing: {step.name}...")
            await asyncio.sleep(0.5)
            step.status = "completed"
        print("[ORBIT Agent] Verification passed. Artifacts ready.")

if __name__ == "__main__":
    agent = AutonomousAgentHarness("Research AI Engineering Skills 2026")
    asyncio.run(agent.run())
`
  },
  {
    id: 'art-301',
    taskId: 'task-3',
    taskTitle: 'Dataset Analysis & Telemetry Anomaly Detection',
    title: 'Telemetry Anomaly Executive Report',
    type: 'pdf',
    fileExtension: 'pdf',
    size: '1.4 MB',
    createdAt: '2 hours ago',
    summary: 'Full executive report detailing memory pressure correlation, full-table scan triggers, and configuration tuning.',
    content: `[PDF Binary Document Preview]
ORBIT AI TELEMETRY ANALYSIS REPORT
Incident: Gateway Latency Spikes (p99 > 4,200ms)
Date: Friday 14:00 - 16:30 UTC
Root Cause: Unindexed JSONB searches correlated with Node.js GC pauses.
Recommendations:
1. Create GIN index on telemetry_events(payload).
2. Configure max-old-space-size to 4096MB with generational ZGC.
3. Add rate limiting to batch telemetry ingest API.`
  }
];
