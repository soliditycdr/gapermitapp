import React from 'react';
import { ArrowLeft, BookOpen, AlertTriangle, ShieldCheck, TrafficCone, ChevronRight, PlayCircle } from 'lucide-react';

interface EducationPageProps {
  onBack: () => void;
  onStartPractice: () => void;
}

const MODULES = [
  {
    id: 1,
    title: "Traffic Signs & Signals",
    description: "Master the language of the road. Learn what colors, shapes, and symbols mean before you even read the text.",
    icon: TrafficCone,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20",
    topics: ["Regulatory Signs", "Warning Signs", "Guide Signs", "Traffic Lights"]
  },
  {
    id: 2,
    title: "Right of Way Rules",
    description: "Avoid accidents by knowing exactly who goes first at intersections, roundabouts, and four-way stops.",
    icon: AlertTriangle,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20",
    topics: ["Intersections", "Pedestrians", "Emergency Vehicles", "Merging"]
  },
  {
    id: 3,
    title: "Safe Driving Practices",
    description: "Defensive driving techniques to keep you safe in adverse weather, night driving, and highway situations.",
    icon: ShieldCheck,
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20",
    topics: ["Following Distance", "Blind Spots", "Hydroplaning", "Night Driving"]
  },
  {
    id: 4,
    title: "Alcohol & Drugs",
    description: "Understand the strict laws regarding DUIs, BAC limits, and the consequences of impaired driving.",
    icon: BookOpen,
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
    topics: ["BAC Limits", "Implied Consent", "Zero Tolerance", "Penalties"]
  }
];

const EducationPage: React.FC<EducationPageProps> = ({ onBack, onStartPractice }) => {
  return (
    <div className="min-h-screen bg-brand-dark font-sans selection:bg-brand-accent selection:text-brand-dark">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-brand-dark/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold text-white">Driver Education Library</h1>
          </div>
          <button 
            onClick={onStartPractice}
            className="hidden sm:flex items-center gap-2 bg-brand-accent hover:bg-brand-accentHover text-brand-dark px-4 py-2 rounded-lg font-bold text-sm transition-colors"
          >
            <PlayCircle size={18} />
            <span>Start Practice</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-brand-accent text-xs font-semibold uppercase tracking-wider mb-4 border border-slate-700">
            Official Manual Breakdown
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Get Educated <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-blue-400">First</span>.
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Don't just memorize answers. Understand the core principles of safe driving with our simplified breakdown of the official state driver's manuals.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {MODULES.map((module) => (
            <div 
              key={module.id} 
              className={`rounded-3xl p-8 border ${module.border} bg-slate-900/50 hover:bg-slate-800/50 transition-all duration-300 group`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl ${module.bg} flex items-center justify-center`}>
                  <module.icon className={module.color} size={32} />
                </div>
                <span className="text-slate-500 text-xs font-mono font-bold">MODULE 0{module.id}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-accent transition-colors">
                {module.title}
              </h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                {module.description}
              </p>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Topics Covered</h4>
                {module.topics.map((topic, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0 group/item cursor-pointer">
                    <span className="text-slate-300 text-sm group-hover/item:text-white transition-colors">{topic}</span>
                    <ChevronRight size={16} className="text-slate-600 group-hover/item:text-brand-accent transition-colors opacity-0 group-hover/item:opacity-100" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="mt-20 bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 border border-slate-700 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to test your knowledge?</h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Now that you've reviewed the core concepts, jump into our state-specific simulation to see where you stand.
            </p>
            <button 
              onClick={onStartPractice}
              className="bg-brand-accent hover:bg-brand-accentHover text-brand-dark text-lg px-8 py-4 rounded-full font-bold transition-all transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(45,212,191,0.4)]"
            >
              Start Free Practice
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark border-t border-slate-800 py-8 text-center text-slate-600 text-sm">
        <p>&copy; 2024 USA Driving Tests. Content adapted from official state manuals.</p>
      </footer>
    </div>
  );
};

export default EducationPage;
