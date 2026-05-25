import React, { useState } from 'react';
import { ShieldCheck, HelpCircle, Layers, CheckSquare, Award, ArrowRight, RotateCcw, AlertTriangle, BookOpen, Search } from 'lucide-react';

export default function InterviewPrep() {
  const [selectedCategory, setSelectedCategory] = useState('mern'); // mern, dsa, frontend, backend, hr
  const [masteredList, setMasteredList] = useState({}); // cardId -> 'mastered' or 'struggled'
  const [flippedCards, setFlippedCards] = useState({}); // cardId -> boolean (isFlipped)
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'mern', name: 'MERN Stack', count: 4, icon: '⚛️' },
    { id: 'dsa', name: 'DSA & Coding', count: 4, icon: '🌳' },
    { id: 'frontend', name: 'Frontend Tech', count: 3, icon: '🎨' },
    { id: 'backend', name: 'Backend API', count: 3, icon: '⚙️' },
    { id: 'hr', name: 'HR Questions', count: 2, icon: '🤝' },
  ];

  const questionsDatabase = [
    // MERN Stack
    {
      id: 'm1',
      category: 'mern',
      q: 'Explain the difference between SQL and MongoDB.',
      a: 'SQL represents relational databases using structured tabular models (rows, columns, foreign keys). MongoDB is a document-oriented NoSQL database that holds schema-free JSON/BSON records. MongoDB is highly scalable horizontally (sharding), while SQL typically scales vertically.',
      code: `// SQL Relational
SELECT * FROM Users WHERE id = 12;

// MongoDB Document JSON
db.users.find({ _id: ObjectId("12") });`
    },
    {
      id: 'm2',
      category: 'mern',
      q: 'What is the role of Node.js event loops?',
      a: 'The Event Loop permits Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded. It does this by offloading database queries or file tasks to system kernels via libuv worker threads, and firing registered callbacks when tasks complete.',
      code: `console.log('Start');
setTimeout(() => console.log('Timeout'), 0); // Offloaded
console.log('End');
// Output: Start -> End -> Timeout`
    },
    {
      id: 'm3',
      category: 'mern',
      q: 'How does React JSX prevent XSS attacks?',
      a: 'By default, React DOM escapes any values embedded in JSX before rendering them. Everything is converted to a string stringified format before being rendered, effectively disabling script injections. If explicit HTML injection is needed, you must use dangerouslySetInnerHTML.',
      code: `const userInput = "<script>badCode()</script>";
// React renders this safely as string literal:
return <div>{userInput}</div>;`
    },
    {
      id: 'm4',
      category: 'mern',
      q: 'What is Express Middleware?',
      a: 'Express Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application\'s request-response cycle. They can execute code, modify request/response parameters, end client cycles, or forward errors.',
      code: `app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next(); // Forward to next middleware handler
});`
    },

    // DSA
    {
      id: 'd1',
      category: 'dsa',
      q: 'What is the difference between BFS and DFS in graph traversal?',
      a: 'BFS (Breadth-First Search) explores all neighbor nodes at the current depth before diving deeper, implemented using a Queue (FIFO). DFS (Depth-First Search) goes deep along each branch before backtracking, implemented using a Stack (LIFO) or recursion.',
      code: `// BFS Queue approach:
let queue = [startNode];
while(queue.length) {
  let curr = queue.shift();
  for(let n of curr.neighbors) queue.push(n);
}`
    },
    {
      id: 'd2',
      category: 'dsa',
      q: 'Explain the working of Binary Search.',
      a: 'Binary search works on a sorted array by repeatedly dividing the search interval in half. You compare the target with the middle element. If it matches, return index. If smaller, repeat search on left half. If larger, repeat search on right half. Time Complexity: O(log n).',
      code: `let low = 0, high = arr.length - 1;
while(low <= high) {
  let mid = Math.floor((low + high) / 2);
  if(arr[mid] === target) return mid;
  else if(arr[mid] < target) low = mid + 1;
  else high = mid - 1;
}`
    },
    {
      id: 'd3',
      category: 'dsa',
      q: 'What is a Hash Map Hash Collision?',
      a: 'A collision occurs when two different input keys are compiled by the hash function to yield the exact same bucket index. This is resolved using Chaining (storing colliding keys in a linked list/BST at that bucket) or Open Addressing (finding another empty slot sequentially).',
      code: `// Hash mapping
hash("John") -> Bucket Index 5
hash("Alex") -> Bucket Index 5 (Collision!)
// Resolution: Index 5 holds List [JohnDoc, AlexDoc]`
    },
    {
      id: 'd4',
      category: 'dsa',
      q: 'What is dynamic programming (DP)?',
      a: 'Dynamic Programming is an optimization technique used to solve complex problems by breaking them down into simpler subproblems. It relies on caching intermediate results (Memoization for top-down recursion, or Tabulation for bottom-up arrays) so they are computed only once.',
      code: `// Fibonacci Memoization:
let memo = {};
function fib(n) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  return memo[n] = fib(n-1) + fib(n-2);
}`
    },

    // Frontend
    {
      id: 'f1',
      category: 'frontend',
      q: 'What is a JavaScript Closure?',
      a: 'A closure is the lexical environment bundle that preserves variable references from parent scopes within nested inner functions, even after parent function executions terminate.',
      code: `const sum = (x) => (y) => x + y;
const addFive = sum(5);
console.log(addFive(3)); // Output: 8`
    },
    {
      id: 'f2',
      category: 'frontend',
      q: 'Explain the difference between Debouncing and Throttling.',
      a: 'Debouncing delays executing a function until a certain amount of idle time has elapsed since the last event trigger (e.g. typing). Throttling limits the frequency of execution, ensuring the function is triggered at most once every interval (e.g. window scrolling).',
      code: `// Throttling: Run at most once in 300ms
// Debouncing: Run 300ms AFTER user stops trigger`
    },
    {
      id: 'f3',
      category: 'frontend',
      q: 'What is CSS Specificity?',
      a: 'Specificity is the weight score system browsers use to determine which CSS rule properties apply to an HTML element. The hierarchy order is: Inline styles (1000) > IDs (100) > Classes/Pseudo-classes (10) > Elements/Pseudo-elements (1).',
      code: `#myId { color: red; }      /* Specificity: 100 */
.myClass { color: blue; }  /* Specificity: 10 */`
    },

    // Backend
    {
      id: 'b1',
      category: 'backend',
      q: 'Explain JWT (JSON Web Token) Structure.',
      a: 'JWT is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties. It consists of three parts separated by dots: Header (alg & type), Payload (user claims & metadata), and Signature (secret verification).',
      code: `// JWT format
Header.Payload.Signature
// Encrypted signature verifies payload is untampered`
    },
    {
      id: 'b2',
      category: 'backend',
      q: 'What is CORS and why is it needed?',
      a: 'Cross-Origin Resource Sharing is a browser-enforced security mechanism that restricts web pages from making API requests to domains other than the one that served the original page, defending clients against unauthorized scripting.',
      code: `// Express CORS setup:
const cors = require('cors');
app.use(cors({ origin: 'https://nexora.edu' }));`
    },
    {
      id: 'b3',
      category: 'backend',
      q: 'What are RESTful API constraints?',
      a: 'REpresentational State Transfer relies on architectural rules: Client-Server separation, Stateless queries, Cacheability, Uniform Interface (standard URLs like GET/POST), Layered System structures, and Code-on-Demand.',
      code: `GET /api/v1/users/12       // Safe retrieval
DELETE /api/v1/users/12    // Destructive mutation`
    },

    // HR
    {
      id: 'h1',
      category: 'hr',
      q: 'How do you handle conflict or disagreement with a teammate?',
      a: 'I address conflicts by maintaining professional, calm communication. First, I identify common goals (e.g., project quality/deadlines). Then, I schedule a quick offline discussion to understand their technical perspective, explain my data-backed reasoning, and seek a collaborative middle-ground solution.',
      code: `// Rule 1: Listen actively without interruptions.
// Rule 2: Keep discussions data-backed, not personal.
// Rule 3: Escalate transparently only when blocking.`
    },
    {
      id: 'h2',
      category: 'hr',
      q: 'Describe a challenging technical problem you solved.',
      a: 'When building our student hub dashboard, I noticed lag when rendering lists of 100+ items on low-spec viewports. By analyzing render trees, I realized we were triggering re-renders due to poor key bindings. I resolved this by caching components using React.memo and swapping dynamic state indices with stable object IDs.',
      code: `// Optimization mapping:
- Stable keys instead of indices
- Lazy loading non-critical elements
- Redux selectors to isolate renders`
    }
  ];

  const handleCardFlip = (cardId) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const handleSetStatus = (cardId, status, e) => {
    e.stopPropagation(); // Avoid flipping when clicking status buttons
    setMasteredList(prev => ({
      ...prev,
      [cardId]: prev[cardId] === status ? undefined : status
    }));
  };

  const filteredQuestions = questionsDatabase
    .filter(q => q.category === selectedCategory)
    .filter(q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) || q.a.toLowerCase().includes(searchQuery.toLowerCase()));

  // Stats calculation
  const totalInCategory = questionsDatabase.filter(q => q.category === selectedCategory).length;
  const masteredCount = Object.entries(masteredList).filter(([id, status]) => {
    const q = questionsDatabase.find(item => item.id === id);
    return q && q.category === selectedCategory && status === 'mastered';
  }).length;

  const struggledCount = Object.entries(masteredList).filter(([id, status]) => {
    const q = questionsDatabase.find(item => item.id === id);
    return q && q.category === selectedCategory && status === 'struggled';
  }).length;

  const masterPercent = totalInCategory > 0 ? Math.round((masteredCount / totalInCategory) * 100) : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)] flex flex-col md:flex-row gap-8">
      
      {/* LEFT COLUMN: Categories & Stats */}
      <div className="w-full md:w-3/12 flex flex-col gap-5">
        {/* Category List */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 space-y-3">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Categories</span>
          <div className="space-y-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-slate-800 text-cyan-400 border-slate-700 shadow-inner'
                    : 'bg-slate-950 text-slate-400 border-slate-900 hover:bg-slate-900/40 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{cat.icon}</span>
                  <span>{cat.name}</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-500">
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Specific Stats Radial widget */}
        <div className="glass-panel-neon p-5 rounded-2xl relative overflow-hidden space-y-4">
          <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/10 rounded-full blur-2xl" />
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block">Preparation Progress</span>
          
          <div className="flex items-center gap-4">
            {/* Simple Visual SVG ring */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="32" cy="32" r="26" className="stroke-slate-900" strokeWidth="4" fill="transparent" />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  className="stroke-cyan-500 transition-all duration-500"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 26}
                  strokeDashoffset={2 * Math.PI * 26 * (1 - masterPercent / 100)}
                />
              </svg>
              <span className="absolute text-xs font-mono font-black text-white">{masterPercent}%</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-300 block">{masteredCount} of {totalInCategory} Mastered</span>
              <span className="text-[10px] text-slate-500 block">Struggled questions count: <span className="text-orange-400 font-bold">{struggledCount}</span></span>
            </div>
          </div>
          <div className="h-px bg-slate-850/60" />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>READY CARDS</span>
            <span className="text-cyan-400">PASSED BENCHMARK</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Search & Cards Catalog */}
      <div className="flex-1 flex flex-col gap-5">
        
        {/* Search & Top Action panel */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search category questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-xs"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => {
                setMasteredList({});
                setFlippedCards({});
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear History
            </button>
          </div>
        </div>

        {/* Grid Q&A Card catalog */}
        <div className="grid grid-cols-1 gap-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => {
              const isFlipped = flippedCards[q.id];
              const status = masteredList[q.id];

              return (
                <div
                  key={q.id}
                  onClick={() => handleCardFlip(q.id)}
                  className={`glass-panel p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col gap-4 ${
                    isFlipped
                      ? 'border-cyan-500/20 shadow-glow-cyan'
                      : status === 'mastered'
                      ? 'border-emerald-500/10'
                      : status === 'struggled'
                      ? 'border-orange-500/15'
                      : 'hover:border-slate-800'
                  }`}
                >
                  {/* Top Badge header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                      <BookOpen className="w-3 h-3 text-cyan-400" /> QUESTION CARD #{q.id.toUpperCase()}
                    </span>

                    {/* Completion statuses */}
                    <div className="flex gap-1.5">
                      {status === 'mastered' && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
                          ✓ Mastered
                        </span>
                      )}
                      {status === 'struggled' && (
                        <span className="px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/30 text-[9px] font-bold text-orange-400 uppercase tracking-wider">
                          ⚠️ Struggled
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Dynamic Side displays */}
                  {!isFlipped ? (
                    /* FRONT DISPLAY: Question */
                    <div className="space-y-3 py-2">
                      <h4 className="text-base sm:text-lg font-extrabold text-white leading-relaxed">
                        {q.q}
                      </h4>
                      <p className="text-xs text-slate-450 italic flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-cyan-500" /> Click to reveal technical response & code logic...
                      </p>
                    </div>
                  ) : (
                    /* BACK DISPLAY: Answer + Code */
                    <div className="space-y-4 py-2 animate-fadeIn">
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-900 text-slate-350 text-xs sm:text-sm leading-relaxed">
                        {q.a}
                      </div>

                      {q.code && (
                        <div className="rounded-xl overflow-hidden border border-slate-850">
                          <div className="bg-slate-950 px-3.5 py-1.5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                            <span>Logic Snippet</span>
                            <span className="text-[9px] text-cyan-400 bg-cyan-500/5 px-1.5 py-0.5 rounded font-bold uppercase">Syntax Ready</span>
                          </div>
                          <pre className="p-3.5 bg-slate-950 text-slate-300 font-mono text-[10px] sm:text-xs overflow-x-auto leading-relaxed border-t border-slate-900/50">
                            <code>{q.code}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Card footer controls */}
                  <div className="pt-3.5 border-t border-slate-900/50 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <span className="text-[10px] text-slate-500 italic">
                      {!isFlipped ? 'Click card to flip' : 'Click card to see question'}
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleSetStatus(q.id, 'struggled', e)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                          status === 'struggled'
                            ? 'bg-orange-500/15 border-orange-500 text-orange-400'
                            : 'bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300 hover:border-slate-800'
                        }`}
                      >
                        ⚠️ Struggled
                      </button>
                      <button
                        onClick={(e) => handleSetStatus(q.id, 'mastered', e)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                          status === 'mastered'
                            ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400'
                            : 'bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300 hover:border-slate-800'
                        }`}
                      >
                        ✓ Mastered
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800/80">
              <AlertTriangle className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-white">No Questions Found</h4>
              <p className="text-xs text-slate-500 mt-1">Try resetting your search filters or typings.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
