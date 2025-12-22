
import React, { useEffect, useState, useRef } from 'react';
import { Snowflake, X, Gift, PartyPopper } from 'lucide-react';

const HolidayEffects: React.FC = () => {
  const [isSnowEnabled, setIsSnowEnabled] = useState(() => {
    const saved = localStorage.getItem('snow_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [showSantaPopup, setShowSantaPopup] = useState(false);
  const [showNewYearEffect, setShowNewYearEffect] = useState(false);
  const snowCanvasRef = useRef<HTMLCanvasElement>(null);
  const fireworkCanvasRef = useRef<HTMLCanvasElement>(null);

  // Helper to get current time in Georgia (USA)
  const getGeorgiaTime = () => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: false
    });
    const parts = formatter.formatToParts(now);
    const d: any = {};
    parts.forEach(({ type, value }) => d[type] = value);
    return new Date(d.year, d.month - 1, d.day, d.hour, d.minute, d.second);
  };

  useEffect(() => {
    const gaTime = getGeorgiaTime();
    const month = gaTime.getMonth(); // 0-11
    const day = gaTime.getDate();
    const hour = gaTime.getHours();

    // 1. Snow Logic (December only)
    const isDecember = month === 11;
    
    // 2. Santa Popup Logic (Show once per session in December)
    if (isDecember && !sessionStorage.getItem('santa_greeted')) {
      setTimeout(() => setShowSantaPopup(true), 2000);
      sessionStorage.setItem('santa_greeted', 'true');
    }

    // 3. New Year Logic (Dec 31st 11PM to Jan 1st end of day)
    const isNewYearEveLate = month === 11 && day === 31 && hour >= 23;
    const isNewYearDay = month === 0 && day === 1;
    
    if (isNewYearEveLate || isNewYearDay) {
      setShowNewYearEffect(true);
    }
  }, []);

  // Snow Animation Loop
  useEffect(() => {
    if (!isSnowEnabled || showNewYearEffect) return;
    const canvas = snowCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    const particles: any[] = [];
    const count = 100;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        d: Math.random() * count,
        v: Math.random() * 1 + 0.5
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const p = particles[i];
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
      update();
      animationFrame = requestAnimationFrame(draw);
    };

    const update = () => {
      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.y += p.v;
        p.x += Math.sin(p.d) * 0.5;
        if (p.y > canvas.height) {
          particles[i] = { x: Math.random() * canvas.width, y: -10, r: p.r, d: p.d, v: p.v };
        }
      }
    };

    draw();
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, [isSnowEnabled, showNewYearEffect]);

  // Fireworks Animation Loop
  useEffect(() => {
    if (!showNewYearEffect) return;
    const canvas = fireworkCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    const particles: any[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class FireworkParticle {
      x: number; y: number; color: string; velocity: {x: number, y: number}; alpha: number;
      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 2;
        this.velocity = { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed };
        this.alpha = 1;
      }
      draw() {
        ctx!.save();
        ctx!.globalAlpha = this.alpha;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx!.fillStyle = this.color;
        ctx!.fill();
        ctx!.restore();
      }
      update() {
        this.velocity.y += 0.05; // gravity
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
      }
    }

    const colors = ['#ff0000', '#ffd700', '#00ff00', '#00ffff', '#ff00ff', '#ffffff'];
    const createExplosion = (x: number, y: number) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 50; i++) {
        particles.push(new FireworkParticle(x, y, color));
      }
    };

    let timer = 0;
    const draw = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.2)'; // trail effect matching brand-dark
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      if (timer % 40 === 0) {
        createExplosion(Math.random() * canvas.width, Math.random() * canvas.height * 0.6);
      }
      timer++;

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0) particles.splice(i, 1);
      }
      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, [showNewYearEffect]);

  const toggleSnow = () => {
    const newState = !isSnowEnabled;
    setIsSnowEnabled(newState);
    localStorage.setItem('snow_enabled', JSON.stringify(newState));
  };

  const gaTimeNow = getGeorgiaTime();
  const isDecember = gaTimeNow.getMonth() === 11;

  return (
    <>
      {/* Snow Canvas Overlay */}
      {isSnowEnabled && isDecember && !showNewYearEffect && (
        <canvas
          ref={snowCanvasRef}
          className="fixed inset-0 pointer-events-none z-[60]"
        />
      )}

      {/* New Year Fireworks Overlay */}
      {showNewYearEffect && (
        <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center pointer-events-none">
          <canvas ref={fireworkCanvasRef} className="absolute inset-0" />
          <div className="relative z-10 text-center animate-bounce">
             <h2 className="text-6xl md:text-8xl font-black text-white drop-shadow-[0_0_20px_rgba(45,212,191,0.8)]">
               HAPPY <br/> NEW YEAR!
             </h2>
             <p className="text-brand-accent font-bold text-2xl mt-4 tracking-widest uppercase bg-brand-dark/50 px-6 py-2 rounded-full backdrop-blur-sm">
                Welcome to {gaTimeNow.getFullYear()}
             </p>
          </div>
        </div>
      )}

      {/* Snow Toggle Button */}
      {isDecember && !showNewYearEffect && (
        <button
          onClick={toggleSnow}
          className={`fixed bottom-6 right-6 z-[80] p-3 rounded-full transition-all shadow-lg border ${
            isSnowEnabled 
              ? 'bg-brand-accent text-brand-dark border-brand-accent hover:bg-brand-accentHover' 
              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
          }`}
          title={isSnowEnabled ? "Turn off snow" : "Turn on snow"}
        >
          <Snowflake className={isSnowEnabled ? 'animate-spin-slow' : ''} size={24} />
        </button>
      )}

      {/* Santa Welcome Popup */}
      {showSantaPopup && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-brand-primary border-2 border-red-500 rounded-3xl p-8 max-w-sm w-full text-center relative shadow-[0_0_50px_rgba(239,68,68,0.3)]">
            <button 
              onClick={() => setShowSantaPopup(false)} 
              className="absolute top-4 right-4 text-slate-500 hover:text-white"
            >
              <X size={24} />
            </button>
            <div className="text-7xl mb-6">🎅</div>
            <h3 className="text-3xl font-black text-white mb-2">Ho Ho Ho!</h3>
            <p className="text-red-400 font-bold text-lg mb-4">Happy Holidays!</p>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Santa wishes you a safe journey on the road. Good luck with your {getGeorgiaTime().getMonth() === 11 ? 'December' : ''} Permit Test!
            </p>
            <button 
              onClick={() => setShowSantaPopup(false)}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-105"
            >
              <Gift size={20} />
              Let's Start!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HolidayEffects;
