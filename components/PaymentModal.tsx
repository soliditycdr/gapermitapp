import React, { useState } from 'react';
import { X, Lock, CreditCard, CheckCircle2, ShieldCheck, Loader2, Sparkles } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-brand-primary w-full max-w-md rounded-2xl border border-slate-700 shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700 bg-slate-800/50">
          <div className="flex items-center gap-2 text-white font-bold">
            {isFreeBeta ? <Sparkles className="text-brand-accent" size={20} /> : <ShieldCheck className="text-brand-accent" size={20} />}
            {isFreeBeta ? 'Join Beta Access' : 'Secure Checkout'}
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-slate-800 rounded-xl p-4 flex justify-between items-center border border-brand-accent/30">
                <div>
                  <p className="text-sm text-slate-400">Selected Plan</p>
                  <p className="font-bold text-white text-lg">{plan.name}</p>
                </div>
                <div className="text-right">
                    {plan.originalPrice && (
                         <p className="text-slate-500 line-through text-xs">{plan.originalPrice}</p>
                    )}
                  <p className="font-bold text-brand-accent text-xl">{plan.price === '$0' ? 'FREE' : plan.price}</p>
                  <p className="text-xs text-slate-500">{plan.period || 'one-time'}</p>
                </div>
              </div>

              {isFreeBeta && (
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg text-green-400 text-sm flex items-start gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />
                      <p>You have been selected for free beta access. No credit card required.</p>
                  </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent placeholder-slate-600" required />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent placeholder-slate-600" required />
                </div>

                {!isFreeBeta && (
                    <>
                        <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Card Number</label>
                        <div className="relative">
                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent placeholder-slate-600 pl-12" required />
                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Expiry Date</label>
                            <input type="text" placeholder="MM/YY" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent placeholder-slate-600" required />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">CVC</label>
                            <input type="text" placeholder="123" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent placeholder-slate-600" required />
                        </div>
                        </div>
                    </>
                )}
              </div>

              <div className="pt-2">
                 <button type="submit" className="w-full bg-brand-accent hover:bg-brand-accentHover text-brand-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-brand-accent/20">
                   {isFreeBeta ? <Sparkles size={18} /> : <Lock size={18} />}
                   {isFreeBeta ? 'Unlock Beta Access Now' : `Pay ${plan.price}`}
                 </button>
                 {!isFreeBeta && (
                    <div className="text-center mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
                        <Lock size={12} />
                        <span>256-bit SSL Encrypted Payment</span>
                    </div>
                 )}
              </div>
            </form>
          )}

          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center text-center">
               <div className="relative mb-6">
                 <div className="absolute inset-0 bg-brand-accent/20 rounded-full blur-xl animate-pulse"></div>
                 <Loader2 size={48} className="text-brand-accent animate-spin relative z-10" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">{isFreeBeta ? 'Activating Account...' : 'Processing Payment...'}</h3>
               <p className="text-slate-400">Please do not close this window.</p>
            </div>
          )}

          {step === 'success' && (
            <div className="py-12 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
               <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border-2 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                 <CheckCircle2 size={40} className="text-green-500" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">Welcome Aboard!</h3>
               <p className="text-slate-400">Unlocking your premium dashboard...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;