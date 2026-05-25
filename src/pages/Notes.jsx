import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, CheckCircle2, Clock, Sparkles, BookOpen, FileText, Check, Award, Eye } from 'lucide-react';

export default function Notes() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 8, hours: 14, minutes: 32, seconds: 45 });

  // Floating particles generator
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const items = [];
    for (let i = 0; i < 15; i++) {
      items.push({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 10}s`,
        size: Math.random() * 20 + 10,
        duration: `${Math.random() * 15 + 15}s`
      });
    }
    setParticles(items);
  }, []);

  // Countdown timer decrementer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubmitted(true);
      setEmail('');
    }
  };

  const featureHighlights = [
    { title: 'Semester Notes', desc: 'Syllabus-aligned units, summarized for quick reading.', icon: BookOpen, tag: 'B.Tech / B.Sc / BCA' },
    { title: 'University PDFs', desc: 'Official textbook highlights, reading maps, and slides.', icon: FileText, tag: 'Verified Syllabus' },
    { title: 'Handwritten Notes', desc: 'Beautifully scanned diagrams, formulas, and cheat sheets.', icon: Sparkles, tag: 'Top Performers' },
    { title: 'Previous Year Qs (PYQs)', desc: 'Solved papers grouped by university with key marking tips.', icon: Award, tag: 'Exam Ready' },
    { title: 'Lab Manuals', desc: 'Executable scripts, circuit logs, and code setups.', icon: Check, tag: 'Practicals' },
    { title: 'AI Summary Generator', desc: 'Paste syllabus terms to get a custom learning deck instantly.', icon: Eye, tag: 'AI Powered' },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-4 py-12 md:py-20 lg:px-8">
      {/* Floating Notes particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute bottom-0 animate-floating flex items-center justify-center text-slate-700/10 select-none"
            style={{
              left: p.left,
              animationDelay: p.delay,
              fontSize: `${p.size}px`,
              animationDuration: p.duration
            }}
          >
            📄
          </div>
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl z-10">
        {/* Countdown Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wider animate-pulse">
            <Clock className="w-3.5 h-3.5" /> LAUNCHING SOON
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
            Nexora{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 text-neon-cyan">
              Notes Vault
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-slate-400 text-base sm:text-lg">
            We are designing the largest verified academic repository for engineering, science, and computer applications. Fully indexable, easy downloads, and AI-enabled study sheets.
          </p>
        </div>

        {/* Dynamic Countdown */}
        <div className="mt-10 flex justify-center">
          <div className="grid grid-cols-4 gap-2 sm:gap-6 bg-slate-900/60 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-slate-800/80 shadow-glow-purple">
            {Object.entries(timeLeft).map(([key, value]) => (
              <div key={key} className="flex flex-col items-center px-2 sm:px-6">
                <span className="text-3xl sm:text-5xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
                  {String(value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-cyan-400 mt-1 sm:mt-2">
                  {key}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Waitlist Subscription Panel */}
        <div className="mx-auto mt-12 max-w-lg">
          <div className="glass-panel-neon p-6 sm:p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full blur-3xl opacity-20 -z-10" />

            {!submitted ? (
              <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white text-center">
                  Unlock early access + get 1GB premium cloud storage free
                </h3>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your student email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-sm hover:from-cyan-400 hover:to-indigo-500 shadow-glow-cyan transition-all"
                  >
                    Join Waitlist <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-center text-slate-500">
                  Join 1,248 students signed up this week. Zero spam. Pure educational resources.
                </p>
              </form>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <CheckCircle2 className="w-6 h-6 animate-bounce" />
                </div>
                <h3 className="text-xl font-bold text-white">You're on the list!</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  We've reserved your early reservation token. We will notify you at your registered email as soon as notes uploads go live.
                </p>
                <div className="pt-2">
                  <span className="inline-block text-xs font-mono bg-slate-900 border border-slate-800 rounded px-3 py-1 text-cyan-400">
                    RESERVATION ID: #NEX-{Math.floor(100000 + Math.random() * 900000)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feature Grid Previews */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white">What's in the Notes Vault?</h2>
            <p className="text-slate-400 text-sm mt-2">Get ready for structured, verified study modules designed to save exam prep time.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureHighlights.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div
                  key={index}
                  className="glass-panel p-5 rounded-2xl hover:border-emerald-500/30 group transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="inline-flex p-3 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 group-hover:bg-emerald-500/10 group-hover:text-emerald-300 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">{feat.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-900/50 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">{feat.tag}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">COMING</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
