import React, { useState } from 'react';
import { Sparkles, MessageSquare, X, Play, RefreshCcw } from 'lucide-react';

export default function FloatingAI({ setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const tips = [
    { title: 'Resume ATS Check', text: 'ATS bots scan for nouns. Avoid charts and use keywords from the job specifications. Click "Resume Builder" to start!', target: 'resume' },
    { title: 'Interview Scope', text: 'Struggled with Closures? React and Node rely extensively on closures. Try the Q&A card deck in "Interview Prep"!', target: 'interview' },
    { title: 'Internship Deadlines', text: 'Apply early! Internships posted "Today" receive 5x higher attention scores from recruiter panels.', target: 'internships' },
  ];

  const [activeTip, setActiveTip] = useState(0);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 shadow-glow-cyan text-white hover:scale-105 active:scale-95 transition-all relative group"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold font-mono text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            ASK NEXORA AI
          </span>
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 opacity-20 blur animate-ping -z-10" />
        </button>
      ) : (
        <div className="w-80 rounded-2xl glass-panel-neon border border-cyan-500/20 shadow-2xl p-5 space-y-4 animate-slideUp text-left">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Nexora Mini-Coach</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tips Content box */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 space-y-2">
            <span className="text-[9px] font-bold font-mono text-purple-400 uppercase tracking-widest block">Study Hack Insight</span>
            <h4 className="text-xs font-extrabold text-white">{tips[activeTip].title}</h4>
            <p className="text-[11px] leading-relaxed text-slate-400">{tips[activeTip].text}</p>
          </div>

          {/* CTA redirect */}
          <button
            onClick={() => {
              setActiveTab(tips[activeTip].target);
              setIsOpen(false);
            }}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-glow-cyan"
          >
            Launch Tool Workspace <Play className="w-3 h-3 fill-white" />
          </button>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1">
            <span>Coach Helper Active</span>
            <button
              onClick={() => setActiveTip((activeTip + 1) % tips.length)}
              className="flex items-center gap-1 hover:text-cyan-400 transition-colors font-bold font-mono"
            >
              <RefreshCcw className="w-3 h-3" /> NEXT TIP
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
