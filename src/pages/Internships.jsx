import React, { useState } from 'react';
import { Search, Briefcase, MapPin, DollarSign, Calendar, Star, ShieldAlert, ArrowUpRight, X, BookmarkCheck, CheckCircle2 } from 'lucide-react';

export default function Internships() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all'); // all, frontend, backend, design, data
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null); // Active Job detail modal
  const [appliedJobs, setAppliedJobs] = useState({}); // jobId -> boolean (isApplied)

  const internshipsDatabase = [
    {
      id: 'job-1',
      title: 'Frontend React Engineering Intern',
      company: 'Nexora Core Systems',
      rating: 4.8,
      location: 'Remote',
      type: 'remote',
      stipend: '₹35,000 / month',
      duration: '6 Months',
      skills: ['React', 'JavaScript', 'Tailwind CSS', 'Redux'],
      roleCategory: 'frontend',
      posted: 'Today',
      description: 'Join the engineering team at Nexora Systems. You will collaborate on developing highly visual, high-traffic glassmorphic utilities and responsive client portals.',
      requirements: [
        'Strong familiarity with React core hooks, state workflows, and prop rendering.',
        'Fluency in styling with utility-first frameworks like Tailwind CSS.',
        'Prior experience building projects or side-apps on GitHub.',
        'Availability to commit 30 hours per week.'
      ],
      benefits: ['Certificate of Completion', 'Letter of Recommendation (LOR)', 'Pre-Placement Offer (PPO) Potential', 'Free learning subscriptions']
    },
    {
      id: 'job-2',
      title: 'Node.js Backend Systems Intern',
      company: 'DataFlow Inc.',
      rating: 4.5,
      location: 'Bangalore, India (Hybrid)',
      type: 'hybrid',
      stipend: '₹40,000 / month',
      duration: '3 Months',
      skills: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      roleCategory: 'backend',
      posted: 'Yesterday',
      description: 'Work with the infrastructure division at DataFlow. You will assist in writing clean, scalable REST APIs, structuring database schemas, and securing user auth gates.',
      requirements: [
        'Solid knowledge of JavaScript, asynchronous patterns, and event loops.',
        'Familiarity with MongoDB, aggregation pipelines, and schema designs.',
        'Understanding of API security concepts like password encryption & JWT tokens.',
        'Ability to join hybrid offices in Bangalore.'
      ],
      benefits: ['Monthly workspace allowances', 'Top-tier executive mentoring', 'Industry verified internship credentials']
    },
    {
      id: 'job-3',
      title: 'UI/UX Visual Design Intern',
      company: 'Creative Labs',
      rating: 4.9,
      location: 'Remote',
      type: 'remote',
      stipend: '₹25,000 / month',
      duration: '4 Months',
      skills: ['Figma', 'UI Design', 'Prototyping', 'CSS Gradients'],
      roleCategory: 'design',
      posted: '2 days ago',
      description: 'Creative Labs is searching for a design intern to draft high-fidelity prototypes, design system guidelines, glassmorphic themes, and dynamic mockups.',
      requirements: [
        'Outstanding Figma portfolio presenting UI workflows and aesthetic control.',
        'Understanding of modern design concepts (glassmorphic, dark modes, animations).',
        'Familiarity with CSS styling parameters is a major plus.',
        'Eagerness to receive creative constructive feedback.'
      ],
      benefits: ['Public design portfolio highlights', 'Flexible schedules', 'Figma premium memberships']
    },
    {
      id: 'job-4',
      title: 'Data Science & Analytics Intern',
      company: 'Insight Corp',
      rating: 4.3,
      location: 'Mumbai, India (On-site)',
      type: 'onsite',
      stipend: '₹30,000 / month',
      duration: '6 Months',
      skills: ['Python', 'SQL', 'Pandas', 'Matplotlib'],
      roleCategory: 'data',
      posted: '3 days ago',
      description: 'Insight Corp helps companies optimize their growth. You will ingest large datasets, perform SQL analytical checks, compile custom reports, and build visual dashboards.',
      requirements: [
        'Fluency in writing Python analytic scripts (Pandas, Numpy).',
        'Strong foundation in relational databases and complex SQL join queries.',
        'Keen eye for detail and finding patterns inside datasets.',
        'B.Tech / B.Sc in Math, CS, or statistics.'
      ],
      benefits: ['Certificate of Internship', 'Corporate cafeteria access', 'Direct management reviews']
    },
    {
      id: 'job-5',
      title: 'Full-Stack Developer Intern',
      company: 'TechForge Solutions',
      rating: 4.7,
      location: 'Remote',
      type: 'remote',
      stipend: '₹38,000 / month',
      duration: '6 Months',
      skills: ['React', 'Node.js', 'Express', 'MongoDB'],
      roleCategory: 'frontend',
      posted: '4 days ago',
      description: 'Assist in building and deploying multi-page educational and notes platform services. You will bridge frontend animations with backend APIs.',
      requirements: [
        'Experience building full-stack applications with MERN stack configurations.',
        'Knowledge of deploying apps to hosts like Vercel and Render.',
        'Understanding of Git flow processes and peer code reviews.',
        'Strong problem-solving capability.'
      ],
      benefits: ['Pre-placement interview guarantees', 'Home office setups allowance', 'Global community networking']
    }
  ];

  const handleApply = (jobId) => {
    setAppliedJobs(prev => ({
      ...prev,
      [jobId]: true
    }));
  };

  const filteredJobs = internshipsDatabase
    .filter(job => selectedRole === 'all' || job.roleCategory === selectedRole)
    .filter(job => !remoteOnly || job.type === 'remote')
    .filter(job => {
      const q = searchQuery.toLowerCase();
      return (
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.skills.some(s => s.toLowerCase().includes(q))
      );
    });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)] flex flex-col gap-6 relative">
      
      {/* Search & Advanced Category console */}
      <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search roles, companies, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-xs"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          {[
            { id: 'all', label: 'All Jobs' },
            { id: 'frontend', label: 'Frontend' },
            { id: 'backend', label: 'Backend' },
            { id: 'design', label: 'Design' },
            { id: 'data', label: 'Data Science' },
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => setSelectedRole(chip.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                selectedRole === chip.id
                  ? 'bg-slate-800 text-cyan-400 border-slate-700 shadow-inner'
                  : 'bg-slate-950 text-slate-400 border-slate-900 hover:bg-slate-900/40'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Remote toggle */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Remote Only</span>
          <button
            onClick={() => setRemoteOnly(!remoteOnly)}
            className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 relative focus:outline-none ${
              remoteOnly ? 'bg-cyan-500' : 'bg-slate-950 border border-slate-800'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-md ${
                remoteOnly ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

      </div>

      {/* Internshala Portal Direct Gateway Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-slate-950 p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-glow-cyan">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="h-12 w-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center font-extrabold text-amber-400 text-lg flex-shrink-0 animate-pulse">
            🌐
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold font-mono text-amber-400 uppercase tracking-widest block">
              Official Partner Resource Gateway
            </span>
            <h3 className="text-md sm:text-lg font-black text-white">
              Looking for 10,000+ Live Verified Internships?
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Access real-time work-from-home gigs, technical roles, and corporate jobs directly on the official **Internshala Portal**. Find verified openings matching your custom student profile today.
            </p>
          </div>
        </div>
        <a
          href="https://internshala.com/internships"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-450 text-slate-950 rounded-xl text-xs font-black shadow-glow-purple transition-all flex-shrink-0 cursor-pointer"
        >
          Launch Internshala Portal <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
        </a>
      </div>

      {/* Internshala Live Portal Channels */}
      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-5 space-y-4">
        <div>
          <span className="text-[9px] font-bold font-mono text-amber-400 uppercase tracking-widest block">Real-time External Directories</span>
          <h3 className="text-sm font-black text-white">Direct Internshala Specialized Channels</h3>
          <p className="text-[11px] text-slate-400">Access thousands of active roles directly inside Internshala's specialized academic portals.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: '🏡 Remote / WFH', desc: 'Work-from-home gigs', url: 'https://internshala.com/internships/work-from-home' },
            { label: '⚙️ Engineering', desc: 'Core tech openings', url: 'https://internshala.com/internships/engineering-internships' },
            { label: '💼 Full-Time Jobs', desc: 'Fresher jobs & careers', url: 'https://internshala.com/jobs' },
            { label: '🌐 Web Development', desc: 'React, Node, Fullstack', url: 'https://internshala.com/internships/web-development-internships' },
            { label: '📊 Data Science', desc: 'ML & Analytics roles', url: 'https://internshala.com/internships/data-science-internships' },
            { label: '🎨 Graphic & UI/UX', desc: 'Design & Prototyping', url: 'https://internshala.com/internships/ui-ux-design-internships' },
            { label: '📈 MBA & Business', desc: 'Marketing & Sales', url: 'https://internshala.com/internships/mba-internships' },
            { label: '🎓 Top Rated Internships', desc: 'Premium stipend roles', url: 'https://internshala.com/internships/top-rated-internships' }
          ].map((channel, i) => (
            <a
              key={i}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-950/60 hover:bg-slate-950 border border-slate-900 hover:border-amber-500/20 rounded-xl space-y-1 group transition-all cursor-pointer block text-left"
            >
              <h4 className="text-xs font-bold text-slate-300 group-hover:text-amber-400 transition-colors leading-tight flex items-center justify-between">
                <span>{channel.label}</span>
                <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
              </h4>
              <p className="text-[9px] text-slate-500 group-hover:text-slate-400 transition-colors">{channel.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Internships catalog grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="glass-panel p-5 rounded-2xl hover:border-cyan-500/20 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* Company Name & Stars */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-cyan-400 font-mono tracking-wider font-semibold block">{job.posted}</span>
                    <h4 className="text-sm font-bold text-slate-400 mt-0.5">{job.company}</h4>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold">
                    <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" /> {job.rating}
                  </div>
                </div>

                {/* Job Title */}
                <h3 className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {job.title}
                </h3>

                {/* Core parameter tags */}
                <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-900/40 text-[10px] font-semibold text-slate-400">
                  <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-cyan-500" /> {job.location.split(' (')[0]}</div>
                  <div className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-indigo-500" /> {job.stipend.split(' /')[0]}</div>
                  <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-purple-500" /> {job.duration}</div>
                </div>

                {/* Technical skills pills */}
                <div className="flex flex-wrap gap-1">
                  {job.skills.map((s, idx) => (
                    <span key={idx} className="text-[9px] font-mono font-bold bg-slate-950 text-slate-500 border border-slate-900 px-2 py-0.5 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card CTA actions */}
              <div className="mt-5 pt-3 border-t border-slate-900/50 flex justify-between items-center">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                  {job.type}
                </span>

                <div className="flex gap-2">
                  {appliedJobs[job.id] ? (
                    <span className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="px-4 py-1.5 bg-slate-900 hover:bg-slate-850 text-white rounded-lg text-xs font-semibold border border-slate-800 hover:border-cyan-500/20 transition-all flex items-center gap-1"
                    >
                      Quick View <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 glass-panel rounded-2xl border border-slate-800">
            <ShieldAlert className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-white">No Internships Listed</h4>
            <p className="text-xs text-slate-500 mt-1">Try relaxing your search terms or unchecking Remote Only.</p>
          </div>
        )}
      </div>

      {/* JOB DETAIL MODAL DRAWER OVERLAY */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl h-full bg-slate-900 border-l border-slate-800/80 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto relative animate-slideLeft shadow-2xl">
            
            {/* Close button */}
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-950 hover:bg-slate-850 border border-slate-850 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-6">
              {/* Header Company Details */}
              <div className="space-y-2">
                <span className="inline-block text-[10px] font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded px-2 py-0.5">
                  POSTED {selectedJob.posted.toUpperCase()}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {selectedJob.title}
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-300">{selectedJob.company}</span>
                  <div className="flex items-center gap-0.5 text-xs text-amber-400 font-bold">
                    ★ {selectedJob.rating}
                  </div>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-850">
                <div className="text-xs">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Stipend Rate</span>
                  <span className="font-bold text-white block mt-0.5">{selectedJob.stipend}</span>
                </div>
                <div className="text-xs">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Location Structure</span>
                  <span className="font-bold text-white block mt-0.5">{selectedJob.location}</span>
                </div>
                <div className="text-xs">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Duration</span>
                  <span className="font-bold text-white block mt-0.5">{selectedJob.duration}</span>
                </div>
                <div className="text-xs">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Work Setup</span>
                  <span className="font-bold text-white block mt-0.5 capitalize">{selectedJob.type}</span>
                </div>
              </div>

              {/* Role Descriptions */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-450 uppercase tracking-widest">Role Description</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/30 p-3 rounded-lg border border-slate-850/50">
                  {selectedJob.description}
                </p>
              </div>

              {/* Requirements List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-450 uppercase tracking-widest">Candidate Requirements</h4>
                <ul className="space-y-1.5">
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx} className="text-xs text-slate-350 flex gap-2">
                      <span className="text-cyan-400 font-mono font-bold mt-0.5">↳</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-450 uppercase tracking-widest">Perks & Benefits</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedJob.benefits.map((b, idx) => (
                    <span key={idx} className="text-[10px] font-semibold bg-indigo-500/5 text-indigo-300 border border-indigo-500/10 px-2.5 py-1 rounded-lg">
                      ✦ {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions footer */}
            <div className="pt-6 border-t border-slate-850 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                SECURE GATEWAY
              </span>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <a
                  href={`https://internshala.com/internships/matching-${encodeURIComponent(selectedJob.roleCategory || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-950 border border-slate-800 hover:border-amber-500/30 text-amber-400 hover:text-white rounded-xl text-xs font-bold transition-all text-center"
                >
                  Search Similar on Internshala <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                {appliedJobs[selectedJob.id] ? (
                  <span className="flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs text-center">
                    <CheckCircle2 className="w-4 h-4" /> Application Logged
                  </span>
                ) : (
                  <button
                    onClick={() => handleApply(selectedJob.id)}
                    className="flex items-center justify-center gap-1.5 px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl text-xs font-extrabold shadow-glow-cyan transition-all cursor-pointer"
                  >
                    Apply Now <ArrowUpRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
      {/* Semantic Search Crawler Hub - Hidden from UI, optimized for Google Crawling INDEX */}
      <section className="sr-only" aria-hidden="true" style={{ display: 'none', width: 0, height: 0, overflow: 'hidden', opacity: 0 }}>
        <h2>Academic Student Utility Portal Search Indices</h2>
        <p>
          Nexora Student Hub is the ultimate aggregator for university B.Tech, BCA, BSc, and engineering graduates. Access official college notes, semester cheat sheets, hand-written formulas, and lab practical manuals. Practice with MERN stack developer interview prep questions, React JS lifecycle closures, and SQL query checks. Build high-score ATS resume maker templates online without formatting errors. Search active internships for freshers, college student work from home jobs, summer training guides, high-stipend remote internships, and corporate placements via Internshala direct gateways. Direct portal routes include engineering, data science, marketing, finance, and visual graphic UI UX design internships. Optimized search keywords include: internshala login, internshala portal registration, free study notes download, computer science college cheat sheets, btech college resources, freshers jobs search engine, resume builder, AI study assistant chatbot, college projects source code, online learning trackers, dopamine study planner focus games.
        </p>
      </section>

    </div>
  );
}
