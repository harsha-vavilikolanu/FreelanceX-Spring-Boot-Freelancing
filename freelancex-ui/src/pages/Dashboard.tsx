import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { type Project } from '../types';
import { useAuth } from '../context/AuthContext';
import { GlassCard } from '../components/GlassCard';
import { CreateProjectModal } from '../components/CreateProjectModal';
import { Plus, DollarSign, User as UserIcon, LogOut, Briefcase, MessageSquare, MessageCircle, Github, Twitter, Linkedin } from 'lucide-react';

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

  const isFreelancer = user?.role === 'FREELANCER' || (user?.role as string) === 'ROLE_FREELANCER';
  const isClient = user?.role === 'CLIENT' || (user?.role as string) === 'ROLE_CLIENT';

  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      
      {/* PROFESSIONAL HEADER */}
      <nav className="border-b border-border bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-white shadow-md">F</div>
            <span className="font-bold text-xl tracking-tight text-gray-900">FreelanceX</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/chat" className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium">
               <MessageSquare size={18} /> Messages
            </Link>

            <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-semibold text-gray-800">{user?.fullName}</span>
              <span className="text-xs text-primary font-medium">{user?.role}</span>
            </div>
            <button onClick={logout} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-red-500">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isClient ? 'My Projects' : 'Explore Opportunities'}
            </h1>
            <p className="text-gray-500 mt-2">
              {isClient ? 'Manage your active listings and view proposals' : 'Find your next big project and apply today'}
            </p>
          </div>
          
          {isClient && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all font-medium shadow-lg shadow-blue-500/20"
            >
              <Plus size={18} /> Post Project
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-gray-500">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-surface rounded-xl border border-dashed border-gray-300">
            <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-600">No Projects Found</h3>
            <p className="text-gray-400 mt-1">
              {isClient ? "You haven't posted any projects yet." : "No active projects available at the moment."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <GlassCard key={p.id} delay={i * 0.05} className="group cursor-pointer flex flex-col h-full bg-white hover:bg-white">
                 <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gray-100 rounded-full text-gray-500">
                      <UserIcon size={16} />
                    </div>
                    <span className="text-xs font-medium text-gray-500">{p.clientName}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium border border-green-200">Active</span>
                </div>
                
                <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed flex-1">{p.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                  <div className="flex items-center text-gray-900 font-bold">
                    <DollarSign size={16} className="text-gray-400 mr-1" />
                    {p.budget.toLocaleString()}
                  </div>

                  {isFreelancer && (
                    <button 
                      onClick={(e) => handleMessageClick(e, p)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white text-primary rounded-lg transition-colors border border-primary hover:bg-blue-50 text-xs font-medium"
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

      {/* PROFESSIONAL FOOTER */}
      <footer className="bg-white border-t border-border mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <span className="font-bold text-gray-900">FreelanceX</span>
              <p className="text-sm text-gray-500 mt-1">© 2024 FreelanceX Inc. All rights reserved.</p>
            </div>
            
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
            </div>

            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-gray-600"><Github size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-700"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
      </footer>

      {isModalOpen && (
        <CreateProjectModal 
          onClose={() => setIsModalOpen(false)} 
          onProjectCreated={(newProject) => setProjects([newProject, ...projects])}
        />
      )}
    </div>
  );
}