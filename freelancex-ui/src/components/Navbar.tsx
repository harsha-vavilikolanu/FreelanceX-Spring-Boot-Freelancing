import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-primary-dark transition-colors">
            F
          </div>
          <span className="font-bold text-xl tracking-tight text-text-main">FreelanceX</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">
          <Link to="/dashboard" className="hover:text-primary transition-colors">Browse Projects</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-sm font-medium text-text-main hover:text-primary transition-colors"
            >
              Go to Dashboard
            </button>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors">
                Log in
              </Link>
              <Link 
                to="/login" 
                className="bg-text-main hover:bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-clean hover:shadow-clean-hover"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}