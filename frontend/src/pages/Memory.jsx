import { useState } from 'react';
import {
  Brain,
  Plus,
  Search,
  Trash2,
  Edit2,
  Clock,
  Check,
  X
} from 'lucide-react';
import { useApp } from '../context/useApp';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Textarea } from '../components/ui/Textarea';
import { Badge } from '../components/ui/Badge';

export const Memory = () => {
  const { memories, addMemory, deleteMemory, updateMemory } = useApp();

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMemory, setEditingMemory] = useState(null);

  // New Memory form state
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('Goals');
  const newImportance = 'High';

  const categories = [
    'All',
    'Goals',
    'Skills',
    'Preferences',
    'Learning',
    'Projects',
    'Important Context'
  ];

  const filteredMemories = memories.filter((mem) => {
    const matchesCategory = activeCategory === 'All' || mem.category === activeCategory;
    const matchesSearch =
      mem.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mem.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newContent.trim()) return;
    addMemory({
      content: newContent,
      category: newCategory,
      importance: newImportance,
    });
    setNewContent('');
    setShowAddModal(false);
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    if (editingMemory && editingMemory.content.trim()) {
      updateMemory(editingMemory.id, editingMemory.content);
      setEditingMemory(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-100 font-heading">Epistemic Memory</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
              Auto-Indexed
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            What ORBIT remembers about your goals, skills, preferences, and operating context.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setShowAddModal(true)}
        >
          Add Memory
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                    : 'bg-surface hover:bg-surface-elevated text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search memories..."
            className="w-full pl-8 pr-3 py-1.5 bg-surface text-xs text-slate-200 placeholder-slate-500 rounded-lg border border-slate-800 focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Memories Grid */}
      {filteredMemories.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-surface flex flex-col items-center justify-center max-w-md mx-auto my-8">
          <Brain className="w-10 h-10 text-slate-600 mb-2" />
          <h4 className="text-sm font-semibold text-slate-200 font-heading">
            ORBIT hasn't learned anything in this category yet.
          </h4>
          <p className="text-xs text-slate-400 mt-1 mb-4">
            Add personal preferences, constraints, or let the agent learn as you run tasks.
          </p>
          <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
            Add new memory
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMemories.map((mem) => {
            const isEditingThis = editingMemory?.id === mem.id;

            return (
              <div
                key={mem.id}
                className="p-4 rounded-xl border border-slate-800/80 bg-surface hover:bg-surface-elevated transition-all flex flex-col justify-between gap-3 shadow-sm group"
                style={{ backgroundColor: 'var(--bg-surface)' }}
              >
                {/* Top: Category & Date */}
                <div className="flex items-center justify-between">
                  <Badge variant="cyan" size="sm">
                    {mem.category}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{mem.createdAt}</span>
                  </div>
                </div>

                {/* Content / Edit field */}
                {isEditingThis ? (
                  <form onSubmit={handleEditSave} className="flex flex-col gap-2">
                    <textarea
                      rows={3}
                      value={editingMemory.content}
                      onChange={(e) => setEditingMemory({ ...editingMemory, content: e.target.value })}
                      className="w-full p-2 bg-input border border-cyan-400 text-xs text-slate-200 rounded-md"
                    />
                    <div className="flex justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setEditingMemory(null)}
                        className="p-1 rounded text-slate-400 hover:text-slate-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        type="submit"
                        className="p-1 rounded text-cyan-400 hover:text-cyan-300"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                ) : (
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {mem.content}
                  </p>
                )}

                {/* Footer: Source task & Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px] text-slate-500">
                  <span className="truncate max-w-[160px] text-[10px] font-mono">
                    Src: {mem.sourceTask || 'User Entry'}
                  </span>

                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditingMemory({ ...mem })}
                      className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
                      title="Edit memory"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteMemory(mem.id)}
                      className="p-1 rounded text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                      title="Delete memory"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Memory Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Knowledge to Memory"
        subtitle="Teach ORBIT context, technical skills, or behavioral preferences."
      >
        <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-300">Category</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="p-2.5 rounded-lg bg-input border border-slate-800 text-xs text-slate-200"
            >
              {categories.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <Textarea
            label="What should ORBIT remember?"
            rows={4}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="e.g. Always generate TypeScript with strict types and create unit tests using Vitest..."
            required
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save to Memory
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
