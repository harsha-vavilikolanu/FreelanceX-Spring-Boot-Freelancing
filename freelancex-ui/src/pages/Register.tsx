import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { GlassCard } from '../components/GlassCard';
import { Mail, Lock, User, Briefcase, UserCheck } from 'lucide-react';
import { Role } from '../types';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: Role.FREELANCER as Role
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/register', formData);
      login(res.data.token, res.data);
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12">
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
      
      <GlassCard className="w-full max-w-md relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">Join FreelanceX</h1>
          <p className="text-gray-400 mt-2">Start your journey today</p>
        </div>

        {error && <div className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-500" size={18} />
            <input 
              type="text" placeholder="Full Name" required
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
              className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-primary outline-none"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
            <input 
              type="email" placeholder="Email Address" required
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-primary outline-none"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
            <input 
              type="password" placeholder="Password" required
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-primary outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <button
              type="button"
              onClick={() => setFormData({...formData, role: Role.FREELANCER})}
              className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                formData.role === Role.FREELANCER 
                ? 'bg-primary/20 border-primary text-primary' 
                : 'bg-black/20 border-white/10 text-gray-400 hover:bg-white/5'
              }`}
            >
              <UserCheck size={24} />
              <span className="text-sm font-medium">Freelancer</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({...formData, role: Role.CLIENT})}
              className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                formData.role === Role.CLIENT 
                ? 'bg-primary/20 border-primary text-primary' 
                : 'bg-black/20 border-white/10 text-gray-400 hover:bg-white/5'
              }`}
            >
              <Briefcase size={24} />
              <span className="text-sm font-medium">Client</span>
            </button>
          </div>

          <button disabled={isLoading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-2.5 rounded-lg font-medium mt-4 hover:opacity-90 transition-all text-white">
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Log in</Link>
        </p>
      </GlassCard>
    </div>
  );
}