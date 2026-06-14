const fs = require('fs');
const path = require('path');

// Target directory paths
const publicQuantumDir = path.join(__dirname, 'public', 'Quantum');
const publicBooksDir = path.join(__dirname, 'public', 'Books');
const academicDataPath = './src/data/academicData.js';

console.log('🚀 Starting Quantum and Books Folder Creator...');

async function run() {
  let academicData;
  try {
    // Dynamically import the modular ES data file
    const dataModule = await import(academicDataPath);
    academicData = dataModule.ACADEMIC_DATA;
  } catch (e) {
    console.error(`❌ Error importing academicData: ${e.message}`);
    process.exit(1);
  }

  const branchMapping = {
    cse: 'CS & IT',
    it: 'CS & IT',
    civil: 'Civil Engineering',
    ee: 'ELectrical Engineering'
  };

  const getYearFolder = (sem) => {
    const semNum = parseInt(sem);
    if (semNum === 1 || semNum === 2) return '1st Year';
    if (semNum === 3 || semNum === 4) return '2nd Year';
    if (semNum === 5 || semNum === 6) return '3rd Year';
    if (semNum === 7 || semNum === 8) return '4th Year';
    return 'Unknown Year';
  };

  let totalFoldersCreated = 0;
  let totalSubjectsFound = 0;

  const branchesData = academicData.aktu?.branches || {};

  // Process branches and create directories recursively
  Object.keys(branchesData).forEach((branchKey) => {
    const branchData = branchesData[branchKey];
    const mappedBranchName = branchMapping[branchKey] || branchKey;
    const semesters = branchData.semesters || {};

    Object.keys(semesters).forEach((semKey) => {
      const subjects = semesters[semKey] || [];
      const yearFolderName = getYearFolder(semKey);
      const semesterFolderName = `Semester ${semKey}`;

      subjects.forEach((subject) => {
        totalSubjectsFound++;
        const subjectFolderName = `${subject.code} - ${subject.name}`.trim().replace(/[\\/:*?"<>|]/g, '_');
        
        // 1. Create Quantum directory
        const targetQuantumDir = path.join(publicQuantumDir, yearFolderName, mappedBranchName, semesterFolderName, subjectFolderName);
        if (!fs.existsSync(targetQuantumDir)) {
          fs.mkdirSync(targetQuantumDir, { recursive: true });
          totalFoldersCreated++;
        }

        const readmeQuantumPath = path.join(targetQuantumDir, 'README.txt');
        const readmeQuantumContent = `🎓 AKTU Study Materials: Quantum Series Folder
Subject: ${subject.name}
Subject Code: ${subject.code}
Branch: ${mappedBranchName}
Semester: ${semKey}
Academic Year: ${yearFolderName}

How to upload:
1. Place the "Quantum" PDF of this subject inside this folder.
2. Rename the file to: quantum.pdf (all lowercase).
3. The Student Utility Hub website will automatically detect it and allow students to download this real PDF!

Provided by: Nexora Toppers Team
`;
        fs.writeFileSync(readmeQuantumPath, readmeQuantumContent, 'utf8');

        // 2. Create Books directory
        const targetBooksDir = path.join(publicBooksDir, yearFolderName, mappedBranchName, semesterFolderName, subjectFolderName);
        if (!fs.existsSync(targetBooksDir)) {
          fs.mkdirSync(targetBooksDir, { recursive: true });
          totalFoldersCreated++;
        }

        const booksList = subject.books || [];
        booksList.forEach((book) => {
          const sanitizedBookName = book.replace(/[\\/:*?"<>|]/g, '_');
          const bookFolder = path.join(targetBooksDir);
          
          const readmeBookPath = path.join(bookFolder, `README_${sanitizedBookName}.txt`);
          const readmeBookContent = `📚 AKTU Textbook Upload Guide
Subject: ${subject.name} (${subject.code})
Recommended Textbook: ${book}

How to publish this book:
1. Obtain the PDF file for this textbook.
2. Copy it into this folder:
   public/Books/${yearStr = yearFolderName}/${mappedBranchName}/Semester ${semKey}/${subjectFolderName}/
3. Rename the PDF file to exactly:
   ${sanitizedBookName}.pdf
4. The Student Utility Hub website will detect the file and enable the Download button on the live site!

Provided by: Nexora Library Management
`;
          fs.writeFileSync(readmeBookPath, readmeBookContent, 'utf8');
        });
      });
    });
  });

  console.log(`\n✨ Quantum and Books Folder Creation completed successfully!`);
  console.log(`📊 Summary of operations:`);
  console.log(`   - Total subjects found in database: ${totalSubjectsFound}`);
  console.log(`   - Total directories/files verified/created: ${totalFoldersCreated}`);
  console.log(`   - Quantum location: ${publicQuantumDir}`);
  console.log(`   - Books location: ${publicBooksDir}`);
}

run();
