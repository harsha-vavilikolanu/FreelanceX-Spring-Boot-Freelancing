import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { type Project, Role } from '../types';
import { useAuth } from '../context/AuthContext';
import { GlassCard } from '../components/GlassCard';
import { CreateProjectModal } from '../components/CreateProjectModal';
import { Plus, DollarSign, User as UserIcon, LogOut, Briefcase, MessageSquare, MessageCircle } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, [user]);

  const fetchProjects = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      // Check for both "CLIENT" and "ROLE_CLIENT"
      // Cast to string to satisfy TypeScript strict checks
      const isClient = user.role === 'CLIENT' || (user.role as string) === 'ROLE_CLIENT';
      const endpoint = isClient ? '/projects/my' : '/projects';
      
      const res = await api.get(endpoint);
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessageClick = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation(); 
    navigate('/chat', {
      state: {
        projectId: project.id,
        otherUserId: project.clientId,
        otherUserName: project.clientName,
        projectTitle: project.title
      }
    });
  };

  // ROBUST ROLE CHECKS (Handles "FREELANCER" vs "ROLE_FREELANCER")
  // We cast to string here as well to prevent "no overlap" TypeScript errors
  const isFreelancer = user?.role === 'FREELANCER' || (user?.role as string) === 'ROLE_FREELANCER';
  const isClient = user?.role === 'CLIENT' || (user?.role as string) === 'ROLE_CLIENT';

  return (
    <div className="min-h-screen pb-20">
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white">F</div>
            <span className="font-bold text-lg tracking-tight text-white">FreelanceX</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/chat" className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors relative">
               <MessageSquare size={20} />
            </Link>

            <div className="h-6 w-px bg-white/10 mx-2 hidden md:block"></div>

            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-medium text-white">{user?.fullName}</span>
              <span className="text-xs text-blue-400">{user?.role}</span>
            </div>
            <button onClick={logout} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {isClient ? 'My Projects' : 'Explore Work'}
            </h1>
            <p className="text-gray-400 mt-1">
              {isClient ? 'Manage your active listings' : 'Find your next big opportunity'}
            </p>
          </div>
          
          {isClient && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all font-medium shadow-lg shadow-blue-500/20"
            >
              <Plus size={18} /> Post Project
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-gray-500">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-xl">
            <Briefcase size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-medium text-gray-300">No Projects Found</h3>
            <p className="text-gray-500">
              {isClient ? "You haven't posted any projects yet." : "No active projects available."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <GlassCard key={p.id} delay={i * 0.05} className="group cursor-pointer flex flex-col h-full">
                 <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-white/5 rounded-full text-gray-400">
                      <UserIcon size={16} />
                    </div>
                    <span className="text-xs font-medium text-gray-400">{p.clientName}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-xs border border-green-500/20">Active</span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">{p.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed flex-1">{p.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                  <div className="flex items-center text-white font-medium">
                    <DollarSign size={16} className="text-gray-500 mr-1" />
                    {p.budget.toLocaleString()}
                  </div>

                  {/* SEND MESSAGE BUTTON (Only for Freelancers) */}
                  {isFreelancer && (
                    <button 
                      onClick={(e) => handleMessageClick(e, p)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors border border-blue-500/20 text-xs font-medium z-10 relative"
                    >
                      <MessageCircle size={14} />
                      Message Client
                    </button>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <CreateProjectModal 
          onClose={() => setIsModalOpen(false)} 
          onProjectCreated={(newProject) => setProjects([newProject, ...projects])}
        />
      )}
    </div>
  );
}