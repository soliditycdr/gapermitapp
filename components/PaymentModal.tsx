import React, { useState } from 'react';
import { X, Lock, CreditCard, CheckCircle2, ShieldCheck, Loader2, Sparkles, Gift } from 'lucide-react';
import { PricingPlan } from '../types';

interface PaymentModalProps {
  plan: PricingPlan;
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ plan, onClose, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');

  // Check if it's the free beta flow
  const isFreeBeta = plan.price === '$0' || plan.price === 'Free';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      
      // Auto redirect
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2000);
  };

  return (
    // Increased z-index to 100 to ensure it sits above the sticky header (z-50)
    // Removed backdrop-blur-md and set opacity to 90% as requested
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/90 animate-in fade-in duration-200">
      
      {/* Modal Container - Added subtle gradient border effect via padding/bg */}
      <div className="relative w-full max-w-md group">
        {/* Glowing border effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-accent to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        
        <div className="relative bg-brand-primary w-full rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          
          {/* Header - Compact */}
          <div className="flex justify-between items-center px-5 py-4 border-b border-slate-700/50 bg-slate-800/30">
            <div className="flex items-center gap-2 text-white font-bold text-sm md:text-base">
              {isFreeBeta ? (
                 <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-brand-accent/10 rounded-lg">
                        <Sparkles className="text-brand-accent" size={16} />
                    </div>
                    <span>Join Beta Access</span>
                 </div>
              ) : (
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-green-500/10 rounded-lg">
                        <ShieldCheck className="text-green-500" size={16} />
                    </div>
                    <span>Secure Checkout</span>
                </div>
              )}
            </div>
            <button 
                onClick={onClose} 
                className="text-slate-400 hover:text-white hover:bg-slate-700/50 p-1.5 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="p-5 overflow-y-auto custom-scrollbar">
            {step === 'form' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Plan Summary - Compact */}
                <div className="bg-slate-800/50 rounded-xl p-3 flex justify-between items-center border border-slate-700/50">
                  <div className="flex items-center gap-3">
                     <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isFreeBeta ? 'bg-brand-accent/10 text-brand-accent' : 'bg-slate-700 text-white'}`}>
                        {isFreeBeta ? <Gift size={20} /> : <ShieldCheck size={20} />}
                     </div>
                     <div>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Selected Plan</p>
                        <p className="font-bold text-white text-sm">{plan.name}</p>
                     </div>
                  </div>
                  <div className="text-right">
                      {plan.originalPrice && (
                           <p className="text-slate-500 line-through text-[10px]">{plan.originalPrice}</p>
                      )}
                    <p className="font-bold text-brand-accent text-lg leading-tight">{plan.price === '$0' ? 'FREE' : plan.price}</p>
                  </div>
                </div>

                {/* Beta Message */}
                {isFreeBeta && (
                    <div className="bg-gradient-to-r from-brand-accent/5 to-transparent border-l-2 border-brand-accent pl-3 py-2 pr-2 text-xs text-brand-accent/90 leading-relaxed">
                        <span className="font-bold">🎉 Congratulations!</span> You've been selected for free beta access. No credit card required.
                    </div>
                )}

                {/* Inputs - Tighter spacing */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 placeholder-slate-600 transition-all" required />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 placeholder-slate-600 transition-all" required />
                  </div>

                  {!isFreeBeta && (
                      <>
                        <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Card Number</label>
                        <div className="relative">
                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent pl-10" required />
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Expiry Date</label>
                            <input type="text" placeholder="MM/YY" className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent" required />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">CVC</label>
                            <input type="text" placeholder="123" className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent" required />
                        </div>
                        </div>
                      </>
                  )}
                </div>

                <div className="pt-2">
                   <button type="submit" className="w-full bg-gradient-to-r from-brand-accent to-teal-500 hover:from-brand-accentHover hover:to-teal-600 text-brand-dark font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-brand-accent/20 transform hover:-translate-y-0.5">
                     {isFreeBeta ? <Sparkles size={18} /> : <Lock size={18} />}
                     {isFreeBeta ? 'Unlock Beta Access Now' : `Pay ${plan.price}`}
                   </button>
                   {!isFreeBeta && (
                      <div className="text-center mt-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
                          <Lock size={10} />
                          <span>256-bit SSL Encrypted Payment</span>
                      </div>
                   )}
                </div>
              </form>
            )}

            {/* Processing State */}
            {step === 'processing' && (
              <div className="py-10 flex flex-col items-center text-center">
                 <div className="relative mb-6">
                   <div className="absolute inset-0 bg-brand-accent/20 rounded-full blur-xl animate-pulse"></div>
                   <Loader2 size={40} className="text-brand-accent animate-spin relative z-10" />
                 </div>
                 <h3 className="text-lg font-bold text-white mb-1">{isFreeBeta ? 'Activating Account...' : 'Processing Payment...'}</h3>
                 <p className="text-xs text-slate-400">Please wait while we set up your dashboard.</p>
              </div>
            )}

            {/* Success State */}
            {step === 'success' && (
              <div className="py-10 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
                 <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border-2 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                   <CheckCircle2 size={32} className="text-green-500" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-1">Welcome Aboard!</h3>
                 <p className="text-sm text-slate-400">Redirecting to your premium dashboard...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
