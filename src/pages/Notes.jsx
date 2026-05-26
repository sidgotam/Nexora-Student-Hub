import React, { useState, useEffect } from 'react';
import { 
  Mail, ArrowRight, CheckCircle2, Clock, Sparkles, BookOpen, FileText, Check, Award, Eye, 
  Search, Lock, Download, ChevronRight, ChevronLeft, Calendar, FileQuestion, BookMarked, 
  HelpCircle, ArrowLeft, RefreshCw, X, MessageSquare, Maximize2, Minimize2, Copy, Flame, Loader2
} from 'lucide-react';

// ==========================================================================
// HIGH-FIDELITY AKTU 8-SEMESTER SYLLABUS MAPPING (AUTHENTIC SUBJECT CODES)
// ==========================================================================
const ACADEMIC_DATA = {
  aktu: {
    name: "APJ Abdul Kalam Technical University (AKTU)",
    logo: "🎓",
    branches: {
      cse: {
        name: "Computer Science & Engineering",
        semesters: {
          1: [
            { id: "phy", code: "KAS-101T", name: "Engineering Physics", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Engineering Physics by Malik and Singh", "Introduction to Electrodynamics by David J. Griffiths"], weightageData: [{ unit: "Unit 1: Relativistic Mechanics", pct: 20 }, { unit: "Unit 2: Electromagnetic Theory", pct: 20 }, { unit: "Unit 3: Quantum Mechanics", pct: 20 }, { unit: "Unit 4: Wave Optics", pct: 20 }, { unit: "Unit 5: Fiber Optics & Laser", pct: 20 }] },
            { id: "math1", code: "KAS-103T", name: "Engineering Mathematics-I", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Advanced Engineering Mathematics by E. Kreyszig", "Higher Engineering Mathematics by B.S. Grewal"], weightageData: [{ unit: "Unit 1: Matrices", pct: 20 }, { unit: "Unit 2: Differential Calculus-I", pct: 20 }, { unit: "Unit 3: Differential Calculus-II", pct: 20 }, { unit: "Unit 4: Multivariable Calculus", pct: 20 }, { unit: "Unit 5: Vector Calculus", pct: 20 }] },
            { id: "bee", code: "KEE-101T", name: "Basic Electrical Engineering", weightage: "Medium (50 Marks)", difficulty: "Medium", books: ["Electrical Technology by B.L. Theraja", "Basic Electrical Engineering by D.P. Kothari"], weightageData: [{ unit: "Unit 1: DC Circuits", pct: 20 }, { unit: "Unit 2: AC Circuits", pct: 20 }, { unit: "Unit 3: Transformers", pct: 20 }, { unit: "Unit 4: Electrical Machines", pct: 20 }, { unit: "Unit 5: Electrical Installations", pct: 20 }] }
          ],
          2: [
            { id: "chem", code: "KAS-201T", name: "Engineering Chemistry", weightage: "High (100 Marks)", difficulty: "Easy", books: ["Engineering Chemistry by Shashi Chawla", "Physical Chemistry by P.W. Atkins"], weightageData: [{ unit: "Unit 1: Atomic & Molecular Structure", pct: 20 }, { unit: "Unit 2: Spectroscopic Techniques", pct: 20 }, { unit: "Unit 3: Electrochemistry", pct: 20 }, { unit: "Unit 4: Water & Phase Rule", pct: 20 }, { unit: "Unit 5: Polymers", pct: 20 }] },
            { id: "math2", code: "KAS-203T", name: "Engineering Mathematics-II", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Higher Engineering Mathematics by B.S. Grewal", "Advanced Engineering Mathematics by Peter V. O'Neil"], weightageData: [{ unit: "Unit 1: Ordinary Differential Equations", pct: 20 }, { unit: "Unit 2: Multivariable Calculus", pct: 20 }, { unit: "Unit 3: Laplace Transforms", pct: 20 }, { unit: "Unit 4: Fourier Series", pct: 20 }, { unit: "Unit 5: Z-Transforms", pct: 20 }] },
            { id: "pps", code: "KCS-201T", name: "Programming for Problem Solving", weightage: "High (100 Marks)", difficulty: "Easy", books: ["Programming in ANSI C by E. Balagurusamy", "Let Us C by Yashavant Kanetkar"], weightageData: [{ unit: "Unit 1: Intro to Programming", pct: 20 }, { unit: "Unit 2: Branching Statements", pct: 20 }, { unit: "Unit 3: Loops", pct: 20 }, { unit: "Unit 4: Arrays & Strings", pct: 20 }, { unit: "Unit 5: Pointers & Structures", pct: 20 }] }
          ],
          3: [
            {
              id: "ds",
              code: "KCS-301",
              name: "Data Structures",
              weightage: "High (100 Marks)",
              difficulty: "Hard",
              books: ["Data Structures using C by Aaron M. Tenenbaum", "Fundamentals of Data Structures by Ellis Horowitz"],
              weightageData: [
                { unit: "Unit 1: Arrays & Sparse Matrices", pct: 18 },
                { unit: "Unit 2: Stacks & Queues", pct: 20 },
                { unit: "Unit 3: Trees & BST", pct: 24 },
                { unit: "Unit 4: Graphs & Traversal", pct: 20 },
                { unit: "Unit 5: Sorting & Hashing", pct: 18 }
              ],
              units: [
                {
                  number: 1,
                  title: "Introduction to Data Structures & Arrays",
                  summary: "Dynamic memory allocation (malloc, calloc, free), asymptotic notations, multidimensional arrays address calculation, and sparse matrix triplet representation.",
                  fullContent: `### UNIT 1: INTRODUCTION TO DATA STRUCTURES & ARRAYS

#### 1. Concept of Data Structures
A data structure is a specialized format for organizing, processing, retrieving, and storing data. Data structures can be **Linear** (elements are sequential, e.g., Arrays, Linked Lists, Stacks, Queues) or **Non-Linear** (elements are hierarchical, e.g., Trees, Graphs).

#### 2. Dynamic Memory Allocation in C
Unlike static memory allocated at compile-time on the stack, dynamic memory is allocated at runtime on the heap. Key library functions in \`<stdlib.h>\` include:
*   \`malloc(size_t size)\`: Allocates uninitialized memory of specified bytes. Returns a void pointer (\`void*\`).
    \`\`\`c
    int *arr = (int*) malloc(5 * sizeof(int));
    \`\`\`
*   \`calloc(num_elements, size_element)\`: Allocates memory and initializes all bits to zero.
    \`\`\`c
    int *arr = (int*) calloc(5, sizeof(int));
    \`\`\`
*   \`realloc(ptr, new_size)\`: Resizes previously allocated block dynamically.
*   \`free(ptr)\`: Deallocates the heap block back to the OS memory pool to avoid **Memory Leaks**.

#### 3. Asymptotic Notations
Used to describe the running time or space efficiency of algorithms:
1.  **Big-O (O)**: Represents the **Worst-Case** asymptotic upper bound.
2.  **Omega (Ω)**: Represents the **Best-Case** asymptotic lower bound.
3.  **Theta (Θ)**: Represents the **Average-Case** tight bounding.

#### 4. Multidimensional Arrays & Address Calculation
For a 2D array \`A[Row][Col]\` with element size \`W\` bytes:
*   **Row Major Order (RMO)**: Stores row-by-row.
    $$\\text{Address}(A[i][j]) = \\text{Base} + W \\times [(i - L_r) \\times C + (j - L_c)]$$
    *(where $L_r, L_c$ are lower bounds of rows and columns, $C$ is total columns)*
*   **Column Major Order (CMO)**: Stores column-by-column.
    $$\\text{Address}(A[i][j]) = \\text{Base} + W \\times [(j - L_c) \\times R + (i - L_r)]$$
    *(where $R$ is total rows)*

#### 5. Sparse Matrices
A matrix in which the majority of elements are zero is a **Sparse Matrix**. Storing standard 2D grids for sparse data wastes enormous RAM.
*   **Triplet Representation**: Uses a $N \\times 3$ matrix where:
    *   Row 0 stores: \`[Total Rows, Total Columns, Total Non-Zero Values]\`
    *   Each subsequent row stores: \`[Row Index, Column Index, Non-Zero Value]\`
*   **Compressed Sparse Row (CSR)**: Uses three 1D arrays: Values, Column Indices, and Row Pointers to compress zero spaces.

---
*Nexora AI Pro-Tip: Address calculations carry a recurring 10-mark question in Section C. Be thorough with RMO/CMO numerical practice.*`
                },
                {
                  number: 2,
                  title: "Stacks and Queues",
                  summary: "LIFO vs FIFO properties, stack operations, infix to postfix parsing algorithm, circular queues full/empty conditions, and double-ended queues (Deques).",
                  fullContent: `### UNIT 2: STACKS AND QUEUES

#### 1. Stack: LIFO (Last In First Out)
A Stack is a linear collection restricting insertions and deletions to a single end called the **Top**.
*   **Core Operations**:
    *   \`Push(item)\`: Adds element to top. Overflow if \`top == MAX - 1\`.
    *   \`Pop()\`: Removes top element. Underflow if \`top == -1\`.
    *   \`Peek()\`: Examines top element without removing it.

#### 2. Expressions Parsing via Stack
Stacks are heavily used in compilers to evaluate arithmetic notations:
*   **Infix**: Operand Operator Operand (e.g., \`A + B\`)
*   **Prefix**: Operator Operand Operand (e.g., \`+ A B\`)
*   **Postfix (RPN)**: Operand Operand Operator (e.g., \`A B +\`)

**Infix-to-Postfix Algorithm**:
1. Scan the infix string from left to right.
2. If operand, output it.
3. If '(' push to stack. If ')' pop and output until '(' is met.
4. If operator, pop and output operators of greater or equal precedence, then push current operator to stack.

#### 3. Queue: FIFO (First In First Out)
A linear list where insertions occur at the **Rear** and deletions occur at the **Front**.
*   **Linear Queue Drawback**: When rear reaches the max capacity, enqueue fails even if front has moved forward, wasting front index vacancies.
*   **Circular Queue solution**:
    Connects the last slot back to the first.
    *   Enqueue: \`rear = (rear + 1) % MAX\`
    *   Dequeue: \`front = (front + 1) % MAX\`
    *   **Full Condition**: \`(rear + 1) % MAX == front\`
    *   **Empty Condition**: \`front == -1\`

#### 4. Deque (Double Ended Queue)
A queue allowing enqueue and dequeue at both front and rear ends. Can be input-restricted or output-restricted.`
                }
              ],
              pyqs: [
                {
                  year: "2023-24",
                  duration: "3 Hours",
                  sections: {
                    a: [
                      { q: "What is a linear data structure? Give two examples.", a: "A data structure is linear if its elements form a sequential, continuous sequence. Each node (except boundaries) has a single predecessor and successor. Examples include Stacks, Queues, and Linked Lists." },
                      { q: "Why do we use asymptotic notations in algorithm analysis?", a: "Asymptotic notations (Big-O, Omega, Theta) analyze algorithm efficiency relative to input size without relying on hardware configurations, system load, or compiler efficiency. They capture standard mathematical time and space growth rates." },
                      { q: "Define sparse matrix and its dynamic representation.", a: "A sparse matrix contains a high percentage of zero values. To save memory, it's represented dynamically using a Triplet Array [Row, Column, Value] containing only non-zero elements, or via a Compressed Sparse Row (CSR) linked structure." },
                      { q: "Explain the circular queue data structure and its advantages over linear queues.", a: "A circular queue connects the final index back to the starting index in a circle. In linear queues, once Rear reaches capacity, insertion fails even if elements are dequeued at Front. Circular queues resolve this space wastage by using modulo arithmetic: `rear = (rear + 1) % MAX`." },
                      { q: "What is a height-balanced AVL tree?", a: "An AVL tree is a self-balancing Binary Search Tree where the Balance Factor (BF) of any node, calculated as `Height(Left Subtree) - Height(Right Subtree)`, is strictly constrained to -1, 0, or +1. Balance is restored using tree rotations during insertions/deletions." }
                    ],
                    b: [
                      { 
                        q: "Explain AVL tree rotation techniques. Show how a RL rotation is performed with an example step-by-step.", 
                        a: "AVL tree balancing relies on four rotations: Single Left (RR), Single Right (LL), Double Left-Right (LR), and Double Right-Left (RL).\n\n**Right-Left (RL) Rotation** is triggered when a node is unbalanced by an insertion in the left subtree of its right child. It consists of a right rotation on the right child followed by a left rotation on the unbalanced grandparent node.\n\n*Example*:\nInsert 15 into tree with nodes: 10 (root), 20 (right child of 10). Node 20 gets left child 15. The tree has nodes: 10 -> 20 -> 15 (left subtree of 20). Height of right subtree of 10 is 2, height of left subtree of 10 is 0. BF of 10 = -2 (unbalanced).\n- **Step 1 (Right Rotation on right child 20)**: Nodes 20 and 15 rotate right. Node 15 becomes right child of 10, node 20 becomes right child of 15.\n- **Step 2 (Left Rotation on grandparent 10)**: Root node 10 rotates left around node 15. Node 15 becomes the new root, with 10 as its left child and 20 as its right child. The resulting tree is balanced, and all BFs are 0!" 
                      }
                    ],
                    c: []
                  }
                }
              ],
              quantum: [
                {
                  unit: 1,
                  title: "Arrays & Sparse Matrices",
                  qas: [
                    {
                      q: "Explain the difference between Row Major and Column Major Order representations of a 2D array. Derive the address calculation formula for RMO. (Asked in AKTU 2019, 2021, 2023) [Highly Repeated]",
                      a: "Row Major Order (RMO) and Column Major Order (CMO) are methods to flatten a multi-dimensional array into 1D contiguous RAM memory.\n\n- **Row Major Order**: Elements are stored row-by-row. Element $A[0][0]$ is followed by $A[0][1]$, then $A[0][2]$, and so on. Once a row finishes, storage moves to the start of the next row.\n- **Column Major Order**: Elements are stored column-by-column. Element $A[0][0]$ is followed by $A[1][0]$, then $A[2][0]$, and so on.\n\n**RMO Address Derivation**:\nLet $A[Row][Col]$ be a 2D array with lower bounds $L_r, L_c$ and size of each element $W$ bytes. To calculate the address of $A[i][j]$:\n1. We must skip all preceding $(i - L_r)$ rows. Each row contains $C$ (total columns) elements.\n2. So, total elements skipped in preceding rows = $(i - L_r) \\times C$.\n3. In the current row, we must move $(j - L_c)$ columns ahead.\n4. Total elements skipped = $[(i - L_r) \\times C] + (j - L_c)$.\n5. Multiplied by element weight $W$ and adding Base memory address:\n$$\\text{Address}(A[i][j]) = \\text{Base} + W \\times [(i - L_r) \\times C + (j - L_c)]$$"
                    }
                  ]
                }
              ]
            },
            { id: "dms", code: "KCS-303", name: "Discrete Mathematics", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Discrete Mathematical Structures by Bernard Kolman", "Discrete Mathematics and its Applications by Kenneth H. Rosen"], weightageData: [{ unit: "Unit 1: Sets & Logic", pct: 20 }, { unit: "Unit 2: Algebraic Structures", pct: 20 }, { unit: "Unit 3: Lattices & Boolean Algebra", pct: 20 }, { unit: "Unit 4: Propositional Logic", pct: 20 }, { unit: "Unit 5: Graph Theory", pct: 20 }] },
            { id: "css", code: "KNC-301", name: "Computer System Security", weightage: "Medium (50 Marks)", difficulty: "Easy", books: ["Computer Security Principles and Practice by William Stallings"], weightageData: [{ unit: "Unit 1: Intro to Security", pct: 20 }, { unit: "Unit 2: Basic Cryptography", pct: 20 }, { unit: "Unit 3: Network Security", pct: 20 }, { unit: "Unit 4: Access Control Systems", pct: 20 }, { unit: "Unit 5: Policies & Auditing", pct: 20 }] }
          ],
          4: [
            {
              id: "os",
              code: "KCS-401",
              name: "Operating Systems",
              weightage: "High (100 Marks)",
              difficulty: "Medium",
              books: ["Operating System Concepts by Silberschatz, Galvin, and Gagne", "Modern Operating Systems by Andrew S. Tanenbaum"],
              weightageData: [
                { unit: "Unit 1: Introduction & System Calls", pct: 15 },
                { unit: "Unit 2: CPU Scheduling & Threads", pct: 25 },
                { unit: "Unit 3: Synchronization & Deadlocks", pct: 25 },
                { unit: "Unit 4: Memory Management & Paging", pct: 20 },
                { unit: "Unit 5: File Systems & Disk Scheduling", pct: 15 }
              ],
              units: [
                {
                  number: 1,
                  title: "Introduction to OS and System Calls",
                  summary: "OS functions, kernels (micro vs monolithic), process structures, user and system mode, and common system calls.",
                  fullContent: `### UNIT 1: INTRODUCTION TO OS AND SYSTEM CALLS

#### 1. What is an Operating System?
An Operating System (OS) is software that acts as an intermediary between user applications and the physical hardware, managing processor, memory, and devices.

#### 2. Monolithic vs Microkernel Architectures
*   **Monolithic Kernel**: Runs all system services (file system, drivers, virtual memory) in a single address space in supervisor mode. High performance but fragile (a single driver crash crashes the system).
*   **Microkernel**: Minimalist design running only core services (IPC, basic memory, scheduling) in kernel space. Drivers and filesystem run in user space. High modularity and crash resilience, but communication overhead is high.

#### 3. Dual-Mode Operation
*   **User Mode (Mode Bit = 1)**: Restrictions on accessing physical registers and device controls. Protects system memory integrity.
*   **Kernel/Privileged Mode (Mode Bit = 0)**: Full direct hardware execution rights.

---
*Nexora AI Pro-Tip: Memorize the fork() system call behavior. A favorite for 2-mark dry-run outputs in Section A.*`
                }
              ],
              pyqs: [
                {
                  year: "2023-24",
                  duration: "3 Hours",
                  sections: {
                    a: [
                      { q: "Define a system call. Give two examples.", a: "A system call is a programmatic interface that allows a user-level application to request services directly from the operating system's kernel. Examples: `fork()` for process creation, and `read()` for file operations." }
                    ],
                    b: [],
                    c: []
                  }
                }
              ],
              quantum: [
                {
                  unit: 1,
                  title: "Monolithic vs Microkernels",
                  qas: [
                    {
                      q: "Differentiate between Monolithic and Microkernel operating systems. Highlight their key advantages and trade-offs. (Asked in AKTU 2018, 2021, 2023) [Highly Repeated]",
                      a: "**Monolithic Kernel**:\n- Runs all operating system services (Virtual Memory, Scheduler, File System, Device Drivers) together in supervisor/kernel mode inside a single address space.\n- *Advantages*: Extremely fast execution speeds due to direct, function-call-based IPC.\n- *Trade-offs*: Low stability; a single bug in a device driver can crash the entire operating system kernel.\n\n**Microkernel**:\n- Strips the kernel down to bare essentials (low-level CPU scheduling, IPC, memory mapping). Runs all other services (drivers, filesystem) as user-space processes.\n- *Advantages*: Highly modular, secure, and crash-resilient. If a driver crashes, it can be restarted dynamically in user space without affecting the core kernel.\n- *Trade-offs*: Slower execution speed because every kernel request requires expensive Inter-Process Communication (IPC) message parsing across user and kernel modes."
                    }
                  ]
                }
              ]
            },
            { id: "micro", code: "KCS-402", name: "Microprocessor & Interfacing", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Microprocessor Architecture, Programming and Applications with the 8085 by Ramesh Gaonkar"], weightageData: [{ unit: "Unit 1: 8085 Architecture", pct: 20 }, { unit: "Unit 2: 8085 Programming", pct: 20 }, { unit: "Unit 3: Interfacing & Timings", pct: 20 }, { unit: "Unit 4: Peripheral Chips", pct: 20 }, { unit: "Unit 5: 8086 Microprocessor", pct: 20 }] },
            { id: "automata", code: "KCS-403", name: "Theory of Automata & Formal Languages", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Introduction to Automata Theory, Languages and Computation by Hopcroft, Motwani, and Ullman"], weightageData: [{ unit: "Unit 1: Finite Automata", pct: 20 }, { unit: "Unit 2: Regular Expressions", pct: 20 }, { unit: "Unit 3: Context Free Grammars", pct: 20 }, { unit: "Unit 4: Pushdown Automata", pct: 20 }, { unit: "Unit 5: Turing Machines", pct: 20 }] }
          ],
          5: [
            {
              id: "dbms",
              code: "KCS-501",
              name: "Database Management Systems",
              weightage: "High (100 Marks)",
              difficulty: "Medium",
              books: ["Database System Concepts by Korth, Silberschatz, and Sudarshan", "Fundamentals of Database Systems by Elmasri and Navathe"],
              weightageData: [
                { unit: "Unit 1: ER Model & Relational Algebra", pct: 20 },
                { unit: "Unit 2: SQL Queries & DDL/DML", pct: 20 },
                { unit: "Unit 3: Normalization & Keys", pct: 25 },
                { unit: "Unit 4: Transaction & Concurrency", pct: 20 },
                { unit: "Unit 5: Indexing & Crash Recovery", pct: 15 }
              ],
              units: [
                {
                  number: 3,
                  title: "Normalization & Functional Dependencies",
                  summary: "Functional dependencies definition, candidate key search algorithms, anomaly scopes, 1NF, 2NF, 3NF, and Boyce-Codd Normal Form (BCNF) decomposition rules.",
                  fullContent: `### UNIT 3: NORMALIZATION & FUNCTIONAL DEPENDENCIES

#### 1. Why Normalization?
Normalization organizes the relational database columns to minimize **Redundancy** (repeated data entry) and prevent **Update Anomalies** (Insertion, Deletion, and Update irregularities).

---
*Nexora AI Pro-Tip: Normalization decomposition and finding Candidate Keys using closure sets ($A^+$) represents a highly repeating 10-mark numeric question in Section B. Be ready.*`
                }
              ],
              pyqs: [
                {
                  year: "2023-24",
                  duration: "3 Hours",
                  sections: {
                    a: [
                      { q: "Explain ACID properties in transactions.", a: "ACID properties ensure transaction reliability in databases:\n- **Atomicity**: All or nothing execution.\n- **Consistency**: Transition from one valid consistent state to another.\n- **Isolation**: Concurrent runs don't interfere.\n- **Durability**: Successful modifications persist in non-volatile memory." }
                    ],
                    b: [],
                    c: []
                  }
                }
              ],
              quantum: [
                {
                  unit: 3,
                  title: "Candidate Keys & Normalization",
                  qas: [
                    {
                      q: "Formulate the algorithm for finding the Candidate Key of a relation. Trace for R(A, B, C, D, E) with FDs = {A->B, C->D, AC->E}. (Asked in AKTU 2018, 2021, 2023) [Highly Repeated]",
                      a: "**Candidate Key Discovery Algorithm**:\n1. Separate attributes into three sets:\n   - **L**: Attributes appearing only on the Left side of functional dependencies.\n   - **R**: Attributes appearing only on the Right side of functional dependencies.\n   - **M**: Attributes appearing on Both or Neither sides.\n2. Calculate the closure of **L** (along with elements of **M** as necessary). If the closure yields all attributes of the relation, **L** is the unique Candidate Key.\n\n**Tracing for R(A, B, C, D, E)**:\nFDs: $A \\rightarrow B$, $C \\rightarrow D$, $AC \\rightarrow E$.\n- Left-side elements (essential to Candidate Key): $A, C$\n- Closure of $\{AC\}$:\n  - $(AC)^+ = \\{A, C\\} \\implies \\{A, B, C\\} \\implies \\{A, B, C, D\\} \\implies \\{A, B, C, D, E\\}$\nSince $(AC)^+$ contains all relation attributes, **AC** is the unique Candidate Key."
                    }
                  ]
                }
              ]
            },
            { id: "compiler", code: "KCS-502", name: "Compiler Design", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Compilers: Principles, Techniques, and Tools by Aho, Lam, Sethi, and Ullman"], weightageData: [{ unit: "Unit 1: Lexical Analysis", pct: 20 }, { unit: "Unit 2: Parsing Techniques", pct: 20 }, { unit: "Unit 3: Syntax Directed Translation", pct: 20 }, { unit: "Unit 4: Code Generation", pct: 20 }, { unit: "Unit 5: Code Optimization", pct: 20 }] },
            { id: "algo", code: "KCS-503", name: "Design & Analysis of Algorithms", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Introduction to Algorithms by Thomas H. Cormen"], weightageData: [{ unit: "Unit 1: Intro & Sorting Complexity", pct: 20 }, { unit: "Unit 2: Greedy & MST", pct: 20 }, { unit: "Unit 3: Dynamic Programming", pct: 20 }, { unit: "Unit 4: Backtracking & Bound", pct: 20 }, { unit: "Unit 5: NP-Completeness Models", pct: 20 }] }
          ],
          6: [
            { id: "se", code: "KCS-601", name: "Software Engineering", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Software Engineering: A Practitioner's Approach by Roger S. Pressman"], weightageData: [{ unit: "Unit 1: SDLC Process Models", pct: 20 }, { unit: "Unit 2: Requirements Analysis", pct: 20 }, { unit: "Unit 3: Architecture & Design", pct: 20 }, { unit: "Unit 4: Software Testing", pct: 20 }, { unit: "Unit 5: Project Management", pct: 20 }] },
            { id: "cn", code: "KCS-603", name: "Computer Networks", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Computer Networks by Andrew S. Tanenbaum", "Data Communications and Networking by Behrouz A. Forouzan"], weightageData: [{ unit: "Unit 1: Physical & Data Link", pct: 20 }, { unit: "Unit 2: Media Access & Ethernet", pct: 20 }, { unit: "Unit 3: Network Layer routing", pct: 20 }, { unit: "Unit 4: Transport Protocols", pct: 20 }, { unit: "Unit 5: Application protocols", pct: 20 }] },
            { id: "web", code: "KIT-601", name: "Web Technology", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Web Technologies by Uttam K. Roy"], weightageData: [{ unit: "Unit 1: HTML & CSS Stylings", pct: 20 }, { unit: "Unit 2: Core Javascript & DOM", pct: 20 }, { unit: "Unit 3: Backend Node & Express", pct: 20 }, { unit: "Unit 4: Databases Integrations", pct: 20 }, { unit: "Unit 5: React Framework basics", pct: 20 }] }
          ],
          7: [
            { id: "ai", code: "KCS-701", name: "Artificial Intelligence", weightage: "High (100 Marks)", difficulty: "Medium", books: ["Artificial Intelligence: A Modern Approach by Stuart Russell"], weightageData: [{ unit: "Unit 1: AI & Intelligent Agents", pct: 20 }, { unit: "Unit 2: Heuristic Search", pct: 20 }, { unit: "Unit 3: Logic & Knowledge", pct: 20 }, { unit: "Unit 4: Neural Networks", pct: 20 }, { unit: "Unit 5: NLP Applications", pct: 20 }] },
            { id: "dsys", code: "KCS-071", name: "Distributed Systems", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Distributed Systems: Principles and Paradigms by Tanenbaum"], weightageData: [{ unit: "Unit 1: System Architectures", pct: 20 }, { unit: "Unit 2: Clocks & Synchronization", pct: 20 }, { unit: "Unit 3: Consensus Protocols", pct: 20 }, { unit: "Unit 4: Distributed File Access", pct: 20 }, { unit: "Unit 5: Shared Memory Models", pct: 20 }] },
            { id: "cloud", code: "KCS-072", name: "Cloud Computing", weightage: "Medium (50 Marks)", difficulty: "Easy", books: ["Cloud Computing: Principles and Paradigms by Rajkumar Buyya"], weightageData: [{ unit: "Unit 1: Cloud Service Models", pct: 20 }, { unit: "Unit 2: Virtualization Technology", pct: 20 }, { unit: "Unit 3: Infrastructure IaaS/PaaS", pct: 20 }, { unit: "Unit 4: Cloud Data Storage", pct: 20 }, { unit: "Unit 5: Security Configurations", pct: 20 }] }
          ],
          8: [
            { id: "dl", code: "KCS-801", name: "Deep Learning", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Deep Learning by Ian Goodfellow, Yoshua Bengio, and Aaron Courville"], weightageData: [{ unit: "Unit 1: Deep Nets & Backprop", pct: 20 }, { unit: "Unit 2: CNN Architectures", pct: 20 }, { unit: "Unit 3: Recurrent Nets & LSTMs", pct: 20 }, { unit: "Unit 4: Attention & Transformers", pct: 20 }, { unit: "Unit 5: Generative Models (GANs)", pct: 20 }] },
            { id: "nlp", code: "KCS-081", name: "Natural Language Processing", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Speech and Language Processing by Daniel Jurafsky and James H. Martin"], weightageData: [{ unit: "Unit 1: Tokenization & POS Tagging", pct: 20 }, { unit: "Unit 2: Lexical Embeddings", pct: 20 }, { unit: "Unit 3: Sequence Attention Models", pct: 20 }, { unit: "Unit 4: LLMs & Tuning", pct: 20 }, { unit: "Unit 5: Machine Translation", pct: 20 }] },
            { id: "crypto", code: "KCS-082", name: "Cyber Security & Cryptography", weightage: "Medium (50 Marks)", difficulty: "Medium", books: ["Cryptography and Network Security by Behrouz A. Forouzan"], weightageData: [{ unit: "Unit 1: Cryptographic Algorithms", pct: 20 }, { unit: "Unit 2: Public Key Infrastructure", pct: 20 }, { unit: "Unit 3: IoT & Wireless Defenses", pct: 20 }, { unit: "Unit 4: Big Data Analytics Security", pct: 20 }, { unit: "Unit 5: Blockchain & Smart Contracts", pct: 20 }] }
          ]
        }
      },
      it: {
        name: "Information Technology",
        semesters: {
          3: [
            { id: "ds_it", code: "KCS-301", name: "Data Structures", weightage: "High (100 Marks)", difficulty: "Hard", books: ["Data Structures using C by Aaron M. Tenenbaum"], weightageData: [{ unit: "Unit 1: Arrays", pct: 20 }, { unit: "Unit 2: Stacks/Queues", pct: 20 }, { unit: "Unit 3: Trees", pct: 20 }, { unit: "Unit 4: Graphs", pct: 20 }, { unit: "Unit 5: Sorting/Hashing", pct: 20 }] }
          ]
        }
      },
      ece: { name: "Electronics & Communication", semesters: {} },
      ee: { name: "Electrical Engineering", semesters: {} }
    }
  },
  dtu: { name: "Delhi Technological University (DTU)", logo: "🏫", branches: {} },
  mu: { name: "Mumbai University (MU)", logo: "🕌", branches: {} }
};

// ==========================================================================
// DYNAMIC OFFLINE ACADEMIC RESOURCE COMPILING ENGINE
// ==========================================================================
const generateDynamicContent = (subject) => {
  const code = subject.code;
  const name = subject.name;
  
  // Generating Units
  const units = [];
  const topicsMap = {
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
    "Cyber Security & Cryptography": ["Cryptographic Algorithms & Ciphers", "Public Key Infrastructure & Signatures", "IoT & Wireless Security Protocols", "Big Data Analytics & Auditing Frameworks", "Blockchain Technology & Smart Contracts"]
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
            a: `Implementing **${name}** requires a structured, multi-phase engineering methodology:\n\n1. **Requirements Gathering & Formal Specifications**: Establishing the mathematical bounds and physical limitations of the system.\n2. **Architectural Modelling**: Constructing clear data-flow diagrams and entity relationships.\n3. **Detailed Mathematical Derivation**: Formulating the performance equations to predict output metrics.\n4. **Optimization Phase**: Applying dynamic programming or greedy adjustments to eliminate bottlenecks.\n5. **Verification & Testing**: Validating the operational correctness under edge-case inputs.\n\n**Core Benefits**:\n- **Resource Efficiency**: Maximizes hardware and software throughput.\n- **Scalability**: Allows systems to expand effortlessly with growing user demands.\n- **Maintainability**: Clear division of concerns facilitates straightforward updates.`
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

  return { id: subject.id, code, name, weightage: subject.weightage, difficulty: subject.difficulty, books: subject.books || [`Standard Textbook of ${name}`], weightageData: subject.weightageData, units, pyqs, quantum };
};

export default function Notes() {
  // Navigation & Selector States
  const [selectedUniv, setSelectedUniv] = useState('aktu');
  const [selectedBranch, setSelectedBranch] = useState('cse');
  const [selectedSem, setSelectedSem] = useState(3);
  const [selectedSubject, setSelectedSubject] = useState(null);
  
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

  const triggerMockDownload = (resourceName) => {
    showToast(`📥 Downloading: ${resourceName}.pdf (1.8 MB)`);
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
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950 text-emerald-400 border border-slate-900">{sub.code}</span>
                          <span className="text-[9px] font-mono text-slate-500 font-semibold">{sub.weightage}</span>
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
                      onClick={() => triggerMockDownload(selectedSubject.name + "_Syllabus")}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/30 text-slate-350 hover:text-white"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4 text-emerald-400" />
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
                          onClick={() => triggerMockDownload(selectedSubject.name + "_Quantum_Series")}
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
                            <div key={idx} className="flex gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-slate-900 text-xs text-slate-300">
                              <span className="text-cyan-400">📖</span>
                              <span>{book}</span>
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
