import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layout,
  Code2,
  Cpu,
  Award,
  GraduationCap,
  Phone,
  Mail,
  ChevronUp,
  Download,
  ArrowRight,
  Menu,
  X,
  MapPin,
  Calendar,
  Sparkles,
  Github,
  Linkedin,
} from 'lucide-react';

import { PROJECTS, SKILL_CATEGORIES, CERTIFICATIONS, EDUCATIONS, PERSONAL_INFO } from './data';
import ParticleBackground from './components/ParticleBackground';
import ThemeToggle from './components/ThemeToggle';
import SkillBar from './components/SkillBar';
import ProjectCard from './components/ProjectCard';
import CertificateCard from './components/CertificateCard';
import ContactForm from './components/ContactForm';

// Custom LeetCode SVG Icon matching official branding
const LeetCodeIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414 0-1.954l-2.396-2.392c-2.211-2.207-5.815-2.239-8.063-.074l-.039.038-1.309-1.284c.338-.567.76-1.077 1.271-1.517.512-.44 1.104-.797 1.77-1.076l6.634-6.537c.797-.786 2.083-.772 2.868.031l2.585 2.65c.785.803.77 2.106-.033 2.91l-1.531 1.554a1.375 1.375 0 1 0 1.946 1.944l1.531-1.554c2.227-2.279 2.242-5.977.034-8.283l-2.585-2.65c-1.127-1.155-2.73-1.637-4.223-1.396Z" />
  </svg>
);

// High-fidelity active typewriter loop
function Typewriter() {
  const strings = [
    'Computer Science Engineering Student',
    'Web Developer',
    'AI Enthusiast',
  ];
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentStr = strings[index];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentStr.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 35);
    } else {
      timer = setTimeout(() => {
        setText(currentStr.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 70);
    }

    if (!isDeleting && charIndex === currentStr.length) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % strings.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, index]);

  return (
    <span className="text-indigo-600 dark:text-cyan-400 font-display font-bold">
      {text}
      <span className="animate-pulse font-light ml-0.5">|</span>
    </span>
  );
}

