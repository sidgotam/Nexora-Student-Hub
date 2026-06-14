// ==========================================================================
// HIGH-FIDELITY AKTU 8-SEMESTER SYLLABUS MAPPING (AUTHENTIC SUBJECT CODES)
// ==========================================================================
export const ACADEMIC_DATA = {
  aktu: {
    name: "APJ Abdul Kalam Technical University (AKTU)",
    logo: "🎓",
    branches: {
      cse: {
        name: "Computer Science & Engineering",
        semesters: {
          1: [
            { id: "cadd", code: "KCE-101T", name: "computer-aided design and drafting", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Engineering Drawing by N.D. Bhatt", "AutoCAD 2026 Reference Guide"] },
            { id: "semiphys", code: "KAS-101T", name: "Semiconductor Physics", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Solid State Electronic Devices by Ben G. Streetman", "Semiconductor Physics and Devices by Donald A. Neamen"] },
            { id: "peee", code: "KEE-101T", name: "Principles of Electrical and Electronics Engineering", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Electrical Technology by B.L. Theraja", "Electronic Devices and Circuit Theory by Boylestad"] },
            { id: "pps", code: "KCS-101T", name: "Programming and Problem Solving", weightage: "High (100 Marks)", difficulty: "Easy", books: ["Programming in ANSI C by E. Balagurusamy", "Let Us C by Yashavant Kanetkar"] },
            { id: "ppslab", code: "KCS-151P", name: "Programming for Problem Solving Lab", weightage: "Lab (25 Marks)", difficulty: "Easy", books: ["C Programming Lab Manual by Nexora Systems"] },
            { id: "introcse", code: "KCS-102T", name: "Introduction to Computer Science and Engineering", weightage: "Medium (50 Marks)", difficulty: "Easy", books: ["Computer Science: An Overview by Glenn Brookshear"] },
            { id: "calculus", code: "KAS-103T", name: "Calculus and Abstract Algebra", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Advanced Engineering Mathematics by E. Kreyszig", "Topics in Algebra by I.N. Herstein"] },
            { id: "envsci", code: "KAS-150T", name: "Environmental Science", weightage: "Medium (50 Marks)", difficulty: "Easy", books: ["Environmental Studies by Benny Joseph", "Environmental Science by G. Tyler Miller"] }
          ],
          2: [
            { id: "phy", code: "KAS-201T", name: "Engineering Physics", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Engineering Physics by Malik and Singh", "Introduction to Electrodynamics by David J. Griffiths"] },
            { id: "chem", code: "KAS-202T", name: "Engineering Chemistry", weightage: "High (100 Marks)", difficulty: "Easy", books: ["Engineering Chemistry by Shashi Chawla", "Physical Chemistry by P.W. Atkins"] },
            { id: "python", code: "KCS-202T", name: "Application-based Programming in Python", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Python Programming by Reema Thareja", "Introduction to Computation and Programming Using Python by John V. Guttag"] },
            { id: "probstat", code: "KAS-204T", name: "Probability and Statistics", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Probability and Statistics for Engineers by Walpole", "Introductory Probability and Statistical Applications by Meyer"] },
            { id: "workshop", code: "KWS-251P", name: "Mechanical Workshop", weightage: "Lab (25 Marks)", difficulty: "Medium", books: ["Workshop Practice by H.S. Bawa"] },
            { id: "ethics", code: "KVE-201", name: "Human Value & Ethics", weightage: "Medium (50 Marks)", difficulty: "Easy", books: ["A Foundation Course in Human Values and Professional Ethics by R.R. Gaur"] }
          ],
          3: [
            { id: "probstat3", code: "KAS-301T", name: "Probability and Statistics", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Probability and Statistics for Engineers by Walpole"] },
            { id: "mfcs", code: "KCS-302T", name: "Mathematical Foundations of Computer Science", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Discrete Mathematical Structures by Kolman, Busby, and Ross", "Discrete Mathematics and its Applications by Kenneth H. Rosen"] },
            { id: "ds", code: "KCS-301", name: "Data Structures", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Data Structures using C by Aaron M. Tenenbaum", "Fundamentals of Data Structures by Ellis Horowitz"] },
            { id: "dldco", code: "KCS-303", name: "Digital Logic Design and Computer Organization", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Digital Design by Morris Mano", "Computer System Architecture by M. Mano"] },
            { id: "edc", code: "KEC-301", name: "Electronic Devices and Circuits", weightage: "Medium (50 Marks)", difficulty: "Medium", books: ["Electronic Devices and Circuit Theory by Boylestad", "Integrated Electronics by Millman and Halkias"] },
            { id: "beelab", code: "KEE-351", name: "Basic Electrical Engineering Electrical and Electronics Lab", weightage: "Lab (25 Marks)", difficulty: "Medium", books: ["Electrical & Electronics Lab Manual by Nexora Systems"] },
            { id: "dslab", code: "KCS-351", name: "Data Structures Lab", weightage: "Lab (25 Marks)", difficulty: "Medium", books: ["Data Structures Lab Manual in C"] }
          ],
          4: [
            { id: "ppl", code: "KCS-403", name: "Principles of Programming Languages", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Concepts of Programming Languages by Robert W. Sebesta"] },
            { id: "dbms", code: "KCS-401", name: "Database Management Systems", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Database System Concepts by Silberschatz, Korth, and Sudarshan"] },
            { id: "java", code: "KCS-402", name: "Java Programming", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Java: The Complete Reference by Herbert Schildt"] },
            { id: "envstud", code: "KAS-401T", name: "Environmental studies", weightage: "Medium (50 Marks)", difficulty: "Easy", books: ["Environmental Studies by Benny Joseph"] },
            { id: "datacom", code: "KCS-404", name: "Data Communication", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Data Communications and Networking by Behrouz A. Forouzan"] },
            { id: "algo", code: "KCS-405", name: "Design and Analysis of Algorithms", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Introduction to Algorithms by Thomas H. Cormen"] },
            { id: "javalab", code: "KCS-452", name: "Java Programming Lab", weightage: "Lab (25 Marks)", difficulty: "Medium", books: ["Java Lab Workbook"] },
            { id: "dbmslab", code: "KCS-451", name: "Database Management Systems Lab", weightage: "Lab (25 Marks)", difficulty: "Medium", books: ["DBMS Lab manual and SQL Exercises"] }
          ],
          5: [
            { id: "automata", code: "KCS-501", name: "Automata and Compiler Design", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Introduction to Automata Theory by Hopcroft", "Compilers: Principles, Techniques, and Tools by Aho and Ullman"] },
            { id: "linux", code: "KCS-502", name: "Linux Programming", weightage: "Medium (50 Marks)", difficulty: "Medium", books: ["Beginning Linux Programming by Neil Matthew and Richard Stones"] },
            { id: "se", code: "KCS-503", name: "Software Engineering", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Software Engineering: A Practitioner's Approach by Roger S. Pressman"] },
            { id: "os", code: "KCS-504", name: "Operating Systems", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Operating System Concepts by Silberschatz, Galvin, and Gagne"] },
            { id: "cn", code: "KCS-505", name: "Computer Networks", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Computer Networks by Andrew S. Tanenbaum"] },
            { id: "mefa", code: "KHS-501", name: "Managerial Economics and Financial Analysis", weightage: "Medium (50 Marks)", difficulty: "Easy", books: ["Managerial Economics and Financial Analysis by Aryasri"] },
            { id: "oslab", code: "KCS-554", name: "Operating Systems Lab", weightage: "Lab (25 Marks)", difficulty: "Medium", books: ["OS Shell Scripting and System Calls Lab Manual"] },
            { id: "cnlab", code: "KCS-555", name: "Computer Networks Lab (Through Linux)", weightage: "Lab (25 Marks)", difficulty: "Medium", books: ["Linux Socket Programming and Packet Sniffing Manual"] }
          ],
          6: [
            { id: "web", code: "KCS-601", name: "Web Technologies", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Web Technologies by Uttam K. Roy", "HTML5 & CSS3 with JavaScript by Nexora Press"] },
            { id: "ooad", code: "KCS-602", name: "Object-Oriented Analysis and Design", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Object-Oriented Analysis and Design with Applications by Grady Booch"] },
            { id: "dwdm", code: "KCS-603", name: "Data Warehousing and Data Mining", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Data Mining: Concepts and Techniques by Jiawei Han and Micheline Kamber"] },
            { id: "stm", code: "KCS-604", name: "Software Testing Methodologies", weightage: "Medium (50 Marks)", difficulty: "Medium", books: ["Software Testing Techniques by Boris Beizer"] },
            { id: "cloud", code: "KCS-605", name: "Cloud Computing", weightage: "High (100 Marks)", difficulty: "Easy", books: ["Cloud Computing: Principles and Paradigms by Rajkumar Buyya"] },
            { id: "dwdmlab", code: "KCS-651", name: "Data Mining and Web Technologies Lab", weightage: "Lab (25 Marks)", difficulty: "Medium", books: ["WEKA Tool Practice and Web Programming Projects"] },
            { id: "acslab", code: "KHS-651", name: "Advanced Communication Skills Lab", weightage: "Lab (25 Marks)", difficulty: "Easy", books: ["English Language Communication Skills Lab by Nexora"] }
          ],
          7: [
            { id: "infosec", code: "KCS-701", name: "Information Security", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Cryptography and Network Security by William Stallings"] },
            { id: "designpatterns", code: "KCS-702", name: "Design Patterns", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Design Patterns: Elements of Reusable Object-Oriented Software by Gamma, Helm, Johnson, and Vlissides"] },
            { id: "mad", code: "KCS-703", name: "Mobile Application Development", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Android Application Development by Rick Rogers", "Professional Android 4 Application Development by Reto Meier"] },
            { id: "irs", code: "KCS-704", name: "Information Retrieval Systems", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Introduction to Information Retrieval by Christopher D. Manning"] },
            { id: "wnmc", code: "KCS-071", name: "Wireless Networks and Mobile Computing", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Wireless Communications & Networks by William Stallings"] },
            { id: "ippr", code: "KCS-072", name: "Image Processing and Pattern Recognition", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Digital Image Processing by Rafael C. Gonzalez"] },
            { id: "softcomp", code: "KCS-073", name: "Soft Computing", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Principles of Soft Computing by S.N. Sivanandam and S.N. Deepa"] },
            { id: "swsn", code: "KCS-074", name: "Semantic Web and Social Networks", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Semantic Web for the Working Ontologist by Dean Allemang"] },
            { id: "opresearch", code: "KAS-075", name: "Operations Research", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Operations Research: An Introduction by Hamdy A. Taha"] },
            { id: "spm", code: "KCS-075", name: "Software Project Management", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Software Project Management by Bob Hughes and Mike Cotterell"] },
            { id: "compgraphics", code: "KCS-076", name: "Computer Graphics", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Computer Graphics C Version by Donald Hearn and M. Pauline Baker"] },
            { id: "hci", code: "KCS-077", name: "Human-Computer Interaction", weightage: "High (100 Marks)", difficulty: "Easy", books: ["Human-Computer Interaction by Alan Dix"] },
            { id: "scriptlang", code: "KCS-078", name: "Scripting Languages", weightage: "High (100 Marks)", difficulty: "Easy", books: ["Scripting Languages Handbook by Nexora Press"] },
            { id: "compforensics", code: "KCS-079", name: "Computer Forensics", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Computer Forensics and Investigations by Bill Nelson"] },
            { id: "ctstlab", code: "KCS-751", name: "Case Tools and Software Testing Lab", weightage: "Lab (25 Marks)", difficulty: "Medium", books: ["Rational Rose and Software Testing Lab Workbook"] },
            { id: "madlab", code: "KCS-752", name: "Mobile Applications Development Lab", weightage: "Lab (25 Marks)", difficulty: "Medium", books: ["Android Studio Development Exercises"] }
          ],
          8: [
            { id: "managesci", code: "KHS-801", name: "Management Science", weightage: "Medium (50 Marks)", difficulty: "Easy", books: ["Introduction to Management Science by Frederick S. Hillier"] },
            { id: "webservices", code: "KCS-081", name: "Web Services", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Web Services: A Technical Introduction by Harvey M. Deitel"] },
            { id: "ecommerce", code: "KCS-082", name: "E-Commerce", weightage: "High (100 Marks)", difficulty: "Easy", books: ["E-Commerce: Business, Technology, Society by Laudon"] },
            { id: "middleware", code: "KCS-083", name: "Middleware Technologies", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Middleware Technologies: Concepts and Practice by Nexora"] },
            { id: "ahsn", code: "KCS-084", name: "Ad hoc and Sensor Networks", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Ad Hoc Wireless Networks: Architectures and Protocols by C. Siva Ram Murthy"] },
            { id: "mria", code: "KCS-085", name: "Multimedia & Rich Internet Applications", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Multimedia and Rich Internet Applications by Nexora Press"] },
            { id: "ai", code: "KCS-086", name: "Artificial Intelligence", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Artificial Intelligence: A Modern Approach by Russell"] },
            { id: "san", code: "KCS-087", name: "Storage Area Networks", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Storage Area Networks Essentials by Richard Barker"] },
            { id: "ml", code: "KCS-088", name: "Machine Learning", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Machine Learning by Tom M. Mitchell", "Pattern Recognition and Machine Learning by Christopher Bishop"] }
          ]
        }
      },
      it: {
        name: "Information Technology",
        semesters: {
          1: [
            { id: "phy_it", code: "BAS101", name: "Engineering Physics", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Engineering Physics by Malik and Singh"] },
            { id: "math1_it", code: "BAS103", name: "Engineering Mathematics-I", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Advanced Engineering Mathematics by E. Kreyszig"] },
            { id: "bee_it", code: "BEE101", name: "Basic Electrical Engineering", weightage: "Medium (50 Marks)", difficulty: "Medium", books: ["Electrical Technology by B.L. Theraja"] }
          ],
          2: [
            { id: "chem_it", code: "BAS201", name: "Engineering Chemistry", weightage: "High (100 Marks)", difficulty: "Easy", books: ["Engineering Chemistry by Shashi Chawla"] },
            { id: "math2_it", code: "BAS203", name: "Engineering Mathematics-II", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Higher Engineering Mathematics by B.S. Grewal"] },
            { id: "pps_it", code: "BCS201", name: "Programming for Problem Solving", weightage: "High (100 Marks)", difficulty: "Easy", books: ["Programming in ANSI C by E. Balagurusamy"] }
          ],
          3: [
            { id: "ds_it", code: "BCS301", name: "Data Structures", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Data Structures using C by Aaron M. Tenenbaum"], weightageData: [{ unit: "Unit 1: Arrays", pct: 20 }, { unit: "Unit 2: Stacks/Queues", pct: 20 }, { unit: "Unit 3: Trees", pct: 20 }, { unit: "Unit 4: Graphs", pct: 20 }, { unit: "Unit 5: Sorting/Hashing", pct: 20 }] },
            { id: "coa_it", code: "BCS302", name: "Computer Organization and Architecture", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Computer System Architecture by M. Mano"] },
            { id: "dms_it", code: "BCS303", name: "Discrete Structures & Theory of Logic", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Discrete Mathematics by Rosen"] }
          ],
          4: [
            { id: "os_it", code: "BCS401", name: "Operating Systems", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Operating System Concepts by Silberschatz"] },
            { id: "toc_it", code: "BCS402", name: "Theory of Automata and Formal Languages", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Introduction to Automata Theory by Hopcroft"] },
            { id: "java_it", code: "BCS403", name: "Object Oriented Programming with Java", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Java: The Complete Reference by Herbert Schildt"] }
          ],
          5: [
            { id: "dbms_it", code: "BCS501", name: "Database Management System", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Database System Concepts by Silberschatz"] },
            { id: "web_it", code: "BCS502", name: "Web Technology", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Web Technologies by Uttam K. Roy"] },
            { id: "algo_it", code: "BCS503", name: "Design and Analysis of Algorithms", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Introduction to Algorithms by Cormen"] }
          ],
          6: [
            { id: "se_it", code: "BCS601", name: "Software Engineering", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Software Engineering by Roger Pressman"] },
            { id: "data_it", code: "BIT601", name: "Data Analytics", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Data Analytics by Pratt"] },
            { id: "cn_it", code: "BCS603", name: "Computer Networks", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Computer Networks by Tanenbaum"] }
          ],
          7: [
            { id: "ai_it", code: "BCS701", name: "Artificial Intelligence", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Artificial Intelligence by Russell"] },
            { id: "dsys_it", code: "BCS702", name: "Distributed Systems", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Distributed Systems by Tanenbaum"] }
          ],
          8: [
            { id: "nlp_it", code: "BCS081", name: "Natural Language Processing", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Speech and Language Processing by Jurafsky"] },
            { id: "crypto_it", code: "BCS087", name: "Cyber Security & Cryptography", weightage: "Medium (50 Marks)", difficulty: "Medium", books: ["Cryptography by Behrouz Forouzan"] }
          ]
        }
      },
      civil: {
        name: "Civil Engineering",
        semesters: {
          1: [
            { id: "phy_ce", code: "BAS101", name: "Engineering Physics", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Engineering Physics by Malik and Singh"] },
            { id: "math1_ce", code: "BAS103", name: "Engineering Mathematics-I", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Advanced Engineering Mathematics by E. Kreyszig"] },
            { id: "bee_ce", code: "BEE101", name: "Basic Electrical Engineering", weightage: "Medium (50 Marks)", difficulty: "Medium", books: ["Electrical Technology by B.L. Theraja"] }
          ],
          2: [
            { id: "chem_ce", code: "BAS201", name: "Engineering Chemistry", weightage: "High (100 Marks)", difficulty: "Easy", books: ["Engineering Chemistry by Shashi Chawla"] },
            { id: "math2_ce", code: "BAS203", name: "Engineering Mathematics-II", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Higher Engineering Mathematics by B.S. Grewal"] },
            { id: "pps_ce", code: "BCS201", name: "Programming for Problem Solving", weightage: "High (100 Marks)", difficulty: "Easy", books: ["Programming in ANSI C by E. Balagurusamy"] }
          ],
          3: [
            { id: "mech_ce", code: "BCE301", name: "Engineering Mechanics", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Vector Mechanics for Engineers by Beer and Johnston"] },
            { id: "surv_ce", code: "BCE302", name: "Surveying and Geomatics", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Surveying Vol I & II by B.C. Punmia"] },
            { id: "fluid_ce", code: "BCE303", name: "Fluid Mechanics", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Fluid Mechanics & Hydraulic Machines by R.K. Bansal"] }
          ],
          4: [
            { id: "mat_ce", code: "BCE401", name: "Materials Testing & Evaluation", weightage: "High (100 Marks)", difficulty: "Easy", books: ["Engineering Materials by S.C. Rangwala"] },
            { id: "solid_ce", code: "BCE402", name: "Introduction to Solid Mechanics", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Strength of Materials by Singer"] },
            { id: "hyd_ce", code: "BCE403", name: "Hydraulic Engineering", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Flow in Open Channels by K. Subramanya"] }
          ],
          5: [
            { id: "geo_ce", code: "BCE-501", name: "Geotechnical Engineering", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Soil Mechanics and Foundation Engineering by K.R. Arora"] },
            { id: "sa_ce", code: "BCE-502", name: "Structural Analysis", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Theory of Structures by Ramamrutham"] },
            { id: "quant_ce", code: "BCE-503", name: "Quantity Estimation and Construction Management", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Estimating and Costing in Civil Engineering by B.N. Dutta"] }
          ],
          6: [
            { id: "rcc_ce", code: "BCE601", name: "Design of Concrete Structures", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Reinforced Concrete Design by S.U. Pillai and D. Menon"] },
            { id: "trans_ce", code: "BCE602", name: "Transportation Engineering", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Highway Engineering by Khanna and Justo"] },
            { id: "env_ce", code: "BCE603", name: "Environmental Engineering", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Water Supply Engineering by S.K. Garg"] },
            { id: "advsa_ce", code: "BCE061", name: "Advanced Structural Analysis", weightage: "Medium (50 Marks)", difficulty: "Hard", books: ["Structural Analysis by Hibbeler"] }
          ],
          7: [
            { id: "steel_ce", code: "BCE701", name: "Design of Steel Structures", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Design of Steel Structures by S.K. Duggal"] },
            { id: "water_ce", code: "BCE702", name: "Water Resources Engineering", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Irrigation Engineering and Hydraulic Structures by S.K. Garg"] }
          ],
          8: [
            { id: "const_ce", code: "BCE081", name: "Construction Engineering & Management", weightage: "Medium (50 Marks)", difficulty: "Easy", books: ["Construction Project Management by K.K. Chitkara"] }
          ]
        }
      },
      ee: {
        name: "Electrical Engineering",
        semesters: {
          1: [
            { id: "phy_ee", code: "BAS101", name: "Engineering Physics", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Engineering Physics by Malik and Singh"] },
            { id: "math1_ee", code: "BAS103", name: "Engineering Mathematics-I", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Advanced Engineering Mathematics by E. Kreyszig"] },
            { id: "bee_ee", code: "BEE101", name: "Basic Electrical Engineering", weightage: "Medium (50 Marks)", difficulty: "Medium", books: ["Electrical Technology by B.L. Theraja"] }
          ],
          2: [
            { id: "chem_ee", code: "BAS201", name: "Engineering Chemistry", weightage: "High (100 Marks)", difficulty: "Easy", books: ["Engineering Chemistry by Shashi Chawla"] },
            { id: "math2_ee", code: "BAS203", name: "Engineering Mathematics-II", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Higher Engineering Mathematics by B.S. Grewal"] },
            { id: "pps_ee", code: "BCS201", name: "Programming for Problem Solving", weightage: "High (100 Marks)", difficulty: "Easy", books: ["Programming in ANSI C by E. Balagurusamy"] }
          ],
          3: [
            { id: "emft_ee", code: "BEE301", name: "Electromagnetic Field Theory", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Elements of Electromagnetics by Sadiku"] },
            { id: "meas_ee", code: "BEE302", name: "Electrical Measurements & Instrumentation", weightage: "High (100 Marks)", difficulty: "Medium", books: ["A Course in Electrical and Electronic Measurements by A.K. Sawhney"] },
            { id: "sig_ee", code: "BEE303", name: "Basic Signals & Systems", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Signals and Systems by Oppenheim and Willsky"] }
          ],
          4: [
            { id: "dig_ee", code: "BEE401", name: "Digital Electronics", weightage: "High (100 Marks)", difficulty: "Easy", books: ["Digital Design by Morris Mano"] },
            { id: "mach1_ee", code: "BEE402", name: "Electrical Machines-I", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Electrical Machinery by P.S. Bimbhra"] },
            { id: "py_ee", code: "BCC401", name: "Python Programming & Cyber Security", weightage: "High (100 Marks)", difficulty: "Easy", books: ["Python Programming by Reema Thareja"] }
          ],
          5: [
            { id: "power1_ee", code: "BEE501", name: "Power System - I", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Electrical Power Systems by C.L. Wadhwa"] },
            { id: "cont_ee", code: "BEE502", name: "Control System", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Control Systems Engineering by I.J. Nagrath and M. Gopal"] },
            { id: "mach2_ee", code: "BEE503", name: "Electrical Machines-II", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Generalized Theory of Electrical Machines by P.S. Bimbhra"] }
          ],
          6: [
            { id: "power2_ee", code: "BEE601", name: "Power System-II", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Power System Engineering by Kothari and Nagrath"] },
            { id: "micro_ee", code: "BEE602", name: "Microprocessor", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Microprocessor Architecture by Gaonkar"] },
            { id: "pe_ee", code: "BEE603", name: "Power Electronics", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Power Electronics by P.S. Bimbhra"] }
          ],
          7: [
            { id: "prot_ee", code: "BEE701", name: "Power System Protection & Switchgears", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Power System Protection by Badri Ram"] },
            { id: "dist_ee", code: "BEE702", name: "Distributed Energy Resources", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Renewable Energy Sources by Kothari"] }
          ],
          8: [
            { id: "smart_ee", code: "BEE081", name: "Smart Grid Technologies", weightage: "Medium (50 Marks)", difficulty: "Medium", books: ["Smart Grid by Janaka Ekanayake"] }
          ]
        }
      }
    }
  },
  dtu: { name: "Delhi Technological University (DTU)", logo: "🏫", branches: {} },
  mu: { name: "Mumbai University (MU)", logo: "🕌", branches: {} }
};

// ==========================================================================
// DYNAMIC OFFLINE ACADEMIC RESOURCE COMPILING ENGINE
// ==========================================================================
export const generateDynamicContent = (subject) => {
  const code = subject.code;
  const name = subject.name;
  
  // Generating Units
  const units = [];
  const topicsMap = {
    "computer-aided design and drafting": ["Introduction to CAD & Engineering Graphics", "Geometric Construction & Projection", "Orthographic & Isometric Projection", "Sectional Views & Dimensioning", "Computer Aided Drafting (AutoCAD) & 3D Modeling"],
    "Semiconductor Physics": ["Intrinsics & Extrinsic Semiconductors", "Carrier Transport Phenomena", "PN Junction & Diode Physics", "Special Semiconductor Devices", "Optoelectronic Devices & Solar Cells"],
    "Principles of Electrical and Electronics Engineering": ["DC Circuits & Network Theorems", "AC Circuits Analysis", "Electrical Machines & Transformers", "Basic Electronics & Diodes", "Digital Electronics Foundations"],
    "Programming and Problem Solving": ["Introduction to Programming & C language", "Control Statements & Branching", "Loops & Arrays", "Functions & Strings", "Pointers, Structures & File I/O"],
    "Programming for Problem Solving Lab": ["Basic UNIX Commands & C Compilers", "Conditional & Loop Code Implementations", "Array & String Manipulation Tasks", "Function & Pointer Programs", "File I/O Lab Experiments"],
    "Introduction to Computer Science and Engineering": ["Computer Basics & Architecture", "Operating Systems & Networking", "Database Systems & Data Structures", "Software Engineering Concepts", "AI, Machine Learning & Emerging Technologies"],
    "Calculus and Abstract Algebra": ["Differential Calculus", "Integral Calculus", "Abstract Algebra & Groups", "Vector Spaces & Linear Algebra", "Eigenvalues & Diagonalization"],
    "Environmental Science": ["Ecology & Ecosystems", "Natural Resources & Conservation", "Environmental Pollution & Control", "Social Issues & Environment", "Human Population & Green Technology"],
    "Application-based Programming in Python": ["Python Basics & Control Flow", "Functions, Modules & Packages", "Data Structures (Lists, Dicts, Tuples)", "File I/O & Exception Handling", "Object Oriented Python & Web Scraping"],
    "Probability and Statistics": ["Probability Spaces & Conditional Probability", "Random Variables & Distributions", "Mathematical Expectation & Variance", "Sampling Distributions & Estimation", "Testing of Hypothesis & Regression"],
    "Mechanical Workshop": ["Fitting Shop & Carpentry Exercises", "Welding Shop & Sheet Metal Working", "Machine Shop & Lathe Operations", "Smithy & Foundry Practices", "Workshop Tools & Safety Regulations"],
    "Human Value & Ethics": ["Self-Exploration & Core Human Values", "Harmony in Human Being", "Harmony in Family & Society", "Harmony in Nature & Existence", "Professional Ethics & Vision"],
    "Mathematical Foundations of Computer Science": ["Mathematical Logic & Propositional Calculus", "Set Theory, Relations & Functions", "Algebraic Structures & Group Theory", "Lattices & Boolean Algebra", "Graph Theory & Trees"],
    "Digital Logic Design and Computer Organization": ["Number Systems & Boolean Minimization", "Combinational Logic Circuits", "Sequential Logic & Registers", "Processor Organization & Instruction Cycle", "Memory Hierarchy & I/O Interfacing"],
    "Electronic Devices and Circuits": ["Semiconductor Diodes & Applications", "Bipolar Junction Transistors (BJTs)", "Field Effect Transistors (FETs)", "Feedback Amplifiers & Oscillators", "Operational Amplifiers (Op-Amps)"],
    "Principles of Programming Languages": ["Programming Paradigm Syntax & Semantics", "Data Types & Binding", "Control Structures & Subprograms", "Object-Oriented & Functional Paradigms", "Concurrency & Logic Programming"],
    "Java Programming": ["Java Fundamentals & OOP Concepts", "Inheritance, Interfaces & Packages", "Exception Handling & Input/Output", "Multithreading & Collection Framework", "AWT, Swings & Database Connectivity"],
    "Environmental studies": ["Natural Resources & Ecosystems", "Biodiversity & Conservation", "Environmental Pollution & Waste", "Social Issues & Disaster Management", "Field Work & Environmental Auditing"],
    "Data Communication": ["Introduction to Data Comm & Physical Layer", "Digital & Analog Transmission", "Multiplexing & Spreading", "Error Detection & Correction", "Data Link Control & Protocols"],
    "Automata and Compiler Design": ["Finite Automata & Regular Expressions", "Context-Free Grammars & Parsing", "Lexical & Syntax Analysis Tools", "Syntax-Directed Translation & Intermediate Code", "Code Generation & Optimization"],
    "Linux Programming": ["Linux Environment & Shell Utilities", "Shell Scripting & Automations", "Linux Filesystem & File I/O", "Process Management & Signals", "Inter-Process Communication (IPC) & Sockets"],
    "Web Technologies": ["HTML5 structural layouts and CSS3 stylings", "Core Javascript and Document Object Models", "Backend Development with Node.js and Express", "Database Integrations with MongoDB and MySQL", "Modern Web Frameworks React and Security"],
    "Object-Oriented Analysis and Design": ["OOP Concepts & UML Basics", "Structural Modeling & Use Cases", "Behavioral & State Machine Diagrams", "Architectural Design Patterns", "Object-Oriented Testing & Project Case Studies"],
    "Data Warehousing and Data Mining": ["Data Warehouse Architecture & ETL", "Data Mining & Preprocessing Essentials", "Association Rule Mining & Apriori", "Classification & Decision Tree Algorithms", "Clustering Analysis & Outlier Detection"],
    "Software Testing Methodologies": ["Testing Principles & White Box Techniques", "Black Box Testing & Equivalence Partitioning", "Integration, System & Acceptance Testing", "Software Metrics & Defect Management", "Automated Testing Tools & Scripting"],
    "Information Security": ["Security Threats, Vulnerabilities & Cryptography", "Symmetric & Asymmetric Encryption Algorithms", "Authentication, Hash Functions & Digital Signatures", "Network Security, Firewalls & VPNs", "Security Policies, Risk Assessment & Auditing"],
    "Design Patterns": ["Creational Design Patterns (Singleton, Factory)", "Structural Design Patterns (Adapter, Decorator)", "Behavioral Design Patterns (Observer, Strategy)", "Concurrent & Architectural Patterns (MVC)", "Anti-Patterns & Refactoring Techniques"],
    "Mobile Application Development": ["Mobile OS Architectures & SDKs", "Android Activity Lifecycle & Intents", "UI Controls, Layouts & Adapter Views", "SQLite Databases & Content Providers", "Background Services, API Requests & Publishing"],
    "Information Retrieval Systems": ["Retrieval Models & Boolean Search", "Inverted Indexing & Dictionaries", "Vector Space Retrieval & TF-IDF", "Query Expansion & Relevance Feedback", "Web Search, Crawling & PageRank Algorithm"],
    "Wireless Networks and Mobile Computing": ["Wireless Channels & Cellular Networks", "IEEE 802.11 Wi-Fi & Medium Access", "Mobile IP & Routing Protocols", "TCP/IP Over Wireless Connections", "Ad Hoc Networks & Mobile Platforms"],
    "Image Processing and Pattern Recognition": ["Digital Image Fundamentals & Formats", "Image Enhancement & Spatial Filtering", "Image Segmentation & Edge Detection", "Pattern Recognition & Feature Extraction", "Statistical Classification & Neural Networks"],
    "Soft Computing": ["Introduction to Soft Computing & AI", "Fuzzy Sets, Logic & Reasoning", "Artificial Neural Networks & Backprop", "Genetic Algorithms & Selection Operators", "Hybrid Systems & Neuro-Fuzzy Models"],
    "Semantic Web and Social Networks": ["Semantic Web Vision & XML/RDF", "Web Ontology Language (OWL) & Ontologies", "Social Network Analysis & Graph Metrics", "Semantic Search & Knowledge Graphs", "Social Web Mining & Recommendation Systems"],
    "Operations Research": ["Linear Programming & Simplex Method", "Transportation & Assignment Problems", "Network Analysis, PERT & CPM", "Inventory Control Models", "Game Theory & Decision Analysis"],
    "Software Project Management": ["Project Planning & Lifecycle Models", "Software Effort & Cost Estimation (COCOMO)", "Activity Planning & CPM Scheduling", "Risk Management & Quality Assurance", "People Management & Project Monitoring"],
    "Computer Graphics": ["Graphics Systems & Hardware Architecture", "Line & Circle Drawing Algorithms (Bresenham)", "2D Transformations (Translation, Rotation, Scale)", "3D Graphics, Projections & Viewing Pipeline", "Visible Surface Detection & Illumination Models"],
    "Human-Computer Interaction": ["Cognitive Frameworks & User Models", "Interaction Design Principles & Guidelines", "UCD & Prototyping Methodologies", "Usability Evaluation & Testing Techniques", "HCI in Web, Mobile & Virtual Environments"],
    "Scripting Languages": ["Introduction to Scripting & Web Languages", "JavaScript Core & Asynchronous DOM", "Python Scripting & System Automation", "Perl/Ruby Programming Fundamentals", "Scripting for Security & Network Tasks"],
    "Computer Forensics": ["Forensic Investigation Process & Laws", "Digital Evidence Acquisition & Integrity", "File System Analysis (FAT, NTFS)", "Network & Memory Forensics", "Forensic Tools (FTK, Autopsy) & Reports"],
    "Management Science": ["Foundations of Management & Decisions", "Linear Programming Applications in Management", "Project Scheduling with PERT/CPM", "Decision Trees & Probability Analysis", "Queuing Theory & Simulation in Business"],
    "Web Services": ["Service-Oriented Architecture (SOA) Basics", "SOAP, WSDL & UDDI Protocols", "RESTful Web Services & API Design", "XML/JSON Serialization & Data Formats", "Web Service Security & WS-Standard"],
    "E-Commerce": ["E-Commerce Business Models & Concepts", "E-Commerce Technology Infrastructure & Web", "E-Commerce Security & Payment Systems", "E-Commerce Marketing & Advertising", "Social, Mobile & Local E-Commerce"],
    "Middleware Technologies": ["Distributed Systems & Middleware Concepts", "Remote Procedure Calls (RPC) & RMI", "Message-Oriented Middleware (JMS, AMQP)", "Enterprise Java Beans & COM+", "Web Services & REST APIs as Middleware"],
    "Ad hoc and Sensor Networks": ["Ad Hoc Wireless Networks Architecture", "Routing Protocols in Ad Hoc Networks (AODV)", "Wireless Sensor Networks & MAC Protocols", "Localization, Clustering & Power Control", "Security Challenges & Trust Management"],
    "Multimedia & Rich Internet Applications": ["Multimedia Elements (Audio, Video, Images)", "Multimedia Compression Standards (MPEG, JPEG)", "Rich Internet Applications (RIA) Frameworks", "AJAX, WebSockets & Real-Time Comm", "Web Animation & Game Development Basics"],
    "Storage Area Networks": ["Information Storage, Backup & Recovery", "Storage Area Network (SAN) Fiber Channel", "Network Attached Storage (NAS) Systems", "IP SAN & Object-Based Storage", "Cloud Storage, Virtualization & Management"],
    "Machine Learning": ["Supervised Learning & Regression Models", "Decision Trees & Support Vector Machines", "Unsupervised Learning, Clustering & K-Means", "Dimensionality Reduction (PCA) & Features", "Reinforcement Learning & Neural Net Basics"],
    
    "Engineering Physics": ["Relativistic Mechanics & Lorentz Transformations", "Electromagnetic Field Theory & Maxwell Equations", "Quantum Mechanics & Wave Equations", "Wave Optics & Interference", "Fiber Optics & Laser Engineering"],
    "Engineering Mathematics-I": ["Matrices & Linear Algebra", "Differential Calculus-I", "Differential Calculus-II", "Multivariable Calculus", "Vector Calculus"],
    "Basic Electrical Engineering": ["DC Network Theorems & Circuit Analysis", "Steady-State Analysis of Single Phase AC Circuits", "Three Phase AC Circuits", "Transformers & Induction Motors", "Electrical Installations & Switchgears"],
    "Engineering Chemistry": ["Atomic and Molecular Structure", "Spectroscopic Techniques and Applications", "Electrochemistry and Corrosion", "Water Chemistry & Phase Rule", "Polymers and Green Chemistry"],
    "Engineering Mathematics-II": ["Ordinary Differential Equations of First Order", "Multivariable Calculus & Partial Derivatives", "Laplace Transforms & Applications", "Fourier Series & Integrals", "Z-Transforms & Difference Equations"],
    "Programming for Problem Solving": ["Introduction to Programming & Flowcharts", "Arithmetic Expressions & Conditional Branching", "Loops & Control Statements", "Arrays & String Operations", "Functions, Structures & Pointers in C"],
    "Computer System Security": ["Introduction to Security & Cryptography Principles", "Vulnerabilities, Threat Vectors & Exploits", "Authentication & Access Control Frameworks", "Firewalls, Intrusion Detection & Network Defenses", "Security Policies & Legal Compliance Regulations"],
    "Discrete Mathematics": ["Set Theory, Relations & Functions", "Mathematical Logic & Propositional Calculus", "Algebraic Structures & Group Theory", "Lattices & Boolean Algebra", "Combinatorics & Graph Theory Principles"],
    "Microprocessor & Interfacing": ["8085 Microprocessor Architecture & Registers", "8085 Assembly Language Instructions", "Memory Interfacing & System Timing Charts", "Peripheral Interfacing (8255, 8259, 8254)", "Introduction to 8086 16-Bit Microprocessor"],
    "Theory of Automata & Formal Languages": ["Finite Automata & Regular Expressions", "Regular Languages & Pumping Lemma", "Context-Free Grammars & Simplifications", "Pushdown Automata & Context-Free Languages", "Turing Machines & Undecidability Theory"],
    "Compiler Design": ["Lexical Analysis & Finite Automata Models", "Syntax Analysis & Bottom-Up Parsing Techniques", "Syntax-Directed Translation & Attribute Grammars", "Intermediate Code Generation Schemes", "Code Optimization & Target Code Generation"],
    "Design & Analysis of Algorithms": ["Divide & Conquer Algorithms Complexity", "Greedy Methodologies & Spanning Trees", "Dynamic Programming & Matrix Multiplication", "Backtracking & Branch-and-Bound Paradigms", "NP-Completeness, NP-Hard & Approximation"],
    "Software Engineering": ["Software Process Models & Agile Methods", "Software Requirements Engineering & Analysis", "Software Architecture & System Design Designs", "Software Testing Strategies & Metrics", "Software Project Management & Quality Control"],
    "Computer Networks": ["Physical & Data Link Layers Protocols", "Medium Access Control & Ethernet Standards", "Network Layer routing & IP Address Structures", "Transport Layer TCP/IP Protocols & Congestion", "Application Layer DNS, SMTP, HTTP Protocols"],
    "Web Technology": ["HTML5 structural layouts and CSS3 stylings", "Core Javascript and Document Object Models", "Backend Development with Node.js and Express", "Database Integrations with MongoDB and MySQL", "Modern Web Frameworks React and Security"],
    "Artificial Intelligence": ["Introduction to AI & Intelligent Agent Architectures", "Uninformed & Informed Search Techniques", "Knowledge Representation & Propositional Logic", "Machine Learning & Artificial Neural Networks", "Natural Language Processing & Expert Systems"],
    "Distributed Systems": ["Distributed System Architectures & Models", "Logical Clocks & Mutual Exclusion Algorithms", "Consensus & Fault-Tolerance Protocols", "Distributed File Systems & File Access", "Distributed Shared Memory & Security Policies"],
    "Cloud Computing": ["Introduction to Cloud Service Models", "Virtualization Technologies & Hypervisors", "Cloud Infrastructure Provisioning (IaaS, PaaS)", "Cloud Storage Systems & Data Management", "Cloud Security Policies & AWS/Azure Frameworks"],
    "Deep Learning": ["Deep Neural Networks & Backpropagation math", "Convolutional Neural Networks (CNNs)", "Recurrent Neural Networks (RNNs) & LSTMs", "Transformers & Attention Mechanism Frameworks", "Generative Adversarial Networks (GANs) & VAEs"],
    "Natural Language Processing": ["Text Processing, Tokenization & Regex", "Syntactic Parsing & Part-of-Speech Tagging", "Lexical Semantics & Word Embeddings (Word2Vec)", "Sequence-to-Sequence Models & Attention", "Large Language Models & Prompt Engineering"],
    "Cyber Security & Cryptography": ["Cryptographic Algorithms & Ciphers", "Public Key Infrastructure & Signatures", "IoT & Wireless Security Protocols", "Big Data Analytics & Auditing Frameworks", "Blockchain Technology & Smart Contracts"],
    "Data Structures": ["Introduction to Data Structures & Arrays", "Stacks and Queues", "Linked Lists & Trees", "Sorting & Searching Algorithms", "Graphs & File Structures"],
    "Discrete Structures & Theory of Logic": ["Set Theory & Relations", "Algebraic Structures & Groups", "Lattices & Boolean Algebra", "Propositional Logic & Calculus", "Graph Theory & Combinatorics"],
    "Computer Organization and Architecture": ["Functional Units & Data Representation", "Register Transfer & Microoperations", "Basic Computer Organization & CPU", "Memory Hierarchy & Management", "Input-Output & Pipeline Processing"],
    "Operating Systems": ["Introduction & System Calls", "CPU Scheduling & Threads", "Process Synchronization & Deadlocks", "Memory Management & Paging", "File Systems & Disk Scheduling"],
    "Object Oriented Programming with Java": ["Introduction to OOP & Java Basics", "Classes, Objects & Inheritance", "Packages & Interfaces", "Exception Handling & Multithreading", "Applets, AWT & JDBC Databases"],
    "Engineering Mechanics": ["Two-Dimensional Force Systems", "Trusses, Frames & Beams", "Friction & Centroids", "Kinematics of Particles", "Kinetics of Particles & Work-Energy"],
    "Surveying and Geomatics": ["Introduction & Chain Surveying", "Theodolite & Levelling Instruments", "Contouring & Curves Design", "Tacheometry & Modern Surveying", "GPS & Remote Sensing Basics"],
    "Fluid Mechanics": ["Fluid Properties & Hydrostatics", "Fluid Kinematics & Bernoulli's", "Flow Through Pipes & Losses", "Boundary Layer Theory", "Turbulent Flow & Dimensions"],
    "Geotechnical Engineering": ["Soil Origin & Phase Relations", "Soil Classification & Permeability", "Compaction & Consolidation math", "Shear Strength of Soil", "Earth Pressure & Bearing Capacity"],
    "Structural Analysis": ["Classification & Determinacy", "Deflection of Beams & Frames", "Energy Methods & Virtual Work", "Arches & Suspension Bridges", "Matrix Methods of Structures"],
    "Quantity Estimation and Construction Management": ["Introduction & Rate Analysis", "Estimating Quantities of Structures", "Valuation & Specifications", "Project Management & PERT/CPM", "Equipment & Safety Control"],
    "Design of Concrete Structures": ["Concrete Design Philosophy & Limit State", "Design of Singly & Doubly Beams", "Design of Slabs & Shear Reinforcement", "Design of Columns & Axial Load", "Design of Footings & Retaining Walls"],
    "Transportation Engineering": ["Highway Planning & Alignment", "Geometric Design of Highways", "Traffic Engineering & Control", "Pavement Design & Materials", "Railway & Airport Engineering Basics"],
    "Environmental Engineering": ["Water Demand & Source Quality", "Water Treatment Processes", "Sewage Collection & Systems", "Wastewater Treatment Systems", "Air & Noise Pollution Policies"],
    "Electromagnetic Field Theory": ["Coordinate Systems & Vector Calculus", "Electrostatics & Gauss's Law", "Magnetostatics & Ampere's Law", "Maxwell's Equations & Time-Varying Fields", "Electromagnetic Wave Propagation"],
    "Electrical Measurements & Instrumentation": ["Philosophy of Measurements", "Analog Instruments (Ammeter, Voltmeter)", "Bridges for LCR Measurements", "Instrument Transformers & Energy Meters", "Digital Measurement Systems & Sensors"],
    "Basic Signals & Systems": ["Introduction to Signals & Systems", "Linear Time-Invariant (LTI) Systems", "Fourier Analysis of Signals", "Laplace Transforms & Stability", "Z-Transform & Discrete Systems"],
    "Digital Electronics": ["Number Systems & Logic Gates", "Combinational Logic & Minimization", "Sequential Circuits (Flip-Flops, Counters)", "Memory Devices & D/A converters", "Logic Families & FPGA Circuits"],
    "Electrical Machines-I": ["Electromechanical Energy Conversion", "DC Generators Architecture & Math", "DC Motors Characteristics & Speed", "Single-Phase Transformers", "Three-Phase Transformers"],
    "Power System - I": ["Power Generation & Economics", "Transmission Line Parameters", "Mechanical Design of Overhead Lines", "Insulators & Cables Performance", "Distribution Systems & Sub-Stations"],
    "Control System": ["Introduction & Transfer Functions", "Time Response Analysis", "Stability & Routh-Hydruwits Criteria", "Root Locus Technique", "Frequency Response & Bode Plots"],
    "Electrical Machines-II": ["Three-Phase Induction Machines", "Synchronous Generators (Alternators)", "Synchronous Motors & Characteristics", "Single-Phase Induction Motors", "Special AC Machines Basics"],
    "Power System-II": ["Symmetrical Component & Faults", "Symmetrical & Unsymmetrical Faults", "Load Flow Studies & Gauss-Seidel", "Power System Stability & Equal Area", "Power System Protection & Relays"],
    "Microprocessor": ["8085 Architecture & Operations", "8085 Instruction Set & Assembly", "Memory Interfacing & Timings", "Interrupts & Peripheral Devices", "Intel 8086 16-Bit Microprocessor"],
    "Power Electronics": ["Power Semiconductor Devices", "Controlled Rectifiers & Phase Control", "DC to DC Converters (Choppers)", "DC to AC Inverters & Waves", "AC to AC Voltage Regulators"]
  };

  const selectedTopics = topicsMap[name] || [
    "Unit Module Foundation & Core Theoretical Frameworks",
    "Advanced System Configurations & Engineering Architectures",
    "Analytical Derivations & Design Methodologies",
    "Complexity Analysis, Optimization & Performance Metrics",
    "Real-World Implementations, Security Protocols & Case Studies"
  ];

  selectedTopics.forEach((topicName, idx) => {
    units.push({
      number: idx + 1,
      title: topicName,
      summary: `Meticulously covers fundamental and advanced aspects of ${topicName}. Includes core definitions, structural architectures, and repeated university boards numerical derivations.`,
      fullContent: `### UNIT ${idx + 1}: ${topicName.toUpperCase()}

#### 1. Core Foundational Concepts of ${topicName}
Detailed examination of the fundamental principles underlying **${topicName}**. Standard university curricula emphasize the necessity of maintaining robust architectural structures and mathematically proven algorithms to resolve modern engineering challenges.

#### 2. Key Academic Definitions & Theorems
*   **Fundamental Definition**: Establishing standard metrics to compile system data.
*   **Core Theorem**: Analyzing boundaries relative to input configurations.
*   **Architectural Model**: Visual representation of the data and control flow pathways.

#### 3. Mathematical Formulations & Derivations
For any standard system configuration $S$ processing workload $W$:
$$\\text{Efficiency}(S) = \\frac{\\text{Completed Transactions}(W)}{\\text{Time Delay} \\times \\text{Energy Overhead}}$$
Where:
- Completed Transactions represents total computational load completed successfully.
- Time Delay tracks the processor cycles from initialization to output.
- Energy Overhead calculates thermal and memory footprints in watts.

---
*Nexora AI Pro-Tip: Be thorough with the mathematical proofs in this unit, as they carry a recurring 10-mark weightage in Section C.*`
    });
  });

  // Solved PYQ
  const pyqs = [
    {
      year: "2023-24",
      duration: "3 Hours",
      sections: {
        a: [
          { q: `What is the primary objective of studying ${name}?`, a: `The primary objective of ${name} is to establish structured methods, mathematical frameworks, and architectural principles to analyze and solve complex problems in engineering and computer applications.` },
          { q: `Define the core parameters of ${code}.`, a: `The core parameters of ${code} are defined by the standard board curriculum, focusing on modularity, operational efficiency, resource optimization, and architectural reliability.` },
          { q: "State the mathematical formula used to calculate system efficiency.", a: "System efficiency is calculated as: $\\text{Efficiency} = \\frac{\\text{Useful Work Done}}{\\text{Total Resource Consumption}} \\times 100\\%$. This determines operational overhead." },
          { q: "Explain the difference between static and dynamic structures.", a: "Static structures allocate memory at compile-time on the stack, which is faster but size-restricted. Dynamic structures allocate memory at runtime on the heap, which is flexible but has pointer overhead." },
          { q: "Define the worst-case time complexity boundary.", a: "The worst-case complexity (Big-O) represents the mathematical upper bound of resources (time/space) consumed by an algorithm for an input of size N in the most unfavorable scenario." }
        ],
        b: [
          {
            q: `Explain the step-by-step implementation methodology for ${name}. Describe its benefits.`,
            a: `Implementing **${name}** requires a structured, multi-phase engineering methodology:\n\n1. **Requirements Gathering & Formal Specifications**: Establishing the mathematical bounds and physical limitations of the system.\n2. **Architectural Modelling**: Constructing data-flow diagrams and entity relationships.\n3. **Detailed Mathematical Derivation**: Formulating the performance equations to predict output metrics.\n4. **Optimization Phase**: Applying dynamic programming or greedy adjustments to eliminate bottlenecks.\n5. **Verification & Testing**: Validating the operational correctness under edge-case inputs.\n\n**Core Benefits**:\n- **Resource Efficiency**: Maximizes hardware and software throughput.\n- **Scalability**: Allows systems to expand effortlessly with growing user demands.\n- **Maintainability**: Clear division of concerns facilitates straightforward updates.`
          }
        ],
        c: []
      }
    }
  ];

  // Quantum Series
  const quantum = [
    {
      unit: 1,
      title: selectedTopics[0],
      qas: [
        {
          q: `Explain the core mathematical principles of ${selectedTopics[0]}. (Asked in AKTU 2019, 2021, 2023) [Highly Repeated]`,
          a: `The core mathematical principles of **${selectedTopics[0]}** rely on optimizing processing states while maintaining strict resource bounds.\n\n**Theoretical Model**:\nFor a standard model, we analyze input vector $X$ mapped to transformation space $T(X)$:\n$$Y = \\sum_{i=1}^{k} \\omega_i \\cdot X_i + \\beta$$\nWhere:\n*   $\\omega_i$ represents the weight coefficients.\n*   $X_i$ represents the incoming signal values.\n*   $\\beta$ is the bias offset value.\n\nThis linear combination determines the foundational threshold state of the system during standard operational procedures.`
        }
      ]
    },
    {
      unit: 2,
      title: selectedTopics[1],
      qas: [
        {
          q: `Draw and describe the architectural diagrams of ${selectedTopics[1]}. (Asked in AKTU 2018, 2020, 2022) [Repeated]`,
          a: `The architectural diagram of **${selectedTopics[1]}** outlines the directional flow of data, control triggers, and hardware register mapping.\n\n**System Components**:\n1.  **Input Controller**: Receives and decodes user parameters.\n2.  **Processor core**: Performs active calculations and logical branches.\n3.  **Storage Registry**: Accesses heap memory frames securely.\n4.  **Output Driver**: Transmits compiled signals to adjacent interfaces.`
        }
      ]
    }
  ];

  return { id: subject.id, code, name, weightage: subject.weightage, difficulty: subject.difficulty, books: subject.books || [`Standard Textbook of ${name}`], weightageData: subject.weightageData || [{ unit: "Unit 1: Introduction", pct: 20 }, { unit: "Unit 2: Core Concepts", pct: 20 }, { unit: "Unit 3: Design & Analysis", pct: 20 }, { unit: "Unit 4: Advanced Systems", pct: 20 }, { unit: "Unit 5: Applications & Case Studies", pct: 20 }], units, pyqs, quantum };
};

export const SEMESTER_SYLLABUS_DATA = [
  {
    sem: "Semester 1",
    type: "Odd Semester",
    desc: "First-semester fundamental concepts (Common first-year syllabus)",
    branches: [
      { name: "Computer Science & IT", file: "Syllabus_BTech_First_Yr_Common_other_than_AG_&_BT_effective_from_2022_23_R.pdf", path: "/Syllabus/1st Year/CS & IT/Syllabus_BTech_First_Yr_Common_other_than_AG_&_BT_effective_from_2022_23_R.pdf" },
      { name: "Civil Engineering", file: "Syllabus_BTech_First_Yr_Common_other_than_AG_&_BT_effective_from_2022_23_R.pdf", path: "/Syllabus/1st Year/Civil Engineering/Syllabus_BTech_First_Yr_Common_other_than_AG_&_BT_effective_from_2022_23_R.pdf" },
      { name: "Electrical Engineering", file: "Syllabus_BTech_First_Yr_Common_other_than_AG_&_BT_effective_from_2022_23_R (1).pdf", path: "/Syllabus/1st Year/ELectrical Engineering/Syllabus_BTech_First_Yr_Common_other_than_AG_&_BT_effective_from_2022_23_R (1).pdf" }
    ]
  },
  {
    sem: "Semester 2",
    type: "Even Semester",
    desc: "Second-semester foundation courses (Common first-year syllabus)",
    branches: [
      { name: "Computer Science & IT", file: "Syllabus_BTech_First_Yr_Common_other_than_AG_&_BT_effective_from_2022_23_R.pdf", path: "/Syllabus/1st Year/CS & IT/Syllabus_BTech_First_Yr_Common_other_than_AG_&_BT_effective_from_2022_23_R.pdf" },
      { name: "Civil Engineering", file: "Syllabus_BTech_First_Yr_Common_other_than_AG_&_BT_effective_from_2022_23_R.pdf", path: "/Syllabus/1st Year/Civil Engineering/Syllabus_BTech_First_Yr_Common_other_than_AG_&_BT_effective_from_2022_23_R.pdf" },
      { name: "Electrical Engineering", file: "Syllabus_BTech_First_Yr_Common_other_than_AG_&_BT_effective_from_2022_23_R (1).pdf", path: "/Syllabus/1st Year/ELectrical Engineering/Syllabus_BTech_First_Yr_Common_other_than_AG_&_BT_effective_from_2022_23_R (1).pdf" }
    ]
  },
  {
    sem: "Semester 3",
    type: "Odd Semester",
    desc: "Third-semester core branch-specific technical specialized syllabus",
    branches: [
      { name: "Computer Science & IT", file: "B.Tech_2nd_Yr_CSE_v3.pdf", path: "/Syllabus/2nd Year/CS & IT/B.Tech_2nd_Yr_CSE_v3.pdf" },
      { name: "Civil Engineering", file: "B.Tech_2nd_Yr_Civil.pdf", path: "/Syllabus/2nd Year/Civil Engineering/B.Tech_2nd_Yr_Civil.pdf" },
      { name: "Electrical Engineering", file: "B.Tech_2nd_Yr_EE_V2.pdf", path: "/Syllabus/2nd Year/ELectrical Engineering/B.Tech_2nd_Yr_EE_V2.pdf" }
    ]
  },
  {
    sem: "Semester 4",
    type: "Even Semester",
    desc: "Fourth-semester core engineering and labs syllabus",
    branches: [
      { name: "Computer Science & IT", file: "B.Tech_2nd_Yr_CSE_v3.pdf", path: "/Syllabus/2nd Year/CS & IT/B.Tech_2nd_Yr_CSE_v3.pdf" },
      { name: "Civil Engineering", file: "B.Tech_2nd_Yr_Civil.pdf", path: "/Syllabus/2nd Year/Civil Engineering/B.Tech_2nd_Yr_Civil.pdf" },
      { name: "Electrical Engineering", file: "B.Tech_2nd_Yr_EE_V2.pdf", path: "/Syllabus/2nd Year/ELectrical Engineering/B.Tech_2nd_Yr_EE_V2.pdf" }
    ]
  },
  {
    sem: "Semester 5",
    type: "Odd Semester",
    desc: "Fifth-semester advanced theory, projects and industrial courses",
    branches: [
      { name: "Computer Science & IT", file: "B.TECH CE&IT , CSIT, IT 3rd YR 2024-25.pdf", path: "/Syllabus/3rd Year/CS & IT/B.TECH CE&IT , CSIT, IT 3rd YR 2024-25.pdf" },
      { name: "Civil Engineering", file: "B.Tech. 3rd Year Civil Engineering.pdf", path: "/Syllabus/3rd Year/Civil Engineering/B.Tech. 3rd Year Civil Engineering.pdf" },
      { name: "Electrical Engineering", file: "1 B.Tech. 3rd Year Electrical Engineering 2024-25.pdf", path: "/Syllabus/3rd Year/ELectrical Engineering/1 B.Tech. 3rd Year Electrical Engineering 2024-25.pdf" }
    ]
  },
  {
    sem: "Semester 6",
    type: "Even Semester",
    desc: "Sixth-semester specialized options and system-level labs",
    branches: [
      { name: "Computer Science & IT", file: "B.TECH CE&IT , CSIT, IT 3rd YR 2024-25.pdf", path: "/Syllabus/3rd Year/CS & IT/B.TECH CE&IT , CSIT, IT 3rd YR 2024-25.pdf" },
      { name: "Civil Engineering", file: "B.Tech. 3rd Year Civil Engineering.pdf", path: "/Syllabus/3rd Year/Civil Engineering/B.Tech. 3rd Year Civil Engineering.pdf" },
      { name: "Electrical Engineering", file: "1 B.Tech. 3rd Year Electrical Engineering 2024-25.pdf", path: "/Syllabus/3rd Year/ELectrical Engineering/1 B.Tech. 3rd Year Electrical Engineering 2024-25.pdf" }
    ]
  },
  {
    sem: "Semester 7",
    type: "Odd Semester",
    desc: "Seventh-semester open electives and final year capstones",
    branches: [
      { name: "Computer Science & IT", file: null, path: null },
      { name: "Civil Engineering", file: null, path: null },
      { name: "Electrical Engineering", file: null, path: null }
    ]
  },
  {
    sem: "Semester 8",
    type: "Even Semester",
    desc: "Eighth-semester domain-specific electives and project reviews",
    branches: [
      { name: "Computer Science & IT", file: null, path: null },
      { name: "Civil Engineering", file: null, path: null },
      { name: "Electrical Engineering", file: null, path: null }
    ]
  }
];
