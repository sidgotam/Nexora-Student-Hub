import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Trophy, Flame, Zap, Volume2, Award, Clock, ArrowRight, Play, Coins, ShieldAlert, Sparkle, RefreshCw, Eye, EyeOff } from 'lucide-react';

export default function DopamineHub({ setActiveTab, setGlobalMood }) {
  // Streaks, Levels, XP
  const [streak, setStreak] = useState(3);
  const [xp, setXp] = useState(350);
  const [level, setLevel] = useState(1);
  const [coins, setCoins] = useState(120);

  // Sound FX System using browser Web Audio API
  const playSynthSound = (type) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const audioCtx = new AudioContext();

      if (type === 'click') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      } else if (type === 'tick') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(450, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      } else if (type === 'spin') {
        // Play rapid retro arpeggio sequence
        for (let i = 0; i < 7; i++) {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(261.63 * Math.pow(1.5, i), audioCtx.currentTime + i * 0.07);
          gain.gain.setValueAtTime(0.06, audioCtx.currentTime + i * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.07 + 0.06);
          osc.start(audioCtx.currentTime + i * 0.07);
          osc.stop(audioCtx.currentTime + i * 0.07 + 0.07);
        }
      } else if (type === 'success') {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.1);
          gain.gain.setValueAtTime(0.12, audioCtx.currentTime + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.1 + 0.35);
          osc.start(audioCtx.currentTime + idx * 0.1);
          osc.stop(audioCtx.currentTime + idx * 0.1 + 0.4);
        });
      } else if (type === 'focus') {
        // Deep binaural state hum
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(audioCtx.destination);
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(180, audioCtx.currentTime);
        osc2.frequency.setValueAtTime(184, audioCtx.currentTime); // 4Hz difference
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.5);
        osc1.start();
        osc2.start();
        osc1.stop(audioCtx.currentTime + 2.5);
        osc2.stop(audioCtx.currentTime + 2.5);
      }
    } catch (e) {
      console.warn('Synth sound system error:', e);
    }
  };

  // State Selector for Psychological Mood check-in
  const [mood, setMood] = useState('focus'); // focus, panic, sleepy, procrastinate
  const handleMoodChange = (newMood) => {
    setMood(newMood);
    playSynthSound('click');
    if (setGlobalMood) {
      setGlobalMood(newMood);
    }
  };

  // Motivational Advice Adaptations
  const moodQuotes = {
    focus: {
      advice: "Genius mode activated! Your brain is currently locked in high-alpha frequency. Harness it before the dopamine decays.",
      tag: "ALPHA FOCUS STATE DETECTED",
      color: "from-cyan-400 to-blue-500",
      accent: "text-cyan-400"
    },
    panic: {
      advice: "Breathe in... Breathe out. Cortisol peaks are normal before exams. Channel that jittery energy into building an ATS-grade resume right now.",
      tag: "ADRENAL PREP STATE DETECTED",
      color: "from-red-400 to-orange-500",
      accent: "text-red-400"
    },
    sleepy: {
      advice: "Low battery warning! Don't push against standard biological cycles. Play our 30s Focus Breath task to pump fresh oxygen to your cortex.",
      tag: "DELTA REST STATE DETECTED",
      color: "from-emerald-400 to-cyan-500",
      accent: "text-emerald-400"
    },
    procrastinate: {
      advice: "Scrolling TikTok? Did you know 98% of top developers procrastinate, but the best ones procrastinate by testing code flashcards? Sneaky wins.",
      tag: "DOPAMINE SEARCH STATE DETECTED",
      color: "from-purple-400 to-pink-500",
      accent: "text-purple-400"
    }
  };

  // Spin Wheel System
  const [spinning, setSpinning] = useState(false);
  const [spinAngle, setSpinAngle] = useState(0);
  const [wheelResult, setWheelResult] = useState(null);
  const [isWheelClaimed, setIsWheelClaimed] = useState(false);
  const rewards = [
    { text: '500 AI Pro Credits', color: '#06b6d4', type: 'credits', value: 500 },
    { text: 'ATS Resume Review', color: '#6366f1', type: 'badge', value: 'ATS Assassin' },
    { text: 'Zen Monk Study Badge', color: '#10b981', type: 'badge', value: 'Deep Monk' },
    { text: '50 Study Coins', color: '#f59e0b', type: 'coins', value: 50 },
    { text: 'Ultimate Q&A Deck', color: '#8b5cf6', type: 'deck', value: 'MERN Deck' },
    { text: '100 XP Boost', color: '#ec4899', type: 'xp', value: 100 }
  ];

  const triggerSpin = () => {
    if (spinning) return;
    playSynthSound('spin');
    setSpinning(true);
    setWheelResult(null);
    setIsWheelClaimed(false);

    // Dynamic high-friction rotational angles
    const randomSector = Math.floor(Math.random() * rewards.length);
    const degreePerSector = 360 / rewards.length;
    // Calculate ending angle: minimum 5 full rotations (1800deg) + sector offset
    const finalAngle = spinAngle + 1800 + (360 - (randomSector * degreePerSector) - (degreePerSector / 2));
    
    setSpinAngle(finalAngle);

    // Physics ticks during rotation
    const duration = 4000;
    const startTime = performance.now();
    
    const playTicks = (timestamp) => {
      const elapsed = timestamp - startTime;
      if (elapsed < duration) {
        if (Math.random() > 0.85) playSynthSound('tick');
        requestAnimationFrame(playTicks);
      }
    };
    requestAnimationFrame(playTicks);

    setTimeout(() => {
      setSpinning(false);
      const wonReward = rewards[randomSector];
      setWheelResult(wonReward);
      playSynthSound('success');
      triggerConfetti();

      // Trigger XP/Coins rewards instantly
      if (wonReward.type === 'coins') {
        setCoins(c => c + wonReward.value);
        setXp(x => x + 25);
      } else if (wonReward.type === 'xp') {
        setXp(x => x + wonReward.value);
      }
      
      // Auto-unlock badge in local shelf if it's a badge reward
      if (wonReward.type === 'badge') {
        if (wonReward.value === 'Deep Monk') setBadgeUnlocked(prev => ({ ...prev, monk: true }));
        if (wonReward.value === 'ATS Assassin') setBadgeUnlocked(prev => ({ ...prev, ats: true }));
      }
    }, duration);
  };

  // Canvas Particles Confetti Burst
  const confettiCanvasRef = useRef(null);
  const triggerConfetti = () => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    let particles = [];
    const colors = ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.6) * 10 - 2,
        radius: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.015 + 0.01
      });
    }

    let animationId;
    const drawConfetti = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // Gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(index, 1);
          return;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.restore();
      });

      if (particles.length > 0) {
        animationId = requestAnimationFrame(drawConfetti);
      }
    };
    drawConfetti();
  };

  // Focus Shield Mini-Game State
  const [focusActive, setFocusActive] = useState(false);
  const [focusProgress, setFocusProgress] = useState(0);
  const [focusCompleted, setFocusCompleted] = useState(false);
  const focusInterval = useRef(null);

  const startFocusGame = () => {
    playSynthSound('focus');
    setFocusActive(true);
    setFocusProgress(0);
    setFocusCompleted(false);

    focusInterval.current = setInterval(() => {
      setFocusProgress(prev => {
        if (prev >= 100) {
          clearInterval(focusInterval.current);
          setFocusActive(false);
          setFocusCompleted(true);
          playSynthSound('success');
          setCoins(c => c + 30);
          setXp(x => x + 80);
          setBadgeUnlocked(prevBadges => ({ ...prevBadges, monk: true }));
          return 100;
        }
        return prev + 3.33; // ~30 seconds duration
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (focusInterval.current) clearInterval(focusInterval.current);
    };
  }, []);

  // Level Up Check
  useEffect(() => {
    if (xp >= 500 * level) {
      setXp(prev => prev - 500 * level);
      setLevel(l => l + 1);
      playSynthSound('success');
    }
  }, [xp, level]);

  // Unlockable Badge Shelf
  const [badgeUnlocked, setBadgeUnlocked] = useState({
    monk: false,
    ats: false,
    spinner: false,
    vip: false
  });

  const claimWheelReward = () => {
    setIsWheelClaimed(true);
    playSynthSound('click');
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-4 py-8 lg:px-8">
      {/* Confetti Overlay Canvas inside page layout */}
      <canvas ref={confettiCanvasRef} className="absolute inset-0 pointer-events-none z-40" />

      <div className="relative mx-auto max-w-6xl z-10 space-y-10">
        
        {/* TOP STATUS AND STREAK PANEL */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border border-slate-800/80 gap-4">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center font-extrabold text-white text-lg shadow-glow-cyan">
              LVL {level}
            </div>
            <div className="space-y-1 flex-1 min-w-[120px] sm:min-w-[180px]">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-400">Genius Experience</span>
                <span className="text-cyan-400 font-mono">{Math.floor(xp)} / {level * 500} XP</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${(xp / (level * 500)) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-mono font-bold">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 animate-pulse">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>STREAK: {streak} DAYS</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Coins className="w-4 h-4" />
              <span>COINS: {coins}</span>
            </div>
            <button 
              onClick={() => playSynthSound('click')}
              className="flex items-center justify-center h-8 w-8 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ATMOSPHERIC MOOD RING HEADER */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider">
            <Zap className="w-3.5 h-3.5" /> THE PSYCHO-ENGAGEMENT DECK
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            How are you feeling{' '}
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${moodQuotes[mood].color} transition-all duration-500`}>
              right now?
            </span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Choose your chemical state below. We will adapt the entire website's magnetic gravity field and psychological advice to synchronize with your cortex.
          </p>

          {/* mood selection pill buttons */}
          <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-lg mx-auto">
            {[
              { id: 'focus', label: '🔥 Hyper Focus', color: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-400 hover:bg-cyan-500/10' },
              { id: 'panic', label: '😰 Exam Panic', color: 'border-red-500/30 bg-red-950/20 text-red-400 hover:bg-red-500/10' },
              { id: 'sleepy', label: '💤 Bored & Sleepy', color: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-400 hover:bg-emerald-500/10' },
              { id: 'procrastinate', label: '📱 TikTok Procrastination', color: 'border-purple-500/30 bg-purple-950/20 text-purple-400 hover:bg-purple-500/10' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => handleMoodChange(m.id)}
                className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                  mood === m.id
                    ? 'border-white text-white font-black scale-105 shadow-lg bg-slate-800'
                    : m.color
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* ADVISORY QUOTE BANNER */}
        <div className="glass-panel-neon p-6 rounded-2xl relative overflow-hidden transition-all duration-500">
          <div className={`absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b ${moodQuotes[mood].color}`} />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pl-3">
            <div className="space-y-1">
              <span className={`text-[10px] font-mono tracking-widest font-extrabold uppercase ${moodQuotes[mood].accent}`}>
                {moodQuotes[mood].tag}
              </span>
              <p className="text-sm font-semibold text-slate-200 leading-relaxed max-w-3xl">
                "{moodQuotes[mood].advice}"
              </p>
            </div>
            <button
              onClick={() => {
                playSynthSound('focus');
                setXp(x => x + 15);
              }}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 font-mono tracking-wide flex items-center gap-1 flex-shrink-0 cursor-pointer"
            >
              HARNESS CHEMICALS <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ORACLE WHEEL SECTION */}
        <div className="flex justify-center">
          
          {/* SPIN ORACLE PANEL */}
          <div className="w-full max-w-2xl bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between min-h-[480px] shadow-glow-purple relative overflow-hidden">
            <div className="absolute top-4 left-4 z-10">
              <span className="text-[10px] font-bold font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                Dopamine Loop
              </span>
            </div>

            <div className="text-center max-w-md space-y-1">
              <h2 className="text-xl font-extrabold text-white">The Brainwave Spin-Wheel</h2>
              <p className="text-[11px] text-slate-400">
                Unlock high-value credit boosts, rare profile trophies, or specialized CS interview card expansions dynamically!
              </p>
            </div>

            {/* Visual Spin Wheel */}
            <div className="relative my-8 flex items-center justify-center">
              {/* Center Pointer Arrow */}
              <div className="absolute -top-3 z-30 text-amber-400 text-xl font-black filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">
                ▼
              </div>

              {/* Wheel circle */}
              <div 
                className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border-4 border-slate-800 shadow-2xl relative overflow-hidden transition-transform duration-[4000ms] ease-[cubic-bezier(0.15,0.85,0.25,1)]"
                style={{
                  transform: `rotate(${spinAngle}deg)`,
                  boxShadow: `0 0 25px rgba(139, 92, 246, 0.15), inset 0 0 20px rgba(0,0,0,0.8)`
                }}
              >
                {/* 6 colored wedges */}
                {rewards.map((rew, index) => {
                  const angleOffset = index * 60;
                  return (
                    <div 
                      key={index}
                      className="absolute inset-0 origin-center text-slate-200"
                      style={{
                        transform: `rotate(${angleOffset}deg)`,
                        clipPath: 'polygon(50% 50%, 30% 0%, 70% 0%)'
                      }}
                    >
                      <div 
                        className="absolute inset-0"
                        style={{ backgroundColor: rew.color, opacity: 0.8 }}
                      />
                      {/* Reward text rotation */}
                      <span 
                        className="absolute top-6 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] font-black text-white text-center select-none w-20 leading-tight block"
                        style={{ transform: 'rotate(0deg)' }}
                      >
                        {rew.text.split(' ')[0]} <br/> {rew.text.split(' ').slice(1).join(' ')}
                      </span>
                    </div>
                  );
                })}

                {/* center decorative peg */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center shadow-2xl z-20">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                </div>
              </div>

              {/* Outer decorative neon ring */}
              <div className="absolute -inset-2 rounded-full border border-purple-500/20 pointer-events-none -z-10 animate-pulse" />
            </div>

            {/* Spin CTA Button */}
            <div className="w-full max-w-sm space-y-3 text-center">
              <button
                onClick={triggerSpin}
                disabled={spinning}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-500 via-indigo-600 to-cyan-500 text-white font-extrabold text-xs tracking-wider hover:opacity-95 shadow-glow-purple disabled:opacity-50 transition-all uppercase cursor-pointer"
              >
                {spinning ? 'ORACLE RECONSTRUCTING COILS...' : '👉 SPIN GENIUS WHEEL (FREE)'}
              </button>

              {/* Wheel Result Card */}
              {wheelResult && (
                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl animate-bounce flex items-center justify-between gap-3 text-left">
                  <div>
                    <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-black block">Spin Complete!</span>
                    <h4 className="text-xs font-black text-white">You Unlocked: {wheelResult.text}</h4>
                  </div>
                  {!isWheelClaimed ? (
                    <button
                      onClick={claimWheelReward}
                      className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] transition-colors cursor-pointer"
                    >
                      CLAIM NOW
                    </button>
                  ) : (
                    <span className="text-[10px] text-emerald-400 font-bold font-mono">CLAIMED ✅</span>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* PSYCHOLOGICAL CLICKBAIT AD BOARD */}
        <div className="space-y-4">
          <div className="flex justify-between items-end border-b border-slate-900 pb-2">
            <div>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-1.5">
                <ShieldAlert className="w-5 h-5 text-red-500" /> Relatable Student Ads (Warning: High Dopamine)
              </h2>
              <p className="text-slate-400 text-xs">These advertisements have been psychologically optimized to exploit your anxiety or competitive drive. Click safely.</p>
            </div>
            <span className="text-[9px] font-mono text-slate-500 font-bold uppercase">Sponsor: Brain Chemistry Corp</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* AD Card 1 - Resume Builder */}
            <div 
              onClick={() => {
                playSynthSound('click');
                setActiveTab('resume');
                // unlock ATS assassin badge
                setBadgeUnlocked(b => ({ ...b, ats: true }));
              }}
              className="group glass-panel p-5 rounded-2xl hover:border-indigo-500/40 relative overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[170px]"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
              <div className="space-y-2 relative">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded uppercase">
                    ATS Exploit Alert
                  </span>
                  <span className="text-[8px] text-red-400 font-bold tracking-widest font-mono uppercase bg-red-500/10 px-1.5 py-0.5 rounded animate-pulse">
                    99.4% HIT RATE
                  </span>
                </div>
                <h3 className="text-md sm:text-lg font-black text-white leading-snug group-hover:text-indigo-300 transition-colors">
                  Recruiters HATE this one weird Resume trick. Download standard light-theme ATS formats instantly!
                </h3>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Stop using decorative charts that scare recruitment bots. Click to compile our elite A4 layout and bypass hiring gatekeepers.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-900 flex justify-between items-center text-xs font-bold">
                <span className="text-indigo-400 group-hover:underline flex items-center gap-1">
                  Launch Cheat Sheets Now <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <span className="text-[9px] font-mono text-slate-500 uppercase">SPONSORED LINK</span>
              </div>
            </div>

            {/* AD Card 2 - Interview Prep */}
            <div 
              onClick={() => {
                playSynthSound('click');
                setActiveTab('interview');
              }}
              className="group glass-panel p-5 rounded-2xl hover:border-purple-500/40 relative overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[170px]"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
              <div className="space-y-2 relative">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded uppercase">
                    Cortex Synchronizer
                  </span>
                  <span className="text-[8px] text-purple-400 font-bold tracking-widest font-mono uppercase bg-purple-500/10 px-1.5 py-0.5 rounded">
                    IQ EXPANSION
                  </span>
                </div>
                <h3 className="text-md sm:text-lg font-black text-white leading-snug group-hover:text-purple-300 transition-colors">
                  Is your brain 84% more receptive to JavaScript closures right now? Find out before it's too late.
                </h3>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Our algorithm suggests high levels of focus. Tap into interactive CS interview flashcards and level up.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-900 flex justify-between items-center text-xs font-bold">
                <span className="text-purple-400 group-hover:underline flex items-center gap-1">
                  Test Your Synapses <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <span className="text-[9px] font-mono text-slate-500 uppercase">SPONSORED LINK</span>
              </div>
            </div>

            {/* AD Card 3 - Notes waitlist */}
            <div 
              onClick={() => {
                playSynthSound('click');
                setActiveTab('notes');
                setBadgeUnlocked(b => ({ ...b, vip: true }));
              }}
              className="group glass-panel p-5 rounded-2xl hover:border-emerald-500/40 relative overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[170px]"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
              <div className="space-y-2 relative">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">
                    High Demand Leak
                  </span>
                  <span className="text-[8px] text-emerald-400 font-bold tracking-widest font-mono uppercase bg-emerald-500/10 px-1.5 py-0.5 rounded animate-pulse">
                    FILLING RAPIDLY
                  </span>
                </div>
                <h3 className="text-md sm:text-lg font-black text-white leading-snug group-hover:text-emerald-300 transition-colors">
                  Engineering notes database leaking access slots. Secure your spot + 1GB premium backup storage free!
                </h3>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Waitlist registrations have spiked 320% this hour. Do not get left behind during mid-term preparation.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-900 flex justify-between items-center text-xs font-bold">
                <span className="text-emerald-400 group-hover:underline flex items-center gap-1">
                  Bypass Waiting List <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <span className="text-[9px] font-mono text-slate-500 uppercase">SPONSORED LINK</span>
              </div>
            </div>

          </div>
        </div>

        {/* ACHIEVEMENT SHELF & RETRO SOUNDBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* BADGE SHELF */}
          <div className="md:col-span-6 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" /> Unlocked Genius Achievements
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">Complete spin tests, waitlists, and focus tasks to fill your display locker with rare trophies.</p>
            
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'ats', key: 'ats', label: 'ATS Assassin', desc: 'Visited ATS Resume Builder', icon: '🥷', color: 'border-indigo-500 bg-indigo-500/10 text-indigo-400' },
                { id: 'spinner', key: 'spinner', label: 'Oracle Spinner', desc: 'Took daily dopamine spin', icon: '🎡', color: 'border-purple-500 bg-purple-500/10 text-purple-400 animate-pulse' },
                { id: 'vip', key: 'vip', label: 'Waitlist VIP', desc: 'Joined engineering notes waitlist', icon: '🎫', color: 'border-amber-500 bg-amber-500/10 text-amber-400' }
              ].map(badge => {
                const unlocked = badgeUnlocked[badge.key] || badge.key === 'spinner'; // Spinner unlocked by default for demo or spins
                return (
                  <div 
                    key={badge.id}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center relative group transition-all cursor-help ${
                      unlocked ? badge.color : 'border-slate-800 bg-slate-950/40 text-slate-600'
                    }`}
                  >
                    <span className={`text-2xl mb-1 filter ${unlocked ? 'drop-shadow-glow' : 'grayscale opacity-30'}`}>
                      {badge.icon}
                    </span>
                    <span className="text-[9px] font-bold tracking-tight leading-tight select-none">
                      {badge.label}
                    </span>

                    {/* hovering tooltip */}
                    <div className="absolute bottom-full mb-2 hidden group-hover:block w-32 p-2 bg-slate-950 border border-slate-800 text-[9px] text-slate-400 rounded shadow-xl text-center z-50">
                      <p className="font-bold text-white mb-0.5">{badge.label}</p>
                      <p className="leading-tight">{badge.desc}</p>
                      <p className="font-mono text-cyan-400 mt-1">{unlocked ? 'UNLOCKED ✅' : 'LOCKED 🔒'}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SOUNDBOARD */}
          <div className="md:col-span-6 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 shadow-2xl relative flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-cyan-400" /> Synthesizer Sound Board
              </h3>
              <p className="text-xs text-slate-400 mt-1 mb-4">Click below to generate high-fidelity retro chimes programmatically utilizing standard browser sine, square, and triangle oscillators.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { type: 'click', label: '8-Bit Blip', color: 'bg-slate-950 border-slate-850 hover:border-cyan-500/50 text-slate-300' },
                { type: 'tick', label: 'Clock Tick', color: 'bg-slate-950 border-slate-850 hover:border-purple-500/50 text-slate-300' },
                { type: 'spin', label: 'Retro Arpeggio', color: 'bg-slate-950 border-slate-850 hover:border-pink-500/50 text-slate-300' },
                { type: 'success', label: 'Chord Chime', color: 'bg-slate-950 border-slate-850 hover:border-emerald-500/50 text-slate-300' }
              ].map((sound, i) => (
                <button
                  key={i}
                  onClick={() => playSynthSound(sound.type)}
                  className={`py-2 px-3 border rounded-xl font-bold font-mono text-[10px] tracking-wide transition-all uppercase cursor-pointer ${sound.color}`}
                >
                  🔊 {sound.label}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
