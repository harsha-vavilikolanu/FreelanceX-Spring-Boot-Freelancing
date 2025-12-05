import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ArrowRight, Briefcase, Users, Search } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto w-full text-center lg:text-left lg:flex lg:items-center lg:gap-16">
        <div className="lg:w-1/2 space-y-8">
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-text-main leading-[1.1]">
            Connect with Freelancers and <span className="text-primary">Get Done Faster.</span>
          </h1>
          <p className="text-xl text-text-muted leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Post your project, connect with skilled freelancers, and start working in minutes. The cleanest way to manage your work.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            {/* Primary CTA linked to Login */}
            <Link 
              to="/login" 
              className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-full font-medium transition-all shadow-clean hover:shadow-clean-hover flex items-center justify-center gap-2"
            >
              Post a Project <ArrowRight size={18} />
            </Link>
            <Link 
              to="/dashboard" 
              className="w-full sm:w-auto px-8 py-3.5 bg-white border border-border-subtle text-text-main hover:bg-surface rounded-full font-medium transition-all"
            >
              Browse Projects
            </Link>
          </div>
        </div>

        {/* Visual Mockup */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl transform rotate-3 scale-95 opacity-50"></div>
          <div className="relative bg-white border border-border-subtle rounded-2xl shadow-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center">
                  <Briefcase size={20} className="text-primary" />
                </div>
                <div>
                  <div className="h-2.5 w-32 bg-gray-200 rounded-full mb-1.5"></div>
                  <div className="h-2 w-20 bg-gray-100 rounded-full"></div>
                </div>
              </div>
              <div className="px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">Active</div>
            </div>
            <div className="space-y-3 py-2">
              <div className="h-2 w-full bg-gray-100 rounded-full"></div>
              <div className="h-2 w-[90%] bg-gray-100 rounded-full"></div>
              <div className="h-2 w-[80%] bg-gray-100 rounded-full"></div>
            </div>
            <div className="flex gap-3 pt-2">
              <div className="flex-1 h-10 bg-primary/5 rounded-lg border border-primary/10"></div>
              <div className="flex-1 h-10 bg-surface rounded-lg border border-border-subtle"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-24 bg-surface/50 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-main mb-4">Everything you need to succeed</h2>
            <p className="text-text-muted max-w-2xl mx-auto">Streamlined tools to help you manage projects and communications effortlessly.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Briefcase className="text-primary" />}
              title="Post a Project"
              desc="Easily define your requirements and budget. Get proposals from qualified experts instantly."
            />
            <FeatureCard 
              icon={<Users className="text-primary" />}
              title="Connect & Chat"
              desc="Real-time messaging built-in. Discuss details, share files, and stay aligned."
            />
            <FeatureCard 
              icon={<Search className="text-primary" />}
              title="Browse Opportunities"
              desc="Freelancers can filter through curated project lists to find their next big gig."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-text-main text-white text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold">Start Connecting with Freelancers Today</h2>
          <p className="text-gray-400 text-lg">Join thousands of professionals getting work done on FreelanceX.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             {/* CTA Button linked to Login */}
             <Link 
              to="/login" 
              className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-full font-medium transition-all"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border-subtle py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="font-bold text-lg mb-4 flex items-center gap-2">
               <div className="w-6 h-6 rounded bg-primary text-white flex items-center justify-center text-xs">F</div>
               FreelanceX
            </div>
            <p className="text-sm text-text-muted">The minimal platform for modern work.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><Link to="/login" className="hover:text-primary">Post Project</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary">Browse</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-border-subtle text-center text-sm text-text-muted">
          © {new Date().getFullYear()} FreelanceX. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-border-subtle shadow-clean hover:shadow-clean-hover transition-all duration-300 group">
      <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-text-main">{title}</h3>
      <p className="text-text-muted leading-relaxed">{desc}</p>
    </div>
  );
}