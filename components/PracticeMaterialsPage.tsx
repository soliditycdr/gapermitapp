import React from 'react';
import { ArrowLeft, FileText, Layers, Zap, Download, PlayCircle, CheckCircle2 } from 'lucide-react';

interface PracticeMaterialsPageProps {
  onBack: () => void;
  onStartPractice: () => void;
}

const CATEGORIES = [
  {
    id: 'signs',
    title: "Road Signs & Markings",
    count: "50+ Questions",
    description: "Focus purely on visual identification of regulatory, warning, and guide signs.",
    icon: Layers,
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    id: 'fines',
    title: "Fines & Limits",
    count: "30+ Questions",
    description: "Memorize the specific numbers: speed limits, blood alcohol content, and violation penalties.",
    icon: FileText,
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  },
  {
    id: 'marathon',
    title: "Exam Marathon",
    count: "100+ Questions",
    description: "A grueling session covering every possible topic. Great for final preparation.",
    icon: Zap,
    color: "text-brand-accent",
    bg: "bg-brand-accent/10"
  }
];

const DOWNLOADS = [
  { title: "Top 50 Most Common Signs PDF", size: "2.4 MB" },
  { title: "Fines & Penalties Cheat Sheet", size: "1.1 MB" },
  { title: "Parent-Teen Driving Guide", size: "3.5 MB" }
];

const PracticeMaterialsPage: React.FC<PracticeMaterialsPageProps> = ({ onBack, onStartPractice }) => {
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
            <h1 className="text-xl font-bold text-white">Practice Materials</h1>
          </div>
          <button 
            onClick={onStartPractice}
            className="hidden sm:flex items-center gap-2 bg-brand-accent hover:bg-brand-accentHover text-brand-dark px-4 py-2 rounded-lg font-bold text-sm transition-colors"
          >
            <PlayCircle size={18} />
            <span>Start Simulation</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-slate-700">
            Study Resources
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Everything You Need <br className="hidden md:block" />
            To <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-purple-400">Master The Road</span>.
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Access topic-specific quizzes, printable cheat sheets, and deep-dive study guides designed to reinforce your knowledge.
          </p>
        </div>

        {/* Topic Tests */}
        <section className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Layers className="text-brand-accent" />
            Topic-Specific Drills
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-brand-accent/30 transition-all group relative overflow-hidden">
                <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110`}>
                  <cat.icon size={100} className={cat.color} />
                </div>
                
                <div className={`w-12 h-12 rounded-xl ${cat.bg} flex items-center justify-center mb-4`}>
                  <cat.icon className={cat.color} size={24} />
                </div>
                
                <h4 className="text-xl font-bold text-white mb-2">{cat.title}</h4>
                <div className="text-xs font-mono text-slate-500 mb-4 bg-slate-800 inline-block px-2 py-1 rounded">
                  {cat.count}
                </div>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed relative z-10">
                  {cat.description}
                </p>
                
                <button 
                  onClick={onStartPractice}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  Start Drill
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Downloadable Resources */}
        <section className="grid md:grid-cols-2 gap-12 items-center bg-slate-800/30 rounded-3xl p-8 md:p-12 border border-slate-800">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Printable Practice Sheets</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Perfect for last-minute review. Download these condensed guides to keep the most critical numbers and rules in your pocket.
            </p>
            <div className="space-y-4">
              {DOWNLOADS.map((file, i) => (
                <div key={i} className="flex items-center justify-between bg-brand-dark p-4 rounded-xl border border-slate-700 hover:border-brand-accent/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-800 p-2 rounded-lg text-slate-400 group-hover:text-brand-accent transition-colors">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h5 className="text-white font-medium text-sm group-hover:text-brand-accent transition-colors">{file.title}</h5>
                      <span className="text-xs text-slate-500">{file.size} • PDF</span>
                    </div>
                  </div>
                  <button className="text-slate-400 group-hover:text-brand-accent transition-colors">
                    <Download size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            {/* Abstract visual representation of a document */}
            <div className="absolute inset-0 bg-brand-accent/20 blur-3xl rounded-full transform rotate-12"></div>
            <div className="relative bg-brand-dark border border-slate-700 rounded-xl p-6 rotate-3 shadow-2xl max-w-sm mx-auto">
               <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-bold text-xs">PDF</div>
                  <div>
                    <div className="h-2 w-24 bg-slate-700 rounded-full mb-1"></div>
                    <div className="h-2 w-16 bg-slate-800 rounded-full"></div>
                  </div>
               </div>
               <div className="space-y-3">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="flex gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-slate-700 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="h-2 bg-slate-700 rounded-full w-full mb-1"></div>
                        <div className="h-2 bg-slate-800 rounded-full w-2/3"></div>
                      </div>
                    </div>
                  ))}
               </div>
               <div className="mt-6 flex justify-center">
                  <div className="px-4 py-2 bg-brand-accent text-brand-dark font-bold text-xs rounded uppercase tracking-wider">
                     Preview Mode
                  </div>
               </div>
            </div>
          </div>
        </section>
      </main>

       {/* Footer */}
       <footer className="bg-brand-dark border-t border-slate-800 py-8 text-center text-slate-600 text-sm">
        <p>&copy; 2024 USA Driving Tests. All materials strictly for educational use.</p>
      </footer>
    </div>
  );
};

export default PracticeMaterialsPage;