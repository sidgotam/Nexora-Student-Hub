import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  BookOpen, Search, Copy, Check, AlertCircle, Terminal, Database, Cpu, 
  Layers, ArrowRight, Award, Sparkles, Code, Play, RefreshCw, ChevronRight, 
  CheckCircle2, Compass, CheckCircle
} from 'lucide-react';
import mernDocsData from '../data/mernDocsData.json';

export default function MernDocs() {
  const [selectedChapterId, setSelectedChapterId] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('reader'); // reader, visualizer, roadmap, sandbox
  const [copiedIndex, setCopiedIndex] = useState(null);
  
  // Roadmap & Progress Tracker State
  const [roadmapProgress, setRoadmapProgress] = useState(() => {
    const saved = localStorage.getItem('mern_roadmap_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem('mern_roadmap_progress', JSON.stringify(roadmapProgress));
  }, [roadmapProgress]);

  // Coding Sandbox State
  const [sandboxCode, setSandboxCode] = useState(`const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Challenge: Write a GET endpoint to fetch all products from the Product model
// Return a JSON response with status code 200 and the products data.
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;`);
  
  const [sandboxResults, setSandboxResults] = useState([]);
  const [sandboxPassed, setSandboxPassed] = useState(false);
  const [sandboxRunning, setSandboxRunning] = useState(false);

  // Text highlighter helper
  const highlightText = (text, query) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={i} className="bg-cyan-500/35 text-cyan-200 font-semibold px-0.5 rounded">{part}</mark> : part
    );
  };

  // Syntax highlighting helper for code blocks
  const highlightCode = (code) => {
    if (!code) return '';
    let escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // 1. Comments
    escaped = escaped.replace(/(\/\/.*)/g, '<span class="text-slate-500 font-mono font-normal">$1</span>');
    escaped = escaped.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-slate-500 font-mono font-normal">$1</span>');

    // 2. Keywords
    const keywords = [
      'const', 'let', 'var', 'function', 'return', 'import', 'export', 'default',
      'class', 'new', 'await', 'async', 'if', 'else', 'try', 'catch', 'throw',
      'require', 'module', 'exports'
    ];
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b(${kw})\\b`, 'g');
      escaped = escaped.replace(regex, '<span class="text-pink-400 font-bold">$1</span>');
    });

    // 3. Strings
    escaped = escaped.replace(/(["'`])(.*?)\1/g, '<span class="text-emerald-400">$1$2$1</span>');

    // 4. Numbers & Booleans
    escaped = escaped.replace(/\b(true|false|null|undefined|\d+)\b/g, '<span class="text-sky-300 font-mono">$1</span>');

    return escaped;
  };

  // Handle Copy Code to clipboard
  const handleCopyCode = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  // Filter chapters based on search query
  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return mernDocsData;
    
    return mernDocsData.map(chapter => {
      const matchCount = chapter.elements.reduce((acc, el) => {
        const textToSearch = el.text || (el.headers ? el.headers.join(' ') : '') || '';
        return acc + (textToSearch.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0);
      }, 0);

      return {
        ...chapter,
        matchCount
      };
    }).filter(chapter => chapter.matchCount > 0 || chapter.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  // Total Study Progress Calculation
  const progressPercent = useMemo(() => {
    const chaptersToTrack = mernDocsData.filter(c => c.id !== 0 && !c.title.includes('Table of Contents'));
    const total = chaptersToTrack.length;
    if (total === 0) return 0;
    const completed = chaptersToTrack.filter(c => roadmapProgress[c.id] === 'completed').length;
    return Math.round((completed / total) * 100);
  }, [roadmapProgress]);

  // Active Chapter display
  const activeChapter = useMemo(() => {
    return mernDocsData.find(c => c.id === selectedChapterId) || mernDocsData[0];
  }, [selectedChapterId]);

  // Run Mock Sandbox tests
  const runSandboxTests = () => {
    setSandboxRunning(true);
    setSandboxResults([]);
    
    setTimeout(() => {
      const tests = [
        {
          id: 1,
          name: "Express router GET definition",
          test: (code) => code.includes("router.get"),
          passed: false
        },
        {
          id: 2,
          name: "GET route path maps to '/products'",
          test: (code) => code.match(/router\.get\(\s*['"]\/products['"]\s*,/i) || code.match(/router\.get\(\s*['"]\/api\/products['"]\s*,/i),
          passed: false
        },
        {
          id: 3,
          name: "Middleware executes asynchronously (async/await)",
          test: (code) => code.includes("async") && code.includes("await"),
          passed: false
        },
        {
          id: 4,
          name: "Queries Product model using 'Product.find'",
          test: (code) => code.includes("Product.find"),
          passed: false
        },
        {
          id: 5,
          name: "Returns status code 200 on success",
          test: (code) => code.includes("status(200)") || code.includes("statusCode = 200"),
          passed: false
        },
        {
          id: 6,
          name: "Responds with json payload containing product data",
          test: (code) => code.includes("json(") && code.includes("products"),
          passed: false
        }
      ];

      const results = tests.map(t => {
        const passed = t.test(sandboxCode);
        return {
          ...t,
          passed
        };
      });

      setSandboxResults(results);
      setSandboxPassed(results.every(r => r.passed));
      setSandboxRunning(false);
    }, 800);
  };

  const updateRoadmapStatus = (chapId, status) => {
    setRoadmapProgress(prev => ({
      ...prev,
      [chapId]: status
    }));
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-4 py-10 md:py-14 lg:px-8 bg-[#020617] text-slate-100 font-sans select-text">
      <div className="relative mx-auto max-w-7xl z-10 space-y-8">
        
        {/* ==========================================
           HEADER / SUB-NAVBAR
           ========================================== */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-900 pb-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono tracking-wider font-bold">
              <Code className="w-3.5 h-3.5" /> DEVELOPER DOCUMENTATION
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              MERN Stack{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 text-neon-cyan">
                Complete Reference
              </span>
            </h1>
          </div>

          {/* Navigation Tab selection */}
          <div className="flex flex-wrap gap-2 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('reader')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'reader'
                  ? 'bg-orange-500 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Docs Reader
            </button>
            <button
              onClick={() => setActiveTab('visualizer')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'visualizer'
                  ? 'bg-orange-500 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5" /> MVC Visualizer
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'roadmap'
                  ? 'bg-orange-500 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/50'
              }`}
            >
              <Award className="w-3.5 h-3.5" /> Study Roadmap
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'sandbox'
                  ? 'bg-orange-500 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/50'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" /> API Sandbox
            </button>
          </div>
        </div>

        {/* Global Progress banner */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-extrabold">
              {progressPercent}%
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">YOUR STUDY PROGRESS</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Complete all 17 chapters to unlock full-stack developer proficiency.</p>
            </div>
          </div>
          <div className="w-full sm:w-60">
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(249,115,22,0.2)]" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* ==========================================
           TAB CONTENT
           ========================================== */}
        
        {/* TAB 1: DOCS READER */}
        {activeTab === 'reader' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            
            {/* Sidebar Left */}
            <div className="lg:col-span-1 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search inside docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-xs placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div className="glass-panel max-h-[60vh] lg:max-h-[70vh] overflow-y-auto rounded-2xl p-2.5 space-y-1">
                <div className="px-2 py-1 text-[10px] font-mono tracking-widest text-slate-500 font-bold uppercase border-b border-slate-900 pb-2 mb-2">
                  CHAPTER INDEX
                </div>
                {filteredChapters.map((chapter) => {
                  const isSelected = selectedChapterId === chapter.id;
                  const isCompleted = roadmapProgress[chapter.id] === 'completed';
                  const isInProgress = roadmapProgress[chapter.id] === 'in-progress';
                  
                  return (
                    <button
                      key={chapter.id}
                      onClick={() => setSelectedChapterId(chapter.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-xs transition-all ${
                        isSelected 
                          ? 'bg-orange-500/10 border border-orange-500/40 text-orange-300 shadow-inner' 
                          : 'hover:bg-slate-900/60 border border-transparent text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="truncate max-w-[170px]">{chapter.title}</span>
                      
                      {/* Search matches or completion state badge */}
                      {searchQuery.trim() ? (
                        chapter.matchCount > 0 && (
                          <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            {chapter.matchCount}
                          </span>
                        )
                      ) : isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : isInProgress ? (
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping shrink-0" />
                      ) : null}
                    </button>
                  );
                })}
                {filteredChapters.length === 0 && (
                  <div className="text-center py-6 text-slate-500 text-xs font-mono">
                    No matching chapters found.
                  </div>
                )}
              </div>
            </div>

            {/* Document Reader Area */}
            <div className="lg:col-span-3 space-y-6 bg-slate-950/40 border border-slate-900 rounded-3xl p-6 sm:p-8 min-h-[60vh] max-h-[80vh] overflow-y-auto relative">
              
              {/* Document Header Panel */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-6 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">{activeChapter.title}</h2>
                  <p className="text-xs text-slate-500 font-mono mt-1">
                    INDEX ID: #{activeChapter.id} • {activeChapter.elements.length} MODULE ELEMENTS
                  </p>
                </div>
                
                {/* Individual progress tracker */}
                {activeChapter.id !== 0 && !activeChapter.title.includes('Table of Contents') && (
                  <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">STUDY STATUS:</span>
                    <select
                      value={roadmapProgress[activeChapter.id] || 'todo'}
                      onChange={(e) => updateRoadmapStatus(activeChapter.id, e.target.value)}
                      className="bg-transparent text-xs font-bold focus:outline-none border-none text-orange-400 cursor-pointer"
                    >
                      <option value="todo" className="bg-slate-950 text-slate-400">Not Started</option>
                      <option value="in-progress" className="bg-slate-950 text-amber-400">In Progress</option>
                      <option value="completed" className="bg-slate-950 text-emerald-400">Completed</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Document Elements Iterator */}
              <div className="space-y-6">
                {activeChapter.elements.map((el, index) => {
                  if (el.type === 'h2') {
                    return (
                      <h2 key={index} className="text-xl sm:text-2xl font-bold text-white border-l-4 border-orange-500 pl-3 mt-10 mb-4 tracking-tight">
                        {highlightText(el.text, searchQuery)}
                      </h2>
                    );
                  }
                  
                  if (el.type === 'h3') {
                    return (
                      <h3 key={index} className="text-base sm:text-lg font-bold text-slate-200 mt-6 mb-3">
                        {highlightText(el.text, searchQuery)}
                      </h3>
                    );
                  }
                  
                  if (el.type === 'li') {
                    return (
                      <div key={index} className="flex items-start gap-2 text-slate-300 text-sm leading-relaxed mb-2 pl-2">
                        <span className="text-orange-400 mt-1 select-none font-black">•</span>
                        <span>{highlightText(el.text, searchQuery)}</span>
                      </div>
                    );
                  }

                  if (el.type === 'note') {
                    return (
                      <div key={index} className="my-6 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-slate-200 text-sm leading-relaxed flex gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-400 font-semibold block mb-0.5">Note:</strong>
                          {highlightText(el.text, searchQuery)}
                        </div>
                      </div>
                    );
                  }

                  if (el.type === 'code') {
                    const isCopied = copiedIndex === index;
                    return (
                      <div key={index} className="my-6 overflow-hidden rounded-xl border border-slate-800 bg-[#090e1a] shadow-2xl font-mono text-xs">
                        
                        {/* Editor Header Bar */}
                        <div className="flex items-center justify-between px-4 py-2 bg-[#050810] border-b border-slate-900">
                          <div className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                            <span className="text-[10px] text-slate-500 font-semibold ml-2">MERN SOURCE CODE</span>
                          </div>
                          
                          <button
                            onClick={() => handleCopyCode(el.text, index)}
                            className="flex items-center gap-1 px-2 py-1 bg-slate-900 hover:bg-slate-850 hover:text-white rounded border border-slate-800 text-[10px] text-slate-400 transition-colors"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        
                        {/* Syntax Highlighted Editor Body */}
                        <pre className="p-4 overflow-x-auto leading-relaxed select-text text-[#c5c9db] max-h-80 overflow-y-auto">
                          <code 
                            dangerouslySetInnerHTML={{ __html: highlightCode(el.text) }} 
                          />
                        </pre>
                      </div>
                    );
                  }

                  if (el.type === 'table') {
                    return (
                      <div key={index} className="my-6 overflow-hidden rounded-xl border border-slate-900 shadow-xl overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-slate-950/80 border-b border-slate-800 text-orange-400 font-bold">
                              {el.headers.map((h, hi) => (
                                <th key={hi} className="p-3 font-semibold uppercase tracking-wider">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {el.rows.map((row, ri) => (
                              <tr 
                                key={ri} 
                                className={`border-b border-slate-900/60 transition-colors hover:bg-slate-900/30 ${
                                  ri % 2 === 0 ? 'bg-slate-900/10' : 'bg-slate-950/20'
                                }`}
                              >
                                {row.map((cell, ci) => (
                                  <td key={ci} className="p-3 text-slate-300 leading-relaxed font-sans white-space-pre-wrap">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }

                  // Default: paragraph
                  return (
                    <p key={index} className="text-slate-300 text-sm leading-relaxed mb-4 font-sans">
                      {highlightText(el.text, searchQuery)}
                    </p>
                  );
                })}
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: MVC VISUALIZER */}
        {activeTab === 'visualizer' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-8">
            <div className="max-w-2xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-orange-400" /> Interactive MERN MVC Architecture Flow
              </h3>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                Click on any of the architecture layers below to view its description, responsibilities, and immediately jump to its documentation chapter in the reader.
              </p>
            </div>

            {/* Architecture Flow SVG / Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center pt-4">
              
              {/* React Node */}
              <div 
                onClick={() => setSelectedChapterId(7)} // Chapter 5 React.js
                className="cursor-pointer group glass-panel p-5 rounded-2xl border-l-4 border-l-cyan-500 hover:border-cyan-400 transition-all duration-300 hover:bg-slate-900/50 flex flex-col justify-between h-36"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">FRONTEND LAYER</span>
                    <Cpu className="w-5 h-5 text-cyan-400 group-hover:animate-spin" />
                  </div>
                  <h4 className="text-base font-extrabold text-white mt-2 group-hover:text-cyan-400 transition-colors">React.js Client</h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Component-based UI state, rendering DOM, and HTTP fetch requests.</p>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1 group-hover:underline">
                  Jump to Chapter 5 <ChevronRight className="w-3 h-3" />
                </span>
              </div>

              {/* Express Node */}
              <div 
                onClick={() => setSelectedChapterId(6)} // Chapter 4 Express
                className="cursor-pointer group glass-panel p-5 rounded-2xl border-l-4 border-l-pink-500 hover:border-pink-400 transition-all duration-300 hover:bg-slate-900/50 flex flex-col justify-between h-36"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-pink-400 font-bold uppercase">ROUTING LAYER</span>
                    <Layers className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="text-base font-extrabold text-white mt-2 group-hover:text-pink-400 transition-colors">Express.js Framework</h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Handling API requests, middlewares, CORS, routing, and controller routing.</p>
                </div>
                <span className="text-[10px] font-mono text-pink-400 flex items-center gap-1 group-hover:underline">
                  Jump to Chapter 4 <ChevronRight className="w-3 h-3" />
                </span>
              </div>

              {/* Node runtime Node */}
              <div 
                onClick={() => setSelectedChapterId(8)} // Chapter 6 Node.js
                className="cursor-pointer group glass-panel p-5 rounded-2xl border-l-4 border-l-emerald-500 hover:border-emerald-400 transition-all duration-300 hover:bg-slate-900/50 flex flex-col justify-between h-36"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">RUNTIME LAYER</span>
                    <Terminal className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h4 className="text-base font-extrabold text-white mt-2 group-hover:text-emerald-400 transition-colors">Node.js Server</h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">V8 runtime engine, event loop execution, file stream, environment variables.</p>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 group-hover:underline">
                  Jump to Chapter 6 <ChevronRight className="w-3 h-3" />
                </span>
              </div>

              {/* MongoDB Node */}
              <div 
                onClick={() => setSelectedChapterId(5)} // Chapter 3 MongoDB
                className="cursor-pointer group glass-panel p-5 rounded-2xl border-l-4 border-l-yellow-500 hover:border-yellow-400 transition-all duration-300 hover:bg-slate-900/50 flex flex-col justify-between h-36"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-yellow-400 font-bold uppercase">DATABASE LAYER</span>
                    <Database className="w-5 h-5 text-yellow-400 group-hover:animate-bounce" />
                  </div>
                  <h4 className="text-base font-extrabold text-white mt-2 group-hover:text-yellow-400 transition-colors">MongoDB Database</h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">BSON document storage, flexible schemas, indexing, and aggregation pipelines.</p>
                </div>
                <span className="text-[10px] font-mono text-yellow-400 flex items-center gap-1 group-hover:underline">
                  Jump to Chapter 3 <ChevronRight className="w-3 h-3" />
                </span>
              </div>

            </div>

            {/* Animation flow diagram */}
            <div className="flex flex-col items-center justify-center py-8 bg-slate-950/60 rounded-2xl border border-slate-900 px-4">
              <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase font-bold mb-4">DATAFLOW CYCLE</span>
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-xs font-mono font-bold text-slate-400 w-full max-w-4xl justify-between">
                
                <div className="px-3 py-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 rounded-lg text-center w-full sm:w-auto">
                  1. React clicks fetch()
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 rotate-90 sm:rotate-0" />
                
                <div className="px-3 py-2 bg-pink-500/10 border border-pink-500/20 text-pink-300 rounded-lg text-center w-full sm:w-auto">
                  2. Express intercepts request
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 rotate-90 sm:rotate-0" />
                
                <div className="px-3 py-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 rounded-lg text-center w-full sm:w-auto">
                  3. Mongoose queries MongoDB
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 rotate-90 sm:rotate-0" />
                
                <div className="px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-lg text-center w-full sm:w-auto">
                  4. JSON responds to Frontend
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: STUDY ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-400 animate-bounce" /> MERN Stack Study Roadmap
              </h3>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                Check off chapters as you read through the reference documentation. Tracking status updates your global study progress metrics in real-time.
              </p>
            </div>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mernDocsData
                .filter(c => c.id !== 0 && !c.title.includes('Table of Contents'))
                .map((chap) => {
                  const status = roadmapProgress[chap.id] || 'todo';
                  
                  return (
                    <div 
                      key={chap.id}
                      className={`p-4 rounded-xl border transition-all ${
                        status === 'completed' 
                          ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-200' 
                          : status === 'in-progress' 
                          ? 'bg-amber-500/5 border-amber-500/20 text-slate-200' 
                          : 'bg-slate-900/30 border-slate-850 text-slate-400'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">CHAPTER #{chap.id}</span>
                        {status === 'completed' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                      </div>
                      
                      <h4 className="text-xs font-bold text-white mt-1.5 line-clamp-1">{chap.title}</h4>
                      
                      {/* Checkbox triggers */}
                      <div className="flex items-center gap-4 mt-4 text-[10px] font-mono font-bold">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name={`roadmap_status_${chap.id}`}
                            value="todo"
                            checked={status === 'todo'}
                            onChange={() => updateRoadmapStatus(chap.id, 'todo')}
                            className="text-orange-500 focus:ring-0 focus:ring-offset-0"
                          />
                          <span>Todo</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer text-amber-400">
                          <input
                            type="radio"
                            name={`roadmap_status_${chap.id}`}
                            value="in-progress"
                            checked={status === 'in-progress'}
                            onChange={() => updateRoadmapStatus(chap.id, 'in-progress')}
                            className="text-amber-500 focus:ring-0 focus:ring-offset-0"
                          />
                          <span>In Progress</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer text-emerald-400">
                          <input
                            type="radio"
                            name={`roadmap_status_${chap.id}`}
                            value="completed"
                            checked={status === 'completed'}
                            onChange={() => updateRoadmapStatus(chap.id, 'completed')}
                            className="text-emerald-500 focus:ring-0 focus:ring-offset-0"
                          />
                          <span>Completed</span>
                        </label>
                      </div>
                    </div>
                  );
                })}
            </div>
            
            {progressPercent === 100 && (
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-center font-bold text-sm flex flex-col items-center gap-2 animate-bounce mt-4">
                <Sparkles className="w-8 h-8 text-emerald-400" />
                <span>🏆 CONGRATULATIONS! You have completed the entire MERN Stack Roadmap! You are ready to build full stack apps.</span>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: API PRACTICE PLAYGROUND */}
        {activeTab === 'sandbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Editor Side */}
            <div className="glass-panel p-6 rounded-3xl flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-orange-400" /> Express API Practice Sandbox
                </h3>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  Practice building backend REST APIs. Write or edit the Express route below to fetch products from the database, then click "Run Tests" to validate your code.
                </p>
              </div>

              <div className="flex-grow font-mono text-xs overflow-hidden rounded-xl border border-slate-800 bg-[#090e1a]">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-[#050810] border-b border-slate-900">
                  <span className="text-[10px] text-slate-500 font-semibold">routes/productRoutes.js</span>
                  <span className="text-[9px] bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded">EXPRESS</span>
                </div>
                {/* Textarea */}
                <textarea
                  value={sandboxCode}
                  onChange={(e) => setSandboxCode(e.target.value)}
                  className="w-full h-80 p-4 bg-transparent text-slate-200 outline-none resize-none font-mono text-xs leading-relaxed focus:ring-0"
                />
              </div>

              <button
                onClick={runSandboxTests}
                disabled={sandboxRunning}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs hover:from-orange-400 hover:to-amber-400 shadow-[0_0_20px_rgba(249,115,22,0.15)] disabled:opacity-50 transition-all"
              >
                {sandboxRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Compiling & Testing Code...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Run Verification Tests</span>
                  </>
                )}
              </button>
            </div>

            {/* Results Side */}
            <div className="glass-panel p-6 rounded-3xl flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono text-slate-400">TEST CASES & OUTPUT</h3>
                <p className="text-slate-400 text-xs mt-1">Validation test suite checks Express syntax, async structures, and MongoDB logic.</p>
              </div>

              {/* Test Cases list */}
              <div className="flex-grow space-y-3 max-h-80 overflow-y-auto pr-1">
                {sandboxResults.map((r) => (
                  <div 
                    key={r.id}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold ${
                      r.passed 
                        ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' 
                        : 'bg-red-500/5 border-red-500/20 text-slate-400'
                    }`}
                  >
                    <span>{r.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      r.passed 
                        ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/25' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/20'
                    }`}>
                      {r.passed ? 'PASSED' : 'FAILED'}
                    </span>
                  </div>
                ))}

                {sandboxResults.length === 0 && (
                  <div className="text-center py-20 text-slate-500 text-xs font-mono border border-slate-900 border-dashed rounded-xl">
                    Write code and run tests to see verification outputs.
                  </div>
                )}
              </div>

              {/* Global Verification banner */}
              {sandboxResults.length > 0 && (
                <div className={`p-4 rounded-xl border text-center text-xs font-bold ${
                  sandboxPassed 
                    ? 'bg-emerald-500/10 border-emerald-500/35 text-emerald-400 animate-pulse' 
                    : 'bg-red-500/15 border-red-500/30 text-red-400'
                }`}>
                  {sandboxPassed ? (
                    <div className="flex items-center justify-center gap-1.5">
                      <Award className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>EXCELLENT! All API endpoints validated successfully. Roadmap unlocked!</span>
                    </div>
                  ) : (
                    <span>❌ Verification failed. Review compile conditions and re-test.</span>
                  )}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
