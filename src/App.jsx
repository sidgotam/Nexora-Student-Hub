import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import FloatingAI from './components/FloatingAI';
import AIAssistant from './pages/AIAssistant';
import ResumeBuilder from './pages/ResumeBuilder';
import InterviewPrep from './pages/InterviewPrep';
import Internships from './pages/Internships';
import Notes from './pages/Notes';
import DopamineHub from './pages/DopamineHub';

export default function App() {
  const [activeTab, setActiveTab] = useState('notes'); // notes, ai, resume, interview, internships, dopamine
  const [globalMood, setGlobalMood] = useState('focus'); // focus, panic, sleepy, procrastinate
  const moodRef = useRef('focus');
  const canvasRef = useRef(null);

  useEffect(() => {
    moodRef.current = globalMood;
  }, [globalMood]);

  // Background Canvas particles loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const particleCount = 45;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Particle schema
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
        this.radius = Math.random() * 2 + 1;
        this.isSpecial = Math.random() > 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce borders
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        const currentMood = moodRef.current || 'focus';
        let mainColor = 'rgba(6, 182, 212, 0.15)'; // cyan
        let secondaryColor = 'rgba(37, 99, 235, 0.15)'; // blue
        
        if (currentMood === 'panic') {
          mainColor = 'rgba(239, 68, 68, 0.15)'; // red
          secondaryColor = 'rgba(249, 115, 22, 0.15)'; // orange
        } else if (currentMood === 'sleepy') {
          mainColor = 'rgba(16, 185, 129, 0.15)'; // emerald
          secondaryColor = 'rgba(6, 182, 212, 0.15)'; // cyan
        } else if (currentMood === 'procrastinate') {
          mainColor = 'rgba(139, 92, 246, 0.15)'; // purple
          secondaryColor = 'rgba(236, 72, 153, 0.15)'; // pink
        }
        
        const color = this.isSpecial ? mainColor : secondaryColor;
        ctx.fillStyle = color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid paths
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      particles.forEach((p, idx) => {
        p.update();
        p.draw();

        // Trace proximity connections
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            
            const currentMood = moodRef.current || 'focus';
            let strokeColor = '6, 182, 212'; // cyan
            if (currentMood === 'panic') strokeColor = '239, 68, 68'; // red
            else if (currentMood === 'sleepy') strokeColor = '16, 185, 129'; // emerald
            else if (currentMood === 'procrastinate') strokeColor = '139, 92, 246'; // purple
            
            ctx.strokeStyle = `rgba(${strokeColor}, ${0.08 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans select-none">
      
      {/* Background Interactive canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Decorative Cyberpunk Background Glowing Orbs */}
      {(() => {
        let orb1 = 'bg-cyan-600/10';
        let orb2 = 'bg-purple-600/5';
        if (globalMood === 'panic') {
          orb1 = 'bg-red-600/10';
          orb2 = 'bg-orange-600/5';
        } else if (globalMood === 'sleepy') {
          orb1 = 'bg-emerald-600/10';
          orb2 = 'bg-cyan-600/5';
        } else if (globalMood === 'procrastinate') {
          orb1 = 'bg-purple-600/10';
          orb2 = 'bg-pink-600/5';
        }
        return (
          <>
            <div className={`absolute top-[10%] left-[5%] w-80 h-80 rounded-full ${orb1} blur-[120px] pointer-events-none -z-10 animate-pulse-glow transition-all duration-1000`} />
            <div className={`absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full ${orb2} blur-[150px] pointer-events-none -z-10 animate-pulse-glow transition-all duration-1000`} style={{ animationDelay: '3s' }} />
          </>
        );
      })()}

      {/* Responsive Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Feature Viewport */}
      <main className="flex-grow z-10">
        {activeTab === 'dopamine' && <DopamineHub setActiveTab={setActiveTab} setGlobalMood={setGlobalMood} />}
        {activeTab === 'ai' && <AIAssistant />}
        {activeTab === 'resume' && <ResumeBuilder />}
        {activeTab === 'interview' && <InterviewPrep />}
        {activeTab === 'internships' && <Internships />}
        {activeTab === 'notes' && <Notes />}
      </main>

      {/* Sticky floating robot */}
      <FloatingAI setActiveTab={setActiveTab} />

      {/* SEO & Monetization-optimized Footer */}
      <footer className="z-10 border-t border-slate-900 bg-slate-950/60 backdrop-blur-md py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-b border-slate-900 pb-6 mb-6">
            <div>
              <h3 className="text-sm font-bold text-white tracking-widest uppercase">NEXORA STUDENT HUB</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
                Everything a student needs in one unified futuristic place. Resume templates, code checklists, and simulated coaches.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500 font-semibold">
              <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
              <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-cyan-400 transition-colors">Terms of Use</a>
              <a href="#support" onClick={(e) => e.preventDefault()} className="hover:text-cyan-400 transition-colors">Academic Support</a>
              <a href="#contact" onClick={(e) => e.preventDefault()} className="hover:text-cyan-400 transition-colors">Developer Contact</a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-600 font-mono gap-3">
            <span>© 2026 Nexora Edu Systems. All Rights Reserved. Built with React & Tailwind CSS.</span>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>OPTIMIZED SECURE SSL COMPILATION</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
