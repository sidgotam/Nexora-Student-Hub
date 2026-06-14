import React, { useState } from 'react';
import { Sparkles, FileText, GraduationCap, Clock, Briefcase, Menu, X, ChevronRight, Zap, Flame, BookMarked, Code } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'notes', label: 'Notes & PYQs', icon: BookMarked, color: 'text-emerald-400 font-bold' },
    { id: 'merndocs', label: 'MERN DevDocs', icon: Code, color: 'text-orange-400 font-bold' },
    { id: 'ai', label: 'AI Study Assistant', icon: Sparkles, color: 'text-cyan-400' },
    { id: 'resume', label: 'Resume Builder', icon: FileText, color: 'text-indigo-400' },
    { id: 'interview', label: 'Interview Prep', icon: GraduationCap, color: 'text-purple-400' },
    { id: 'internships', label: 'Internships Board', icon: Briefcase, color: 'text-blue-400' },
    { id: 'dopamine', label: 'Dopamine Hub', icon: Zap, color: 'text-amber-400 animate-pulse' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('ai')}>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 shadow-glow-cyan">
              <span className="font-extrabold text-white text-lg">N</span>
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 opacity-30 blur animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-200 to-purple-400 text-neon-cyan">
                NEXORA
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                STUDENT HUB
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 bg-slate-900/40 p-1.5 rounded-xl border border-slate-800/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-slate-800/80 text-white shadow-inner border border-slate-700/50'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${item.color} ${isActive ? 'animate-pulse' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Accent Widget */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-400 animate-pulse">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span className="text-[11px] font-mono font-bold tracking-wider">3 DAYS</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[11px] font-mono tracking-wider text-slate-300">SERVER ACTIVE</span>
            </div>
            <a 
              href="#notes" 
              onClick={(e) => { e.preventDefault(); setActiveTab('notes'); }} 
              className="relative group overflow-hidden rounded-lg p-[1px] focus:outline-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg" />
              <span className="relative flex items-center gap-1 px-4 py-1.5 rounded-[7px] bg-slate-950 text-xs font-semibold text-white transition-all group-hover:bg-slate-900/60">
                Join Beta <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white border border-slate-800"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-lg">
          <div className="space-y-1 px-2 pb-4 pt-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-all ${
                    isActive
                      ? 'bg-slate-900 text-cyan-400 border-l-2 border-cyan-400'
                      : 'text-slate-400 hover:bg-slate-900/50 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-4 px-4 flex items-center justify-between border-t border-slate-800/50 mt-2">
              <span className="text-xs text-slate-400">Beta Version 1.0.2</span>
              <button 
                onClick={() => { setActiveTab('notes'); setIsOpen(false); }}
                className="text-xs font-bold text-cyan-400 hover:underline"
              >
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
