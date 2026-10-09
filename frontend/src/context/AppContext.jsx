import { createContext, useContext, useState} from 'react';
import {
  currentUser as initialUser,
  mockTasks as initialTasks,
  mockProjects as initialProjects,
  mockMemories as initialMemories,
  mockTools as initialTools,
  mockArtifacts as initialArtifacts
} from '../data/mockData';
import { createTask as createBackendTask, toTaskRequest, toWorkspaceTask } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  const [tasks, setTasks] = useState(initialTasks);
  const [projects, setProjects] = useState(initialProjects);
  const [memories, setMemories] = useState(initialMemories);
  const [tools, setTools] = useState(initialTools);
  const [artifacts, setArtifacts] = useState(initialArtifacts);

  // Layout UI State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 'notif-1', title: 'Task Completed', message: 'Dataset Analysis report generated.', time: '2h ago', unread: true },
    { id: 'notif-2', title: 'Approval Required', message: 'Task #2 needs authorization for DB migration.', time: '45m ago', unread: true },
  ]);

  // App Settings
  const [settings, setSettings] = useState({
    autonomyLevel: 'autonomous', // 'always_ask', 'ask_important', 'autonomous'
    showExecutionPlan: true,
    showToolActivity: true,
    verifyResults: true,
    usePersonalMemory: true,
    learnPreferences: true,
    notifyTaskCompletion: true,
    notifyApprovalRequests: true,
    theme: 'dark',
    compactMode: false,
    animations: true,
  });

  const createTask = async (taskInput) => {
    const response = await createBackendTask(toTaskRequest(taskInput));
    const newTask = toWorkspaceTask(response);
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  };

  // Agent simulation actions
  const advanceTaskStep = (taskId) => {
    setTasks(prev => prev.map(task => {
      if (task.id !== taskId) return task;

      const activeIndex = task.plan.findIndex(p => p.status === 'active');
      if (activeIndex === -1) {
        // All done or pending
        return task;
      }

      const updatedPlan = task.plan.map((step, idx) => {
        if (idx === activeIndex) {
          return { ...step, status: 'completed', duration: '18s' };
        }
        if (idx === activeIndex + 1) {
          return { ...step, status: 'active', duration: 'Running...' };
        }
        return step;
      });

      const isFinished = activeIndex + 1 >= task.plan.length;
      const nextProgress = isFinished ? 100 : Math.min(95, Math.round(((activeIndex + 2) / task.plan.length) * 100));

      const newAgentMsg = isFinished ? {
        id: `msg-${Date.now()}`,
        sender: 'agent',
        statusText: 'Task Completed & Verified',
        text: 'All execution steps completed and verified against goal requirements. Final deliverables have been generated and saved to your artifacts panel.',
        timestamp: 'Just now'
      } : {
        id: `msg-${Date.now()}`,
        sender: 'agent',
        statusText: `Step ${activeIndex + 2} in progress`,
        text: `Completed "${task.plan[activeIndex].title}". Now proceeding with "${task.plan[activeIndex + 1]?.title || 'Final verification'}".`,
        timestamp: 'Just now'
      };

      // Add a simulated artifact if completed
      let newArtifacts = [...task.artifacts];
      if (isFinished && task.artifacts.length === 0) {
        const generatedArt = {
          id: `art-${Date.now()}`,
          taskId: task.id,
          taskTitle: task.title,
          title: `${task.title.slice(0, 30)} Deliverable Report.md`,
          type: 'document',
          size: '14.2 KB',
          createdAt: 'Just now',
          description: 'Comprehensive deliverable generated and verified by ORBIT Agent.',
          content: `# ${task.title}\n\n## Status: Verified & Completed\n\nExecution successfully fulfilled all parameter constraints.\n\n### Key Deliverables\n- Structured analysis completed.\n- Citations and code blocks verified.\n- Ready for production integration.\n`
        };
        newArtifacts.push(generatedArt);
        setArtifacts(a => [generatedArt, ...a]);
      }

      return {
        ...task,
        status: isFinished ? 'completed' : 'running',
        progress: nextProgress,
        currentStep: isFinished ? 'Task completed successfully' : task.plan[activeIndex + 1]?.title,
        plan: updatedPlan,
        messages: [...task.messages, newAgentMsg],
        artifacts: newArtifacts,
        updatedAt: 'Just now'
      };
    }));
  };

  const pauseTask = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'paused', currentStep: 'Execution paused by user' } : t));
  };

  const resumeTask = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'running', currentStep: 'Resuming execution loop...' } : t));
  };

  const cancelTask = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'failed', currentStep: 'Task aborted by user' } : t));
  };

  const approveTaskAction = (taskId) => {
    setTasks(prev => prev.map(task => {
      if (task.id !== taskId) return task;
      return {
        ...task,
        status: 'running',
        currentStep: 'Authorization granted. Executing schema migration...',
        pendingApproval: null,
        messages: [
          ...task.messages,
          {
            id: `msg-appr-${Date.now()}`,
            sender: 'user',
            text: 'Authorized action: Proceed with database migration.',
            timestamp: 'Just now'
          },
          {
            id: `msg-appr-resp-${Date.now()}`,
            sender: 'tool',
            toolType: 'database',
            toolName: 'Database Execution',
            query: task.pendingApproval?.details?.statement || 'ALTER TABLE ...',
            status: 'completed',
            resultsCount: 1,
            timestamp: 'Just now'
          },
          {
            id: `msg-appr-agent-${Date.now()}`,
            sender: 'agent',
            statusText: 'Migration executed',
            text: 'Schema update was applied with 0 downtime. Index build complete. Resuming stress tests.',
            timestamp: 'Just now'
          }
        ],
        plan: task.plan.map(step => step.status === 'active' ? { ...step, status: 'completed', duration: '45s' } : step)
      };
    }));
  };

  const rejectTaskAction = (taskId) => {
    setTasks(prev => prev.map(task => {
      if (task.id !== taskId) return task;
      return {
        ...task,
        status: 'paused',
        currentStep: 'Action declined by user. Awaiting alternative strategy.',
        pendingApproval: null,
        messages: [
          ...task.messages,
          {
            id: `msg-decl-${Date.now()}`,
            sender: 'user',
            text: 'Action declined. Do not apply migration directly to production.',
            timestamp: 'Just now'
          },
          {
            id: `msg-decl-agent-${Date.now()}`,
            sender: 'agent',
            statusText: 'Action aborted',
            text: 'Understood. Skipping production DB migration. I will generate a local migration artifact instead.',
            timestamp: 'Just now'
          }
        ]
      };
    }));
  };

  const sendUserMessage = (taskId, text) => {
    if (!text.trim()) return;
    setTasks(prev => prev.map(task => {
      if (task.id !== taskId) return task;
      return {
        ...task,
        messages: [
          ...task.messages,
          {
            id: `msg-u-${Date.now()}`,
            sender: 'user',
            text: text,
            timestamp: 'Just now'
          },
          {
            id: `msg-a-${Date.now()}`,
            sender: 'agent',
            statusText: 'Instruction incorporated',
            text: `Received: "${text}". I have updated my execution context with your feedback.`,
            timestamp: 'Just now'
          }
        ]
      };
    }));
  };

  // Memory Actions
  const addMemory = ({ category, content, importance = 'Medium' }) => {
    const newMem = {
      id: `mem-${Date.now()}`,
      category: category || 'Preferences',
      content,
      createdAt: 'Just now',
      sourceTask: 'Manual Entry',
      importance
    };
    setMemories(prev => [newMem, ...prev]);
  };

  const deleteMemory = (id) => {
    setMemories(prev => prev.filter(m => m.id !== id));
  };

  const updateMemory = (id, newContent) => {
    setMemories(prev => prev.map(m => m.id === id ? { ...m, content: newContent } : m));
  };

  // Tools Actions
  const toggleTool = (toolId) => {
    setTools(prev => prev.map(t => t.id === toolId ? { ...t, status: !t.status } : t));
  };

  // Settings Actions
  const updateSettings = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        tasks,
        projects,
        memories,
        tools,
        artifacts,
        notifications,
        settings,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        isMobileNavOpen,
        setIsMobileNavOpen,
        searchQuery,
        setSearchQuery,
        createTask,
        advanceTaskStep,
        pauseTask,
        resumeTask,
        cancelTask,
        approveTaskAction,
        rejectTaskAction,
        sendUserMessage,
        addMemory,
        deleteMemory,
        updateMemory,
        toggleTool,
        updateSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
