import React from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Shield, Brain, Target, PlayCircle } from 'lucide-react';

interface WhyUsPageProps {
  onBack: () => void;
  onStartPractice: () => void;
}

const COMPARISON = [
  {
    feature: "Content Source",
    us: "Official 2024 State Manuals",
    them: "Outdated crowdsourced questions"
  },
  {
    feature: "Learning Method",
    us: "Active Recall & Explanations",
    them: "Rote memorization (Cheat sheets)"
  },
  {
    feature: "State Specificity",
    us: "100% Tailored to GA, CA, TX, FL, NY",
    them: "Generic 'USA' question banks"
  },
  {
    feature: "Ad Experience",
    us: "Minimal / Ad-Free Premium",
    them: "Cluttered with distracting ads"
  }
];

const WhyUsPage: React.FC<WhyUsPageProps> = ({ onBack, onStartPractice }) => {
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
            <h1 className="text-xl font-bold text-white">Our Mission</h1>
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
        <div className="text-center mb-20">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-brand-accent text-xs font-semibold uppercase tracking-wider mb-4 border border-slate-700">
            The USA Driving Tests Difference
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8">
            We Don't Just Help You Pass.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-blue-500">We Teach You To Drive.</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Most apps treat the permit test like a hurdle to jump over. We treat it like the first step in a lifelong journey of safety. Here is why thousands of students trust us.
          </p>
        </div>

        {/* The Problem & Solution Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 text-red-400">
              <Brain size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">The Problem</h3>
            <p className="text-slate-400 leading-relaxed">
              Rote memorization fails when you face a real-world situation that doesn't match the exact wording of a question. "Cheat sheets" create dangerous drivers.
            </p>
          </div>
          
          <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-3xl"></div>
            <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-6 text-brand-accent">
              <Shield size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Our Philosophy</h3>
            <p className="text-slate-400 leading-relaxed">
              We focus on the <strong className="text-white">"Why"</strong>. When you understand the logic behind a right-of-way rule, you don't need to memorize it—you just know it.
            </p>
          </div>

          <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
             <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-400">
              <Target size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">The Result</h3>
            <p className="text-slate-400 leading-relaxed">
              Our students don't just pass their permit test on the first try (94% do); they enter their driving lessons with confidence and actual knowledge.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-slate-800/30 rounded-3xl p-8 md:p-12 border border-slate-700 mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white">Us vs. The Others</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="py-4 px-6 text-slate-500 font-medium text-sm uppercase tracking-wider">Feature</th>
                  <th className="py-4 px-6 text-brand-accent font-bold text-lg bg-brand-accent/5 rounded-t-xl">USA Driving Tests</th>
                  <th className="py-4 px-6 text-slate-500 font-bold text-lg">Generic Free Apps</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {COMPARISON.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-6 px-6 text-white font-medium">{row.feature}</td>
                    <td className="py-6 px-6 bg-brand-accent/5">
                      <div className="flex items-center gap-2 text-white">
                        <CheckCircle2 size={20} className="text-brand-accent" />
                        {row.us}
                      </div>
                    </td>
                    <td className="py-6 px-6 text-slate-400">
                       <div className="flex items-center gap-2">
                        <XCircle size={20} className="text-slate-600" />
                        {row.them}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Founder Story Expanded */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-24">
           <div>
              <div className="inline-block px-3 py-1 rounded-full bg-slate-800 text-white text-xs font-bold uppercase tracking-wider mb-6">
                Origin Story
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">Built From Failure.</h3>
              <div className="space-y-4 text-slate-400 leading-relaxed text-lg">
                <p>
                  "I failed my first permit test in Georgia. I was embarrassed. I had spent hours memorizing questions from a popular free app, but when I got to the DDS, the phrasing was different."
                </p>
                <p>
                  "I realized I hadn't learned to drive—I had learned to take a quiz. That night, I threw away the cheat sheets and opened the official manual."
                </p>
                <p>
                  "I built <span className="text-white font-semibold">USA Driving Tests</span> to be the tool I wished I had. One that respects your intelligence and values your safety."
                </p>
                <p className="font-bold text-brand-accent mt-4">- Alex R., Founder</p>
              </div>
           </div>
           <div className="relative h-[500px] bg-slate-800 rounded-3xl overflow-hidden border border-slate-700">
              <img 
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop" 
                alt="Person analyzing documents" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-brand-dark to-transparent">
                 <p className="text-white font-bold text-xl">"No shortcuts. Just smart preparation."</p>
              </div>
           </div>
        </section>

        {/* Final CTA */}
        <div className="text-center">
           <h3 className="text-2xl font-bold text-white mb-6">Join the 94% who pass on their first try.</h3>
           <button 
              onClick={onStartPractice}
              className="bg-brand-accent hover:bg-brand-accentHover text-brand-dark text-lg px-10 py-5 rounded-full font-bold transition-all shadow-lg hover:shadow-brand-accent/20 hover:-translate-y-1"
            >
              Start Your Free Test Now
            </button>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-brand-dark border-t border-slate-800 py-8 text-center text-slate-600 text-sm">
        <p>&copy; 2024 USA Driving Tests. Ethical driving education.</p>
      </footer>
    </div>
  );
};

export default WhyUsPage;
