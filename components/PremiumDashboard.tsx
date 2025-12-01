import React from 'react';
import { ArrowLeft, Award, BarChart3, BookOpen, Brain, CheckCircle2, ChevronRight, Crown, LayoutDashboard, PlayCircle, Target, Zap, Heart, Coffee } from 'lucide-react';
import { PremiumExam } from '../types';

interface PremiumDashboardProps {
  onBack: () => void;
  onStartExam: (examId: string) => void;
}

// Mock Data for Premium Dashboard
const PREMIUM_EXAMS: PremiumExam[] = [
  { id: 'mastery-1', title: 'Road Signs Mastery', questionCount: 40, category: 'Signs', difficulty: 'Medium', completed: true, score: 85 },
  { id: 'fines-limits', title: 'Fines & Limits Deep Dive', questionCount: 30, category: 'Laws', difficulty: 'Hard', completed: false },
  { id: 'situational', title: 'Situational Awareness', questionCount: 35, category: 'Safety', difficulty: 'Medium', completed: false },
  { id: 'marathon', title: 'The 100-Question Marathon', questionCount: 100, category: 'Mixed', difficulty: 'Hard', completed: false },
  { id: 'exam-sim-1', title: 'Full Exam Simulation #1', questionCount: 40, category: 'Simulation', difficulty: 'Hard', completed: false },
  { id: 'exam-sim-2', title: 'Full Exam Simulation #2', questionCount: 40, category: 'Simulation', difficulty: 'Hard', completed: false },
];

const PremiumDashboard: React.FC<PremiumDashboardProps> = ({ onBack, onStartExam }) => {
  const handleDonate = () => {
    // In a real app, this would open Stripe Payment Link or PayPal or BuyMeACoffee
    alert("Thank you for your generosity! Donation integration is coming soon.");
  };

  return (
    <div className="min-h-screen bg-brand-dark font-sans selection:bg-brand-accent selection:text-brand-dark">
      {/* Dashboard Header */}
      <header className="sticky top-0 z-40 bg-brand-dark/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
                <LayoutDashboard className="text-brand-accent" size={20} />
                <h1 className="text-xl font-bold text-white">Premium Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gradient-to-r from-amber-500/20 to-yellow-600/20 border border-amber-500/30 px-3 py-1.5 rounded-full">
            <Crown size={16} className="text-amber-500" fill="currentColor" />
            <span className="text-xs font-bold text-amber-500 uppercase tracking-wide">Premium Member</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
            <h2 className="text-2xl text-white font-bold mb-1">Welcome back, Driver!</h2>
            <p className="text-slate-400">You are on the path to mastering the official manual.</p>
        </div>

        <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
            
            {/* Left Column: Stats & Exams */}
            <div className="space-y-8">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                            <Target size={18} className="text-brand-accent" />
                            <span className="text-slate-400 text-xs font-bold uppercase">Readiness Score</span>
                        </div>
                        <div className="text-3xl font-bold text-white">72%</div>
                        <div className="text-xs text-brand-accent mt-1">+12% this week</div>
                    </div>
                    <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 size={18} className="text-green-500" />
                            <span className="text-slate-400 text-xs font-bold uppercase">Questions Mastered</span>
                        </div>
                        <div className="text-3xl font-bold text-white">45<span className="text-slate-500 text-lg">/180</span></div>
                    </div>
                    <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                         <div className="flex items-center gap-2 mb-2">
                            <Zap size={18} className="text-yellow-500" />
                            <span className="text-slate-400 text-xs font-bold uppercase">Study Streak</span>
                        </div>
                        <div className="text-3xl font-bold text-white">3 <span className="text-sm font-normal text-slate-400">Days</span></div>
                    </div>
                </div>

                {/* Exam Library */}
                <section>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <BookOpen size={20} className="text-slate-400" />
                        Premium Exam Library
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {PREMIUM_EXAMS.map(exam => (
                            <button 
                                key={exam.id}
                                onClick={() => onStartExam(exam.id)}
                                className="bg-slate-900 border border-slate-700 hover:border-brand-accent p-5 rounded-xl text-left transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Award size={60} />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                            exam.difficulty === 'Hard' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                                            exam.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                                            'bg-green-500/10 text-green-400 border-green-500/20'
                                        }`}>
                                            {exam.difficulty}
                                        </span>
                                        {exam.completed && (
                                            <div className="flex items-center gap-1 text-green-400 text-xs font-bold">
                                                <CheckCircle2 size={14} />
                                                Score: {exam.score}%
                                            </div>
                                        )}
                                    </div>
                                    <h4 className="text-white font-bold mb-1 group-hover:text-brand-accent transition-colors">{exam.title}</h4>
                                    <p className="text-slate-500 text-xs mb-4">{exam.questionCount} Questions • {exam.category}</p>
                                    
                                    <div className="flex items-center gap-2 text-brand-accent text-sm font-bold group-hover:translate-x-1 transition-transform">
                                        {exam.completed ? 'Retake Exam' : 'Start Exam'} <ChevronRight size={16} />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            </div>

            {/* Right Column: Weakness & AI Tips */}
            <div className="space-y-8">
                {/* Weakness Analysis */}
                <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <BarChart3 size={20} className="text-brand-accent" />
                        Weakness Analysis
                    </h3>
                    <div className="space-y-5">
                        {[
                            { label: "Road Signs", val: 85, color: "bg-green-500" },
                            { label: "Fines & Limits", val: 40, color: "bg-red-500" },
                            { label: "Right of Way", val: 65, color: "bg-yellow-500" },
                            { label: "Driving Safety", val: 75, color: "bg-blue-500" }
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-xs font-bold text-slate-400 mb-1 uppercase tracking-wide">
                                    <span>{stat.label}</span>
                                    <span>{stat.val}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                                    <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${stat.val}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Tutor Suggestions */}
                <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-3xl p-6 border border-indigo-500/30">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-300">
                            <Brain size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-white">AI Tutor Suggestions</h3>
                    </div>
                    <ul className="space-y-4">
                        <li className="flex gap-3 text-sm text-slate-300">
                            <div className="min-w-[4px] bg-red-500 rounded-full"></div>
                            <p>You are consistently missing questions about <strong className="text-white">BAC limits for commercial drivers</strong>. Review Chapter 5.</p>
                        </li>
                        <li className="flex gap-3 text-sm text-slate-300">
                            <div className="min-w-[4px] bg-yellow-500 rounded-full"></div>
                            <p>Great job on Road Signs! Try the <strong className="text-white">Fines & Limits Deep Dive</strong> next to balance your score.</p>
                        </li>
                    </ul>
                    <button onClick={() => onStartExam('fines-limits')} className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold text-sm transition-colors">
                        Practice Fines Now
                    </button>
                </div>

                {/* Donation / Support Section */}
                <div className="bg-gradient-to-br from-pink-900/30 to-rose-900/30 rounded-3xl p-6 border border-pink-500/20 relative overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Heart size={100} className="text-pink-500" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400">
                                <Heart size={20} fill="currentColor" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Support Our Mission</h3>
                        </div>
                        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                            We are committed to keeping this platform <strong>100% free</strong> to help everyone drive safely.
                            <br/><br/>
                            If this platform helped you, consider supporting us to keep the servers running.
                        </p>
                        <button 
                            onClick={handleDonate}
                            className="w-full bg-pink-600 hover:bg-pink-500 text-white py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-pink-900/20"
                        >
                            <Coffee size={18} />
                            Donate & Support
                        </button>
                    </div>
                </div>

            </div>
        </div>

      </main>
    </div>
  );
};

export default PremiumDashboard;