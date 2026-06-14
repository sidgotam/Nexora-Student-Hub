import React, { useState } from 'react';
import { User, Briefcase, GraduationCap, Code, Wrench, Download, Sparkles, Plus, Trash2, Sliders, ChevronDown, Camera, Layout, Image, FileText } from 'lucide-react';

export default function ResumeBuilder() {
  // Input Forms State
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Siddharth Sharma',
    title: 'Frontend React Developer',
    email: 'siddharth@nexora.edu',
    phone: '+91 98765 43210',
    github: 'github.com/siddharth-nex',
    linkedin: 'linkedin.com/in/siddharth-sharma',
  });

  const [experiences, setExperiences] = useState([
    {
      company: 'SkillForge Solutions',
      role: 'Frontend Development Intern',
      duration: 'June 2025 - Present',
      desc: 'Developed responsive, glassmorphic student platform dashboards using React and Tailwind CSS. Implemented Redux state flows optimizing rendering speeds by 24%. Collaborated with backend teams to integrate RESTful API endpoints.'
    }
  ]);

  const [projects, setProjects] = useState([
    {
      title: 'Nexora AI Hub',
      tech: 'React, Node, Express, Framer Motion',
      desc: 'Designed and deployed an AI-assisted academic workspace featuring custom quiz engines and 3D CS study cards. Tuned CSS render frames for fluid interface transitions.'
    }
  ]);

  const [education, setEducation] = useState({
    school: 'Indian Institute of Technology (IIT)',
    degree: 'B.Tech in Computer Science & Engineering',
    duration: '2023 - 2027',
    gpa: '8.9 / 10.0 CGPA'
  });

  const [skills, setSkills] = useState('React, JavaScript (ES6+), Tailwind CSS, Node.js, Express, MongoDB, Git & GitHub, DSA, Python');

  // Photo & Template Customization States
  const [photo, setPhoto] = useState(null); // base64 URL representing the uploaded profile picture
  const [showPhoto, setShowPhoto] = useState(true); // toggle image display on resume sheet
  const [selectedTemplate, setSelectedTemplate] = useState('modern'); // 'modern', 'classic', 'creative', 'executive'

  // Themes and layout parameters
  const [accentColor, setAccentColor] = useState('text-cyan-500'); // text-cyan-500, text-indigo-500, text-purple-500, text-emerald-500
  const [accentBg, setAccentBg] = useState('bg-cyan-500');
  const [fontSize, setFontSize] = useState('text-sm'); // text-xs, text-sm, text-base
  const [activeFormTab, setActiveFormTab] = useState('personal'); // personal, exp, projects, edu

  // Helpers for white paper page rendering
  const getLightAccentColor = () => {
    if (accentColor.includes('cyan')) return 'text-cyan-600';
    if (accentColor.includes('indigo')) return 'text-indigo-600';
    if (accentColor.includes('purple')) return 'text-purple-600';
    if (accentColor.includes('emerald')) return 'text-emerald-600';
    return 'text-slate-800';
  };

  const getLightAccentBg = () => {
    if (accentBg.includes('cyan')) return 'bg-cyan-600';
    if (accentBg.includes('indigo')) return 'bg-indigo-600';
    if (accentBg.includes('purple')) return 'bg-purple-600';
    if (accentBg.includes('emerald')) return 'bg-emerald-600';
    return 'bg-slate-800';
  };

  const getFontSizeClass = (type) => {
    if (fontSize === 'text-xs') {
      if (type === 'name') return 'text-xl sm:text-2xl';
      if (type === 'title') return 'text-[10px]';
      if (type === 'section-heading') return 'text-[11px]';
      if (type === 'body') return 'text-[9.5px]';
      if (type === 'meta') return 'text-[9px]';
    } else if (fontSize === 'text-sm') {
      if (type === 'name') return 'text-2xl sm:text-3xl';
      if (type === 'title') return 'text-xs';
      if (type === 'section-heading') return 'text-xs';
      if (type === 'body') return 'text-[11px]';
      if (type === 'meta') return 'text-[10px]';
    } else { // text-base
      if (type === 'name') return 'text-3xl sm:text-4xl';
      if (type === 'title') return 'text-sm';
      if (type === 'section-heading') return 'text-sm';
      if (type === 'body') return 'text-xs';
      if (type === 'meta') return 'text-[11px]';
    }
  };


  // AI Suggestion state
  const [selectedRole, setSelectedRole] = useState('frontend');
  const [aiSuggestions, setAiSuggestions] = useState([
    'Built responsive frontend structures using React hooks and Tailwind CSS utility classes.',
    'Optimized code compiling structures reducing bundle file loading lag by 35%.',
    'Architected state workflows with React Context reducing prop-drilling dependencies.'
  ]);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    if (role === 'frontend') {
      setAiSuggestions([
        'Built responsive frontend structures using React hooks and Tailwind CSS utility classes.',
        'Optimized code compiling structures reducing bundle file loading lag by 35%.',
        'Architected state workflows with React Context reducing prop-drilling dependencies.'
      ]);
    } else if (role === 'backend') {
      setAiSuggestions([
        'Engineered high-throughput REST APIs using Node.js, Express, and cluster modules.',
        'Configured JWT authorization and bcrypt cryptography securing client sessions.',
        'Refined MongoDB collection query structures indexing slow fields to compress queries to <20ms.'
      ]);
    } else if (role === 'dsa') {
      setAiSuggestions([
        'Constructed custom caching structures matching binary lookup logic for fast lookups.',
        'Refactored data sorting algorithms improving time complexities from O(n^2) to O(n log n).',
        'Deployed graph traversal loops to search nodes in complex routing configurations.'
      ]);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert('File size exceeds 2MB. Please upload a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddExperience = () => {
    setExperiences([...experiences, { company: 'New Company', role: 'Role Title', duration: 'Dates', desc: 'Work descriptions...' }]);
  };

  const handleRemoveExperience = (idx) => {
    setExperiences(experiences.filter((_, i) => i !== idx));
  };

  const handleAddProject = () => {
    setProjects([...projects, { title: 'New Project', tech: 'Tech Stack', desc: 'Project description...' }]);
  };

  const handleRemoveProject = (idx) => {
    setProjects(projects.filter((_, i) => i !== idx));
  };

  const handlePrint = () => {
    window.print();
  };

  const colors = [
    { class: 'text-cyan-400', bgClass: 'bg-cyan-500', label: 'Cyan' },
    { class: 'text-indigo-400', bgClass: 'bg-indigo-500', label: 'Indigo' },
    { class: 'text-purple-400', bgClass: 'bg-purple-500', label: 'Purple' },
    { class: 'text-emerald-400', bgClass: 'bg-emerald-500', label: 'Emerald' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row gap-8">
      {/* LEFT: Controls, Theme, and Inputs */}
      <div className="w-full lg:w-5/12 flex flex-col gap-6">
        {/* Theme & Template customization Swatches */}
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4 space-y-4">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Resume Template Layout</span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'modern', name: 'Modern Minimalist', desc: 'Sleek, centered & clean' },
                { id: 'classic', name: 'Classic Ivy League', desc: 'Georgia academic serif' },
                { id: 'creative', name: 'Two-Column Split', desc: 'Two-column colored sidebar' },
                { id: 'executive', name: 'Bold Executive', desc: 'Structural left-bordered headers' }
              ].map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl.id)}
                  className={`p-2 rounded-xl text-left border transition-all ${
                    selectedTemplate === tmpl.id
                      ? 'bg-slate-950 border-cyan-500/80 shadow-glow-cyan text-white'
                      : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:text-slate-200 hover:border-slate-800'
                  }`}
                >
                  <p className="text-[10px] font-extrabold truncate">{tmpl.name}</p>
                  <p className="text-[7.5px] text-slate-500 truncate mt-0.5">{tmpl.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-850 pt-3 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Accent Color</span>
              <div className="flex gap-2">
                {colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setAccentColor(c.class);
                      setAccentBg(c.bgClass);
                    }}
                    className={`w-5 h-5 rounded-full border-2 ${c.bgClass} ${
                      accentColor === c.class ? 'border-white scale-110 shadow-glow-cyan' : 'border-transparent'
                    }`}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5 text-right">Text Size</span>
              <div className="flex gap-1.5 bg-slate-950 p-0.5 rounded-lg border border-slate-850">
                {['text-xs', 'text-sm', 'text-base'].map((fSize) => (
                  <button
                    key={fSize}
                    onClick={() => setFontSize(fSize)}
                    className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                      fontSize === fSize ? 'bg-slate-800 text-white' : 'text-slate-500'
                    }`}
                  >
                    {fSize.split('-')[1].toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form Selector Tab bar */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" /> Resume Workspace
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">ATS COMPLIANT</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 bg-slate-950 p-1 rounded-xl">
            <button
              onClick={() => setActiveFormTab('personal')}
              className={`py-2 text-[10px] sm:text-xs font-semibold rounded-lg transition-all ${
                activeFormTab === 'personal' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => setActiveFormTab('exp')}
              className={`py-2 text-[10px] sm:text-xs font-semibold rounded-lg transition-all ${
                activeFormTab === 'exp' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Work
            </button>
            <button
              onClick={() => setActiveFormTab('projects')}
              className={`py-2 text-[10px] sm:text-xs font-semibold rounded-lg transition-all ${
                activeFormTab === 'projects' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveFormTab('edu')}
              className={`py-2 text-[10px] sm:text-xs font-semibold rounded-lg transition-all ${
                activeFormTab === 'edu' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Skills
            </button>
          </div>

          {/* Form Group Fields */}
          <div className="space-y-4">
            {activeFormTab === 'personal' && (
              <div className="space-y-3 animate-fadeIn">
                {/* Photo Upload Section */}
                <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Profile Image</span>
                    <span className="text-[8px] text-slate-500 font-mono">LOCAL ONLY • SECURE</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative group w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
                      {photo ? (
                        <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer px-2 py-0.5 text-[9px] font-bold bg-slate-850 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded text-slate-350 hover:text-white transition-all">
                          Choose File
                          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                        </label>
                        {photo && (
                          <button
                            type="button"
                            onClick={() => setPhoto(null)}
                            className="px-2 py-0.5 text-[9px] font-bold bg-red-950/40 hover:bg-red-900/30 border border-red-900/40 hover:border-red-900/60 rounded text-red-400 transition-all flex items-center gap-0.5"
                          >
                            <Trash2 className="w-2.5 h-2.5" /> Remove
                          </button>
                        )}
                      </div>
                      <p className="text-[8px] text-slate-500">Supports PNG, JPG (Max 2MB). Disappears on reload.</p>
                    </div>
                  </div>
                  {photo && (
                    <div className="flex items-center justify-between pt-1.5 border-t border-slate-900/50">
                      <span className="text-[9px] text-slate-400 font-bold uppercase">Show photo on resume</span>
                      <button
                        type="button"
                        onClick={() => setShowPhoto(!showPhoto)}
                        className={`px-2 py-0.5 rounded text-[8px] font-bold transition-all ${
                          showPhoto ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-slate-900 text-slate-650 border border-slate-800'
                        }`}
                      >
                        {showPhoto ? 'VISIBLE' : 'HIDDEN'}
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold block mb-1">FULL NAME</label>
                    <input
                      type="text"
                      value={personalInfo.name}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold block mb-1">TARGET TITLE</label>
                    <input
                      type="text"
                      value={personalInfo.title}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold block mb-1">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold block mb-1">PHONE NUMBER</label>
                    <input
                      type="text"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold block mb-1">GITHUB PATH</label>
                    <input
                      type="text"
                      value={personalInfo.github}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold block mb-1">LINKEDIN URL</label>
                    <input
                      type="text"
                      value={personalInfo.linkedin}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeFormTab === 'exp' && (
              <div className="space-y-4 animate-fadeIn">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-2 relative">
                    <button
                      onClick={() => handleRemoveExperience(idx)}
                      className="absolute top-2 right-2 text-slate-600 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => {
                          const list = [...experiences];
                          list[idx].company = e.target.value;
                          setExperiences(list);
                        }}
                        className="px-2 py-1 text-xs rounded bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Role"
                        value={exp.role}
                        onChange={(e) => {
                          const list = [...experiences];
                          list[idx].role = e.target.value;
                          setExperiences(list);
                        }}
                        className="px-2 py-1 text-xs rounded bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Duration (e.g. 2024 - Present)"
                      value={exp.duration}
                      onChange={(e) => {
                        const list = [...experiences];
                        list[idx].duration = e.target.value;
                        setExperiences(list);
                      }}
                      className="w-full px-2 py-1 text-xs rounded bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none"
                    />
                    <textarea
                      placeholder="Bullet descriptions..."
                      value={exp.desc}
                      rows={3}
                      onChange={(e) => {
                        const list = [...experiences];
                        list[idx].desc = e.target.value;
                        setExperiences(list);
                      }}
                      className="w-full px-2 py-1 text-xs rounded bg-slate-900 border border-slate-800 text-slate-250 focus:outline-none resize-none font-sans"
                    />
                  </div>
                ))}
                <button
                  onClick={handleAddExperience}
                  className="w-full py-2 bg-slate-950 hover:bg-slate-900 border border-dashed border-slate-800 hover:border-slate-700 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 flex items-center justify-center gap-1 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Experience Block
                </button>
              </div>
            )}

            {activeFormTab === 'projects' && (
              <div className="space-y-4 animate-fadeIn">
                {projects.map((proj, idx) => (
                  <div key={idx} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-2 relative">
                    <button
                      onClick={() => handleRemoveProject(idx)}
                      className="absolute top-2 right-2 text-slate-600 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={proj.title}
                        onChange={(e) => {
                          const list = [...projects];
                          list[idx].title = e.target.value;
                          setProjects(list);
                        }}
                        className="px-2 py-1 text-xs rounded bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Tech Stack"
                        value={proj.tech}
                        onChange={(e) => {
                          const list = [...projects];
                          list[idx].tech = e.target.value;
                          setProjects(list);
                        }}
                        className="px-2 py-1 text-xs rounded bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none"
                      />
                    </div>
                    <textarea
                      placeholder="Project description details..."
                      value={proj.desc}
                      rows={3}
                      onChange={(e) => {
                        const list = [...projects];
                        list[idx].desc = e.target.value;
                        setProjects(list);
                      }}
                      className="w-full px-2 py-1 text-xs rounded bg-slate-900 border border-slate-800 text-slate-250 focus:outline-none resize-none"
                    />
                  </div>
                ))}
                <button
                  onClick={handleAddProject}
                  className="w-full py-2 bg-slate-950 hover:bg-slate-900 border border-dashed border-slate-800 hover:border-slate-700 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 flex items-center justify-center gap-1 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Project Block
                </button>
              </div>
            )}

            {activeFormTab === 'edu' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Academic History</span>
                  <input
                    type="text"
                    placeholder="School / College"
                    value={education.school}
                    onChange={(e) => setEducation({ ...education, school: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Degree"
                      value={education.degree}
                      onChange={(e) => setEducation({ ...education, degree: e.target.value })}
                      className="px-2 py-1 text-xs rounded bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="GPA / Score"
                      value={education.gpa}
                      onChange={(e) => setEducation({ ...education, gpa: e.target.value })}
                      className="px-2 py-1 text-xs rounded bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Duration"
                    value={education.duration}
                    onChange={(e) => setEducation({ ...education, duration: e.target.value })}
                    className="w-full px-2 py-1 text-xs rounded bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none"
                  />
                </div>

                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Technical Skills (Comma separated)</span>
                  <textarea
                    value={skills}
                    rows={3}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none resize-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SUB: AI Suggestion Drawer */}
        <div className="glass-panel-neon p-4 rounded-2xl space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/10 rounded-full blur-2xl" />
          <div className="flex items-center justify-between border-b border-slate-850 pb-2">
            <h4 className="text-xs font-extrabold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> AI Resume Assistant
            </h4>
            <select
              value={selectedRole}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 text-[10px] font-bold rounded px-1.5 py-0.5 focus:outline-none"
            >
              <option value="frontend">Frontend React</option>
              <option value="backend">Backend Node</option>
              <option value="dsa">DSA & Core algorithms</option>
            </select>
          </div>

          <div className="space-y-1.5">
            {aiSuggestions.map((s, idx) => (
              <div
                key={idx}
                onClick={() => {
                  navigator.clipboard.writeText(s);
                  alert('Copied to clipboard! Paste it inside your experience descriptions.');
                }}
                className="group flex gap-2 p-2 bg-slate-950 hover:bg-slate-900/60 rounded-lg border border-slate-850 hover:border-cyan-500/20 cursor-pointer transition-all"
              >
                <span className="text-[10px] text-cyan-400 font-mono mt-0.5">#{idx + 1}</span>
                <p className="text-[10px] leading-relaxed text-slate-400 group-hover:text-slate-200 transition-colors">
                  {s}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[9px] text-center text-slate-500">
            Click suggestion to copy to clipboard, then paste into forms.
          </p>
        </div>
      </div>

      {/* RIGHT: Live Visual Resume Sheet Rendering */}
      <div className="flex-1 flex flex-col bg-slate-900/30 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        
        {/* Output Toolbar */}
        <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Live Resume Render</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Real-time preview of your printed document layout</p>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs hover:from-cyan-400 hover:to-indigo-500 transition-all shadow-glow-cyan"
          >
            <Download className="w-3.5 h-3.5" /> PDF / Print Setup
          </button>
        </div>

        {/* Paper Sheet Preview Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-950/40 flex flex-col items-center gap-4">
          {/* Help Banner - Hidden in print */}
          <div className="w-full max-w-[650px] flex items-start gap-2.5 p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-cyan-400 text-xs leading-relaxed select-text no-print text-left">
            <span className="font-bold whitespace-nowrap">💡 PDF Hint:</span>
            <span>Click **PDF / Print Setup**, choose **"Save as PDF"**, and *uncheck* **"Headers and footers"** in More Settings to download a perfectly clean A4 resume.</span>
          </div>
          <div
            id="resume-sheet-preview"
            className={`w-full max-w-[650px] aspect-[1/1.414] bg-white border border-slate-200 text-slate-800 shadow-2xl p-6 sm:p-10 text-left relative select-text transition-all ${
              selectedTemplate === 'classic' ? 'font-serif' : 'font-sans'
            }`}
          >
            {/* Modern Minimalist Template */}
            {selectedTemplate === 'modern' && (
              <>
                {/* Header branding line */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${getLightAccentBg()} to-indigo-600`} />

                {/* Header Details */}
                <div className={`flex ${photo && showPhoto ? 'flex-row items-center justify-between' : 'flex-col items-center'} gap-4 border-b border-slate-100 pb-4`}>
                  <div className={photo && showPhoto ? 'text-left space-y-1 flex-1' : 'text-center space-y-1'}>
                    <h2 className={`font-bold tracking-tight text-slate-900 ${getFontSizeClass('name')}`}>
                      {personalInfo.name || 'Your Full Name'}
                    </h2>
                    <p className={`font-semibold uppercase tracking-wider text-slate-500 ${getFontSizeClass('title')}`}>
                      {personalInfo.title || 'Target Job Title'}
                    </p>
                    
                    {/* Contacts Line */}
                    <div className={`flex flex-wrap ${photo && showPhoto ? 'justify-start' : 'justify-center'} gap-x-3.5 gap-y-1 text-[10px] text-slate-600 mt-2 select-text`}>
                      <span>📧 {personalInfo.email}</span>
                      <span>📞 {personalInfo.phone}</span>
                      {personalInfo.github && <span>💻 {personalInfo.github}</span>}
                      {personalInfo.linkedin && <span>🔗 {personalInfo.linkedin}</span>}
                    </div>
                  </div>
                  {photo && showPhoto && (
                    <div className="flex-shrink-0 select-none">
                      <img src={photo} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 shadow-sm" />
                    </div>
                  )}
                </div>

                {/* Core Body Sections */}
                <div className="mt-5 space-y-4">
                  {/* EDUCATION */}
                  <div className="space-y-1.5">
                    <h3 className={`font-extrabold uppercase tracking-widest border-b-2 border-slate-200 pb-0.5 ${getLightAccentColor()} ${getFontSizeClass('section-heading')}`}>
                      Academic Credentials
                    </h3>
                    <div className={`flex justify-between items-start ${getFontSizeClass('body')}`}>
                      <div>
                        <h4 className="font-bold text-slate-900">{education.school}</h4>
                        <p className={`text-slate-600 italic ${getFontSizeClass('meta')}`}>{education.degree}</p>
                      </div>
                      <div className="text-right">
                        <span className={`font-semibold text-slate-500 block ${getFontSizeClass('meta')}`}>{education.duration}</span>
                        <span className={`font-bold ${getLightAccentColor()} uppercase ${getFontSizeClass('meta')}`}>{education.gpa}</span>
                      </div>
                    </div>
                  </div>

                  {/* TECHNICAL SKILLS */}
                  <div className="space-y-1.5">
                    <h3 className={`font-extrabold uppercase tracking-widest border-b-2 border-slate-200 pb-0.5 ${getLightAccentColor()} ${getFontSizeClass('section-heading')}`}>
                      Technical Core Skills
                    </h3>
                    <p className={`leading-relaxed text-slate-750 font-medium ${getFontSizeClass('body')}`}>
                      {skills || 'List your skills separated by commas...'}
                    </p>
                  </div>

                  {/* EXPERIENCES */}
                  <div className="space-y-2">
                    <h3 className={`font-extrabold uppercase tracking-widest border-b-2 border-slate-200 pb-0.5 ${getLightAccentColor()} ${getFontSizeClass('section-heading')}`}>
                      Professional Experience
                    </h3>
                    {experiences.map((exp, i) => (
                      <div key={i} className={`space-y-1 ${getFontSizeClass('body')}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-slate-900">{exp.role}</h4>
                            <span className={`font-semibold text-slate-650 ${getFontSizeClass('meta')}`}>{exp.company}</span>
                          </div>
                          <span className={`font-semibold text-slate-500 ${getFontSizeClass('meta')}`}>{exp.duration}</span>
                        </div>
                        <p className={`text-slate-700 leading-relaxed pl-3 border-l-2 ${getLightAccentColor().replace('text', 'border') + '/30'} ${getFontSizeClass('body')}`}>
                          {exp.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* PROJECTS */}
                  <div className="space-y-2">
                    <h3 className={`font-extrabold uppercase tracking-widest border-b-2 border-slate-200 pb-0.5 ${getLightAccentColor()} ${getFontSizeClass('section-heading')}`}>
                      Academic & Technical Projects
                    </h3>
                    {projects.map((proj, i) => (
                      <div key={i} className={`space-y-1 ${getFontSizeClass('body')}`}>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-slate-900">{proj.title}</h4>
                          <span className={`font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold ${getFontSizeClass('meta')}`}>
                            {proj.tech}
                          </span>
                        </div>
                        <p className={`text-slate-700 leading-relaxed ${getFontSizeClass('body')}`}>
                          {proj.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Classic Ivy League Template */}
            {selectedTemplate === 'classic' && (
              <div className="space-y-4">
                {/* Traditional floated square photo on top right */}
                {photo && showPhoto && (
                  <div className="float-right ml-4 mb-2 select-none">
                    <img src={photo} alt="Profile" className="w-18 h-22 object-cover border border-slate-350 p-0.5" />
                  </div>
                )}

                {/* Header Details */}
                <div className="text-center space-y-1 pb-3 border-b border-slate-300">
                  <h2 className={`font-bold tracking-tight text-slate-900 ${getFontSizeClass('name')}`} style={{ fontFamily: 'Georgia, serif' }}>
                    {personalInfo.name || 'Your Full Name'}
                  </h2>
                  <p className="font-semibold uppercase tracking-wider text-slate-600 text-xs italic">
                    {personalInfo.title || 'Target Job Title'}
                  </p>
                  
                  {/* Contacts Line */}
                  <div className="flex flex-wrap justify-center gap-x-2.5 gap-y-1 text-[10px] text-slate-750 font-serif pt-1 select-text">
                    <span>📧 {personalInfo.email}</span>
                    <span className="text-slate-400">•</span>
                    <span>📞 {personalInfo.phone}</span>
                    {personalInfo.github && (
                      <>
                        <span className="text-slate-400">•</span>
                        <span>💻 {personalInfo.github}</span>
                      </>
                    )}
                    {personalInfo.linkedin && (
                      <>
                        <span className="text-slate-400">•</span>
                        <span>🔗 {personalInfo.linkedin}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Core Body Sections */}
                <div className="space-y-4 pt-1 clear-none">
                  {/* EDUCATION */}
                  <div className="space-y-1">
                    <h3 className={`font-bold uppercase tracking-wide border-b border-slate-350 pb-0.5 text-slate-800 ${getFontSizeClass('section-heading')}`}>
                      Education
                    </h3>
                    <div className={`flex justify-between items-start ${getFontSizeClass('body')}`}>
                      <div>
                        <h4 className="font-bold text-slate-900">{education.school}</h4>
                        <p className={`text-slate-600 italic ${getFontSizeClass('meta')}`}>{education.degree}</p>
                      </div>
                      <div className="text-right">
                        <span className={`font-semibold text-slate-500 block ${getFontSizeClass('meta')}`}>{education.duration}</span>
                        <span className={`font-bold text-slate-800 uppercase ${getFontSizeClass('meta')}`}>{education.gpa}</span>
                      </div>
                    </div>
                  </div>

                  {/* EXPERIENCES */}
                  <div className="space-y-2">
                    <h3 className={`font-bold uppercase tracking-wide border-b border-slate-350 pb-0.5 text-slate-800 ${getFontSizeClass('section-heading')}`}>
                      Experience
                    </h3>
                    {experiences.map((exp, i) => (
                      <div key={i} className={`space-y-1 ${getFontSizeClass('body')}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-slate-900">{exp.role}</h4>
                            <span className={`font-semibold text-slate-650 italic ${getFontSizeClass('meta')}`}>{exp.company}</span>
                          </div>
                          <span className={`font-semibold text-slate-500 ${getFontSizeClass('meta')}`}>{exp.duration}</span>
                        </div>
                        <p className={`text-slate-700 leading-relaxed pl-3 border-l border-slate-300 ${getFontSizeClass('body')}`}>
                          {exp.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* PROJECTS */}
                  <div className="space-y-2">
                    <h3 className={`font-bold uppercase tracking-wide border-b border-slate-350 pb-0.5 text-slate-800 ${getFontSizeClass('section-heading')}`}>
                      Projects
                    </h3>
                    {projects.map((proj, i) => (
                      <div key={i} className={`space-y-1 ${getFontSizeClass('body')}`}>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-slate-900">{proj.title}</h4>
                          <span className={`text-slate-600 font-semibold italic ${getFontSizeClass('meta')}`}>
                            ({proj.tech})
                          </span>
                        </div>
                        <p className={`text-slate-700 leading-relaxed ${getFontSizeClass('body')}`}>
                          {proj.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* TECHNICAL SKILLS */}
                  <div className="space-y-1">
                    <h3 className={`font-bold uppercase tracking-wide border-b border-slate-350 pb-0.5 text-slate-800 ${getFontSizeClass('section-heading')}`}>
                      Skills
                    </h3>
                    <p className={`leading-relaxed text-slate-750 font-medium ${getFontSizeClass('body')}`}>
                      {skills || 'List your skills separated by commas...'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Two-Column Creative Template */}
            {selectedTemplate === 'creative' && (
              <div className="h-full flex gap-5">
                {/* Left Sidebar - 33% */}
                <div className="w-[33%] bg-slate-50/50 -my-6 -ml-6 p-5 border-r border-slate-200/80 flex flex-col gap-4 text-[10.5px]">
                  {photo && showPhoto && (
                    <div className="text-center py-2 flex-shrink-0 select-none">
                      <img src={photo} alt="Profile" className={`w-20 h-20 mx-auto rounded-2xl object-cover border-2 ${getLightAccentColor().replace('text', 'border')} shadow-sm`} />
                    </div>
                  )}

                  {/* Sidebar Contact Info */}
                  <div className="space-y-2">
                    <span className={`font-extrabold uppercase tracking-wider text-[10px] block border-b border-slate-200 pb-0.5 ${getLightAccentColor()}`}>
                      Contact Details
                    </span>
                    <div className="space-y-2 text-slate-750 font-medium select-text break-words">
                      <div className="flex items-start gap-1.5">
                        <span className="text-xs">📧</span>
                        <span className="flex-1 leading-snug">{personalInfo.email}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-xs">📞</span>
                        <span className="flex-1 leading-snug">{personalInfo.phone}</span>
                      </div>
                      {personalInfo.github && (
                        <div className="flex items-start gap-1.5">
                          <span className="text-xs">💻</span>
                          <span className="flex-1 leading-snug truncate">{personalInfo.github}</span>
                        </div>
                      )}
                      {personalInfo.linkedin && (
                        <div className="flex items-start gap-1.5">
                          <span className="text-xs">🔗</span>
                          <span className="flex-1 leading-snug truncate">{personalInfo.linkedin}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sidebar Education */}
                  <div className="space-y-2">
                    <span className={`font-extrabold uppercase tracking-wider text-[10px] block border-b border-slate-200 pb-0.5 ${getLightAccentColor()}`}>
                      Education
                    </span>
                    <div className="space-y-1 text-slate-750">
                      <h4 className="font-extrabold text-slate-900 text-[10.5px] leading-tight">{education.school}</h4>
                      <p className="text-[9.5px] font-semibold text-slate-550 italic leading-snug">{education.degree}</p>
                      <div className="flex justify-between items-center text-[9px] pt-0.5">
                        <span className="font-medium text-slate-500">{education.duration}</span>
                        <span className={`font-bold ${getLightAccentColor()}`}>{education.gpa}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Skills */}
                  <div className="space-y-2">
                    <span className={`font-extrabold uppercase tracking-wider text-[10px] block border-b border-slate-200 pb-0.5 ${getLightAccentColor()}`}>
                      Core Skills
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {(skills || '').split(',').map((skill, index) => {
                        const trimmed = skill.trim();
                        if (!trimmed) return null;
                        return (
                          <span key={index} className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold ${getLightAccentBg().replace('bg', 'bg-opacity-10 bg')} ${getLightAccentColor()}`}>
                            {trimmed}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Body Section - 67% */}
                <div className="flex-1 flex flex-col gap-4">
                  {/* Header Branding Row */}
                  <div className="pb-2 border-b border-slate-150">
                    <h2 className={`font-bold tracking-tight text-slate-900 ${getFontSizeClass('name')}`}>
                      {personalInfo.name || 'Your Full Name'}
                    </h2>
                    <p className={`font-semibold uppercase tracking-wider text-slate-500 ${getFontSizeClass('title')}`}>
                      {personalInfo.title || 'Target Job Title'}
                    </p>
                  </div>

                  {/* Experiences */}
                  <div className="space-y-2.5">
                    <h3 className={`font-extrabold uppercase tracking-widest border-b border-slate-200 pb-0.5 ${getLightAccentColor()} ${getFontSizeClass('section-heading')}`}>
                      Work Experience
                    </h3>
                    {experiences.map((exp, i) => (
                      <div key={i} className={`space-y-1 ${getFontSizeClass('body')}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-slate-900 leading-tight">{exp.role}</h4>
                            <span className={`font-semibold text-slate-650 ${getFontSizeClass('meta')}`}>{exp.company}</span>
                          </div>
                          <span className={`font-semibold text-slate-500 ${getFontSizeClass('meta')}`}>{exp.duration}</span>
                        </div>
                        <p className={`text-slate-700 leading-relaxed pl-2.5 border-l-2 ${getLightAccentColor().replace('text', 'border') + '/30'} ${getFontSizeClass('body')}`}>
                          {exp.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Projects */}
                  <div className="space-y-2.5">
                    <h3 className={`font-extrabold uppercase tracking-widest border-b-2 border-slate-200 pb-0.5 ${getLightAccentColor()} ${getFontSizeClass('section-heading')}`}>
                      Technical Projects
                    </h3>
                    {projects.map((proj, i) => (
                      <div key={i} className={`space-y-1 ${getFontSizeClass('body')}`}>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-slate-900 leading-tight">{proj.title}</h4>
                          <span className={`font-mono bg-slate-100 text-slate-600 px-1 py-0.5 rounded font-bold ${getFontSizeClass('meta')}`}>
                            {proj.tech}
                          </span>
                        </div>
                        <p className={`text-slate-700 leading-relaxed ${getFontSizeClass('body')}`}>
                          {proj.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bold Executive Template */}
            {selectedTemplate === 'executive' && (
              <div className="space-y-5">
                {/* Header Details */}
                <div className="flex items-center gap-4 border-b-2 border-slate-200 pb-4">
                  {photo && showPhoto && (
                    <div className="flex-shrink-0 select-none">
                      <img src={photo} alt="Profile" className={`w-16 h-16 rounded-xl object-cover border-2 ${getLightAccentColor().replace('text', 'border')} shadow-sm`} />
                    </div>
                  )}
                  <div className="text-left space-y-0.5 flex-1">
                    <h2 className={`font-black tracking-tight text-slate-900 ${getFontSizeClass('name')}`}>
                      {personalInfo.name || 'Your Full Name'}
                    </h2>
                    <p className={`font-extrabold uppercase tracking-widest text-[11px] ${getLightAccentColor()}`}>
                      {personalInfo.title || 'Target Job Title'}
                    </p>
                    
                    {/* Contacts Row */}
                    <div className="flex flex-wrap gap-x-3.5 gap-y-1 text-[9.5px] text-slate-650 font-semibold pt-1 select-text">
                      <span>📧 {personalInfo.email}</span>
                      <span>📞 {personalInfo.phone}</span>
                      {personalInfo.github && <span>💻 {personalInfo.github}</span>}
                      {personalInfo.linkedin && <span>🔗 {personalInfo.linkedin}</span>}
                    </div>
                  </div>
                </div>

                {/* Core Body Sections */}
                <div className="space-y-5">
                  {/* EDUCATION */}
                  <div className="space-y-2">
                    <h3 className={`font-extrabold uppercase tracking-wider pl-3 border-l-4 ${getLightAccentColor().replace('text', 'border')} ${getFontSizeClass('section-heading')}`}>
                      Education Credentials
                    </h3>
                    <div className={`flex justify-between items-start pl-3 ${getFontSizeClass('body')}`}>
                      <div>
                        <h4 className="font-bold text-slate-900">{education.school}</h4>
                        <p className={`text-slate-600 italic ${getFontSizeClass('meta')}`}>{education.degree}</p>
                      </div>
                      <div className="text-right">
                        <span className={`font-semibold text-slate-500 block ${getFontSizeClass('meta')}`}>{education.duration}</span>
                        <span className={`font-bold ${getLightAccentColor()} uppercase ${getFontSizeClass('meta')}`}>{education.gpa}</span>
                      </div>
                    </div>
                  </div>

                  {/* EXPERIENCES */}
                  <div className="space-y-3">
                    <h3 className={`font-extrabold uppercase tracking-wider pl-3 border-l-4 ${getLightAccentColor().replace('text', 'border')} ${getFontSizeClass('section-heading')}`}>
                      Professional Experience
                    </h3>
                    <div className="space-y-3 pl-3">
                      {experiences.map((exp, i) => (
                        <div key={i} className={`space-y-1 ${getFontSizeClass('body')}`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-slate-900">{exp.role}</h4>
                              <span className={`font-semibold text-slate-600 ${getFontSizeClass('meta')}`}>{exp.company}</span>
                            </div>
                            <span className={`font-semibold text-slate-500 ${getFontSizeClass('meta')}`}>{exp.duration}</span>
                          </div>
                          <p className={`text-slate-750 leading-relaxed ${getFontSizeClass('body')}`}>
                            {exp.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PROJECTS */}
                  <div className="space-y-3">
                    <h3 className={`font-extrabold uppercase tracking-wider pl-3 border-l-4 ${getLightAccentColor().replace('text', 'border')} ${getFontSizeClass('section-heading')}`}>
                      Technical Projects
                    </h3>
                    <div className="space-y-3 pl-3">
                      {projects.map((proj, i) => (
                        <div key={i} className={`space-y-1 ${getFontSizeClass('body')}`}>
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-slate-900">{proj.title}</h4>
                            <span className={`font-mono bg-slate-100 text-slate-605 px-1.5 py-0.5 rounded font-bold ${getFontSizeClass('meta')}`}>
                              {proj.tech}
                            </span>
                          </div>
                          <p className={`text-slate-750 leading-relaxed ${getFontSizeClass('body')}`}>
                            {proj.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TECHNICAL SKILLS */}
                  <div className="space-y-2">
                    <h3 className={`font-extrabold uppercase tracking-wider pl-3 border-l-4 ${getLightAccentColor().replace('text', 'border')} ${getFontSizeClass('section-heading')}`}>
                      Key Competencies
                    </h3>
                    <div className="pl-3">
                      <p className={`leading-relaxed text-slate-750 font-medium ${getFontSizeClass('body')}`}>
                        {skills || 'List your skills separated by commas...'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
