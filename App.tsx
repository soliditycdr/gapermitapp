import React, { useState, useEffect } from 'react';
import {
MapPin,
ChevronDown,
Menu,
X,
ShieldCheck,
TrendingUp,
Smartphone,
Award,
CheckCircle2,
ThumbsUp,
AlertTriangle,
Brain
} from 'lucide-react';
import { SUPPORTED_STATES, FEATURES, PRICING_PLANS, HERO_SLIDES } from './constants';
import { StateConfig, PricingPlan } from './types';
import PracticePage from './components/PracticePage';
import EducationPage from './components/EducationPage';
import PracticeMaterialsPage from './components/PracticeMaterialsPage';
import WhyUsPage from './components/WhyUsPage';
import PaymentModal from './components/PaymentModal';
import PremiumDashboard from './components/PremiumDashboard';
function App() {
const [selectedState, setSelectedState] = useState<StateConfig>(SUPPORTED_STATES[0]);
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isScrolled, setIsScrolled] = useState(false);
const [currentView, setCurrentView] = useState<'landing' | 'practice' | 'education' | 'materials' | 'why-us' | 'premium-dashboard'>('landing');
const [currentSlide, setCurrentSlide] = useState(0);
const [passRate, setPassRate] = useState(0);
// Payment State
const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
// Handle scroll effect for sticky header
useEffect(() => {
const handleScroll = () => {
setIsScrolled(window.scrollY > 20);
};
window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);
// Slider Timer
useEffect(() => {
const timer = setInterval(() => {
setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
}, 4000);
return () => clearInterval(timer);
}, []);
// Pass Rate Counter Animation
useEffect(() => {
const duration = 2000; // 2 seconds
const target = 94;
const steps = 60;
const increment = target / steps;
const intervalTime = duration / steps;
  let current = 0;
const timer = setInterval(() => {
  current += increment;
  if (current >= target) {
    setPassRate(target);
    clearInterval(timer);
  } else {
    setPassRate(Math.floor(current));
  }
}, intervalTime);

return () => clearInterval(timer);
  }, []);
const toggleState = (state: StateConfig) => {
if (state.comingSoon) return; // Prevent selection if coming soon
setSelectedState(state);
setIsMenuOpen(false); // Close mobile menu if open
};
const handleStartPractice = () => {
window.scrollTo(0, 0);
setCurrentView('practice');
setIsMenuOpen(false);
};
const handleStartEducation = () => {
window.scrollTo(0, 0);
setCurrentView('education');
setIsMenuOpen(false);
}
const handleStartMaterials = () => {
window.scrollTo(0, 0);
setCurrentView('materials');
setIsMenuOpen(false);
}
const handleStartWhyUs = () => {
window.scrollTo(0, 0);
setCurrentView('why-us');
setIsMenuOpen(false);
}
const handleBackToHome = () => {
window.scrollTo(0, 0);
setCurrentView('landing');
};
// Payment Handlers
const handleGetAccess = (plan: PricingPlan) => {
if (plan.id === 'free') {
handleStartPractice();
} else {
setSelectedPlan(plan);
setIsPaymentModalOpen(true);
}
};
const handlePaymentSuccess = () => {
setIsPaymentModalOpen(false);
window.scrollTo(0, 0);
setCurrentView('premium-dashboard');
};
// Render Premium Dashboard
if (currentView === 'premium-dashboard') {
return (
<PremiumDashboard
onBack={handleBackToHome}
onStartExam={(examId) => {
console.log("Starting premium exam:", examId);
// For now, reuse the practice interface logic
handleStartPractice();
}}
/>
);
}
// Render Practice Page if view is practice
if (currentView === 'practice') {
return (
<div className="min-h-screen font-sans bg-brand-dark selection:bg-brand-accent selection:text-brand-dark">
<PracticePage
selectedState={selectedState}
onClose={handleBackToHome}
/>
</div>
);
}
// Render Education Page if view is education
if (currentView === 'education') {
return (
<EducationPage
onBack={handleBackToHome}
onStartPractice={handleStartPractice}
/>
);
}
// Render Materials Page if view is materials
if (currentView === 'materials') {
return (
<PracticeMaterialsPage
onBack={handleBackToHome}
onStartPractice={handleStartPractice}
/>
);
}
// Render Why Us Page if view is why-us
if (currentView === 'why-us') {
return (
<WhyUsPage
onBack={handleBackToHome}
onStartPractice={handleStartPractice}
/>
);
}
return (
<div className="min-h-screen font-sans selection:bg-brand-accent selection:text-brand-dark">
  {/* Payment Modal */}
  {isPaymentModalOpen && selectedPlan && (
    <PaymentModal 
      plan={selectedPlan} 
      onClose={() => setIsPaymentModalOpen(false)} 
      onSuccess={handlePaymentSuccess}
    />
  )}
  
  {/* --- Sticky Header --- */}
  <header className={`fixed top-0 left-0 right-0 z-50 flex flex-col transition-all duration-300 ${
    isScrolled ? 'bg-brand-dark/95 backdrop-blur-md shadow-lg border-b border-slate-800' : 'bg-transparent'
  }`}>
    
    {/* Important Beta Notice */}
    <div className="bg-amber-500 text-slate-900 py-1.5 px-4 text-center text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
        <AlertTriangle size={14} className="stroke-[3px]" />
        <span>USA DRIVING TESTS: Beta Website | Education Based Website | Demo Data Only | Do Not Perform The Test For Now | Development Phase | Completely Free Website | Do Not Make Any Payment</span>
    </div>

    <div className={`w-full transition-all duration-300 ${isScrolled ? '' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo - Text Only (US Flag Colors) */}
        <div className="flex items-center group cursor-pointer select-none" onClick={() => window.scrollTo(0,0)}>
            <span className="font-black text-2xl tracking-tighter leading-none transition-transform group-hover:scale-105 duration-200">
                <span className="text-red-500">USA</span>
                <span className="text-white mx-1.5">DRIVING</span>
                <span className="text-blue-500">TESTS</span>
            </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
            {/* Reordered Menu */}
            <button 
            onClick={handleStartEducation}
            className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
            >
            Get Educated First
            </button>
            <button 
            onClick={handleStartMaterials}
            className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
            >
            Practice Materials
            </button>
            <button 
            onClick={handleStartWhyUs} 
            className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
            >
            Why Us
            </button>
            <a href="#pricing" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">Pricing</a>
            
            {/* State Selector */}
            <div className="relative group">
            <button className="flex items-center gap-2 text-white bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 text-sm hover:border-brand-accent transition-colors">
                <MapPin size={14} className="text-brand-accent" />
                <span>{selectedState.code}</span>
                <ChevronDown size={14} />
            </button>
            {/* Dropdown */}
            <div className="absolute top-full right-0 mt-2 w-64 bg-brand-primary border border-slate-700 rounded-xl shadow-xl overflow-hidden hidden group-hover:block animate-in fade-in slide-in-from-top-2">
                {SUPPORTED_STATES.map((state) => (
                <button
                    key={state.code}
                    onClick={() => toggleState(state)}
                    disabled={state.comingSoon}
                    className={`w-full text-left px-4 py-3 text-sm border-b border-slate-700/50 last:border-0 flex justify-between items-center
                    ${state.comingSoon 
                        ? 'opacity-60 cursor-not-allowed bg-slate-800/50' 
                        : 'hover:bg-slate-700 transition-colors cursor-pointer'}
                    ${selectedState.code === state.code ? 'text-brand-accent font-semibold' : 'text-slate-300'}
                    `}
                >
                    <span>{state.name}</span>
                    {state.comingSoon && (
                    <span className="text-[10px] bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded border border-slate-600">Coming Soon</span>
                    )}
                </button>
                ))}
            </div>
            </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
        </button>
        </div>
    </div>

    {/* Mobile Nav */}
    {isMenuOpen && (
      <div className="md:hidden bg-brand-primary border-t border-slate-700 absolute top-full left-0 right-0 w-full px-6 py-6 space-y-4 shadow-2xl z-40">
        <div className="flex flex-col gap-4">
          <button 
            onClick={handleStartEducation}
            className="text-slate-300 text-left"
          >
            Get Educated First
          </button>
           <button 
            onClick={handleStartMaterials}
            className="text-slate-300 text-left"
          >
            Practice Materials
          </button>
          <button 
            onClick={handleStartWhyUs}
            className="text-slate-300 text-left"
          >
            Why Us
          </button>
          <a href="#pricing" className="text-slate-300">Pricing</a>
          
          <div className="pt-4 border-t border-slate-700">
            <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Select State</p>
            <div className="flex flex-col gap-2">
              {SUPPORTED_STATES.map((state) => (
                <button
                  key={state.code}
                  onClick={() => toggleState(state)}
                  disabled={state.comingSoon}
                  className={`px-3 py-2 rounded-md text-sm border flex justify-between items-center ${
                    selectedState.code === state.code 
                      ? 'bg-brand-accent text-brand-dark border-brand-accent' 
                      : state.comingSoon 
                        ? 'bg-slate-800/50 border-slate-700 text-slate-500'
                        : 'bg-slate-800 border-slate-600 text-slate-300'
                  }`}
                >
                  <span>{state.name} ({state.code})</span>
                  {state.comingSoon && <span className="text-[10px] opacity-70">Coming Soon</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}
  </header>

  {/* --- Hero Section --- */}
  <section className="relative pt-44 pb-20 overflow-hidden">
    {/* Abstract Background Element */}
    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-accent/5 to-transparent pointer-events-none" />
    <div className="absolute top-20 left-10 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-4 py-1.5 rounded-full backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-brand-highlight animate-pulse" />
          <span className="text-xs font-semibold text-brand-highlight tracking-wide uppercase">
            Updated for 2024 {selectedState.agency} Manuals
          </span>
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
          Stop Guessing. <br />
          Pass Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-blue-400">Permit Test</span> First.
        </h1>
        
        <p className="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
          Master the official {selectedState.agency} manual with our data-driven, founder-proven method. 
          No cheat sheets, just smart, ethical preparation tailored for <span className="text-white font-medium">Georgia, California, Texas, Florida, and New York</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button 
            onClick={handleStartPractice}
            className="bg-brand-accent hover:bg-brand-accentHover text-brand-dark text-lg px-8 py-4 rounded-full font-bold transition-all transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(45,212,191,0.4)]"
          >
            Start Free Practice
          </button>
          <button 
            onClick={handleStartMaterials}
            className="border border-slate-600 hover:border-white text-white text-lg px-8 py-4 rounded-full font-medium transition-all hover:bg-slate-800"
          >
            Practice Materials
          </button>
        </div>
        
        {/* Highlighted Trust Badge - Animated */}
        <div className="mt-8 inline-flex items-center gap-3 bg-slate-800/60 border border-slate-700 rounded-xl p-4 backdrop-blur-md shadow-lg max-w-md mx-auto lg:mx-0 transform transition-all hover:border-brand-accent/30 hover:bg-slate-800/80 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards">
           <div className="bg-green-500/10 p-2.5 rounded-full ring-1 ring-green-500/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-green-400/20 animate-ping rounded-full opacity-20"></div>
              <CheckCircle2 className="text-green-400 relative z-10" size={22} />
           </div>
           <div className="text-left animate-subtle-pulse origin-left">
              <p className="text-white font-medium text-sm leading-tight">
                <span className="font-bold text-lg mr-1 transition-all duration-300 animate-text-glow">{passRate}%</span>
                of Premium users pass on their <span className="text-white underline decoration-slate-600 underline-offset-2 decoration-1">1st attempt</span>.
              </p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wide mt-1 font-semibold">
                Based on internal survey data
              </p>
           </div>
        </div>
      </div>

      <div className="relative hidden lg:block h-[500px] w-full">
         {/* Slider Container */}
         <div className="relative h-full w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800 group">
            {HERO_SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Image with Overlay */}
                <img 
                  src={slide.image} 
                  alt={slide.alt}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" 
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
                
                {/* Text Caption */}
                <div className="absolute bottom-8 left-8 right-8 transform transition-all duration-500">
                  <div className="inline-flex items-center gap-2 bg-brand-accent/90 backdrop-blur-sm text-brand-dark px-4 py-2 rounded-full mb-2 shadow-lg">
                     <ThumbsUp size={16} fill="currentColor" />
                     <span className="font-bold text-sm">{slide.caption}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Slider Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {HERO_SLIDES.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-brand-accent w-6' : 'bg-slate-500'}`}
                />
              ))}
            </div>
         </div>

         {/* Floating Star Badge - 94% Probability */}
         <div className="absolute -top-6 -right-6 z-20 animate-bounce-slow">
            <div className="relative group cursor-default">
               {/* Glow effect */}
               <div className="absolute inset-0 bg-brand-highlight/80 blur-lg rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-500"></div>
               
               {/* Main Badge Circle */}
               <div className="relative bg-gradient-to-br from-orange-400 to-brand-highlight text-white w-32 h-32 flex flex-col items-center justify-center rounded-full shadow-[0_10px_30px_rgba(249,115,22,0.4)] border-[6px] border-brand-dark/40 backdrop-blur-sm transform rotate-12 group-hover:rotate-0 transition-all duration-300">
                  
                  {/* Star Icon Badge at Top Edge */}
                  <div className="absolute -top-4 bg-brand-dark text-brand-highlight p-2 rounded-full border-4 border-slate-800 shadow-lg">
                     <Award size={20} fill="currentColor" className="animate-pulse" />
                  </div>

                  <div className="flex flex-col items-center mt-2">
                    <span className="text-4xl font-black tracking-tighter leading-none drop-shadow-md">94%</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest mt-1 text-orange-100">Pass Rate</span>
                    <div className="w-10 h-0.5 bg-white/40 my-1 rounded-full" />
                    <span className="text-[11px] font-bold text-white tracking-wide">Probability</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  </section>

  {/* --- USP Section --- */}
  <section id="method" className="py-24 bg-brand-primary border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The USA Driving Tests Difference</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">Why students in {selectedState.name} choose us over free generic apps.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {FEATURES.map((feature, idx) => (
          <div key={idx} className="bg-brand-dark border border-slate-800 p-8 rounded-2xl hover:border-brand-accent/50 transition-colors group">
            <div className="bg-slate-800 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-accent/20 transition-colors">
              <feature.icon className="text-brand-accent" size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* --- How It Works --- */}
  <section className="py-24 bg-brand-dark relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Pass in 3 Simple Steps</h2>
          <div className="space-y-8">
            {[
              { title: "Take a Diagnostic Test", desc: "Identify what you don't know immediately." },
              { title: "Review Weakness Report", desc: "AI highlights the exact manual chapters to read." },
              { title: "Unlimited Simulation", desc: `Practice with ${selectedState.name}-specific logic until you score 100%.` }
            ].map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-brand-accent font-bold font-mono">
                  {i + 1}
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{step.title}</h4>
                  <p className="text-slate-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-brand-accent/20 blur-3xl rounded-full" />
          <div className="relative bg-slate-800 p-8 rounded-2xl border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-white font-bold">Weakness Analysis</h4>
              <span className="text-red-400 text-sm font-medium">Action Required</span>
            </div>
            {/* Mock Chart */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">Road Signs</span>
                  <span className="text-brand-accent">90%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-accent w-[90%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">Right of Way</span>
                  <span className="text-red-500">45%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[45%]" />
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-brand-dark/50 rounded-lg border border-slate-700 flex gap-3">
                <div className="mt-1">
                    <TrendingUp size={16} className="text-brand-accent" />
                </div>
                <p className="text-sm text-slate-300">
                    <span className="text-white font-semibold">Tip:</span> Focus on Section 4 of the {selectedState.agency} manual regarding intersection priorities.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* --- Pricing --- */}
  <section id="pricing" className="py-24 bg-brand-primary border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Path To Your Permit Test</h2>
      <p className="text-slate-400 mb-12">Simple pricing. No hidden fees. Cancel anytime.</p>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {PRICING_PLANS.map((plan) => (
          <div 
            key={plan.id} 
            className={`relative p-8 rounded-2xl border flex flex-col ${
              plan.recommended 
                ? 'bg-slate-800 border-brand-accent shadow-[0_0_30px_rgba(45,212,191,0.1)] transform md:-translate-y-4' 
                : 'bg-brand-dark border-slate-800'
            }`}
          >
            {plan.recommended && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-accent text-brand-dark px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Most Popular
              </div>
            )}
            
            {plan.price === '$0' && plan.id !== 'free' && (
              <div className="absolute top-4 right-4 bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">
                 Beta Access
              </div>
            )}

            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
            <div className="flex items-center justify-center mb-6 gap-3">
              {plan.originalPrice && (
                <span className="text-slate-500 line-through text-lg">{plan.originalPrice}</span>
              )}
              <span className="text-4xl font-extrabold text-white">{plan.price === '$0' ? 'Free' : plan.price}</span>
              {plan.period && <span className="text-slate-400 ml-1 text-sm">{plan.period}</span>}
            </div>

            {plan.price === '$0' && plan.id !== 'free' && (
               <div className="mb-6 bg-brand-accent/10 border border-brand-accent/20 rounded-lg p-2 text-xs text-brand-accent font-semibold">
                  Currently FREE for Beta Users
               </div>
            )}
            
            <ul className="space-y-4 mb-8 flex-1 text-left">
              {plan.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-brand-accent flex-shrink-0 mt-0.5" />
                  {feat}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => handleGetAccess(plan)}
              className={`w-full py-3 rounded-xl font-bold transition-colors ${
              plan.recommended 
                ? 'bg-brand-accent hover:bg-brand-accentHover text-brand-dark' 
                : 'bg-slate-700 hover:bg-slate-600 text-white'
            }`}>
              {plan.price === '$0' && plan.id !== 'free' ? 'Join Beta for Free' : plan.id === 'free' ? 'Start Free' : 'Get Access'}
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* --- Founder's Story (Updated) --- */}
  <section className="py-24 bg-brand-dark relative overflow-hidden">
    {/* Decorative Quote Mark */}
    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-brand-primary opacity-50 pointer-events-none select-none">
       <span className="text-[200px] font-serif leading-none">"</span>
    </div>
    
    <div className="max-w-4xl mx-auto px-6 relative z-10">
       <div className="text-center mb-10">
          <span className="text-brand-accent text-sm font-bold uppercase tracking-widest">Our Mission</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Driving Education, Reimagined</h2>
       </div>

       <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 p-8 md:p-12 rounded-3xl relative">
          <div className="flex flex-col md:flex-row items-center gap-8">
             {/* Founder Image/Avatar */}
             <div className="flex-shrink-0 relative">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center border-4 border-brand-dark shadow-xl relative z-10">
                   <ShieldCheck className="text-brand-accent w-10 h-10 md:w-12 md:h-12" />
                </div>
                {/* Decorative ring */}
                <div className="absolute inset-0 rounded-full border border-brand-accent/20 scale-110"></div>
             </div>

             {/* Text Content */}
             <div className="text-center md:text-left flex-1">
                <blockquote className="text-xl md:text-2xl font-medium text-slate-200 leading-relaxed mb-6">
                  "I failed my first permit test because I memorized answers without understanding the rules. I built <span className="text-white font-bold">USA Driving Tests</span> to teach you the <span className="text-brand-accent decoration-wavy underline decoration-brand-accent/30 underline-offset-4">why</span> behind every road sign, ensuring you drive safely for life, not just for the exam."
                </blockquote>
                
                <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 border-t border-slate-700/50 pt-6">
                   <cite className="not-italic text-left">
                     <div className="text-white font-bold text-lg">Alex R.</div>
                     <div className="text-brand-accent text-sm">Founder & Former Learner Driver</div>
                   </cite>
                   
                   {/* Signature or badge */}
                   <div className="flex items-center gap-2 opacity-70">
                      <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Verified Founder</span>
                      <CheckCircle2 size={16} className="text-brand-accent" />
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  </section>

  {/* --- Mobile App Promo --- */}
  <section className="py-24 bg-gradient-to-br from-indigo-900 to-brand-dark border-t border-slate-700 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Study On-The-Go. <br/>Pass From Anywhere.</h2>
            <p className="text-slate-300 mb-8 text-lg">
                Don't be tied to a desk. Our mobile-optimized platform syncs your progress across all devices. Take a quick 5-minute quiz while waiting for the bus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                    <Smartphone size={24} />
                    <div className="text-left leading-tight">
                        <div className="text-xs font-semibold uppercase">Coming soon to</div>
                        <div className="font-bold font-sans text-lg">App Store</div>
                    </div>
                </button>
                {/* Placeholder for Play Store */}
                <button className="flex items-center gap-3 bg-slate-800 text-white border border-slate-600 px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors">
                    <div className="text-left leading-tight">
                        <div className="text-xs font-semibold uppercase">Coming soon to</div>
                        <div className="font-bold font-sans text-lg">Google Play</div>
                    </div>
                </button>
            </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-[500px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-20"></div>
                <div className="w-full h-full bg-brand-dark flex flex-col pt-12 p-4">
                     <div className="bg-slate-800 h-24 rounded-xl mb-4 animate-pulse"></div>
                     <div className="bg-slate-800 h-12 rounded-xl mb-2 animate-pulse w-3/4"></div>
                     <div className="bg-slate-800 h-8 rounded-xl mb-6 animate-pulse w-1/2"></div>
                     <div className="space-y-2">
                        <div className="bg-slate-800 h-16 rounded-xl animate-pulse"></div>
                        <div className="bg-brand-accent/20 h-16 rounded-xl animate-pulse border border-brand-accent"></div>
                        <div className="bg-slate-800 h-16 rounded-xl animate-pulse"></div>
                     </div>
                </div>
            </div>
        </div>
    </div>
  </section>

  {/* --- Footer & Legal --- */}
  <footer className="bg-brand-dark border-t border-slate-800 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-8 mb-12">
         <div className="col-span-1 md:col-span-1">
            <div className="mb-4 group cursor-pointer select-none" onClick={() => window.scrollTo(0,0)}>
                <span className="font-black text-xl tracking-tighter leading-none">
                    <span className="text-red-500">USA</span>
                    <span className="text-white mx-1.5">DRIVING</span>
                    <span className="text-blue-500">TESTS</span>
                </span>
            </div>
            <p className="text-slate-500 text-sm">
                Ethical, data-driven preparation for the modern driver.
            </p>
         </div>
         <div>
            <h5 className="text-white font-bold mb-4">Study</h5>
            <ul className="space-y-2 text-sm text-slate-400">
                <li><button onClick={handleStartPractice} className="hover:text-brand-accent text-left">Practice Test</button></li>
                <li><button onClick={handleStartEducation} className="hover:text-brand-accent text-left">Study Guide</button></li>
                <li><button onClick={handleStartMaterials} className="hover:text-brand-accent text-left">Road Signs</button></li>
            </ul>
         </div>
         <div>
            <h5 className="text-white font-bold mb-4">Company</h5>
            <ul className="space-y-2 text-sm text-slate-400">
                <li><button onClick={handleStartWhyUs} className="hover:text-brand-accent text-left">About Us</button></li>
                <li><a href="#pricing" onClick={() => handleBackToHome()} className="hover:text-brand-accent">Pricing</a></li>
                <li><a href="#" className="hover:text-brand-accent">Contact</a></li>
            </ul>
         </div>
         <div>
            <h5 className="text-white font-bold mb-4">States</h5>
             <ul className="space-y-2 text-sm text-slate-400">
                {SUPPORTED_STATES.map(s => (
                    <li key={s.code}><a href="#" onClick={(e) => { e.preventDefault(); toggleState(s); }} className={`hover:text-brand-accent ${s.comingSoon ? 'opacity-50 cursor-default hover:text-slate-400' : ''}`}>{s.name}</a></li>
                ))}
            </ul>
         </div>
      </div>

      <div className="border-t border-slate-800 pt-8 mt-8">
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 mb-8">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Legal Disclaimer</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
                USA Driving Tests is a privately owned website and is <strong>NOT</strong> affiliated with, associated with, or endorsed by the Georgia Department of Driver Services (DDS), California Department of Motor Vehicles (DMV), Texas Department of Public Safety (DPS), Florida Department of Highway Safety and Motor Vehicles (DHSMV), New York State Department of Motor Vehicles (DMV), or any other government agency. 
                This site offers practice materials for educational purposes only. Success on these practice tests does not guarantee success on the official exam. Please consult your official state driver's manual for the most accurate and up-to-date information.
            </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
            <p>&copy; 2024 USA Driving Tests. All rights reserved.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-slate-400">Privacy Policy</a>
                <a href="#" className="hover:text-slate-400">Terms of Service</a>
            </div>
        </div>
      </div>
    </div>
  </footer>
</div>
  );
}
export default App;
