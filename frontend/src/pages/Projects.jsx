import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProjectCard } from '../components/projects/ProjectCard';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';

export const Projects = () => {
  const { projects } = useApp();
  const navigate = useNavigate();

  const [showNewModal, setShowNewModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectCategory, setNewProjectCategory] = useState('Engineering');

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    // In mock setup, close modal and redirect to projects list
    setShowNewModal(false);
    setNewProjectName('');
    setNewProjectDesc('');
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 font-heading">Autonomous Projects</h1>
          <p className="text-xs text-slate-400 mt-1">
            Long-running objectives, milestone roadmaps, and accumulated artifact repositories.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setShowNewModal(true)}
        >
          New Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((proj) => (
          <ProjectCard key={proj.id} project={proj} />
        ))}
      </div>

      {/* New Project Modal */}
      <Modal
        isOpen={showNewModal}
        onClose={() => setShowNewModal(false)}
        title="Initialize Long-Running Project"
        subtitle="Group multiple autonomous tasks under a persistent milestone goal."
      >
        <form onSubmit={handleCreateProject} className="flex flex-col gap-4">
          <Input
            label="Project Name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="e.g. Distributed LLM Evaluation Suite"
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-300">Category</label>
            <select
              value={newProjectCategory}
              onChange={(e) => setNewProjectCategory(e.target.value)}
              className="p-2.5 rounded-lg bg-input border border-slate-800 text-xs text-slate-200"
            >
              <option value="Career Growth">Career Growth</option>
              <option value="Engineering">Engineering</option>
              <option value="Market Research">Market Research</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Security">Security</option>
            </select>
          </div>

          <Textarea
            label="Project Mission & Scope"
            rows={3}
            value={newProjectDesc}
            onChange={(e) => setNewProjectDesc(e.target.value)}
            placeholder="Describe the long-term scope, expected deliverables, and success metrics..."
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setShowNewModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Project
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
