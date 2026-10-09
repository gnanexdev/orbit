import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TaskFilters } from '../components/tasks/TaskFilters';
import { TaskList } from '../components/tasks/TaskList';
import { Button } from '../components/ui/Button';

export const Tasks = () => {
  const { tasks } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // Filter logic
  const filteredTasks = tasks.filter((t) => {
    // Search match
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.currentStep && t.currentStep.toLowerCase().includes(searchQuery.toLowerCase()));

    // Filter match
    if (!matchesSearch) return false;
    if (activeFilter === 'all') return true;
    return t.status === activeFilter;
  });

  const counts = {
    all: tasks.length,
    planned: tasks.filter(t => t.status === 'planned').length,
    running: tasks.filter(t => t.status === 'running').length,
    needs_approval: tasks.filter(t => t.status === 'needs_approval').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    paused: tasks.filter(t => t.status === 'paused').length,
    failed: tasks.filter(t => t.status === 'failed').length,
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 font-heading">My Tasks</h1>
          <p className="text-xs text-slate-400 mt-1">
            Monitor, inspect, and manage autonomous agent workflows across all stages.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => navigate('/app/task/new')}
        >
          New Task
        </Button>
      </div>

      {/* Filters & Search */}
      <TaskFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        counts={counts}
      />

      {/* Task List / Grid */}
      <TaskList
        tasks={filteredTasks}
        viewMode={viewMode}
        onNewTask={() => navigate('/app/task/new')}
      />
    </div>
  );
};
