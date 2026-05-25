import React, { useState } from 'react';
import { Sparkles, Send, BrainCircuit, Code, HelpCircle, Layers, ChevronLeft, ChevronRight, RotateCcw, AlertCircle, Play, Loader2, ArrowRight } from 'lucide-react';

export default function AIAssistant() {
  const [activeWorkspace, setActiveWorkspace] = useState('explain'); // explain, quiz, flashcard
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I am Nexora's Gemini-powered Academic Companion. I can compile deep summaries, build custom interactive quizzes, or construct dynamic flashcards. Select a tool on the right or ask me a question in chat!",
      time: 'Online'
    }
  ]);

  // Loading States for API
  const [loadingExplain, setLoadingExplain] = useState(false);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [loadingFlash, setLoadingFlash] = useState(false);

  // Topic States for custom API generation
  const [customTopic, setCustomTopic] = useState('');
  const [customQuizTopic, setCustomQuizTopic] = useState('');
  const [customFlashTopic, setCustomFlashTopic] = useState('');

  // Active Data Structures
  const [explainerData, setExplainerData] = useState({
    title: 'JavaScript Closures Explained',
    sub: 'Advanced Scope & Functional Programming',
    concept: 'A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives an inner function access to the outer function\'s scope even after the outer function has returned.',
    analogy: 'Imagine a backpack. When a parent function runs, it creates some items (variables) and packs them in the inner function\'s backpack. Even when the parent function is done and leaves, the inner function carries that backpack wherever it goes!',
    code: `function createCounter() {
  let count = 0; // Lexical variable inside parent scope
  
  return {
    increment: function() {
      count++; // Accesses outer parent scope "count"
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const myCounter = createCounter();
console.log(myCounter.increment()); // Output: 1`,
    benefits: ['Preserve variable state in encapsulation.', 'Emulate private methods (like OOP).', 'Avoid global namespace cluttering.']
  });

  const [quizQuestions, setQuizQuestions] = useState([
    {
      q: 'Which of the following is true about Virtual DOM in React?',
      options: [
        'It is a direct copy of the actual DOM API.',
        'React keeps a lightweight virtual representation of the DOM in memory and syncs it via Reconciliation.',
        'Updating virtual DOM elements directly triggers repaint on screen immediately.',
        'Virtual DOM was deprecated in React 18.'
      ],
      correctIndex: 1,
      exp: 'React creates an in-memory data-structure cache, computes the differences, and then updates the browser\'s displayed DOM efficiently using the reconciliation process.'
    },
    {
      q: 'What is the time complexity to insert a node at the beginning of a Singly Linked List?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
      correctIndex: 0,
      exp: 'Inserting at the head requires simply pointing the new node\'s next reference to the current head, then updating the head pointer. This operation does not traverse the list, hence O(1).'
    }
  ]);

  const [flashcardDeck, setFlashcardDeck] = useState([
    { q: 'What is a Pure Function?', a: 'A function that always returns the exact same output when given the exact same arguments, and has zero side-effects (e.g. modifying global variables or external state).' },
    { q: 'What does ACID stand for in databases?', a: 'Atomicity (all or nothing), Consistency (preserves rules), Isolation (independent runs), and Durability (saved transactions persist).' },
    { q: 'What is a CSS Flexbox Axis?', a: 'Flexbox relies on two axes: the Main Axis (aligned using justify-content) and the Cross Axis (aligned using align-items). Their directions are set by flex-direction.' }
  ]);

  // Quiz Performance states
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  // Flashcards state
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Gemini API Caller Utility
  const callGemini = async (prompt) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyADTgcdjCOHGUw8Oc5NkaN9e3GUgXfcUNk';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
      return data.candidates[0].content.parts[0].text;
    }
    throw new Error('API Error: No response content received.');
  };

  // Helper to clean Markdown json blocks
  const cleanJSON = (text) => {
    let cleaned = text.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```json\s*/i, '').replace(/^```\s*/, '');
    }
    if (cleaned.endsWith('```')) {
      cleaned = cleaned.replace(/\s*```$/, '');
    }
    return cleaned.trim();
  };

  // Chat Submission Core
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setMessages(prev => [...prev, { sender: 'user', text: userText, time: 'Just now' }]);
    setChatInput('');
    setIsTyping(true);

    try {
      const responseText = await callGemini(
        `You are Nexora AI, a brilliant academic companion for students. Keep explanations clear, well-structured, and concise. Give direct, data-backed help to the student query: "${userText}"`
      );
      setMessages(prev => [...prev, { sender: 'ai', text: responseText, time: 'Just now' }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { sender: 'ai', text: "I ran into a connection glitch reaching the Gemini API core. Please verify your internet sync or API token.", time: 'Error' }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Dynamic Workspace Generator: Explain Topic
  const generateExplanation = async (topic) => {
    const queryTopic = topic || customTopic || 'Recursion';
    setLoadingExplain(true);
    try {
      const prompt = `Explain the academic concept of "${queryTopic}" in detail. Format your response strictly as a single parseable JSON object matching this structure (do not include any markdown selectors, wrapping text, or triple backticks, output pure raw JSON only):
      {
        "title": "Title of Topic",
        "sub": "Subheading Category",
        "concept": "Formal definition of the concept in 2-3 sentences.",
        "analogy": "An elegant, visual, student-friendly analogy explaining it.",
        "code": "A clean code snippet (JS, Python, or C++) or structural visual schema illustrating the topic.",
        "benefits": ["Benefit 1", "Benefit 2", "Benefit 3"]
      }`;

      const res = await callGemini(prompt);
      const jsonParsed = JSON.parse(cleanJSON(res));
      setExplainerData(jsonParsed);
    } catch (err) {
      console.error(err);
      alert('Failed to parse Gemini output. The AI might have returned non-JSON data. Please try again!');
    } finally {
      setLoadingExplain(false);
    }
  };

  // Dynamic Workspace Generator: Quiz Generator
  const generateQuiz = async (topic) => {
    const queryTopic = topic || customQuizTopic || 'Web Development';
    setLoadingQuiz(true);
    try {
      const prompt = `Generate a 5-question multiple-choice quiz on the topic of "${queryTopic}". Format your response strictly as a single parseable JSON array matching this structure (do not include any markdown json selectors or triple backticks, output pure raw JSON array only):
      [
        {
          "q": "Clear multiple choice question?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctIndex": 0,
          "exp": "Detailed explanation of why Option A is correct."
        }
      ]`;

      const res = await callGemini(prompt);
      const jsonParsed = JSON.parse(cleanJSON(res));
      setQuizQuestions(jsonParsed);
      setSelectedQuizAnswers({});
      setCurrentQuizQuestion(0);
      setShowQuizResults(false);
    } catch (err) {
      console.error(err);
      alert('Failed to parse Gemini output. Please try a different query!');
    } finally {
      setLoadingQuiz(false);
    }
  };

  // Dynamic Workspace Generator: Flashcards
  const generateFlashcards = async (topic) => {
    const queryTopic = topic || customFlashTopic || 'Database Keys';
    setLoadingFlash(true);
    try {
      const prompt = `Generate a list of 5 study flashcards on the topic of "${queryTopic}". Format your response strictly as a single parseable JSON array matching this structure (do not include any markdown code blocks or triple backticks, output pure raw JSON array only):
      [
        {
          "q": "Term or question on front of card?",
          "a": "Detailed explanation or definition on back of card."
        }
      ]`;

      const res = await callGemini(prompt);
      const jsonParsed = JSON.parse(cleanJSON(res));
      setFlashcardDeck(jsonParsed);
      setCurrentFlashcard(0);
      setIsFlipped(false);
    } catch (err) {
      console.error(err);
      alert('Failed to parse Gemini card deck. Try again!');
    } finally {
      setLoadingFlash(false);
    }
  };

  const handleSelectQuizAnswer = (qIndex, oIndex) => {
    setSelectedQuizAnswers(prev => ({ ...prev, [qIndex]: oIndex }));
  };

  const handleRestartQuiz = () => {
    setSelectedQuizAnswers({});
    setCurrentQuizQuestion(0);
    setShowQuizResults(false);
  };

  const score = Object.entries(selectedQuizAnswers).reduce((acc, [qIdx, ansIdx]) => {
    return ansIdx === quizQuestions[qIdx].correctIndex ? acc + 1 : acc;
  }, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row gap-8">
      
      {/* LEFT: Live Cyberpunk Chat Companion */}
      <div className="w-full lg:w-5/12 flex flex-col h-[650px] bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-glow-blue overflow-hidden">
        {/* Chat Header */}
        <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-500 shadow-glow-cyan text-white">
              <BrainCircuit className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide">Nexora AI Companion</h2>
              <span className="text-[10px] text-cyan-400 font-semibold font-mono tracking-wider">LIVE GEMINI SYNC</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" /> KEY ACTIVE
          </div>
        </div>

        {/* Chat Logs */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col max-w-[85%] ${
                m.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
              }`}
            >
              <div
                className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-tr-none shadow-glow-cyan'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-350 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[9px] text-slate-500 font-mono mt-1 px-1">{m.time}</span>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 max-w-[80%] bg-slate-900/40 border border-slate-850 p-3 rounded-2xl rounded-tl-none mr-auto">
              <span className="text-xs text-slate-450 animate-pulse">Gemini thinking...</span>
              <div className="flex gap-1">
                <div className="h-1.5 w-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="h-1.5 w-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="h-1.5 w-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>

        {/* Suggestion Prompts */}
        <div className="p-3 border-t border-slate-800/40 bg-slate-950/20 grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              setChatInput('Explain Closure inside JavaScript with code samples');
            }}
            className="text-left p-2 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/20 transition-all text-[11px] text-slate-400 hover:text-slate-200"
          >
            💡 <span className="font-semibold">Explain Closure</span>
          </button>
          <button
            onClick={() => {
              setChatInput('What is a Hash Map Collision and how do we resolve it?');
            }}
            className="text-left p-2 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/20 transition-all text-[11px] text-slate-400 hover:text-slate-200"
          >
            🌳 <span className="font-semibold">Hash Map Collisions</span>
          </button>
          <button
            onClick={() => {
              setChatInput('Give me 3 tips to optimize React rendering performance');
            }}
            className="text-left p-2 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/20 transition-all text-[11px] text-slate-400 hover:text-slate-200"
          >
            ⚛️ <span className="font-semibold">React Optimizations</span>
          </button>
          <button
            onClick={() => {
              setChatInput('Explain the difference between SQL and NoSQL databases');
            }}
            className="text-left p-2 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/20 transition-all text-[11px] text-slate-400 hover:text-slate-200"
          >
            🛢️ <span className="font-semibold">SQL vs NoSQL</span>
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleChatSubmit} className="p-3 border-t border-slate-800 bg-slate-950 flex gap-2">
          <input
            type="text"
            placeholder="Ask AI anything..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm placeholder-slate-500"
          />
          <button
            type="submit"
            className="flex items-center justify-center p-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition-all shadow-glow-cyan"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* RIGHT: Live Academic Workspace */}
      <div className="flex-1 flex flex-col h-[650px] bg-slate-900/30 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        
        {/* Workspace Tab Toolbar */}
        <div className="flex border-b border-slate-800/80 bg-slate-950/40 p-1.5 gap-1.5">
          <button
            onClick={() => setActiveWorkspace('explain')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg transition-all ${
              activeWorkspace === 'explain'
                ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-inner'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-4 h-4 text-cyan-400" /> Concept Explainer
          </button>
          <button
            onClick={() => setActiveWorkspace('quiz')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg transition-all ${
              activeWorkspace === 'quiz'
                ? 'bg-slate-800 text-indigo-400 border border-slate-700 shadow-inner'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-indigo-400" /> Interactive Quiz
          </button>
          <button
            onClick={() => setActiveWorkspace('flashcard')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg transition-all ${
              activeWorkspace === 'flashcard'
                ? 'bg-slate-800 text-purple-400 border border-slate-700 shadow-inner'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 text-purple-400" /> Study Flashcards
          </button>
        </div>

        {/* Dynamic Panel Content Workspace */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* TAB 1: Concept Explainer */}
          {activeWorkspace === 'explain' && (
            <div className="space-y-5 animate-fadeIn">
              
              {/* Custom Concept Input */}
              <div className="flex gap-2 p-2 bg-slate-950 rounded-xl border border-slate-850">
                <input
                  type="text"
                  placeholder="Enter ANY topic to explain (e.g., Photosynthesis, Quick Sort)..."
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-250 focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={() => generateExplanation()}
                  disabled={loadingExplain || !customTopic.trim()}
                  className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-all shadow-glow-cyan flex items-center gap-1.5"
                >
                  {loadingExplain ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Compiling...
                    </>
                  ) : (
                    <>
                      AI Explain <ArrowRight className="w-3 h-3" />
                    </>
                  )}
                </button>
              </div>

              {/* Display Result panel */}
              <div className="border-t border-slate-850/50 pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">{explainerData.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{explainerData.sub}</p>
                  </div>
                  <span className="text-[9px] font-mono text-cyan-400 bg-cyan-500/5 px-2 py-0.5 rounded border border-cyan-500/10">GENERATED</span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block mb-1">Concept definition</span>
                    <p className="text-sm text-slate-350 leading-relaxed">{explainerData.concept}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/10">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-1">💡 Real-Life Analogy</span>
                    <p className="text-sm text-slate-300 leading-relaxed italic">{explainerData.analogy}</p>
                  </div>

                  {explainerData.code && (
                    <div className="rounded-xl overflow-hidden border border-slate-850">
                      <div className="bg-slate-950 px-4 py-2 flex items-center justify-between text-xs text-slate-500 font-mono">
                        <span>Syntax Code Snippet / Model</span>
                        <span className="text-[10px] text-cyan-500 bg-cyan-500/5 px-2 py-0.5 rounded">READY</span>
                      </div>
                      <pre className="p-4 bg-slate-950 text-slate-300 font-mono text-xs overflow-x-auto leading-relaxed">
                        <code>{explainerData.code}</code>
                      </pre>
                    </div>
                  )}

                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Core Benefits</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {explainerData.benefits.map((b, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-850 text-xs text-slate-400">
                          ⚡ {b}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Interactive Quiz */}
          {activeWorkspace === 'quiz' && (
            <div className="space-y-6 animate-fadeIn h-full flex flex-col justify-between">
              
              {/* Custom Quiz Generator input */}
              <div className="flex gap-2 p-2 bg-slate-950 rounded-xl border border-slate-850">
                <input
                  type="text"
                  placeholder="Enter quiz subject (e.g., Operating Systems, Python)..."
                  value={customQuizTopic}
                  onChange={(e) => setCustomQuizTopic(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-250 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => generateQuiz()}
                  disabled={loadingQuiz || !customQuizTopic.trim()}
                  className="px-4 py-1.5 bg-indigo-650 hover:bg-indigo-550 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-all shadow-glow-purple flex items-center gap-1.5"
                >
                  {loadingQuiz ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Compiling...
                    </>
                  ) : (
                    <>
                      Build Quiz <Sparkles className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {!showQuizResults ? (
                <div className="space-y-5 border-t border-slate-850/50 pt-4 flex-1">
                  
                  {/* Progress Header */}
                  <div className="flex items-center justify-between pb-3">
                    <div>
                      <span className="text-xs font-mono text-indigo-400 font-bold uppercase">LIVE EVALUATION</span>
                      <h3 className="text-base font-extrabold text-white mt-0.5">Custom Student Quiz</h3>
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      Question {currentQuizQuestion + 1} of {quizQuestions.length}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-950 rounded-full h-1.5 border border-slate-800">
                    <div
                      className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuizQuestion + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>

                  {/* Question */}
                  <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-850">
                    <h4 className="text-base font-bold text-slate-200 leading-relaxed">
                      {quizQuestions[currentQuizQuestion].q}
                    </h4>
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {quizQuestions[currentQuizQuestion].options.map((option, idx) => {
                      const isSelected = selectedQuizAnswers[currentQuizQuestion] === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectQuizAnswer(currentQuizQuestion, idx)}
                          className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left text-xs sm:text-sm transition-all border ${
                            isSelected
                              ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300 shadow-inner'
                              : 'bg-slate-900/30 border-slate-800/80 text-slate-400 hover:bg-slate-900 hover:text-slate-250'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                              isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-950 text-slate-500 border border-slate-800'
                            }`}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{option}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation footer */}
                  <div className="flex justify-between items-center pt-3 border-t border-slate-900/50">
                    <button
                      disabled={currentQuizQuestion === 0}
                      onClick={() => setCurrentQuizQuestion(prev => prev - 1)}
                      className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-350 disabled:opacity-40"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>

                    {currentQuizQuestion < quizQuestions.length - 1 ? (
                      <button
                        disabled={selectedQuizAnswers[currentQuizQuestion] === undefined}
                        onClick={() => setCurrentQuizQuestion(prev => prev + 1)}
                        className="flex items-center gap-1 px-4 py-2 bg-indigo-650 hover:bg-indigo-550 text-white rounded-xl text-xs font-semibold"
                      >
                        Next <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        disabled={Object.keys(selectedQuizAnswers).length !== quizQuestions.length}
                        onClick={() => setShowQuizResults(true)}
                        className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-650 text-white rounded-xl text-xs font-black shadow-glow-purple"
                      >
                        Score Quiz <AlertCircle className="w-4 h-4 animate-bounce" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Score Results display */
                <div className="space-y-6 text-center border-t border-slate-850/50 pt-4 flex-1 flex flex-col justify-center">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase">SCORE EVALUATION</span>
                    <h3 className="text-2xl font-black text-white">Quiz Evaluation Completed</h3>
                  </div>

                  <div className="mx-auto flex items-center justify-center w-36 h-36 rounded-full bg-slate-900 border-4 border-slate-800 shadow-glow-cyan relative">
                    <div className="text-center">
                      <span className="text-4xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-500">
                        {score}/{quizQuestions.length}
                      </span>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Correct</p>
                    </div>
                  </div>

                  <div className="max-w-md mx-auto">
                    <p className="text-sm text-slate-400">
                      {score === quizQuestions.length
                        ? '🌟 Masterful! Perfect scoring achieved on this academic topic deck!'
                        : score >= 3
                        ? '👍 Great Job! You passed the topic evaluation parameters cleanly.'
                        : '📚 Some components need alignment. Re-generate or query details in chat!'}
                    </p>
                  </div>

                  <button
                    onClick={handleRestartQuiz}
                    className="mx-auto flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-850 text-xs font-semibold text-white"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz Session
                  </button>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: Study Flashcards */}
          {activeWorkspace === 'flashcard' && (
            <div className="space-y-6 animate-fadeIn h-full flex flex-col justify-between">
              
              {/* Custom Flashcard Generator input */}
              <div className="flex gap-2 p-2 bg-slate-950 rounded-xl border border-slate-850">
                <input
                  type="text"
                  placeholder="Enter flashcard topic (e.g., Photosynthesis, React hooks)..."
                  value={customFlashTopic}
                  onChange={(e) => setCustomFlashTopic(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-250 focus:outline-none focus:border-purple-500"
                />
                <button
                  onClick={() => generateFlashcards()}
                  disabled={loadingFlash || !customFlashTopic.trim()}
                  className="px-4 py-1.5 bg-purple-650 hover:bg-purple-550 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-all shadow-glow-purple flex items-center gap-1.5"
                >
                  {loadingFlash ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Compiling...
                    </>
                  ) : (
                    <>
                      Build Cards <Sparkles className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {/* 3D Flippable card viewport */}
              <div className="perspective-1000 w-full h-[280px] cursor-pointer border-t border-slate-850/50 pt-4 flex-1 flex flex-col justify-center" onClick={() => setIsFlipped(!isFlipped)}>
                <div className={`relative w-full h-full max-h-[260px] duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                  
                  {/* FRONT */}
                  <div className="absolute inset-0 w-full h-full backface-hidden glass-panel-purple p-6 rounded-2xl flex flex-col justify-between border border-purple-500/20">
                    <span className="text-[10px] font-mono tracking-widest text-purple-400 font-semibold">TERM / QUESTION</span>
                    <div className="flex flex-col items-center justify-center flex-1 text-center px-4">
                      <HelpCircle className="w-8 h-8 text-purple-500/60 mb-3 animate-bounce" />
                      <h4 className="text-base sm:text-lg font-extrabold text-white leading-snug">{flashcardDeck[currentFlashcard].q}</h4>
                    </div>
                    <span className="text-[10px] text-center text-slate-500 uppercase tracking-widest">Click Card to Flip</span>
                  </div>

                  {/* BACK */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 glass-panel-neon p-6 rounded-2xl flex flex-col justify-between border border-cyan-500/20">
                    <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-semibold">DEFINITION / CORE ANSWER</span>
                    <div className="flex flex-col items-center justify-center flex-1 text-center px-4">
                      <BrainCircuit className="w-8 h-8 text-cyan-500/60 mb-3" />
                      <p className="text-sm leading-relaxed text-slate-200">{flashcardDeck[currentFlashcard].a}</p>
                    </div>
                    <span className="text-[10px] text-center text-slate-500 uppercase tracking-widest">Click to See Question</span>
                  </div>

                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-900/50">
                <button
                  disabled={currentFlashcard === 0}
                  onClick={() => {
                    setIsFlipped(false);
                    setTimeout(() => setCurrentFlashcard(prev => prev - 1), 150);
                  }}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-350 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                <div className="flex gap-1">
                  {flashcardDeck.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 w-1.5 rounded-full transition-all ${
                        currentFlashcard === i ? 'bg-purple-550 w-3' : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>

                <button
                  disabled={currentFlashcard === flashcardDeck.length - 1}
                  onClick={() => {
                    setIsFlipped(false);
                    setTimeout(() => setCurrentFlashcard(prev => prev + 1), 150);
                  }}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-350 disabled:opacity-40"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
