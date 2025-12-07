import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:bg-primary-dark transition-colors">
            F
          </div>
          <span className="font-extrabold text-lg tracking-tight text-text-main">
            FreelanceX
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-text-muted">
          <NavItem to="/dashboard">Browse Projects</NavItem>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="px-5 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-full transition shadow-sm"
            >
              Go to Dashboard
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-text-muted hover:text-text-main transition-colors"
              >
                Log in
              </Link>

              <Link
                to="/login"
                className="bg-text-main hover:bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-clean hover:shadow-clean-hover"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-surface"
          onClick={() => setOpen(!open)}
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-border-subtle px-6 py-6 space-y-5 text-sm">
          <MobileNavItem to="/dashboard" setOpen={setOpen}>
            Browse Projects
          </MobileNavItem>

          <div className="pt-4 border-t border-border-subtle space-y-3">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setOpen(false);
                  navigate('/dashboard');
                }}
                className="w-full bg-primary text-white py-2.5 rounded-full font-semibold"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center py-2 rounded-lg font-medium text-text-main"
                >
                  Log in
                </Link>

                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center py-2.5 rounded-full bg-text-main text-white font-semibold"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

/* ============================
   Reusable Nav Item (Desktop)
============================ */

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="relative hover:text-text-main transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
    >
      {children}
    </Link>
  );
}

/* ============================
   Mobile Nav Item
============================ */

function MobileNavItem({
  to,
  setOpen,
  children,
}: {
  to: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      className="block font-medium text-text-main"
    >
      {children}
    </Link>
  );
}
