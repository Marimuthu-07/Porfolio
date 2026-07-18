import { Project, SkillCategory, Certification, Education } from './types';

export const PERSONAL_INFO = {
  fullName: 'Marimuthu A',
  title: 'Computer Science Engineering Student',
  subtitle: 'Python Developer & Web Enthusiast',
  tagline: 'Computer Science student passionate about building highly practical software solutions, full-stack web development, and artificial intelligence.',
  email: 'amarimuthu5898@gmail.com',
  phone: '+91 6369086341',
  location: 'Ponnamaravathy, Tamil Nadu, India',
  github: 'https://github.com/Marimuthu-07',
  linkedin: 'https://www.linkedin.com/in/marimuthu-a-',
  leetcode: 'https://leetcode.com/u/01B6kAMEoF/',
  resumeDownloadUrl: 'Marimuthu_A_Resume.odt', // We can support mock or direct download link
};

export const PROJECTS: Project[] = [
  {
    id: 'learnvault',
    title: 'LearnVault',
    subtitle: 'Learning Management Platform',
    description: 'Developed and deployed a web-based learning management platform designed to organize educational resources and improve learning accessibility.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'GitHub', 'Render'],
    bullets: [
      'Built a modern, highly responsive user interface with rich visual hierarchies',
      'Structured learning content into easily navigable and searchable subject categories',
      'Deployed the live application on Render with automated version control deployments'
    ],
    githubUrl: 'https://github.com/Marimuthu-07/LearnVault_app',
    liveUrl: 'https://learnvault-app.onrender.com',
    accentGradient: 'from-indigo-600 to-cyan-500',
    visualType: 'learnvault'
  },
  {
    id: 'neonwave',
    title: 'NeonWave',
    subtitle: 'Offline Desktop Music Player',
    description: 'Developing a high-performance cross-platform desktop music player focused on local offline audio playback, custom playlists, and rich visualizations.',
    tags: ['Electron', 'Node.js', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind'],
    bullets: [
      'Architected cross-platform desktop wrapper utilizing Electron and Node.js core',
      'Implemented fluid streaming-inspired user interface with rich media control triggers',
      'Integrated live frequency audio visualizer bars using the HTML5 Web Audio API'
    ],
    githubUrl: 'https://github.com/Marimuthu-07/HORMONIX',
    liveUrl: 'https://hormonix.vercel.app',
    accentGradient: 'from-fuchsia-600 to-indigo-600',
    visualType: 'musicplayer'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Web Development',
    iconName: 'Layout',
    skills: [
      { name: 'HTML5 & CSS3', progress: 92 },
      { name: 'JavaScript (ES6+)', progress: 85 },
      { name: 'Responsive UI Design', progress: 90 },
      { name: 'Tailwind CSS', progress: 88 }
    ]
  },
  {
    title: 'Programming Languages',
    iconName: 'Code2',
    skills: [
      { name: 'Python (OOP & Scripting)', progress: 88 },
      { name: 'C / C++', progress: 80 },
      { name: 'Data Structures & Algorithms', progress: 75 }
    ]
  },
  {
    title: 'Tools & Ecosystems',
    iconName: 'Cpu',
    skills: [
      { name: 'Git & GitHub', progress: 90 },
      { name: 'Node.js & Electron', progress: 78 },
      { name: 'VS Code & Shell Tools', progress: 85 },
      { name: 'AI & Prompt Engineering', progress: 85 }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'google-ai-essentials',
    name: 'Google AI Essentials',
    organization: 'Google & Coursera',
    issueDate: 'May 2026',
    verificationUrl: 'https://coursera.org/verify/specialization/EGORX38IYEHU',
    iconType: 'google',
    badgeUrl: 'https://www.credly.com/badges/683965ba-c3f5-4726-b15c-f5769c4303f0/public_url',
    skillsLearned: ['Generative AI', 'Prompt Engineering', 'AI Productivity', 'Ethical AI']
  },
  {
    id: 'google-prompting-essentials',
    name: 'Google Prompting Essentials',
    organization: 'Google & Coursera',
    issueDate: 'May 2026',
    verificationUrl: 'https://coursera.org/verify/specialization/FVNJGCK7PQLK',
    iconType: 'google',
    badgeUrl: 'https://www.credly.com/badges/c0884041-cb06-4116-b71f-748c35349843/public_url',
    skillsLearned: ['Prompt Design', 'AI Workflow Integration', 'LLM Parameter Tuning', 'System Prompts']
  },
  {
    id: 'python-internshala',
    name: 'Programming with Python',
    organization: 'Internshala Trainings (Six-week intensive)',
    issueDate: 'July 2025',
    verificationUrl: 'https://trainings.internshala.com/verify_certificate',
    iconType: 'python',
    skillsLearned: ['Python OOP', 'Data Structures', 'Database Integration', 'GUI Development']
  },
  {
    id: 'python-skillindia',
    name: 'Programming with Python (Grade B)',
    organization: 'Skill India / NSDC / Scholiverse Educare',
    issueDate: 'July 2025',
    verificationUrl: 'https://www.skillindia.gov.in/',
    iconType: 'default',
    skillsLearned: ['Algorithm Design', 'Python Libraries', 'Logic Building', 'Problem Solving']
  }
];

export const EDUCATIONS: Education[] = [
  {
    id: 'btech-cse',
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'JNN Institute of Engineering',
    duration: '2025 - Present',
    description: 'Acquiring deep engineering foundations, hands-on programming paradigms, and problem-solving structures. Completed first year with strong academic standing.',
    cgpaOrGrade: 'CGPA: 8.6',
    statusBadge: 'Active / First Year Completed',
    expectedYear: 'Expected Graduation: 2029'
  },
  {
    id: 'hsc-school',
    degree: 'Higher Secondary School Certification',
    institution: 'Chidhambaram Matriculation Higher Secondary School, Tamil Nadu',
    duration: 'Graduated 2025',
    description: 'Focused studies in Mathematics, Physics, Chemistry, and Computer Science. Initiated foundational Python programming labs.',
    cgpaOrGrade: 'Grade: 85%',
    statusBadge: 'Completed'
  }
];