// Stats Counter component that rolls on mount
function Counter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    if (start === target) return;

    const totalTime = 1200; // milliseconds
    const incrementTime = Math.floor(totalTime / target);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/10 border border-neutral-200/40 dark:border-neutral-800/40 backdrop-blur-md">
      <span className="font-display text-3xl font-extrabold text-indigo-600 dark:text-cyan-400">
        {count}+
      </span>
      <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 text-right uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [backToTopVisible, setBackToTopVisible] = useState(false);

  // Rotate status badges inside one curved status pill
  const statusBadges = [
    { text: 'Available for Internships', color: 'bg-emerald-500/10 dark:bg-emerald-500/5 border-emerald-500/20 dark:border-emerald-500/10 text-emerald-800 dark:text-emerald-400', dotColor: 'bg-emerald-500', pingColor: 'bg-emerald-400' },
    { text: 'Active Problem Solver', color: 'bg-amber-500/10 dark:bg-amber-500/5 border-amber-500/20 dark:border-amber-500/10 text-amber-800 dark:text-amber-400', dotColor: 'bg-amber-500', pingColor: 'bg-amber-400' },
    { text: 'GATE CSE Aspirant', color: 'bg-indigo-500/10 dark:bg-indigo-500/5 border-indigo-500/20 dark:border-indigo-500/10 text-indigo-800 dark:text-indigo-400', dotColor: 'bg-indigo-500', pingColor: 'bg-indigo-400' },
  ];
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusBadges.length);
    }, 3500); // changes every 3.5 seconds
    return () => clearInterval(timer);
  }, []);

  // Read initial theme preference from local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.setAttribute('data-theme', savedTheme);
    } else {
      document.body.setAttribute('data-theme', 'dark');
    }
  }, []);

  const handleThemeToggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.body.setAttribute('data-theme', nextTheme);
  };

  // Monitor scrolling to handle transparent header transitioning & back-to-top buttons
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      setBackToTopVisible(window.scrollY > 400);

      // Section Tracking to Highlight Navigation items dynamically
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'certifications', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 bg-[#F5F5F7] dark:bg-[#0D0D0D] text-neutral-800 dark:text-[#E5E5E5]`}>
      {/* Canvas Dynamic Particles Backdrop */}
      <ParticleBackground theme={theme} />

      {/* STICKY GLASSMORPHIC HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#FCFCFD]/90 dark:bg-[#0D0D0D]/90 border-b border-neutral-200 dark:border-white/10 backdrop-blur-md'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo('home');
            }}
            className="font-display text-xs tracking-[0.25em] font-black uppercase group"
          >
            <span className="text-neutral-400 dark:text-white/40 group-hover:text-black group-hover:dark:text-white transition-colors duration-300">
              M.
            </span>
            PORTFOLIO
          </a>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-7">
            {['Home', 'About', 'Skills', 'Projects', 'Education', 'Certifications', 'Contact'].map((item) => {
              const target = item.toLowerCase();
              const isActive = activeSection === target;
              return (
                <a
                  key={item}
                  href={`#${target}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(target);
                  }}
                  className={`relative text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                    isActive
                      ? 'text-black dark:text-white'
                      : 'text-neutral-400 hover:text-black dark:text-white/40 dark:hover:text-white'
                  }`}
                >
                  {item}
                  {isActive && (
                    <motion.span
                      layoutId="activeBar"
                      className="absolute bottom-[-18px] left-0 right-0 h-[2px] bg-black dark:bg-white"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Control widgets (Theme switcher & Burger drawer toggle) */}
          <div className="flex items-center gap-4">
            <ThemeToggle theme={theme} onToggle={handleThemeToggle} />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#1A1A1A] text-neutral-800 dark:text-[#E5E5E5] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAV OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[70px] z-40 bg-white/95 dark:bg-[#0D0D0D]/95 border-b border-neutral-200 dark:border-white/10 backdrop-blur-xl md:hidden py-6 px-6"
          >
            <nav className="flex flex-col gap-4">
              {['Home', 'About', 'Skills', 'Projects', 'Education', 'Certifications', 'Contact'].map((item) => {
                const target = item.toLowerCase();
                const isActive = activeSection === target;
                return (
                  <a
                    key={item}
                    href={`#${target}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollTo(target);
                    }}
                    className={`text-xs font-bold uppercase tracking-wider py-2 transition-colors duration-300 ${
                      isActive ? 'text-black dark:text-white pl-2 border-l-2 border-black dark:border-white' : 'text-neutral-500 dark:text-white/40'
                    }`}
                  >
                    {item}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 max-w-5xl mx-auto px-6">
        {/* HERO SECTION */}
        <section
          id="home"
          className="min-h-screen flex flex-col justify-center items-center pt-28 pb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            {/* Pulsating Available Badge & Status Tags Container with Curved Styling */}
            <div id="home-status-badges" className="flex items-center justify-center mb-8 max-w-2xl mx-auto h-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={statusIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className={`inline-flex items-center gap-2 py-1.5 px-4 rounded-full border shadow-sm transition-colors duration-500 ${statusBadges[statusIndex].color}`}
                >
                  <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusBadges[statusIndex].pingColor}`} />
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${statusBadges[statusIndex].dotColor}`} />
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-black font-display uppercase tracking-[0.18em] select-none">
                    {statusBadges[statusIndex].text}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 mb-3 leading-[1.1]">
              Hi, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 font-black">{PERSONAL_INFO.fullName}</span>
            </h1>

            <h2 className="text-xl sm:text-2xl font-display font-semibold text-neutral-600 dark:text-neutral-300 mb-6">
              I'm a <Typewriter />
            </h2>

            <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed mb-9 font-medium">
              {PERSONAL_INFO.tagline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 mb-10 w-full sm:w-auto">
              <button
                onClick={() => handleScrollTo('projects')}
                className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-none bg-black dark:bg-white text-sm font-bold uppercase tracking-wider text-white dark:text-black cursor-pointer hover:bg-neutral-800 dark:hover:bg-white/95 shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScrollTo('contact')}
                className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-none bg-transparent border border-neutral-300 dark:border-white/10 text-sm font-bold uppercase tracking-wider text-neutral-800 dark:text-[#E5E5E5] cursor-pointer hover:border-neutral-500 dark:hover:border-white/25 transition-all duration-300"
              >
                <span>Contact Me</span>
              </button>
              <a
                href="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200" // Fallback standard downloadable asset structure
                download="Marimuthu_ATS_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-none bg-transparent border border-neutral-300 dark:border-white/10 text-sm font-bold uppercase tracking-wider text-neutral-600 dark:text-white/60 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-white/20 cursor-pointer transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social media direct icons bar */}
            <div className="flex gap-4">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl border border-neutral-200 dark:border-white/10 bg-[#FCFCFD] dark:bg-[#1A1A1A] text-neutral-500 dark:text-white/60 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-white/20 flex items-center justify-center transition-all duration-300 shadow-sm"
                title="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl border border-neutral-200 dark:border-white/10 bg-[#FCFCFD] dark:bg-[#1A1A1A] text-neutral-500 dark:text-white/60 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-white/20 flex items-center justify-center transition-all duration-300 shadow-sm"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl border border-neutral-200 dark:border-white/10 bg-[#FCFCFD] dark:bg-[#1A1A1A] text-neutral-500 dark:text-white/60 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-white/20 flex items-center justify-center transition-all duration-300 shadow-sm"
                title="LeetCode Profile"
              >
                <LeetCodeIcon className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="w-11 h-11 rounded-xl border border-neutral-200 dark:border-white/10 bg-[#FCFCFD] dark:bg-[#1A1A1A] text-neutral-500 dark:text-white/60 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-white/20 flex items-center justify-center transition-all duration-300 shadow-sm"
                title="Email Me"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>


        </section>

        {/* ABOUT ME SECTION */}
        <section id="about" className="py-20 border-t border-neutral-200/40 dark:border-neutral-900/30">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-white/40 font-display">
              Get to know me
            </span>
            <h2 className="text-3xl font-display font-black text-neutral-900 dark:text-neutral-50 mt-1 mb-2">
              About Me
            </h2>
            <div className="w-12 h-[2px] bg-black dark:bg-white mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Story Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 p-6 sm:p-8 bg-[#FCFCFD] dark:bg-[#1A1A1A] border border-neutral-200 dark:border-white/10 rounded-xl shadow-lg"
            >
              <h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-neutral-800 dark:text-white" />
                Engineering &amp; Problem Solving
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 mb-4">
                I am a dedicated Computer Science Engineering student currently completing my B.Tech studies at{' '}
                <span className="font-semibold text-neutral-900 dark:text-white">JNN Institute of Engineering</span>. I have built a strong fundamental foundation in Python, C/C++, and JavaScript. I enjoy developing high-quality responsive layouts, offline application wrappers, and intelligent scripts.
              </p>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 mb-6">
                Beyond my coursework, I actively solve challenging algorithms on LeetCode, participate in technical hackathons, and study hard for the GATE computer science curriculum to master advanced database systems, operating structures, and compile pipelines.
              </p>

              {/* Badges metadata list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex gap-3 items-start">
                  <span className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-white/5 border border-neutral-200/50 dark:border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-neutral-800 dark:text-white">
                    <GraduationCap className="w-4 h-4 text-neutral-800 dark:text-white" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Education Focused</h4>
                    <p className="text-2xs text-neutral-500 dark:text-neutral-400">B.Tech CSE, JNN Institute of Engineering</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <span className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-white/5 border border-neutral-200/50 dark:border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-neutral-800 dark:text-white">
                    <MapPin className="w-4 h-4 text-neutral-800 dark:text-white" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Location Base</h4>
                    <p className="text-2xs text-neutral-500 dark:text-neutral-400">Tamil Nadu, India (Available remote/onsite)</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Metrics and Cockpit Dashboard Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col gap-4 justify-between"
            >
              <Counter target={2} label="Handcrafted Projects" />
              <Counter target={4} label="Credentials Held" />
              <Counter target={12} label="Technologies Tracked" />
              
              {/* Highlight CGPA block */}
              <div className="p-4 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex flex-col justify-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-white/40 mb-1">
                  Academic Standard
                </span>
                <span className="text-2xl font-display font-black text-neutral-900 dark:text-white">
                  8.6 <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">/ 10 CGPA</span>
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* COMPETENCY MATRIX SECTION */}
        <section id="skills" className="py-20 border-t border-neutral-200/40 dark:border-neutral-900/30">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-white/40 font-display">
              My Arsenal
            </span>
            <h2 className="text-3xl font-display font-black text-neutral-900 dark:text-neutral-50 mt-1 mb-2">
              Skills &amp; Competence
            </h2>
            <div className="w-12 h-[2px] bg-black dark:bg-white mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((category, idx) => {
              const IconComponent =
                category.iconName === 'Layout'
                  ? Layout
                  : category.iconName === 'Code2'
                  ? Code2
                  : Cpu;

              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 bg-[#FCFCFD] dark:bg-[#1A1A1A] border border-neutral-200 dark:border-white/10 rounded-xl shadow-lg"
                >
                  <div className="flex items-center gap-3 pb-4 mb-6 border-b border-neutral-200/50 dark:border-white/10">
                    <span className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200/50 dark:border-white/10 flex items-center justify-center text-neutral-800 dark:text-white">
                      <IconComponent className="w-5 h-5" />
                    </span>
                    <h3 className="font-display font-bold text-neutral-900 dark:text-neutral-100">
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-5">
                    {category.skills.map((skill, sIdx) => (
                      <div key={skill.name}>
                        <SkillBar skill={skill} index={sIdx} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-20 border-t border-neutral-200/40 dark:border-neutral-900/30">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-white/40 font-display">
              Handcrafted Works
            </span>
            <h2 className="text-3xl font-display font-black text-neutral-900 dark:text-neutral-50 mt-1 mb-2">
              Featured Projects
            </h2>
            <div className="w-12 h-[2px] bg-black dark:bg-white mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project) => (
              <div key={project.id}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="py-20 border-t border-neutral-200/40 dark:border-neutral-900/30">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-white/40 font-display">
              Academic Journey
            </span>
            <h2 className="text-3xl font-display font-black text-neutral-900 dark:text-neutral-50 mt-1 mb-2">
              Education
            </h2>
            <div className="w-12 h-[2px] bg-black dark:bg-white mx-auto" />
          </div>

          {/* Connected timeline */}
          <div className="relative pl-6 md:pl-10 border-l border-neutral-200 dark:border-neutral-800 max-w-3xl mx-auto flex flex-col gap-10">
            {EDUCATIONS.map((edu, idx) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Timeline connector circle node */}
                <span className="absolute left-[-31px] md:left-[-47px] top-1.5 w-4 h-4 rounded-full bg-black dark:bg-white border-4 border-neutral-100 dark:border-[#0D0D0D]" />

                <div className="p-6 bg-[#FCFCFD] dark:bg-[#1A1A1A] border border-neutral-200 dark:border-white/10 rounded-xl shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <span className="text-[10px] font-bold text-neutral-500 dark:text-white/40 font-mono block mb-1">
                        {edu.duration}
                      </span>
                      <h3 className="text-lg font-display font-bold text-neutral-900 dark:text-neutral-50 leading-snug">
                        {edu.degree}
                      </h3>
                      <p className="text-xs font-bold text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {edu.institution}
                      </p>
                    </div>
                    <span className="self-start sm:self-auto text-2xs font-bold px-3 py-1 rounded-none bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-800 dark:text-white uppercase tracking-wider">
                      {edu.cgpaOrGrade}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    {edu.description}
                  </p>

                  <div className="flex flex-wrap gap-2.5">
                    <span className="inline-flex items-center gap-1.5 text-2xs font-medium text-neutral-500 dark:text-neutral-400 py-1 px-2.5 bg-neutral-100 dark:bg-white/5 border border-neutral-200/50 dark:border-white/5 rounded-sm">
                      <Calendar className="w-3.5 h-3.5 text-neutral-800 dark:text-white" />
                      <span>{edu.expectedYear || 'Graduated'}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-2xs font-medium text-neutral-500 dark:text-neutral-400 py-1 px-2.5 bg-neutral-100 dark:bg-white/5 border border-neutral-200/50 dark:border-white/5 rounded-sm">
                      <Award className="w-3.5 h-3.5 text-neutral-800 dark:text-white" />
                      <span>{edu.statusBadge}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS SECTION */}
        <section id="certifications" className="py-20 border-t border-neutral-200/40 dark:border-neutral-900/30">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-white/40 font-display">
              Verified Credentials
            </span>
            <h2 className="text-3xl font-display font-black text-neutral-900 dark:text-neutral-50 mt-1 mb-2">
              Certifications
            </h2>
            <div className="w-12 h-[2px] bg-black dark:bg-white mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={cert.id}>
                <CertificateCard cert={cert} index={idx} />
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 border-t border-neutral-200/40 dark:border-neutral-900/30">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-white/40 font-display">
              Get in Touch
            </span>
            <h2 className="text-3xl font-display font-black text-neutral-900 dark:text-neutral-50 mt-1 mb-2">
              Contact Me
            </h2>
            <div className="w-12 h-[2px] bg-black dark:bg-white mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            {/* Contact details */}
            <div className="md:col-span-2 flex flex-col gap-6">
              <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-neutral-50">
                Let's collaborate on something great
              </h3>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                Whether you are looking to hire a software engineering intern, collaborate on an open-source tool, or ask questions about my works, feel free to drop a message!
              </p>

              <div className="flex flex-col gap-4 mt-2">
                {/* Direct Touch point 1 */}
                <div className="flex gap-4 items-center p-3.5 bg-[#FCFCFD] dark:bg-[#1A1A1A] border border-neutral-200 dark:border-white/10 rounded-xl shadow-md">
                  <span className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200/50 dark:border-white/10 flex items-center justify-center flex-shrink-0 text-neutral-800 dark:text-white animate-pulse">
                    <Mail className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="text-3xs font-bold uppercase tracking-widest text-neutral-400">Email Me</span>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors block">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Direct Touch point 2 */}
                <div className="flex gap-4 items-center p-3.5 bg-[#FCFCFD] dark:bg-[#1A1A1A] border border-neutral-200 dark:border-white/10 rounded-xl shadow-md">
                  <span className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200/50 dark:border-white/10 flex items-center justify-center flex-shrink-0 text-neutral-800 dark:text-white">
                    <Phone className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="text-3xs font-bold uppercase tracking-widest text-neutral-400">Call Me</span>
                    <a href={`tel:${PERSONAL_INFO.phone}`} className="text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors block">
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-3">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-neutral-200 dark:border-white/10 bg-[#FCFCFD] dark:bg-[#0A0A0A] py-10 text-neutral-500 dark:text-white/40">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h4 className="font-display font-black text-base text-neutral-900 dark:text-neutral-50 tracking-tight mb-1">
              MARIMUTHU<span className="text-black dark:text-white">.</span>
            </h4>
            <p className="text-2xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Computer Science Student &amp; Developer
            </p>
          </div>

          <div className="flex gap-4">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={PERSONAL_INFO.leetcode} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
              <LeetCodeIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="text-2xs text-center sm:text-right font-medium">
            <p>&copy; {new Date().getFullYear()} Marimuthu A. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* FLOAT BACK TO TOP BUTTON */}
      <AnimatePresence>
        {backToTopVisible && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-black shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 border border-neutral-200 dark:border-white/10"
            aria-label="Back to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
