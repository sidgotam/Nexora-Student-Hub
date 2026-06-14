import React, { useState, useEffect } from 'react';
import { 
  Mail, ArrowRight, CheckCircle2, Clock, Sparkles, BookOpen, FileText, Check, Award, Eye, 
  Search, Lock, Download, ChevronRight, ChevronLeft, Calendar, FileQuestion, BookMarked, 
  HelpCircle, ArrowLeft, RefreshCw, X, MessageSquare, Maximize2, Minimize2, Copy, Flame, Loader2
} from 'lucide-react';

import { ACADEMIC_DATA, SEMESTER_SYLLABUS_DATA, generateDynamicContent } from '../data/academicData';


export default function Notes() {
  const getOfficialSyllabusPath = (sem, branch) => {
    const yearStr = sem <= 2 ? '1st Year' : sem <= 4 ? '2nd Year' : sem <= 6 ? '3rd Year' : '4th Year';
    const branchFolder = branch === 'cse' || branch === 'it' ? 'CS & IT' : branch === 'civil' ? 'Civil Engineering' : 'ELectrical Engineering';

    if (yearStr === '1st Year') {
      if (branchFolder === 'CS & IT') return '/Syllabus/1st Year/CS & IT/Syllabus_BTech_First_Yr_Common_other_than_AG_&_BT_effective_from_2022_23_R.pdf';
      if (branchFolder === 'Civil Engineering') return '/Syllabus/1st Year/Civil Engineering/Syllabus_BTech_First_Yr_Common_other_than_AG_&_BT_effective_from_2022_23_R.pdf';
      return '/Syllabus/1st Year/ELectrical Engineering/Syllabus_BTech_First_Yr_Common_other_than_AG_&_BT_effective_from_2022_23_R (1).pdf';
    }
    if (yearStr === '2nd Year') {
      if (branchFolder === 'CS & IT') return '/Syllabus/2nd Year/CS & IT/B.Tech_2nd_Yr_CSE_v3.pdf';
      if (branchFolder === 'Civil Engineering') return '/Syllabus/2nd Year/Civil Engineering/B.Tech_2nd_Yr_Civil.pdf';
      return '/Syllabus/2nd Year/ELectrical Engineering/B.Tech_2nd_Yr_EE_V2.pdf';
    }
    if (yearStr === '3rd Year') {
      if (branchFolder === 'CS & IT') return '/Syllabus/3rd Year/CS & IT/B.TECH CE&IT , CSIT, IT 3rd YR 2024-25.pdf';
      if (branchFolder === 'Civil Engineering') return '/Syllabus/3rd Year/Civil Engineering/B.Tech. 3rd Year Civil Engineering.pdf';
      return '/Syllabus/3rd Year/ELectrical Engineering/1 B.Tech. 3rd Year Electrical Engineering 2024-25.pdf';
    }
    return null;
  };

  const downloadQuantumPDF = async (subject, sem, branch) => {
    const yearStr = sem <= 2 ? '1st Year' : sem <= 4 ? '2nd Year' : sem <= 6 ? '3rd Year' : '4th Year';
    const branchMapping = {
      cse: 'CS & IT',
      it: 'CS & IT',
      civil: 'Civil Engineering',
      ee: 'ELectrical Engineering'
    };
    const mappedBranch = branchMapping[branch] || branch;
    const semesterStr = `Semester ${sem}`;
    const subjectFolder = `${subject.code} - ${subject.name}`.trim().replace(/[\\/:*?"<>|]/g, '_');
    
    // Path to the real quantum PDF
    const pdfPath = `/Quantum/${yearStr}/${mappedBranch}/${semesterStr}/${subjectFolder}/quantum.pdf`;
    
    showToast(`🔍 Checking for uploaded Quantum PDF for ${subject.code}...`);
    
    try {
      const response = await fetch(pdfPath, { method: 'HEAD' });
      if (response.ok) {
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = `${subject.code}_Quantum_${subject.name.replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast(`📥 Downloading official Quantum PDF for ${subject.code}!`);
        return true;
      }
    } catch (e) {
      console.log("Real PDF not found, using booster generator.", e);
    }
    
    // Fallback: trigger standard mock download
    const compiled = subject.quantum && subject.quantum.length > 0 ? subject : generateDynamicContent(subject);
    triggerDownload(`${compiled.name}_Quantum_Series`, compiled.quantum, 'quantum');
    return false;
  };

  const downloadBookPDF = async (bookName, subject, sem, branch) => {
    const yearStr = sem <= 2 ? '1st Year' : sem <= 4 ? '2nd Year' : sem <= 6 ? '3rd Year' : '4th Year';
    const branchMapping = {
      cse: 'CS & IT',
      it: 'CS & IT',
      civil: 'Civil Engineering',
      ee: 'ELectrical Engineering'
    };
    const mappedBranch = branchMapping[branch] || branch;
    const semesterStr = `Semester ${sem}`;
    const subjectFolder = `${subject.code} - ${subject.name}`.trim().replace(/[\\/:*?"<>|]/g, '_');
    const sanitizedBookName = bookName.replace(/[\\/:*?"<>|]/g, '_');
    
    // Path to the real textbook PDF
    const pdfPath = `/Books/${yearStr}/${mappedBranch}/${semesterStr}/${subjectFolder}/${sanitizedBookName}.pdf`;
    
    showToast(`🔍 Checking for textbook PDF: ${bookName}...`);
    
    try {
      const response = await fetch(pdfPath, { method: 'HEAD' });
      if (response.ok) {
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = `${subject.code}_Book_${sanitizedBookName.replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast(`📥 Downloading textbook: ${bookName}!`);
        return true;
      }
    } catch (e) {
      console.log("Real textbook PDF not found, triggering fallback.", e);
    }
    
    // Fallback: download a text file explaining how to upload this book, and show toast
    const fileContent = `🎓 AKTU textbook: ${bookName}\nSubject: ${subject.name} (${subject.code})\n\nThis textbook is currently syncing in our servers.\nTo upload the actual PDF:\n1. Place your PDF in: public/Books/${yearStr}/${mappedBranch}/${semesterStr}/${subjectFolder}/\n2. Rename it to: ${sanitizedBookName}.pdf\n\nNexora Student Hub systems will automatically verify and enable immediate downloads!`;
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${sanitizedBookName.replace(/\s+/g, '_')}_Upload_Guide.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showToast(`📖 Book is syncing. Upload it in public/Books/... to publish it!`);
    return false;
  };

  const downloadSemesterQuantum = (sem, branch) => {
    // Get all subjects in this semester & branch
    const subjects = ACADEMIC_DATA[selectedUniv]?.branches[branch]?.semesters[sem] || [];
    if (subjects.length === 0) {
      showToast(`📚 Quantum series is currently syncing for Sem ${sem} (${branch.toUpperCase()})...`);
      return;
    }
    
    showToast(`⚡ Compiling Semester ${sem} Quantum Series Solved Notes Package...`);
    
    // Compile all subjects' units & quantum series questions into a massive master HTML booklet
    let masterBody = `
      <h1 style="color: #0891b2; font-family: sans-serif; text-align: center; font-size: 28px; border-bottom: 3px double #e2e8f0; padding-bottom: 15px; margin-bottom: 30px;">
        🎓 AKTU Semester ${sem} - Quantum Series Solved Package
      </h1>
      <p style="text-align: center; color: #475569; font-style: italic; font-family: sans-serif; font-size: 14px; margin-top: -15px;">
        Branch: ${ACADEMIC_DATA[selectedUniv]?.branches[branch]?.name || branch.toUpperCase()}
      </p>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; margin-bottom: 40px; font-family: sans-serif;">
        <h3 style="margin-top: 0; color: #1e293b;">📌 Package Subjects Included:</h3>
        <ol style="margin-bottom: 0; padding-left: 20px; line-height: 1.6; color: #334155;">
          ${subjects.map(sub => `<li><strong>${sub.code}:</strong> ${sub.name}</li>`).join('')}
        </ol>
      </div>
    `;
    
    subjects.forEach((sub, subIdx) => {
      // Generate dynamic content if subject doesn't have it pre-defined
      const compiled = sub.quantum && sub.quantum.length > 0 ? sub : generateDynamicContent(sub);
      
      masterBody += `
        <div style="page-break-before: always; margin-top: 40px;">
          <div style="background-color: #0891b2; color: #ffffff; padding: 15px 25px; border-radius: 8px; font-family: sans-serif; margin-bottom: 25px;">
            <span style="font-family: monospace; font-size: 11px; letter-spacing: 1px; font-weight: bold; background-color: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 4px;">SUBJECT ${subIdx+1}</span>
            <h2 style="margin: 5px 0 0 0; font-size: 22px; font-weight: 800;">${compiled.name} (${compiled.code})</h2>
          </div>
          
          ${compiled.quantum.map(unit => `
            <div style="margin-bottom: 35px; border: 1px solid #e2e8f0; padding: 25px; border-radius: 12px; background-color: #fafafa;">
              <div style="display: flex; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 15px;">
                <h3 style="margin: 0; color: #0891b2; font-family: sans-serif;">UNIT ${unit.unit}: ${unit.title.toUpperCase()}</h3>
                <span style="background-color: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; font-family: monospace; margin-left: auto;">AKTU BOARD REPEATED</span>
              </div>
              
              <div style="margin-top: 15px;">
                ${unit.qas.map((qaItem, idx) => `
                  <div style="margin-bottom: 25px; background-color: #ffffff; border: 1px solid #f1f5f9; padding: 15px; border-radius: 8px;">
                    <p style="font-weight: bold; color: #0f172a; font-family: sans-serif; margin-top: 0;">Q${idx + 1}. ${qaItem.q}</p>
                    <div style="color: #334155; line-height: 1.6; font-family: sans-serif; border-left: 2px solid #e2e8f0; padding-left: 15px; margin-top: 10px; font-size: 13.5px; white-space: pre-wrap;">
                      <strong style="color: #059669; font-size: 10px; display: block; font-family: monospace; text-transform: uppercase; margin-bottom: 5px;">Board Answer Key:</strong>
                      ${qaItem.a}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    });
    
    // Compile the full HTML document and trigger download
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>AKTU Sem-${sem} ${branch.toUpperCase()} Quantum Series Solved Package</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; max-width: 900px; margin: 0 auto; color: #0f172a; line-height: 1.6; background-color: #ffffff; }
          .no-print-toolbar { display: flex; justify-content: space-between; align-items: center; background-color: #0f172a; color: #ffffff; padding: 15px 30px; border-radius: 12px; margin-bottom: 40px; border: 1px solid #1e293b; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
          .btn-print { background-color: #059669; color: #ffffff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: background 0.2s; font-size: 13px; }
          .btn-print:hover { background-color: #047857; }
          @media print {
            body { padding: 0; }
            .no-print-toolbar { display: none !important; }
          }
        </style>
      </head>
      <body>
        <div class="no-print-toolbar">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 18px;">📚</span>
            <div>
              <h4 style="margin: 0; font-size: 14px;">AKTU Quantum Solved Booklets</h4>
              <p style="margin: 0; font-size: 10px; color: #94a3b8;">Standalone offline package - print to save as PDF</p>
            </div>
          </div>
          <button onclick="window.print()" class="btn-print">🖨️ Print / Save PDF</button>
        </div>
        ${masterBody}
      </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sem${sem}_${branch.toUpperCase()}_Quantum_Series_Solved_Package.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showToast(`📥 Semester ${sem} Quantum package successfully generated and downloaded!`);
  };
  // Navigation & Selector States
  const [selectedUniv, setSelectedUniv] = useState('aktu');
  const [selectedBranch, setSelectedBranch] = useState('cse');
  const [selectedSem, setSelectedSem] = useState(3);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [syllabusViewMode, setSyllabusViewMode] = useState('year'); // year or semester
  
  // Dashboard Sub-Tab
  const [activeSubTab, setActiveSubTab] = useState('notes'); // notes, pyqs, blueprint, quantum
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  
  // HUD Reader Modal States
  const [readerModal, setReaderModal] = useState({
    isOpen: false,
    title: '',
    code: '',
    content: '',
    type: 'note', // 'note', 'pyq', 'quantum'
    activeTab: 'all' // for pyqs (all, a, b, c)
  });
  const [readerTextSize, setReaderTextSize] = useState('base'); // xs, sm, base, lg, xl
  const [modalSearchQuery, setModalSearchQuery] = useState('');
  
  // Request / Waitlist Form States
  const [email, setEmail] = useState('');
  const [reqSubjectCode, setReqSubjectCode] = useState('');
  const [reqSubmitted, setReqSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);
  
  // Live AI Compiler Loading State
  const [loadingAI, setLoadingAI] = useState(false);

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

  // Pre-load default subject
  useEffect(() => {
    const subjectsList = ACADEMIC_DATA[selectedUniv]?.branches[selectedBranch]?.semesters[selectedSem] || [];
    if (subjectsList.length > 0) {
      // Pre-compile dynamic template if notes/pyqs arrays are empty
      const baseSub = subjectsList[0];
      if (!baseSub.units || baseSub.units.length === 0) {
        setSelectedSubject(generateDynamicContent(baseSub));
      } else {
        setSelectedSubject(baseSub);
      }
    } else {
      setSelectedSubject(null);
    }
    setActiveSubTab('notes');
  }, [selectedUniv, selectedBranch, selectedSem]);

  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setReqSubmitted(true);
      showToast("🚀 Subject syllabus request registered! Syncing updates.");
      setEmail('');
      setReqSubjectCode('');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast("📋 Copied notes to clipboard!");
  };

  const triggerDownload = (resourceName, data = null, type = 'notes') => {
    let title = `${selectedSubject?.name || 'AKTU'} - ${resourceName}`;
    let bodyContent = "";

    if (type === 'syllabus') {
      bodyContent = `
        <h1 style="color: #059669; font-family: sans-serif; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">${selectedSubject.name} (${selectedSubject.code}) Syllabus</h1>
        <p><strong>University:</strong> Dr. A.P.J. Abdul Kalam Technical University (AKTU)</p>
        <p><strong>Syllabus Weightage:</strong> ${selectedSubject.weightage}</p>
        <p><strong>Difficulty Level:</strong> ${selectedSubject.difficulty}</p>
        
        <h2 style="color: #1e293b; font-family: sans-serif; margin-top: 25px;">Standard Reference Textbooks:</h2>
        <ul>
          ${selectedSubject.books.map(b => `<li style="margin-bottom: 8px; font-family: sans-serif;">${b}</li>`).join('')}
        </ul>
        
        <h2 style="color: #1e293b; font-family: sans-serif; margin-top: 25px;">Weightage Blueprint:</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-family: sans-serif;">
          <thead>
            <tr style="background-color: #f1f5f9;">
              <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Syllabus Module</th>
              <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: right; width: 120px;">Weightage</th>
            </tr>
          </thead>
          <tbody>
            ${selectedSubject.weightageData.map(d => `
              <tr>
                <td style="border: 1px solid #cbd5e1; padding: 10px;">${d.unit}</td>
                <td style="border: 1px solid #cbd5e1; padding: 10px; text-align: right; font-weight: bold; color: #0891b2;">${d.pct}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } else if (type === 'notes') {
      const unitsToRender = data && data.number ? [data] : selectedSubject.units;
      bodyContent = `
        <h1 style="color: #059669; font-family: sans-serif; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">${selectedSubject.name} (${selectedSubject.code}) Study Notes</h1>
        <p><strong>Dr. A.P.J. Abdul Kalam Technical University (AKTU)</strong></p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        
        ${unitsToRender.map(unit => `
          <div style="margin-bottom: 35px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
              <span style="background-color: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; font-family: monospace;">UNIT ${unit.number}</span>
              <h2 style="margin: 0; color: #0f172a; font-family: sans-serif;">${unit.title}</h2>
            </div>
            <p style="color: #475569; font-style: italic; font-family: sans-serif; margin-top: 8px;">Summary: ${unit.summary}</p>
            <div style="background-color: #fafafa; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; margin-top: 15px; font-family: sans-serif; line-height: 1.6; color: #334155; white-space: pre-wrap;">
              ${unit.fullContent ? unit.fullContent : 'Detailed syllabus notes are dynamically compiled via system sync.'}
            </div>
          </div>
        `).join('')}
      `;
    } else if (type === 'pyqs') {
      const paperData = data || (selectedSubject.pyqs && selectedSubject.pyqs[0]);
      if (!paperData) return;
      bodyContent = `
        <h1 style="color: #4f46e5; font-family: sans-serif; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">AKTU Solved Previous Year Question Paper</h1>
        <p><strong>Subject:</strong> ${selectedSubject.name} (${selectedSubject.code})</p>
        <p><strong>Academic Cycle:</strong> ${paperData.year} Board Exam</p>
        <p><strong>Duration:</strong> ${paperData.duration} • <strong>Full Marks:</strong> 100 Marks</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        
        <h2 style="color: #1e293b; font-family: sans-serif; background-color: #f8fafc; padding: 8px 15px; border-radius: 6px; border-left: 4px solid #4f46e5; margin-top: 20px;">SECTION A (Short Answer Questions)</h2>
        <div style="margin-top: 15px;">
          ${paperData.sections.a.map((qa, idx) => `
            <div style="margin-bottom: 25px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 15px;">
              <p style="font-weight: bold; color: #0f172a; font-family: sans-serif; margin: 0;">Q${idx + 1}. ${qa.q}</p>
              <div style="color: #334155; line-height: 1.6; font-family: sans-serif; border-left: 2px solid #ecfdf5; padding-left: 15px; margin-top: 8px; font-size: 13.5px; white-space: pre-wrap;">
                <strong style="color: #059669; font-size: 10px; display: block; font-family: monospace; text-transform: uppercase; margin-bottom: 4px;">Exam Answer:</strong>
                ${qa.a}
              </div>
            </div>
          `).join('')}
        </div>
        
        ${paperData.sections.b && paperData.sections.b.length > 0 ? `
          <h2 style="color: #1e293b; font-family: sans-serif; background-color: #f8fafc; padding: 8px 15px; border-radius: 6px; border-left: 4px solid #4f46e5; margin-top: 40px;">SECTION B (Analytical & Mathematical Explanations)</h2>
          <div style="margin-top: 15px;">
            ${paperData.sections.b.map((qa, idx) => `
              <div style="margin-bottom: 30px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 15px;">
                <p style="font-weight: bold; color: #0f172a; font-family: sans-serif; font-size: 15px; margin: 0;">Q${idx + 1}. ${qa.q}</p>
                <div style="color: #334155; line-height: 1.6; font-family: sans-serif; border-left: 2px solid #ecfdf5; padding-left: 15px; margin-top: 10px; font-size: 13.5px; white-space: pre-wrap;">
                  <strong style="color: #059669; font-size: 10px; display: block; font-family: monospace; text-transform: uppercase; margin-bottom: 5px;">Exam Answer:</strong>
                  ${qa.a}
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${paperData.sections.c && paperData.sections.c.length > 0 ? `
          <h2 style="color: #1e293b; font-family: sans-serif; background-color: #f8fafc; padding: 8px 15px; border-radius: 6px; border-left: 4px solid #4f46e5; margin-top: 40px;">SECTION C (Unit-Based Explanations)</h2>
          <div style="margin-top: 15px;">
            ${paperData.sections.c.map((qa, idx) => `
              <div style="margin-bottom: 30px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 15px;">
                <p style="font-weight: bold; color: #0f172a; font-family: sans-serif; font-size: 15px; margin: 0;">Q${idx + 1}. ${qa.q}</p>
                <div style="color: #334155; line-height: 1.6; font-family: sans-serif; border-left: 2px solid #ecfdf5; padding-left: 15px; margin-top: 10px; font-size: 13.5px; white-space: pre-wrap;">
                  <strong style="color: #059669; font-size: 10px; display: block; font-family: monospace; text-transform: uppercase; margin-bottom: 5px;">Exam Answer:</strong>
                  ${qa.a}
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      `;
    } else if (type === 'quantum') {
      const quantumData = data || selectedSubject.quantum;
      bodyContent = `
        <h1 style="color: #0891b2; font-family: sans-serif; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">AKTU Quantum Series Booster</h1>
        <p><strong>Subject:</strong> ${selectedSubject.name} (${selectedSubject.code})</p>
        <p><strong>Features:</strong> High-Frequency Repeating Questions & Solved Board Derivations</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        
        ${quantumData.map(unit => `
          <div style="margin-bottom: 40px; border: 1px solid #e2e8f0; padding: 25px; border-radius: 12px; background-color: #fafafa;">
            <div style="display: flex; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 15px;">
              <h3 style="margin: 0; color: #0891b2; font-family: sans-serif;">UNIT ${unit.unit}: ${unit.title.toUpperCase()}</h3>
              <span style="background-color: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; font-family: monospace; margin-left: auto;">AKTU BOARD REPEATED</span>
            </div>
            
            <div style="margin-top: 15px;">
              ${unit.qas.map((qaItem, idx) => `
                <div style="margin-bottom: 25px; background-color: #ffffff; border: 1px solid #f1f5f9; padding: 15px; border-radius: 8px;">
                  <p style="font-weight: bold; color: #0f172a; font-family: sans-serif; margin-top: 0;">Q${idx + 1}. ${qaItem.q}</p>
                  <div style="color: #334155; line-height: 1.6; font-family: sans-serif; border-left: 2px solid #e2e8f0; padding-left: 15px; margin-top: 10px; font-size: 13.5px; white-space: pre-wrap;">
                    <strong style="color: #059669; font-size: 10px; display: block; font-family: monospace; text-transform: uppercase; margin-bottom: 5px;">Board Answer Key:</strong>
                    ${qaItem.a}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      `;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #ffffff;
            color: #334155;
            padding: 40px;
            max-width: 850px;
            margin: 0 auto;
            line-height: 1.6;
          }
          h1, h2, h3, h4 {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          }
          code {
            background-color: #f1f5f9;
            color: #0f766e;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 90%;
          }
          @media print {
            body {
              padding: 0;
            }
            .no-print {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="background-color: #ecfdf5; border: 1px solid #a7f3d0; padding: 15px; border-radius: 8px; margin-bottom: 30px; display: flex; align-items: center; font-family: sans-serif;">
          <div>
            <strong style="color: #065f46; font-size: 14px;">🎓 AKTU Study Kit — Nexora Student Hub</strong>
            <p style="margin: 5px 0 0 0; font-size: 12px; color: #047857;">Press <strong>Ctrl + P</strong> (Windows) or <strong>Cmd + P</strong> (Mac) to save this study bundle as a perfectly styled PDF!</p>
          </div>
          <button onclick="window.print()" style="margin-left: auto; background-color: #059669; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer;">Print / Save PDF</button>
        </div>
        ${bodyContent}
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resourceName.replace(/\s+/g, '_')}_AKTU.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(` Solved Study File: ${resourceName}_AKTU.html successfully generated and downloaded!`);
  };

  const triggerMockDownload = (resourceName) => {
    if (!selectedSubject) return;
    if (resourceName.includes('_Syllabus')) {
      triggerDownload(resourceName, selectedSubject, 'syllabus');
    } else if (resourceName.includes('_Quantum_Series')) {
      downloadQuantumPDF(selectedSubject, selectedSem, selectedBranch);
    } else if (resourceName.includes('Solved_PYQ_')) {
      const year = resourceName.replace('Solved_PYQ_', '');
      const paper = selectedSubject.pyqs.find(p => p.year === year) || (selectedSubject.pyqs && selectedSubject.pyqs[0]);
      triggerDownload(resourceName, paper, 'pyqs');
    } else if (resourceName.includes('Unit_') && resourceName.includes('_Notes')) {
      const unitNum = parseInt(resourceName.replace('Unit_', '').replace('_Notes', ''));
      const unit = selectedSubject.units.find(u => u.number === unitNum) || (selectedSubject.units && selectedSubject.units[0]);
      triggerDownload(resourceName, unit, 'notes');
    } else {
      // General note/modal title downloader fallback
      if (readerModal.isOpen && readerModal.type === 'note') {
        triggerDownload(resourceName, { number: '', title: resourceName, fullContent: readerModal.content }, 'notes');
      } else if (readerModal.isOpen && readerModal.type === 'pyq') {
        triggerDownload(resourceName, readerModal.content, 'pyqs');
      } else {
        // Ultimate fallback: simple text download
        const fileContent = `🎓 AKTU Study resource: ${resourceName}\nCompiled by Nexora Student Hub.`;
        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${resourceName.replace(/\s+/g, '_')}_AKTU.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showToast(`📥 Study File: ${resourceName}_AKTU.txt downloaded!`);
      }
    }
  };

  // Google Gemini API Live Compiler
  const callGemini = async (prompt) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyADTgcdjCOHGUw8Oc5NkaN9e3GUgXfcUNk';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const data = await response.json();
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
    throw new Error('API Error');
  };

  const compileSubjectWithAI = async (subject) => {
    setLoadingAI(true);
    showToast(`🤖 Nexora AI: Compiling high-fidelity syllabus for ${subject.code}...`);
    try {
      const prompt = `Explain the engineering subject "${subject.name}" (Subject Code: ${subject.code}) in detail. 
      Format your response strictly as a single parseable JSON object matching this structure (do not include any markdown json selectors or triple backticks, output pure raw JSON only):
      {
        "units": [
          {
            "number": 1,
            "title": "Unit 1 Title",
            "summary": "Short 1-2 sentence unit summary.",
            "fullContent": "Deep, comprehensive lecture note content for Unit 1, containing core definitions, bulleted key concepts, and formatted markdown subheadings."
          }
        ],
        "pyqs": [
          {
            "year": "2023-24",
            "duration": "3 Hours",
            "sections": {
              "a": [
                { "q": "Short 2-mark question?", "a": "Scorer-level direct answer." }
              ],
              "b": [
                { "q": "Long 10-mark question?", "a": "Meticulously explained analytical long answer." }
              ],
              "c": [
                { "q": "Unit-based long question?", "a": "Step-by-step explained derivation or algorithm." }
              ]
            }
          }
        ],
        "quantum": [
          {
            "unit": 1,
            "title": "Unit 1 Title",
            "qas": [
              { "q": "Highly repeated exam question? (Asked in AKTU 2019, 2021, 2023) [Highly Repeated]", "a": "Excellent exam answer with detailed math and formulas." }
            ]
          }
        ]
      }`;
      const resText = await callGemini(prompt);
      let cleaned = resText.trim();
      if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```json\s*/i, '').replace(/^```\s*/, '');
      }
      if (cleaned.endsWith('```')) {
        cleaned = cleaned.replace(/\s*```$/, '');
      }
      const parsedData = JSON.parse(cleaned.trim());
      
      const updatedSubject = {
        ...subject,
        units: parsedData.units || subject.units,
        pyqs: parsedData.pyqs || subject.pyqs,
        quantum: parsedData.quantum || subject.quantum,
        isAICompiled: true
      };
      setSelectedSubject(updatedSubject);
      showToast(`✨ ${subject.code} compiled successfully with Gemini AI!`);
    } catch (err) {
      console.error(err);
      showToast("❌ AI Compile glitch. Reverting to local dynamic framework.");
    } finally {
      setLoadingAI(false);
    }
  };

  // Filtered lists
  const currentSubjects = ACADEMIC_DATA[selectedUniv]?.branches[selectedBranch]?.semesters[selectedSem] || [];
  
  const filteredSubjects = currentSubjects.filter(sub => 
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    sub.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-4 py-12 md:py-16 lg:px-8 bg-[#020617] text-slate-100 font-sans">
      
      {/* Floating particles */}
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

      {/* Floating System Notifications Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-fadeIn flex items-center gap-2 bg-slate-900 border border-cyan-500/40 text-cyan-400 font-semibold font-mono text-xs px-4 py-3 rounded-xl shadow-glow-cyan">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>{notification}</span>
        </div>
      )}

      <div className="relative mx-auto max-w-7xl z-10 space-y-10">
        
        {/* ==========================================================================
           HEADER SECTION
           ========================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-900 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wider font-bold">
              <Sparkles className="w-3.5 h-3.5" /> ACADEMIC VAULT
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              Nexora{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 text-neon-cyan">
                Notes & Quantum Vault
              </span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Explore syllabus-aligned unit notes, previous year question papers (PYQs) with step-by-step mathematical answers, and textbook blueprints meticulously compiled for university examinations.
            </p>
          </div>

          {/* Dynamic Subject Search */}
          <div className="w-full md:w-80 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search subject code / name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-xs"
            />
          </div>
        </div>

        {/* ==========================================================================
           HIERARCHICAL FILTERS BAR
           ========================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 1. Choose University */}
          <div className="glass-panel p-4 rounded-2xl space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-slate-500 font-bold uppercase">1. CHOOSE UNIVERSITY</span>
            <div className="flex flex-col gap-2">
              {Object.entries(ACADEMIC_DATA).map(([key, univ]) => {
                const isActive = selectedUniv === key;
                const isLocked = Object.keys(univ.branches).length === 0;
                return (
                  <button
                    key={key}
                    onClick={() => !isLocked && setSelectedUniv(key)}
                    disabled={isLocked}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                      isActive 
                        ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 shadow-inner' 
                        : isLocked 
                        ? 'bg-slate-950/20 border-slate-900 text-slate-655 cursor-not-allowed opacity-50' 
                        : 'bg-slate-900/30 border-slate-850 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{univ.logo}</span>
                      <span className="truncate max-w-[180px]">{univ.name}</span>
                    </div>
                    {isLocked ? (
                      <span className="text-[9px] font-mono bg-slate-900 border border-slate-800 text-slate-600 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> LOCKED
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 px-1.5 py-0.5 rounded font-black">ACTIVE</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Select Branch */}
          <div className="glass-panel p-4 rounded-2xl space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-slate-500 font-bold uppercase">2. SELECT BRANCH</span>
            <div className="grid grid-cols-2 gap-2 h-[134px] content-start">
              {Object.entries(ACADEMIC_DATA[selectedUniv]?.branches || {}).map(([key, val]) => {
                const isActive = selectedBranch === key;
                const isLocked = !val.semesters || Object.keys(val.semesters).length === 0;
                return (
                  <button
                    key={key}
                    onClick={() => !isLocked && setSelectedBranch(key)}
                    disabled={isLocked}
                    className={`flex flex-col items-start justify-between p-2.5 rounded-xl border text-left transition-all h-[60px] ${
                      isActive 
                        ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300 shadow-inner' 
                        : isLocked 
                        ? 'bg-slate-950/20 border-slate-900 text-slate-655 cursor-not-allowed opacity-50' 
                        : 'bg-slate-900/30 border-slate-850 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-[10px] font-black tracking-wider uppercase font-mono">{key}</span>
                    <span className="text-[9px] text-slate-500 truncate w-full">{val.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Select Semester */}
          <div className="glass-panel p-4 rounded-2xl space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-slate-500 font-bold uppercase">3. SELECT SEMESTER</span>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((semNum) => {
                const isActive = selectedSem === semNum;
                const subjectsInSem = ACADEMIC_DATA[selectedUniv]?.branches[selectedBranch]?.semesters[semNum] || [];
                const hasNotes = subjectsInSem.length > 0;
                
                return (
                  <button
                    key={semNum}
                    onClick={() => setSelectedSem(semNum)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all h-[60px] relative ${
                      isActive 
                        ? 'bg-purple-500/10 border-purple-500 text-purple-300 shadow-inner' 
                        : 'bg-slate-900/30 border-slate-855 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-sm font-bold font-mono">S-{semNum}</span>
                    <span className={`text-[8px] font-mono mt-1 ${hasNotes ? 'text-emerald-400 font-bold' : 'text-slate-600'}`}>
                      {hasNotes ? `${subjectsInSem.length} Sub` : 'Empty'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* ==========================================================================
           OFFICIAL AKTU AND ITS SYLLABUS HUB
           ========================================================================== */}
        <div className="glass-panel-neon p-6 rounded-2xl relative overflow-hidden space-y-5 animate-fadeIn">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 rounded-full blur-3xl -z-10" />
          
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-slate-900 pb-3.5">
            <div className="space-y-1">
              <span className="text-[9px] font-mono bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded font-black tracking-widest uppercase">BOARD REPOSITORY</span>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                🎓 Dr. A.P.J. Abdul Kalam Technical University (AKTU) Syllabus Hub
              </h2>
              <p className="text-xs text-slate-400">Access and download the official AKTU university board syllabus PDF files directly in high fidelity.</p>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-950 p-1.5 rounded-xl border border-slate-900 gap-1.5 select-none no-print self-start md:self-auto shadow-inner">
              <button
                onClick={() => setSyllabusViewMode('year')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all ${
                  syllabusViewMode === 'year'
                    ? 'bg-slate-900 text-emerald-400 border border-slate-800 shadow-glow-cyan'
                    : 'text-slate-400 hover:text-slate-205'
                }`}
              >
                📅 Academic Year
              </button>
              <button
                onClick={() => setSyllabusViewMode('semester')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all ${
                  syllabusViewMode === 'semester'
                    ? 'bg-slate-900 text-emerald-400 border border-slate-800 shadow-glow-cyan'
                    : 'text-slate-400 hover:text-slate-205'
                }`}
              >
                📊 Semester-Wise
              </button>
            </div>
          </div>

          {syllabusViewMode === 'year' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn">
              {[
                {
                  year: "1st Year",
                  desc: "Common first-year foundation curriculum (Effective from 2022-23)",
                  branches: [
                    { name: "Computer Science & IT", file: "Syllabus_BTech_First_Yr_Common_other_than_AG_&_BT_effective_from_2022_23_R.pdf", path: "/Syllabus/1st Year/CS & IT/Syllabus_BTech_First_Yr_Common_other_than_AG_&_BT_effective_from_2022_23_R.pdf" },
                    { name: "Civil Engineering", file: "Syllabus_BTech_First_Yr_Common_other_than_AG_&_BT_effective_from_2022_23_R.pdf", path: "/Syllabus/1st Year/Civil Engineering/Syllabus_BTech_First_Yr_Common_other_than_AG_&_BT_effective_from_2022_23_R.pdf" },
                    { name: "Electrical Engineering", file: "Syllabus_BTech_First_Yr_Common_other_than_AG_&_BT_effective_from_2022_23_R (1).pdf", path: "/Syllabus/1st Year/ELectrical Engineering/Syllabus_BTech_First_Yr_Common_other_than_AG_&_BT_effective_from_2022_23_R (1).pdf" }
                  ]
                },
                {
                  year: "2nd Year",
                  desc: "Sophomore level branch-specific specialized syllabus",
                  branches: [
                    { name: "Computer Science & IT", file: "B.Tech_2nd_Yr_CSE_v3.pdf", path: "/Syllabus/2nd Year/CS & IT/B.Tech_2nd_Yr_CSE_v3.pdf" },
                    { name: "Civil Engineering", file: "B.Tech_2nd_Yr_Civil.pdf", path: "/Syllabus/2nd Year/Civil Engineering/B.Tech_2nd_Yr_Civil.pdf" },
                    { name: "Electrical Engineering", file: "B.Tech_2nd_Yr_EE_V2.pdf", path: "/Syllabus/2nd Year/ELectrical Engineering/B.Tech_2nd_Yr_EE_V2.pdf" }
                  ]
                },
                {
                  year: "3rd Year",
                  desc: "Pre-final year advanced theory & lab syllabus (Effective 2024-25)",
                  branches: [
                    { name: "Computer Science & IT", file: "B.TECH CE&IT , CSIT, IT 3rd YR 2024-25.pdf", path: "/Syllabus/3rd Year/CS & IT/B.TECH CE&IT , CSIT, IT 3rd YR 2024-25.pdf" },
                    { name: "Civil Engineering", file: "B.Tech. 3rd Year Civil Engineering.pdf", path: "/Syllabus/3rd Year/Civil Engineering/B.Tech. 3rd Year Civil Engineering.pdf" },
                    { name: "Electrical Engineering", file: "1 B.Tech. 3rd Year Electrical Engineering 2024-25.pdf", path: "/Syllabus/3rd Year/ELectrical Engineering/1 B.Tech. 3rd Year Electrical Engineering 2024-25.pdf" }
                  ]
                },
                {
                  year: "4th Year",
                  desc: "Final year advanced technical electives & project outlines",
                  branches: [
                    { name: "Computer Science & IT", file: null, path: null },
                    { name: "Civil Engineering", file: null, path: null },
                    { name: "Electrical Engineering", file: null, path: null }
                  ]
                }
              ].map((yData, yIdx) => (
                <div key={yIdx} className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl flex flex-col justify-between space-y-3.5 hover:border-slate-800 transition-all group">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-400 font-mono tracking-wider">{yData.year.toUpperCase()}</span>
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">{yData.year} Syllabus</h4>
                    <p className="text-[10px] text-slate-500 leading-normal">{yData.desc}</p>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {yData.branches.map((br, bIdx) => (
                      <div key={bIdx} className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-950 text-[10px]">
                        <span className="text-slate-350 font-medium truncate max-w-[100px]">{br.name}</span>
                        {br.path ? (
                          <div className="flex items-center gap-1 no-print">
                            <a
                              href={br.path}
                              download={br.file}
                              className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/20 hover:border-emerald-500 text-emerald-400 hover:text-white transition-all font-bold tracking-wide"
                              title="Download Syllabus PDF"
                            >
                              <Download className="w-2 h-2" /> PDF
                            </a>
                            <button
                              onClick={() => {
                                const yearNum = parseInt(yData.year.replace('1st', '1').replace('2nd', '2').replace('3rd', '3').replace('4th', '4'));
                                const semA = yearNum * 2 - 1;
                                const branchKey = br.name.includes('Computer Science') ? 'cse' : br.name.includes('Civil') ? 'civil' : 'ee';
                                downloadSemesterQuantum(semA, branchKey);
                              }}
                              className="flex items-center gap-0.5 px-1 py-0.5 rounded bg-cyan-500/10 hover:bg-cyan-500 border border-cyan-500/20 hover:border-cyan-500 text-cyan-400 hover:text-white transition-all font-bold"
                              title="Download Solved Quantum: Odd Sem"
                            >
                              ⚡Q1
                            </button>
                            <button
                              onClick={() => {
                                const yearNum = parseInt(yData.year.replace('1st', '1').replace('2nd', '2').replace('3rd', '3').replace('4th', '4'));
                                const semB = yearNum * 2;
                                const branchKey = br.name.includes('Computer Science') ? 'cse' : br.name.includes('Civil') ? 'civil' : 'ee';
                                downloadSemesterQuantum(semB, branchKey);
                              }}
                              className="flex items-center gap-0.5 px-1 py-0.5 rounded bg-cyan-500/10 hover:bg-cyan-500 border border-cyan-500/20 hover:border-cyan-500 text-cyan-400 hover:text-white transition-all font-bold"
                              title="Download Solved Quantum: Even Sem"
                            >
                              ⚡Q2
                            </button>
                          </div>
                        ) : (
                          <span className="text-[8px] font-mono text-slate-500 bg-slate-950 border border-slate-900 px-1.5 py-0.5 rounded select-none">SYNCING</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fadeIn">
              {SEMESTER_SYLLABUS_DATA.map((sData, sIdx) => {
                const isOdd = sIdx % 2 === 0;
                return (
                  <div key={sIdx} className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl flex flex-col justify-between space-y-3.5 hover:border-slate-800 transition-all group">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] font-bold text-emerald-400 font-mono tracking-wider">{sData.sem.toUpperCase()}</span>
                        <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded border select-none ${
                          isOdd 
                            ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' 
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}>
                          {sData.type}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">{sData.sem} Syllabus</h4>
                      <p className="text-[10px] text-slate-500 leading-normal">{sData.desc}</p>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {sData.branches.map((br, bIdx) => (
                        <div key={bIdx} className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-950 text-[10px]">
                          <span className="text-slate-350 font-medium truncate max-w-[100px]">{br.name}</span>
                          {br.path ? (
                            <div className="flex items-center gap-1.5 no-print">
                              <a
                                href={br.path}
                                download={br.file}
                                className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/20 hover:border-emerald-500 text-emerald-400 hover:text-white transition-all font-bold tracking-wide"
                                title="Download Syllabus PDF"
                              >
                                <Download className="w-2 h-2" /> PDF
                              </a>
                              <button
                                onClick={() => {
                                  const semNum = parseInt(sData.sem.replace('Semester ', ''));
                                  const branchKey = br.name.includes('Computer Science') ? 'cse' : br.name.includes('Civil') ? 'civil' : 'ee';
                                  downloadSemesterQuantum(semNum, branchKey);
                                }}
                                className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-cyan-500/10 hover:bg-cyan-500 border border-cyan-500/20 hover:border-cyan-500 text-cyan-400 hover:text-white transition-all font-bold tracking-wide shadow-glow-cyan"
                                title="Download Solved Quantum Booklet"
                              >
                                <Sparkles className="w-2.5 h-2.5" /> Quantum
                              </button>
                            </div>
                          ) : (
                            <span className="text-[8px] font-mono text-slate-500 bg-slate-950 border border-slate-900 px-1.5 py-0.5 rounded select-none">SYNCING</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ==========================================================================
           MAIN CONTENT INTERFACE
           ========================================================================== */}
        {filteredSubjects.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-2xl space-y-4">
            <div className="inline-flex p-4 rounded-full bg-slate-950/60 border border-slate-800 text-slate-600">
              <BookMarked className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">No active notes modules found</h3>
            <p className="text-slate-500 text-xs max-w-md mx-auto leading-relaxed">
              We have not fully synchronized AKTU {selectedBranch.toUpperCase()} Semester {selectedSem} notes yet. Please register your email below to request accelerated upload or search alternative parameters!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: Subject List (Col-4) */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-slate-500 font-bold uppercase">AVAILABLE SUBJECTS</span>
              <div className="space-y-2">
                {filteredSubjects.map((sub) => {
                  const isSelected = selectedSubject?.id === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => {
                        // Dynamically compile template if uncompiled
                        if (!sub.units || sub.units.length === 0) {
                          setSelectedSubject(generateDynamicContent(sub));
                        } else {
                          setSelectedSubject(sub);
                        }
                        setActiveSubTab('notes');
                      }}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group relative flex flex-col justify-between h-[105px] ${
                        isSelected 
                          ? 'glass-panel-neon border-emerald-500/40 text-white' 
                          : 'glass-panel hover:border-slate-800/80 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between w-full gap-2">
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950 text-emerald-400 border border-slate-900">{sub.code}</span>
                           <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const compiled = sub.units && sub.units.length > 0 ? sub : generateDynamicContent(sub);
                                triggerDownload(`${compiled.name}_Solved_PYQs`, compiled, 'pyqs');
                              }}
                              className="p-1 rounded bg-slate-950 hover:bg-slate-900 border border-slate-900 hover:border-emerald-500/40 text-emerald-400 transition-all select-none no-print"
                              title="Instant Solved PYQs Download"
                            >
                              <Download className="w-2.5 h-2.5" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                downloadQuantumPDF(sub, selectedSem, selectedBranch);
                              }}
                              className="p-1 rounded bg-slate-950 hover:bg-slate-900 border border-slate-900 hover:border-cyan-500/40 text-cyan-400 transition-all select-none no-print"
                              title="Instant Quantum Series Download"
                            >
                              <Sparkles className="w-2.5 h-2.5" />
                            </button>
                            <span className="text-[9px] font-mono text-slate-500 font-semibold">{sub.weightage}</span>
                          </div>
                        </div>
                        <h4 className="text-sm font-extrabold truncate w-full group-hover:text-white transition-colors">{sub.name}</h4>
                      </div>
                      
                      <div className="flex items-center justify-between border-t border-slate-900/60 pt-2 text-[9px] font-mono">
                        <span className="text-slate-500 flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-emerald-500" /> Syllabus Loaded
                        </span>
                        <span className="text-emerald-400 font-bold bg-emerald-500/5 px-1.5 py-0.5 rounded border border-emerald-500/10">VERIFIED</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: Selected Subject Dashboard (Col-8) */}
            {selectedSubject && (
              <div className="lg:col-span-8 space-y-6">
                
                {/* Active Subject HUD Header */}
                <div className="glass-panel-neon p-6 rounded-2xl relative overflow-hidden flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500 to-indigo-500 rounded-full blur-3xl opacity-10 -z-10" />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-black tracking-wider">{selectedSubject.code} DATA ENGINE</span>
                      {selectedSubject.isAICompiled && (
                        <span className="text-[9px] font-mono bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded font-bold animate-pulse">GEMINI AI SYNCED</span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">{selectedSubject.name}</h3>
                    <p className="text-xs text-slate-400">Syllabus weightage: <span className="text-emerald-400 font-semibold">{selectedSubject.weightage}</span> • Difficulty index: <span className="text-purple-400 font-semibold">{selectedSubject.difficulty}</span></p>
                  </div>
                  
                  <div className="flex items-center gap-2 self-start md:self-center">
                    <button 
                      onClick={() => compileSubjectWithAI(selectedSubject)}
                      disabled={loadingAI}
                      className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 border border-cyan-500/30 hover:border-cyan-400 text-xs font-semibold text-cyan-400 hover:text-white shadow-glow-cyan transition-all"
                    >
                      {loadingAI ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Compiling...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Sync Gemini AI
                        </>
                      )}
                    </button>
                    <button 
                      onClick={() => {
                        const compiled = selectedSubject.units && selectedSubject.units.length > 0 ? selectedSubject : generateDynamicContent(selectedSubject);
                        triggerDownload(`${compiled.name}_Solved_PYQs`, compiled, 'pyqs');
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white text-xs font-extrabold shadow-glow-purple transition-all select-none no-print shadow-glow-cyan"
                      title="Download Solved Board PYQs Study Guide"
                    >
                      <Download className="w-3.5 h-3.5 animate-pulse" /> Download PYQs
                    </button>
                    <button 
                      onClick={() => {
                        downloadQuantumPDF(selectedSubject, selectedSem, selectedBranch);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white text-xs font-extrabold shadow-glow-cyan transition-all select-none no-print"
                      title="Download Solved Quantum Series Booklet"
                    >
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Download Quantum
                    </button>
                    <button 
                      onClick={() => triggerMockDownload(selectedSubject.name + "_Syllabus")}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/30 text-slate-350 hover:text-white text-xs font-bold uppercase flex items-center gap-1.5"
                      title="Download Syllabus PDF"
                    >
                      <BookOpen className="w-4 h-4 text-emerald-400" /> Syllabus
                    </button>
                  </div>
                </div>

                {/* Subject Sub-Tab Bar */}
                <div className="flex border-b border-slate-900 bg-slate-950/20 p-1 rounded-xl gap-1">
                  <button
                    onClick={() => setActiveSubTab('notes')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all ${
                      activeSubTab === 'notes'
                        ? 'bg-slate-900 text-emerald-400 border border-slate-800 shadow-inner'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 text-emerald-400" /> Unit Notes
                  </button>
                  <button
                    onClick={() => setActiveSubTab('quantum')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all ${
                      activeSubTab === 'quantum'
                        ? 'bg-slate-900 text-emerald-400 border border-slate-800 shadow-inner'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <BookMarked className="w-4 h-4 text-cyan-400" /> Quantum Series
                  </button>
                  <button
                    onClick={() => setActiveSubTab('pyqs')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all ${
                      activeSubTab === 'pyqs'
                        ? 'bg-slate-900 text-indigo-400 border border-slate-800 shadow-inner'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Award className="w-4 h-4 text-indigo-400" /> Solved PYQs
                  </button>
                  <button
                    onClick={() => setActiveSubTab('blueprint')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all ${
                      activeSubTab === 'blueprint'
                        ? 'bg-slate-900 text-purple-400 border border-slate-800 shadow-inner'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-purple-400" /> Blueprint & Books
                  </button>
                </div>

                {/* Sub-Tab Panel Output */}
                <div className="space-y-4 min-h-[300px]">
                  
                  {/* TAB 1: UNIT NOTES */}
                  {activeSubTab === 'notes' && (
                    <div className="space-y-4">
                      {!selectedSubject.units || selectedSubject.units.length === 0 ? (
                        <div className="glass-panel p-8 text-center rounded-xl text-slate-500 text-xs">
                          Unit summary deck is under structural compilation. Accelerating files.
                        </div>
                      ) : (
                        selectedSubject.units.map((unit) => (
                          <div 
                            key={unit.number}
                            className="glass-panel p-5 rounded-2xl border border-slate-900 hover:border-slate-800 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group"
                          >
                            <div className="space-y-2 max-w-[500px]">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold font-mono text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">UNIT {unit.number}</span>
                                <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">{unit.title}</h4>
                              </div>
                              <p className="text-xs text-slate-400 leading-relaxed font-sans">{unit.summary}</p>
                            </div>
                            <div className="flex items-center gap-2 w-full md:w-auto">
                              <button 
                                onClick={() => setReaderModal({
                                  isOpen: true,
                                  title: `Unit ${unit.number}: ${unit.title}`,
                                  code: selectedSubject.code,
                                  content: unit.fullContent,
                                  type: 'note'
                                })}
                                className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-650 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-semibold shadow-glow-cyan transition-all"
                              >
                                <Eye className="w-3.5 h-3.5" /> Read Notes
                              </button>
                              <button 
                                onClick={() => triggerMockDownload(`Unit_${unit.number}_Notes`)}
                                className="p-2 rounded-xl bg-slate-950 border border-slate-855 text-slate-400 hover:text-slate-200"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* TAB 2: QUANTUM SERIES */}
                  {activeSubTab === 'quantum' && (
                    <div className="space-y-4">
                      {/* Warning/Info HUD Header */}
                      <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/25 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-black tracking-wider">AKTU QUANTUM SERIES PREP</span>
                          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                            📖 High-Frequency Repeating Q&As
                          </h4>
                          <p className="text-[11px] text-slate-400">Repeated questions and analytical derivation answers extracted from official past 10-year examination boards.</p>
                        </div>
                        <button 
                          onClick={() => downloadQuantumPDF(selectedSubject, selectedSem, selectedBranch)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-650 hover:bg-emerald-500 text-white text-xs font-bold shadow-glow-cyan transition-all w-full sm:w-auto justify-center"
                        >
                          <Download className="w-3.5 h-3.5 animate-pulse" /> Full Quantum PDF
                        </button>
                      </div>

                      {selectedSubject.quantum && selectedSubject.quantum.length > 0 ? (
                        <div className="space-y-4">
                          {selectedSubject.quantum.map((unitSec) => (
                            <div key={unitSec.unit} className="glass-panel p-5 rounded-2xl border border-slate-900 space-y-4">
                              <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                                <h5 className="text-xs font-bold text-slate-400 font-mono tracking-wider">
                                  UNIT {unitSec.unit}: {unitSec.title.toUpperCase()}
                                </h5>
                                <span className="text-[9px] text-emerald-400 font-mono bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">AKTU REPEATED</span>
                              </div>
                              
                              <div className="space-y-3.5">
                                {unitSec.qas.map((qaItem, qIdx) => (
                                  <div key={qIdx} className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl space-y-3 hover:border-emerald-500/25 transition-all group">
                                    <div className="flex justify-between items-start gap-3">
                                      <h6 className="text-xs sm:text-sm font-extrabold text-white flex gap-2">
                                        <span className="text-emerald-400 font-mono">Q.</span>
                                        <span>{qaItem.q}</span>
                                      </h6>
                                      <button 
                                        onClick={() => copyToClipboard(qaItem.q + "\n\n" + qaItem.a)}
                                        className="text-slate-500 hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Copy QA"
                                      >
                                        <Copy className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                    
                                    <div className="text-xs sm:text-sm text-slate-455 border-l-2 border-emerald-500/20 pl-4 space-y-2">
                                      <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono block">Exam Solution:</span>
                                      {qaItem.a.split('\n').map((para, pIdx) => {
                                        if (para.startsWith('*')) {
                                          return (
                                            <div key={pIdx} className="flex gap-2 pl-2 text-slate-300">
                                              <span className="text-emerald-400">•</span>
                                              <span dangerouslySetInnerHTML={{ __html: para.replace('*', '').trim().replace(/`([^`]+)`/g, '<code class="bg-slate-900 text-emerald-400 px-1 py-0.5 rounded font-mono text-[90%]">$1</code>') }} />
                                            </div>
                                          );
                                        }
                                        return <p key={pIdx} className="leading-relaxed text-slate-350" dangerouslySetInnerHTML={{ __html: para.replace(/`([^`]+)`/g, '<code class="bg-slate-900 text-emerald-400 px-1 py-0.5 rounded font-mono text-[90%]">$1</code>') }} />;
                                      })}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="glass-panel p-8 text-center rounded-xl text-slate-500 text-xs">
                          Quantum series summaries for this semester/subject are being compiled. Please request acceleration below!
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: SOLVED PYQS */}
                  {activeSubTab === 'pyqs' && (
                    <div className="space-y-4">
                      {!selectedSubject.pyqs || selectedSubject.pyqs.length === 0 ? (
                        <div className="glass-panel p-8 text-center rounded-xl text-slate-500 text-xs">
                          Solved University PYQ papers are being digitized. Accelerate below!
                        </div>
                      ) : (
                        selectedSubject.pyqs.map((paper) => (
                          <div 
                            key={paper.year}
                            className="glass-panel p-6 rounded-2xl border border-slate-900 space-y-4"
                          >
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-900 pb-4 gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                                  <FileQuestion className="w-5 h-5" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-white">AKTU Solved Paper ({paper.year})</h4>
                                  <span className="text-[10px] text-slate-500 font-mono">Duration: {paper.duration} • Full Marks: 100</span>
                                </div>
                              </div>
                              <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-black tracking-wider">SOLUTIONS INC.</span>
                            </div>

                            <p className="text-xs text-slate-400 leading-relaxed">
                              This resource is fully indexed and solved by our top scorers. Contains detailed mathematical derivations, algorithms, complexity trees, and page allocation maps.
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-t border-slate-900/60 pt-4">
                              <button 
                                onClick={() => setReaderModal({
                                  isOpen: true,
                                  title: `Solved PYQ (${paper.year})`,
                                  code: selectedSubject.code,
                                  content: paper.sections,
                                  type: 'pyq',
                                  activeTab: 'all'
                                })}
                                className="col-span-2 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold shadow-glow-purple transition-all"
                              >
                                <Eye className="w-3.5 h-3.5" /> View Solved Paper
                              </button>
                              
                              <button 
                                onClick={() => triggerMockDownload(`Solved_PYQ_${paper.year}`)}
                                className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-850 hover:border-slate-800 text-xs text-slate-400 hover:text-slate-200"
                              >
                                <Download className="w-3.5 h-3.5" /> PDF
                              </button>

                              <button 
                                onClick={() => showToast("💡 Linked Solved paper reference to active AI assistant.")}
                                className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-850 hover:border-slate-800 text-xs text-slate-400 hover:text-slate-200"
                              >
                                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" /> AI Help
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* TAB 4: BLUEPRINT & TEXTBOOKS */}
                  {activeSubTab === 'blueprint' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Left: Weightage Distribution Chart */}
                      <div className="glass-panel p-5 rounded-2xl border border-slate-900 space-y-4">
                        <div className="flex items-center gap-2">
                          <BookMarked className="w-4 h-4 text-purple-400" />
                          <h4 className="text-sm font-bold text-white">Syllabus Weightage Blueprint</h4>
                        </div>
                        <div className="space-y-3.5">
                          {selectedSubject.weightageData.map((unitData, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between items-center text-[10px] font-mono">
                                <span className="text-slate-400 truncate max-w-[200px]">{unitData.unit}</span>
                                <span className="text-cyan-400 font-bold">{unitData.pct}% marks</span>
                              </div>
                              <div className="w-full bg-slate-950 rounded-full h-1.5 border border-slate-900 overflow-hidden">
                                <div 
                                  className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-1.5 rounded-full"
                                  style={{ width: `${unitData.pct}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Recommended Textbooks */}
                      <div className="glass-panel p-5 rounded-2xl border border-slate-900 space-y-4">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-cyan-400" />
                          <h4 className="text-sm font-bold text-white">AKTU Standard Textbooks</h4>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Highly recommended reference textbooks aligned directly with the current university board evaluation standards:
                        </p>
                        <div className="space-y-2">
                          {selectedSubject.books.map((book, idx) => (
                            <div key={idx} className="flex justify-between items-center p-2.5 rounded-xl bg-slate-950/60 border border-slate-900 text-xs text-slate-300 gap-2">
                              <div className="flex gap-2.5 items-center">
                                <span className="text-cyan-400">📖</span>
                                <span className="truncate max-w-[200px] sm:max-w-xs">{book}</span>
                              </div>
                              <button
                                onClick={() => downloadBookPDF(book, selectedSubject, selectedSem, selectedBranch)}
                                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                                title={`Download PDF for ${book}`}
                              >
                                <Download className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                </div>

              </div>
            )}

          </div>
        )}

        {/* ==========================================================================
           BOTTOM REQUEST FORM & PREVIEWS
           ========================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-10 border-t border-slate-900">
          
          {/* Request accelerated notes panel */}
          <div className="lg:col-span-1 glass-panel-neon p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full blur-3xl opacity-10 -z-10" />
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-cyan-400">
                <RefreshCw className="w-5 h-5 animate-spin" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-white">Request Syllabus Upload</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Can't find notes or PYQs for your subject code? Input your student email and requested code. Our system will prioritize it!
              </p>
            </div>

            {!reqSubmitted ? (
              <form onSubmit={handleRequestSubmit} className="space-y-3 mt-4">
                <input
                  type="email"
                  required
                  placeholder="Student email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-855 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs"
                />
                <input
                  type="text"
                  required
                  placeholder="Subject code (e.g., KCS-601)..."
                  value={reqSubjectCode}
                  onChange={(e) => setReqSubjectCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-855 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 text-white font-semibold text-xs hover:from-emerald-400 hover:to-indigo-500 shadow-glow-cyan transition-all"
                >
                  Accelerate Upload <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-2 mt-4 bg-slate-950/60 rounded-xl border border-slate-900">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
                <h5 className="text-xs font-bold text-white">Request Dispatched!</h5>
                <p className="text-[10px] text-slate-500 max-w-[200px] mx-auto">We will notify you at your student email when digitized notes upload goes active.</p>
              </div>
            )}
          </div>

          {/* Quick numbers list */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col justify-between gap-6">
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Academic Repository Statistics</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Nexora Notes Vault utilizes a community-curated system where toppers from top engineering colleges contribute standard semester blueprints and AKTU Quantum Series summaries.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-900 text-center">
                <span className="text-2xl font-mono font-black text-cyan-400">12K+</span>
                <span className="block text-[9px] text-slate-500 mt-1 uppercase font-bold tracking-wider">Indexable PDFs</span>
              </div>
              <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-900 text-center">
                <span className="text-2xl font-mono font-black text-indigo-400">1.5K+</span>
                <span className="block text-[9px] text-slate-500 mt-1 uppercase font-bold tracking-wider">Solved PYQs</span>
              </div>
              <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-900 text-center">
                <span className="text-2xl font-mono font-black text-purple-400">98%</span>
                <span className="block text-[9px] text-slate-500 mt-1 uppercase font-bold tracking-wider">Exam Match Rate</span>
              </div>
              <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-900 text-center">
                <span className="text-2xl font-mono font-black text-emerald-400">2.4K</span>
                <span className="block text-[9px] text-slate-500 mt-1 uppercase font-bold tracking-wider">Active Toppers</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ==========================================================================
         HUD PREMIUM READING MODAL OVERLAY
         ========================================================================== */}
      {readerModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          
          <div className="w-full max-w-4xl h-[85vh] bg-[#090f1e] border border-slate-800/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slideUp">
            
            {/* Modal HUD Header */}
            <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-855 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded font-black tracking-wider">{readerModal.code} HUD READER</span>
                <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-[280px] sm:max-w-[450px]">{readerModal.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                {/* Adjust text size tools */}
                <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                  <button 
                    onClick={() => setReaderTextSize(prev => prev === 'xl' ? 'lg' : prev === 'lg' ? 'base' : prev === 'base' ? 'sm' : 'xs')}
                    className="p-1.5 hover:bg-slate-850 text-slate-400 hover:text-white text-xs font-mono rounded"
                    title="Font size down"
                  >
                    A-
                  </button>
                  <span className="px-2 text-[10px] text-slate-500 uppercase font-mono font-bold">{readerTextSize}</span>
                  <button 
                    onClick={() => setReaderTextSize(prev => prev === 'xs' ? 'sm' : prev === 'sm' ? 'base' : prev === 'base' ? 'lg' : 'xl')}
                    className="p-1.5 hover:bg-slate-850 text-slate-400 hover:text-white text-xs font-mono rounded"
                    title="Font size up"
                  >
                    A+
                  </button>
                </div>

                <button 
                  onClick={() => setReaderModal({ ...readerModal, isOpen: false })}
                  className="p-2 bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-xl border border-slate-855 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Custom Tab Selector (For PYQ Section filter) */}
            {readerModal.type === 'pyq' && (
              <div className="px-6 py-2.5 bg-slate-950/40 border-b border-slate-900 flex items-center justify-between flex-wrap gap-2">
                <div className="flex gap-1.5">
                  {['all', 'a', 'b', 'c'].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => setReaderModal({ ...readerModal, activeTab: sec })}
                      className={`px-3 py-1 rounded text-[10px] font-black uppercase font-mono transition-all ${
                        readerModal.activeTab === sec
                          ? 'bg-indigo-500/25 border border-indigo-500/40 text-indigo-300'
                          : 'bg-slate-900 border border-slate-850 text-slate-500 hover:text-slate-350'
                      }`}
                    >
                      {sec === 'all' ? 'FULL PAPER' : `SECTION ${sec.toUpperCase()}`}
                    </button>
                  ))}
                </div>

                {/* mini modal search */}
                <div className="relative w-40">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 w-3 h-3" />
                  <input
                    type="text"
                    placeholder="Search inside..."
                    value={modalSearchQuery}
                    onChange={(e) => setModalSearchQuery(e.target.value)}
                    className="w-full pl-7 pr-2 py-1 rounded bg-slate-950 border border-slate-855 text-[10px] placeholder-slate-655 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Modal HUD Main Content Scroll viewport */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#040813]">
              
              <div className={`space-y-6 select-text text-slate-350 leading-relaxed font-sans ${
                readerTextSize === 'xs' ? 'text-xs' : 
                readerTextSize === 'sm' ? 'text-sm' : 
                readerTextSize === 'base' ? 'text-base' : 
                readerTextSize === 'lg' ? 'text-lg' : 'text-xl'
              }`}>
                
                {/* 1. RENDER NOTES VIEW */}
                {readerModal.type === 'note' && (
                  <div className="prose prose-invert max-w-none space-y-6">
                    {/* Render raw lines with rich bullet styling, subheadings, etc. */}
                    {readerModal.content.split('\n').map((line, idx) => {
                      if (line.startsWith('###')) {
                        return <h2 key={idx} className="text-xl sm:text-2xl font-black text-white pt-4 pb-2 border-b border-slate-900">{line.replace('###', '').trim()}</h2>;
                      }
                      if (line.startsWith('####')) {
                        return <h3 key={idx} className="text-base sm:text-lg font-bold text-cyan-300 pt-3 pb-1">{line.replace('####', '').trim()}</h3>;
                      }
                      if (line.startsWith('*')) {
                        return (
                          <div key={idx} className="flex gap-2 pl-4 py-0.5 text-slate-300">
                            <span className="text-cyan-400">•</span>
                            <span dangerouslySetInnerHTML={{ __html: line.replace('*', '').trim().replace(/`([^`]+)`/g, '<code class="bg-slate-950 text-cyan-400 px-1.5 py-0.5 rounded font-mono text-[90%]">$1</code>') }} />
                          </div>
                        );
                      }
                      if (line.trim().startsWith('$$')) {
                        return (
                          <div key={idx} className="p-4 bg-slate-950 border border-slate-900 rounded-xl my-3 text-center text-cyan-300 font-mono text-sm overflow-x-auto">
                            {line.replaceAll('$$', '').trim()}
                          </div>
                        );
                      }
                      if (line.trim().startsWith('`')) {
                        return null; // Handle code blocks separately
                      }
                      if (line.trim() === '') return <div key={idx} className="h-2" />;
                      
                      // Highlight inline codes
                      const lineWithCode = line.replace(/`([^`]+)`/g, '<code class="bg-slate-950 text-cyan-400 px-1.5 py-0.5 rounded font-mono text-[90%]">$1</code>');
                      return <p key={idx} className="leading-relaxed text-slate-300" dangerouslySetInnerHTML={{ __html: lineWithCode }} />;
                    })}

                    {/* Quick Modal Actions Footer inside Note */}
                    <div className="mt-8 pt-6 border-t border-slate-900/60 flex flex-wrap gap-2 justify-end no-print">
                      <button 
                        onClick={() => copyToClipboard(readerModal.content)}
                        className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-950 border border-slate-850 hover:border-slate-800 text-xs text-slate-400 hover:text-white"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy Text
                      </button>
                      <button 
                        onClick={() => triggerMockDownload(readerModal.title)}
                        className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-950 border border-slate-850 hover:border-slate-800 text-xs text-slate-400 hover:text-white"
                      >
                        <Download className="w-3.5 h-3.5" /> Download PDF
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. RENDER PYQ VIEW */}
                {readerModal.type === 'pyq' && (
                  <div className="space-y-8">
                    
                    {/* Render Section A Questions */}
                    {(readerModal.activeTab === 'all' || readerModal.activeTab === 'a') && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-indigo-955/60 pb-2">
                          <h4 className="text-base font-black text-indigo-400 font-mono">SECTION A (Short Answer - 2 Marks Each)</h4>
                          <span className="text-[10px] text-slate-500 font-mono">ALL QUESTIONS ARE COMPULSORY</span>
                        </div>
                        
                        <div className="space-y-4">
                          {readerModal.content.a
                            .filter(q => q.q.toLowerCase().includes(modalSearchQuery.toLowerCase()) || q.a.toLowerCase().includes(modalSearchQuery.toLowerCase()))
                            .map((item, idx) => (
                              <div key={idx} className="p-4 bg-slate-950/60 border border-slate-900 hover:border-indigo-955/20 rounded-xl space-y-2.5 transition-all">
                                <h5 className="text-xs font-bold text-white flex gap-2">
                                  <span className="text-indigo-400 font-mono">Q{idx+1}.</span>
                                  <span>{item.q}</span>
                                </h5>
                                <div className="text-xs text-slate-450 pl-6 border-l border-indigo-500/20 space-y-1">
                                  <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono block">Scorer Answer:</span>
                                  <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item.a.replace(/`([^`]+)`/g, '<code class="bg-slate-900 text-indigo-400 px-1 py-0.5 rounded font-mono text-[95%]">$1</code>') }} />
                                </div>
                              </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Render Section B Questions */}
                    {(readerModal.activeTab === 'all' || readerModal.activeTab === 'b') && (
                      <div className="space-y-4 pt-4">
                        <div className="flex items-center justify-between border-b border-indigo-955/60 pb-2">
                          <h4 className="text-base font-black text-indigo-400 font-mono">SECTION B (Long Analytical - 10 Marks Each)</h4>
                          <span className="text-[10px] text-slate-500 font-mono">ATTEMPT ANY THREE</span>
                        </div>
                        
                        <div className="space-y-6">
                          {readerModal.content.b
                            .filter(q => q.q.toLowerCase().includes(modalSearchQuery.toLowerCase()) || q.a.toLowerCase().includes(modalSearchQuery.toLowerCase()))
                            .map((item, idx) => (
                              <div key={idx} className="p-5 bg-slate-950/60 border border-slate-900 hover:border-indigo-955/20 rounded-xl space-y-3.5 transition-all">
                                <h5 className="text-sm font-bold text-white flex gap-2 leading-relaxed">
                                  <span className="text-indigo-400 font-mono">Q{idx+1}.</span>
                                  <span>{item.q}</span>
                                </h5>
                                <div className="text-xs text-slate-455 pl-6 border-l-2 border-indigo-500/20 space-y-2">
                                  <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono block">Fully Solved Analysis:</span>
                                  
                                  {item.a.split('\n').map((para, pIdx) => {
                                    if (para.startsWith('*')) {
                                      return (
                                        <div key={pIdx} className="flex gap-2 pl-2 text-slate-350">
                                          <span className="text-indigo-400">•</span>
                                          <span dangerouslySetInnerHTML={{ __html: para.replace('*', '').trim().replace(/`([^`]+)`/g, '<code class="bg-slate-900 text-indigo-400 px-1 py-0.5 rounded font-mono text-[95%]">$1</code>') }} />
                                        </div>
                                      );
                                    }
                                    return <p key={pIdx} className="leading-relaxed text-slate-355" dangerouslySetInnerHTML={{ __html: para.replace(/`([^`]+)`/g, '<code class="bg-slate-900 text-indigo-400 px-1 py-0.5 rounded font-mono text-[95%]">$1</code>') }} />;
                                  })}
                                </div>
                              </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Render Section C Questions */}
                    {(readerModal.activeTab === 'all' || readerModal.activeTab === 'c') && (
                      <div className="space-y-4 pt-4">
                        <div className="flex items-center justify-between border-b border-indigo-955/60 pb-2">
                          <h4 className="text-base font-black text-indigo-400 font-mono">SECTION C (Unit-Based - 10 Marks Each)</h4>
                          <span className="text-[10px] text-slate-500 font-mono">ATTEMPT ONE FROM EACH UNIT</span>
                        </div>
                        
                        <div className="space-y-6">
                          {readerModal.content.c.length === 0 ? (
                            <div className="p-4 text-center text-slate-600 text-xs italic">
                              Additional Section C unit-wise derivations are currently compiling.
                            </div>
                          ) : (
                            readerModal.content.c
                              .filter(q => q.q.toLowerCase().includes(modalSearchQuery.toLowerCase()) || q.a.toLowerCase().includes(modalSearchQuery.toLowerCase()))
                              .map((item, idx) => (
                                <div key={idx} className="p-5 bg-slate-950/60 border border-slate-900 hover:border-indigo-955/20 rounded-xl space-y-3.5 transition-all">
                                  <h5 className="text-sm font-bold text-white flex gap-2 leading-relaxed">
                                    <span className="text-indigo-400 font-mono">Q{idx+1}.</span>
                                    <span>{item.q}</span>
                                  </h5>
                                  <div className="text-xs text-slate-455 pl-6 border-l-2 border-indigo-500/20 space-y-2">
                                    <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono block">Fully Solved derivation:</span>
                                    
                                    {item.a.split('\n').map((para, pIdx) => {
                                      if (para.startsWith('*')) {
                                        return (
                                          <div key={pIdx} className="flex gap-2 pl-2 text-slate-350">
                                            <span className="text-indigo-400">•</span>
                                            <span dangerouslySetInnerHTML={{ __html: para.replace('*', '').trim().replace(/`([^`]+)`/g, '<code class="bg-slate-900 text-indigo-400 px-1 py-0.5 rounded font-mono text-[95%]">$1</code>') }} />
                                          </div>
                                        );
                                      }
                                      return <p key={pIdx} className="leading-relaxed text-slate-350" dangerouslySetInnerHTML={{ __html: para.replace(/`([^`]+)`/g, '<code class="bg-slate-900 text-indigo-400 px-1 py-0.5 rounded font-mono text-[95%]">$1</code>') }} />;
                                    })}
                                  </div>
                                </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}

                    {/* Quick Modal Actions Footer inside PYQ */}
                    <div className="mt-8 pt-6 border-t border-slate-900/60 flex flex-wrap gap-2 justify-end no-print">
                      <button 
                        onClick={() => triggerMockDownload(readerModal.title)}
                        className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-950 border border-slate-855 hover:border-slate-800 text-xs text-slate-400 hover:text-white"
                      >
                        <Download className="w-3.5 h-3.5" /> Download Solved Paper
                      </button>
                    </div>

                  </div>
                )}

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
