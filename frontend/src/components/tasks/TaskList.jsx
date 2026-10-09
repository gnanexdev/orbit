import { useNavigate } from 'react-router-dom';
import { Plus, CheckSquare, ArrowRight} from 'lucide-react';
import { TaskCard } from './TaskCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';

export const TaskList = ({
  tasks = [],
  viewMode = 'grid',
  onNewTask,
}) => {
  const navigate = useNavigate();

  if (!tasks || tasks.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-surface flex flex-col items-center justify-center max-w-md mx-auto my-8">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
          <CheckSquare className="w-6 h-6" />
        </div>
        <h4 className="text-base font-semibold text-slate-200 font-heading">No tasks found</h4>
        <p className="text-xs text-slate-400 mt-1 mb-4 max-w-xs">
          Give ORBIT a goal and let it get to work planning, researching, and delivering.
        </p>
        <Button
          variant="primary"
          icon={Plus}
          onClick={onNewTask || (() => navigate('/app/task/new'))}
        >
          Create your first task
        </Button>
      </div>
    );
  }

  if (viewMode === 'table') {
    return (
      <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-surface">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-surface-subtle text-slate-400 uppercase font-mono text-[10px]">
              <th className="p-3 pl-4">Task Name</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Progress</th>
              <th className="p-3">Created</th>
              <th className="p-3 pr-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {tasks.map((task) => (
              <tr
                key={task.id}
                onClick={() => navigate(`/app/task/${task.id}`)}
                className="hover:bg-surface-elevated cursor-pointer transition-colors"
              >
                <td className="p-3 pl-4">
                  <div className="font-semibold text-slate-200 line-clamp-1">{task.title}</div>
                  <div className="text-[11px] text-slate-500 line-clamp-1">{task.currentStep}</div>
                </td>
                <td className="p-3 capitalize text-slate-300 font-medium">{task.type}</td>
                <td className="p-3">
                  <Badge variant={task.status === 'completed' ? 'completed' : task.status === 'running' ? 'running' : task.status === 'needs_approval' ? 'warning' : 'default'} size="sm">
                    {task.status}
                  </Badge>
                </td>
                <td className="p-3 w-32">
                  <div className="flex items-center gap-2">
                    <Progress value={task.progress} size="sm" />
                    <span className="font-mono text-slate-400 text-[10px]">{task.progress}%</span>
                  </div>
                </td>
                <td className="p-3 text-slate-400 font-mono text-[11px]">{task.createdAt}</td>
                <td className="p-3 pr-4 text-right">
                  <span className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 font-medium">
                    View <ArrowRight className="w-3 h-3" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};
