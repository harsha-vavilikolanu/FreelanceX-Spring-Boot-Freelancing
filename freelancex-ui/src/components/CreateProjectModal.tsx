import { useState } from 'react';
import { X } from 'lucide-react';
import api from '../api/axios';
import { GlassCard } from './GlassCard';
import type { Project } from '../types';

interface Props {
  onClose: () => void;
  onProjectCreated: (project: Project) => void;
}

export const CreateProjectModal = ({ onClose, onProjectCreated }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/projects', { 
        title, 
        description, 
        budget: parseFloat(budget) 
      });
      onProjectCreated(res.data);
      onClose();
    } catch (error) {
      console.error("Failed to create project", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <GlassCard className="w-full max-w-lg relative bg-[#1a1a1a]">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-white">Post a New Project</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Project Title</label>
            <input 
              required
              value={title} onChange={e => setTitle(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-primary"
              placeholder="e.g. E-commerce Website"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea 
              required rows={4}
              value={description} onChange={e => setDescription(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-primary"
              placeholder="Describe the requirements..."
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Budget ($)</label>
            <input 
              type="number" required min="0" step="0.01"
              value={budget} onChange={e => setBudget(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-primary"
              placeholder="500.00"
            />
          </div>

          <button disabled={loading} className="w-full bg-primary hover:bg-blue-600 text-white py-2.5 rounded-lg mt-2 font-medium transition-colors disabled:opacity-50">
            {loading ? 'Posting...' : 'Post Project'}
          </button>
        </form>
      </GlassCard>
    </div>
  );
};