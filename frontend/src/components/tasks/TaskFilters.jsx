import { Search, LayoutGrid, List } from 'lucide-react';

export const TaskFilters = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  viewMode = 'grid',
  onViewModeChange,
  counts = {},
}) => {
  const filters = [
    { id: 'all', label: 'All Tasks', count: counts.all || 0 },
    { id: 'planned', label: 'Planned', count: counts.planned || 0 },
    { id: 'running', label: 'Running', count: counts.running || 0 },
    { id: 'needs_approval', label: 'Needs Approval', count: counts.needs_approval || 0 },
    { id: 'completed', label: 'Completed', count: counts.completed || 0 },
    { id: 'paused', label: 'Paused', count: counts.paused || 0 },
    { id: 'failed', label: 'Failed', count: counts.failed || 0 },
  ];

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-6">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks, goals, or keywords..."
          className="w-full pl-9 pr-4 py-2 bg-surface text-sm rounded-lg border border-slate-800 focus:border-cyan-500 transition-colors text-slate-200 placeholder-slate-500"
          style={{ backgroundColor: 'var(--bg-surface)' }}
        />
      </div>

      {/* Filter Badges & View Mode */}
      <div className="flex items-center justify-between md:justify-end gap-2 overflow-x-auto pb-1 md:pb-0">
        <div className="flex items-center gap-1.5">
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => onFilterChange(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    : 'bg-surface hover:bg-surface-elevated text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
                style={{ backgroundColor: isActive ? 'rgba(56, 189, 248, 0.15)' : 'var(--bg-surface)' }}
              >
                <span>{f.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                  {f.count}
                </span>
              </button>
            );
          })}
        </div>

        {onViewModeChange && (
          <div className="hidden sm:flex items-center p-1 rounded-lg bg-surface border border-slate-800 shrink-0 ml-2">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-slate-800 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('table')}
              className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-slate-800 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
