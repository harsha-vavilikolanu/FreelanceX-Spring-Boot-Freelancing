import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  ArrowRight, 
  Briefcase, 
  Users, 
  Search, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto w-full text-center lg:text-left lg:flex lg:items-center lg:gap-16 relative z-10">
        <div className="lg:w-1/2 space-y-8">
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-text-main leading-[1.1]">
            Connect with Freelancers and <span className="text-primary">Get Done Faster.</span>
          </h1>

          <p className="text-xl text-text-muted leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Post your project, connect with skilled freelancers, and start working in minutes. The cleanest way to manage your work.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
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

        {/* RIGHT SIDE SLIDESHOW */}
        <HeroSlideshow />
      </section>

      {/* Core Features */}
      <section id="features" className="py-24 bg-surface/50 border-t border-border-subtle relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-main mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Streamlined tools to help you manage projects and communications effortlessly.
            </p>
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

      {/* ✅ FIXED CTA SECTION (NO OVERLAP NOW) */}
      <section className="relative z-20 py-28 px-6 bg-text-main text-white text-center overflow-hidden">
        <div className="relative z-30 max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold">
            Start Connecting with Freelancers Today
          </h2>

          <p className="text-gray-400 text-lg">
            Join thousands of professionals getting work done on FreelanceX.
          </p>

          <Link 
            to="/login" 
            className="inline-block px-10 py-4 bg-primary hover:bg-primary-dark text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border-subtle py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="font-bold text-lg mb-4 flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary text-white flex items-center justify-center text-xs">
                F
              </div>
              FreelanceX
            </div>
            <p className="text-sm text-text-muted">
              The minimal platform for modern work.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>
                <Link to="/login" className="hover:text-primary">Post Project</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-primary">Browse</Link>
              </li>
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

/* ============================
   HERO SLIDESHOW
============================ */

const heroSlides = [
  {
    title: "Post projects in minutes",
    description: "Create a project brief, set your budget and timeline, and instantly reach a pool of verified freelancers.",
    badge: "For Clients",
  },
  {
    title: "Discover high-quality freelance gigs",
    description: "Browse curated projects that match your skills, apply with one click, and grow your freelance income.",
    badge: "For Freelancers",
  },
  {
    title: "Chat, share files & track progress",
    description: "All conversations, files, and milestones in one clean workspace—no messy email threads.",
    badge: "Workflow",
  }
];

function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const slide = heroSlides[index];

  return (
    <div className="hidden lg:block lg:w-1/2 relative z-10">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl transform rotate-3 scale-95 opacity-60"></div>

      <div className="relative bg-white border border-border-subtle rounded-2xl shadow-xl p-8">
        <div className="inline-block mb-4 px-4 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
          {slide.badge}
        </div>

        <h3 className="text-2xl font-bold mb-3 text-text-main">
          {slide.title}
        </h3>

        <p className="text-text-muted leading-relaxed mb-8">
          {slide.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center hover:bg-surface">
              <ChevronLeft size={18} />
            </button>

            <button onClick={next} className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center hover:bg-surface">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <div 
                key={i}
                className={`h-2 w-2 rounded-full ${i === index ? "bg-primary" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================
   FEATURE CARD
============================ */

function FeatureCard({ icon, title, desc }: { 
  icon: React.ReactNode, 
  title: string, 
  desc: string 
}) {
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
