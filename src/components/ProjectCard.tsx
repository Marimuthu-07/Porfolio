import { Github, ExternalLink, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="group relative flex flex-col h-full bg-[#FCFCFD] dark:bg-[#1A1A1A] border border-neutral-200 dark:border-white/10 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-neutral-300 hover:dark:border-white/20 transition-all duration-500"
    >
      {/* Decorative Glow on Hover */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.02)_0%,_transparent_75%)] pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-500" />

      {/* SVG Responsive Visual Showcase */}
      <div className="relative overflow-hidden h-[240px] bg-neutral-900 flex items-center justify-center p-6 border-b border-neutral-200/50 dark:border-neutral-800/60">
        {project.visualType === 'learnvault' ? (
          <svg viewBox="0 0 600 340" width="100%" height="100%" className="w-full h-full transition-transform duration-500 group-hover:scale-[1.015]" aria-hidden="true">
            {/* Background */}
            <rect x="0" y="0" width="600" height="340" rx="8" fill="#05070c" />
            <rect x="0" y="0" width="600" height="340" rx="8" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

            {/* Sidebar */}
            <rect x="0" y="0" width="130" height="340" rx="8" fill="#080a11" />
            <path d="M130,0 L130,340" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

            {/* Logo Section */}
            <g transform="translate(12, 16)">
              {/* Cap Icon */}
              <polygon points="12,6 20,2 28,6 20,10" fill="#6366f1" />
              <path d="M28,6 L28,12" stroke="#6366f1" strokeWidth="1" />
              <path d="M14,8 L14,12 C14,14 26,14 26,12 L26,8" fill="#6366f1" opacity="0.8" />
              {/* Text */}
              <text x="36" y="8" fontFamily="var(--font-sans)" fontWeight="bold" fontSize="10" fill="#ffffff">LearnVault</text>
              <text x="36" y="15" fontFamily="var(--font-mono)" fontSize="5.5" fill="rgba(255,255,255,0.4)" letterSpacing="0.2">STUDENT CORE v1.2</text>
            </g>

            {/* Profile Box */}
            <rect x="10" y="44" width="110" height="36" rx="5" fill="#0e111b" stroke="rgba(255,255,255,0.03)" />
            <circle cx="24" cy="62" r="10" fill="#4f46e5" />
            <text x="24" y="65" fontFamily="var(--font-sans)" fontWeight="bold" fontSize="8" fill="#ffffff" textAnchor="middle">MA</text>
            
            <text x="40" y="59" fontFamily="var(--font-sans)" fontWeight="600" fontSize="8.5" fill="#ffffff">Mari</text>
            <text x="40" y="68" fontFamily="var(--font-mono)" fontSize="5.5" fill="rgba(255,255,255,0.35)">marimuthu.a...</text>

            {/* Active Meter */}
            <rect x="10" y="86" width="110" height="15" rx="3" fill="#0e111b" />
            <text x="16" y="96" fontFamily="var(--font-mono)" fontSize="5" fontWeight="600" fill="rgba(255,255,255,0.4)" letterSpacing="0.2">ACTIVE METER</text>
            <rect x="94" y="89" width="22" height="9" rx="2" fill="rgba(249,115,22,0.12)" />
            <text x="105" y="96" fontFamily="var(--font-mono)" fontSize="5.5" fontWeight="bold" fill="#f97316" textAnchor="middle">🔥 1d</text>

            {/* Core Views Title */}
            <text x="12" y="118" fontFamily="var(--font-mono)" fontSize="5" fontWeight="bold" fill="rgba(255,255,255,0.3)" letterSpacing="0.5">VAULT CORE VIEWS</text>

            {/* Dashboard Item (Active) */}
            <rect x="8" y="126" width="114" height="20" rx="3.5" fill="rgba(99,102,241,0.08)" stroke="rgba(99,102,241,0.15)" strokeWidth="0.5" />
            <rect x="8" y="130" width="2" height="12" rx="1" fill="#6366f1" />
            <text x="18" y="139" fontFamily="var(--font-sans)" fontWeight="600" fontSize="7.5" fill="#a5b4fc">🎛️ Dashboard</text>

            {/* Other items */}
            <text x="18" y="161" fontFamily="var(--font-sans)" fontSize="7.5" fill="rgba(255,255,255,0.5)">📖 Topics Vault</text>
            <text x="18" y="181" fontFamily="var(--font-sans)" fontSize="7.5" fill="rgba(255,255,255,0.5)">📅 Revision Calendar</text>

            {/* Record Button */}
            <rect x="8" y="202" width="114" height="22" rx="4.5" fill="#2563eb" />
            <text x="65" y="215" fontFamily="var(--font-sans)" fontWeight="bold" fontSize="7.5" fill="#ffffff" textAnchor="middle">+ Record New Topic</text>

            {/* Close Session at bottom */}
            <text x="18" y="325" fontFamily="var(--font-sans)" fontSize="7" fill="rgba(255,255,255,0.4)">🚪 Close Session Log</text>


            {/* Main Area Content */}
            {/* Header */}
            <text x="145" y="18" fontFamily="var(--font-mono)" fontSize="5" fontWeight="bold" fill="rgba(255,255,255,0.4)" letterSpacing="0.8">CORE PORTAL WORKSPACE</text>
            <text x="145" y="30" fontFamily="var(--font-display)" fontWeight="800" fontSize="9.5" fill="#ffffff" letterSpacing="0.2">ACADEMIC DASHBOARD ANALYTICS</text>
            
            <rect x="520" y="15" width="68" height="16" rx="3.5" fill="#0d111d" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            <text x="554" y="25" fontFamily="var(--font-sans)" fontSize="6.5" fontWeight="500" fill="#ffffff" textAnchor="middle">+ Log New Topic</text>

            {/* Giant Welcome Banner */}
            <rect x="145" y="44" width="443" height="66" rx="6" fill="#0a0d1d" stroke="rgba(99,102,241,0.05)" />
            {/* Verified badge */}
            <rect x="157" y="54" width="60" height="12" rx="6" fill="rgba(168,85,247,0.1)" stroke="rgba(168,85,247,0.2)" strokeWidth="0.5" />
            <text x="187" y="62" fontFamily="var(--font-sans)" fontWeight="bold" fontSize="5" fill="#c084fc" textAnchor="middle">🎓 Vault Verified</text>
            
            <text x="157" y="80" fontFamily="var(--font-display)" fontWeight="800" fontSize="11" fill="#ffffff">
              Good evening, <tspan fill="#a78bfa">Mari!</tspan>
            </text>
            <text x="157" y="91" fontFamily="var(--font-sans)" fontSize="6.2" fill="rgba(255,255,255,0.45)">
              Welcome back to your Study Vault. You currently have 0 topics logged, with 0 slated in
            </text>
            <text x="157" y="98" fontFamily="var(--font-sans)" fontSize="6.2" fill="rgba(255,255,255,0.45)">
              active revision. Connect new topics or review calendars below!
            </text>

            {/* Right side banner statistics */}
            {/* Streak Balance */}
            <rect x="465" y="52" width="55" height="50" rx="5" fill="#070914" stroke="rgba(255,255,255,0.02)" />
            <text x="492.5" y="62" fontFamily="var(--font-mono)" fontSize="5" fill="rgba(255,255,255,0.35)" textAnchor="middle" fontWeight="bold">Streak Balance</text>
            <text x="492.5" y="84" fontFamily="var(--font-mono)" fontSize="14" fill="#ea580c" textAnchor="middle" fontWeight="900">1d</text>

            {/* Completion */}
            <rect x="525" y="52" width="55" height="50" rx="5" fill="#070914" stroke="rgba(255,255,255,0.02)" />
            <text x="552.5" y="62" fontFamily="var(--font-mono)" fontSize="5" fill="rgba(255,255,255,0.35)" textAnchor="middle" fontWeight="bold">Completion</text>
            <text x="552.5" y="84" fontFamily="var(--font-mono)" fontSize="14" fill="#10b981" textAnchor="middle" fontWeight="900">0%</text>


            {/* Row of 4 Stats Cards */}
            {/* Card 1: Vault Capacity */}
            <rect x="145" y="118" width="104" height="60" rx="5" fill="#080a14" stroke="rgba(255,255,255,0.02)" />
            <text x="153" y="128" fontFamily="var(--font-mono)" fontSize="4.8" fontWeight="bold" fill="rgba(255,255,255,0.35)" letterSpacing="0.2">VAULT CAPACITY</text>
            <text x="153" y="146" fontFamily="var(--font-mono)" fontSize="13" fontWeight="bold" fill="#ffffff">0 <tspan fontSize="7.5" fill="rgba(255,255,255,0.4)" fontWeight="normal" fontFamily="var(--font-sans)">topics</tspan></text>
            <text x="153" y="162" fontFamily="var(--font-sans)" fontSize="6" fill="#10b981" fontWeight="500">✔ 0 Completed (0%)</text>
            <circle cx="228" cy="146" r="11" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2.2" />
            <text x="228" y="148.5" fontFamily="var(--font-sans)" fontSize="5" fontWeight="bold" fill="rgba(255,255,255,0.4)" textAnchor="middle">0%</text>

            {/* Card 2: Learning Streak */}
            <rect x="257" y="118" width="104" height="60" rx="5" fill="#080a14" stroke="rgba(255,255,255,0.02)" />
            <text x="265" y="128" fontFamily="var(--font-mono)" fontSize="4.8" fontWeight="bold" fill="rgba(255,255,255,0.35)" letterSpacing="0.2">LEARNING STREAK</text>
            <text x="265" y="146" fontFamily="var(--font-mono)" fontSize="13" fontWeight="bold" fill="#f97316">1 <tspan fontSize="7.5" fill="rgba(255,255,255,0.4)" fontWeight="normal" fontFamily="var(--font-sans)">days</tspan></text>
            <rect x="331" y="134" width="18" height="18" rx="3.5" fill="rgba(249,115,22,0.08)" />
            <text x="340" y="146.5" fontSize="9" textAnchor="middle">🔥</text>
            <text x="265" y="162" fontFamily="var(--font-sans)" fontSize="5.5" fill="rgba(255,255,255,0.4)">Log study stats daily</text>

            {/* Card 3: Difficulty Spectrum */}
            <rect x="369" y="118" width="104" height="60" rx="5" fill="#080a14" stroke="rgba(255,255,255,0.02)" />
            <text x="377" y="128" fontFamily="var(--font-mono)" fontSize="4.8" fontWeight="bold" fill="rgba(255,255,255,0.35)" letterSpacing="0.2">DIFFICULTY SPECTRUM</text>
            <text x="377" y="143" fontFamily="var(--font-sans)" fontSize="8" fontWeight="bold" fill="rgba(255,255,255,0.65)">Empty spectrum</text>
            <circle cx="381" cy="161" r="2" fill="#10b981" />
            <text x="386" y="163" fontFamily="var(--font-sans)" fontSize="5.5" fill="rgba(255,255,255,0.4)">Easy(0)</text>
            <circle cx="411" cy="161" r="2" fill="#a855f7" />
            <text x="416" y="163" fontFamily="var(--font-sans)" fontSize="5.5" fill="rgba(255,255,255,0.4)">Med(0)</text>
            <circle cx="441" cy="161" r="2" fill="#ef4444" />
            <text x="446" y="163" fontFamily="var(--font-sans)" fontSize="5.5" fill="rgba(255,255,255,0.4)">Hard(0)</text>

            {/* Card 4: Study Velocity */}
            <rect x="481" y="118" width="104" height="60" rx="5" fill="#080a14" stroke="rgba(255,255,255,0.02)" />
            <text x="489" y="128" fontFamily="var(--font-mono)" fontSize="4.8" fontWeight="bold" fill="rgba(255,255,255,0.35)" letterSpacing="0.2">STUDY VELOCITY</text>
            <rect x="551" y="123" width="24" height="8" rx="2" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.2)" strokeWidth="0.5" />
            <text x="563" y="129" fontFamily="var(--font-sans)" fontSize="4.5" fontWeight="bold" fill="#10b981" textAnchor="middle">Active</text>
            <text x="489" y="138" fontFamily="var(--font-sans)" fontSize="6" fill="rgba(255,255,255,0.4)">Last 7 Days Activity</text>
            <g transform="translate(489, 158)" fontFamily="var(--font-sans)" fontSize="5" fill="rgba(255,255,255,0.3)">
              <text x="2">W</text>
              <text x="15">T</text>
              <text x="28">F</text>
              <text x="41">S</text>
              <text x="54">S</text>
              <text x="67">M</text>
              <text x="80">T</text>
            </g>


            {/* Status Overview Bar */}
            <rect x="145" y="186" width="443" height="15" rx="3.5" fill="#090a14" stroke="rgba(255,255,255,0.02)" />
            <text x="153" y="196.5" fontSize="7.5">🧠</text>
            <text x="165" y="196" fontFamily="var(--font-sans)" fontSize="5.8" fill="rgba(255,255,255,0.45)">
              <tspan fontWeight="bold" fill="rgba(255,255,255,0.65)">Status Overview: </tspan>
              <tspan fill="#10b981">● 0 Completed</tspan>   <tspan fill="#a855f7">● 0 Revising</tspan>   <tspan fill="#eab308">● 0 Pending</tspan>
            </text>
            <text x="581" y="196" fontFamily="var(--font-sans)" fontSize="5.8" fontWeight="bold" fill="#ec4899" textAnchor="end">Target: Complete 100% of pending topics for max grade scores.</text>


            {/* Milestones Area */}
            <rect x="145" y="209" width="285" height="114" rx="5" fill="#080a14" stroke="rgba(255,255,255,0.02)" />
            <text x="155" y="221" fontFamily="var(--font-mono)" fontSize="6.5" fontWeight="bold" fill="#ffffff">RECENTLY LOGGED MILESTONES</text>
            <text x="420" y="221" fontFamily="var(--font-sans)" fontSize="5.8" fontWeight="bold" fill="#3b82f6" textAnchor="end">Browse all →</text>
            
            <circle cx="287.5" cy="246" r="14" fill="rgba(255,255,255,0.015)" />
            <text x="287.5" y="250.5" fontSize="12" textAnchor="middle">📖</text>
            <text x="287.5" y="268" fontFamily="var(--font-sans)" fontWeight="bold" fontSize="7.5" fill="#ffffff" textAnchor="middle">No learning logged yet</text>
            <text x="287.5" y="278" fontFamily="var(--font-sans)" fontSize="6.2" fill="rgba(255,255,255,0.38)" textAnchor="middle">Track topics you study to start compiling</text>
            <text x="287.5" y="285" fontFamily="var(--font-sans)" fontSize="6.2" fill="rgba(255,255,255,0.38)" textAnchor="middle">statistics and streaks instantly.</text>

            <rect x="237.5" y="296" width="100" height="14" rx="2.5" fill="#4f46e5" />
            <text x="287.5" y="305" fontFamily="var(--font-sans)" fontWeight="bold" fontSize="6.2" fill="#ffffff" textAnchor="middle">Record First Topic</text>


            {/* Category Distribution Area */}
            <rect x="438" y="209" width="150" height="114" rx="5" fill="#080a14" stroke="rgba(255,255,255,0.02)" />
            <text x="448" y="221" fontFamily="var(--font-mono)" fontSize="6.5" fontWeight="bold" fill="#ffffff">CATEGORY DISTRIBUTION</text>
            <text x="448" y="231" fontFamily="var(--font-sans)" fontSize="5.8" fill="rgba(255,255,255,0.4)">Academic Concentration:</text>
            
            <text x="448" y="249" fontFamily="var(--font-sans)" fontSize="6.8" fill="rgba(255,255,255,0.65)">General</text>
            <text x="578" y="249" fontFamily="var(--font-mono)" fontSize="6.5" fill="rgba(255,255,255,0.38)" textAnchor="end">0 items (0%)</text>
            <path d="M448,258 L578,258" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />

            <rect x="444" y="271" width="138" height="42" rx="3.5" fill="rgba(234,179,8,0.03)" stroke="rgba(234,179,8,0.1)" strokeWidth="0.5" />
            <text x="451" y="295" fontSize="11">💡</text>
            <text x="466" y="285" fontFamily="var(--font-sans)" fontSize="5.2" fill="rgba(255,255,255,0.45)">Use high categorization tags (like Computer</text>
            <text x="466" y="292" fontFamily="var(--font-sans)" fontSize="5.2" fill="rgba(255,255,255,0.45)">Science or Mathematics) for robust filters</text>
            <text x="466" y="299" fontFamily="var(--font-sans)" fontSize="5.2" fill="rgba(255,255,255,0.45)">across the vault index.</text>
          </svg>
        ) : (
          <svg viewBox="0 0 600 340" width="100%" height="100%" className="w-full h-full transition-transform duration-500 group-hover:scale-[1.015]" aria-hidden="true">
            {/* Background */}
            <rect x="0" y="0" width="600" height="340" rx="8" fill="#040209" />
            <rect x="0" y="0" width="600" height="340" rx="8" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

            {/* Sidebar */}
            <rect x="0" y="0" width="130" height="340" rx="8" fill="#090613" />
            <path d="M130,0 L130,340" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

            {/* Logo Section */}
            <g transform="translate(12, 16)">
              {/* Abstract wave icon */}
              <rect x="0" y="3" width="4" height="10" rx="2" fill="#a855f7" />
              <rect x="6" y="0" width="4" height="16" rx="2" fill="#d946ef" />
              <rect x="12" y="5" width="4" height="7" rx="2" fill="#8b5cf6" />
              {/* Text */}
              <text x="22" y="11" fontFamily="var(--font-sans)" fontWeight="900" fontSize="10" fill="#ffffff" letterSpacing="0.5">HORMONIX</text>
            </g>

            {/* Navigation items */}
            <g transform="translate(0, 48)" fontFamily="var(--font-sans)" fontSize="7.5" fill="rgba(255,255,255,0.5)">
              {/* Home */}
              <text x="18" y="12">🏠 Home</text>

              {/* Library (Active) */}
              <rect x="8" y="24" width="114" height="20" rx="3.5" fill="rgba(168,85,247,0.08)" stroke="rgba(168,85,247,0.15)" strokeWidth="0.5" />
              <rect x="8" y="28" width="2" height="12" rx="1" fill="#a855f7" />
              <text x="18" y="37" fontWeight="600" fill="#d8b4fe">🎵 Library</text>

              {/* Other Items */}
              <text x="18" y="61">💽 Albums</text>
              <text x="18" y="81">👥 Artists</text>
              <text x="18" y="101">📋 Playlists</text>
              <text x="18" y="121">💜 Favorites</text>
              <text x="18" y="141">🕒 History</text>
              <text x="18" y="161">⚙ Settings</text>
            </g>

            {/* Main Area Header / Top bar */}
            {/* Search Box */}
            <rect x="145" y="13" width="150" height="17" rx="3" fill="#0d0a1a" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            <text x="153" y="24" fontFamily="var(--font-sans)" fontSize="6" fill="rgba(255,255,255,0.3)">🔍 Search track, artist, album, genre...</text>

            {/* Import Buttons */}
            <rect x="495" y="13" width="45" height="17" rx="3.5" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            <text x="517.5" y="24" fontFamily="var(--font-sans)" fontSize="5.5" fontWeight="bold" fill="rgba(255,255,255,0.6)" textAnchor="middle">📤 Import</text>

            <rect x="545" y="13" width="45" height="17" rx="3.5" fill="#a855f7" />
            <text x="567.5" y="24" fontFamily="var(--font-sans)" fontSize="5.5" fontWeight="bold" fill="#ffffff" textAnchor="middle">📁 Folders</text>


            {/* Library Header */}
            <text x="145" y="50" fontFamily="var(--font-mono)" fontSize="5.5" fontWeight="bold" fill="rgba(255,255,255,0.4)" letterSpacing="0.5">LIBRARY CONTROL CENTER</text>
            
            {/* All Tracks badge (Active) */}
            <rect x="255" y="42" width="36" height="11" rx="2" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.3)" strokeWidth="0.5" />
            <text x="273" y="49" fontFamily="var(--font-sans)" fontWeight="bold" fontSize="4.8" fill="#d8b4fe" textAnchor="middle">All Tracks</text>

            <text x="300" y="49" fontFamily="var(--font-sans)" fontSize="4.8" fill="rgba(255,255,255,0.4)">📁 Folder Browser</text>
            <text x="360" y="49" fontFamily="var(--font-sans)" fontSize="4.8" fill="rgba(255,255,255,0.4)">✨ Smart Collections</text>
            <text x="425" y="49" fontFamily="var(--font-sans)" fontSize="4.8" fill="rgba(255,255,255,0.4)">🔧 Diagnostics & Repair</text>
            <text x="498" y="49" fontFamily="var(--font-sans)" fontSize="4.8" fill="rgba(255,255,255,0.4)">🔌 Extensions</text>
            <text x="542" y="49" fontFamily="var(--font-sans)" fontSize="4.8" fill="rgba(255,255,255,0.4)">⚡ Profiler</text>


            {/* Tracklist Table */}
            {/* Table Headers */}
            <g transform="translate(145, 68)" fontFamily="var(--font-mono)" fontSize="5.2" fontWeight="bold" fill="rgba(255,255,255,0.3)">
              <text x="0" y="0">#</text>
              <text x="16" y="0">Cover</text>
              <text x="42" y="0">Title</text>
              <text x="170" y="0">Artist</text>
              <text x="290" y="0">Album</text>
              <text x="390" y="0">Plays</text>
              <text x="430" y="0">🕒</text>
            </g>
            <line x1="145" y1="73" x2="590" y2="73" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

            {/* Row Helper Mac for album gradients */}
            <defs>
              <linearGradient id="rowGrad1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f43f5e" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient>
              <linearGradient id="rowGrad2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#10b981" /></linearGradient>
              <linearGradient id="rowGrad3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#eab308" /><stop offset="100%" stopColor="#f97316" /></linearGradient>
              <linearGradient id="rowGrad4" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ec4899" /><stop offset="100%" stopColor="#ef4444" /></linearGradient>
              <linearGradient id="rowGrad5" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#14b8a6" /><stop offset="100%" stopColor="#6366f1" /></linearGradient>
              <linearGradient id="rowGrad6" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#ec4899" /></linearGradient>
              <linearGradient id="rowGrad7" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#06b6d4" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient>
            </defs>

            {/* Rows */}
            <g transform="translate(145, 84)" fontFamily="var(--font-sans)" fontSize="6" fill="rgba(255,255,255,0.45)">
              {/* Row 1 */}
              <g transform="translate(0, 0)">
                <text x="0" y="8" fontFamily="var(--font-mono)" fontSize="5.5" fill="rgba(255,255,255,0.2)">1</text>
                <rect x="16" y="1" width="16" height="9" rx="1.5" fill="url(#rowGrad1)" />
                <text x="42" y="8" fontWeight="bold" fill="#ffffff">Aadi Maasa Kaathadikka</text>
                <text x="170" y="8">Srikanth Deva/ Udit Narayan/ Anuradha</text>
                <text x="290" y="8">Thottupaar (Original Motion Picture)</text>
                <text x="390" y="8" fontFamily="var(--font-mono)" fontSize="5.5">142</text>
                <text x="430" y="8" fontFamily="var(--font-mono)" fontSize="5.5">5:33</text>
              </g>
              {/* Row 2 */}
              <g transform="translate(0, 15)">
                <text x="0" y="8" fontFamily="var(--font-mono)" fontSize="5.5" fill="rgba(255,255,255,0.2)">2</text>
                <rect x="16" y="1" width="16" height="9" rx="1.5" fill="url(#rowGrad2)" />
                <text x="42" y="8" fontWeight="bold" fill="#ffffff">Aai Mailapuru</text>
                <text x="170" y="8">Srikanth Deva/Manikka Vinayagam/...</text>
                <text x="290" y="8">Aai (Original Motion Picture Soundtrack)</text>
                <text x="390" y="8" fontFamily="var(--font-mono)" fontSize="5.5">98</text>
                <text x="430" y="8" fontFamily="var(--font-mono)" fontSize="5.5">5:18</text>
              </g>
              {/* Row 3 */}
              <g transform="translate(0, 30)">
                <text x="0" y="8" fontFamily="var(--font-mono)" fontSize="5.5" fill="rgba(255,255,255,0.2)">3</text>
                <rect x="16" y="1" width="16" height="9" rx="1.5" fill="url(#rowGrad3)" />
                <text x="42" y="8" fontWeight="bold" fill="#ffffff">Aathangara Orathil</text>
                <text x="170" y="8">Harris Jayaraj/ Gana Bala/ MC Vickey</text>
                <text x="290" y="8">Yaan (Original Motion Picture)</text>
                <text x="390" y="8" fontFamily="var(--font-mono)" fontSize="5.5">215</text>
                <text x="430" y="8" fontFamily="var(--font-mono)" fontSize="5.5">4:24</text>
              </g>
              {/* Row 4 */}
              <g transform="translate(0, 45)">
                <text x="0" y="8" fontFamily="var(--font-mono)" fontSize="5.5" fill="rgba(255,255,255,0.2)">4</text>
                <rect x="16" y="1" width="16" height="9" rx="1.5" fill="url(#rowGrad4)" />
                <text x="42" y="8" fontWeight="bold" fill="#ffffff">Achacho</text>
                <text x="170" y="8">Hiphop Tamizha/ Kharesma Ravichandran...</text>
                <text x="290" y="8">Achacho (From "Aranmanai 4")</text>
                <text x="390" y="8" fontFamily="var(--font-mono)" fontSize="5.5">350</text>
                <text x="430" y="8" fontFamily="var(--font-mono)" fontSize="5.5">3:13</text>
              </g>
              {/* Row 5 */}
              <g transform="translate(0, 60)">
                <text x="0" y="8" fontFamily="var(--font-mono)" fontSize="5.5" fill="rgba(255,255,255,0.2)">5</text>
                <rect x="16" y="1" width="16" height="9" rx="1.5" fill="url(#rowGrad5)" />
                <text x="42" y="8" fontWeight="bold" fill="#ffffff">Akkam Pakkam</text>
                <text x="170" y="8">Sooraj Santhosh, Ramya Nambeesan</text>
                <text x="290" y="8">Munnodi (Original Motion Picture)</text>
                <text x="390" y="8" fontFamily="var(--font-mono)" fontSize="5.5">180</text>
                <text x="430" y="8" fontFamily="var(--font-mono)" fontSize="5.5">5:05</text>
              </g>
              {/* Row 6 */}
              <g transform="translate(0, 75)">
                <text x="0" y="8" fontFamily="var(--font-mono)" fontSize="5.5" fill="rgba(255,255,255,0.2)">6</text>
                <rect x="16" y="1" width="16" height="9" rx="1.5" fill="url(#rowGrad6)" />
                <text x="42" y="8" fontWeight="bold" fill="#ffffff">Appa Amma Vilayatta</text>
                <text x="170" y="8">Mani Sharma/Ranjith/Saindhavi</text>
                <text x="290" y="8">Padikkathavan (Original Motion Picture)</text>
                <text x="390" y="8" fontFamily="var(--font-mono)" fontSize="5.5">240</text>
                <text x="430" y="8" fontFamily="var(--font-mono)" fontSize="5.5">4:45</text>
              </g>
              {/* Row 7 */}
              <g transform="translate(0, 90)">
                <text x="0" y="8" fontFamily="var(--font-mono)" fontSize="5.5" fill="rgba(255,255,255,0.2)">7</text>
                <rect x="16" y="1" width="16" height="9" rx="1.5" fill="url(#rowGrad7)" />
                <text x="42" y="8" fontWeight="bold" fill="#ffffff">Appan Panna</text>
                <text x="170" y="8">Anuradha Sriram/ Pushpavanam Kuppu...</text>
                <text x="290" y="8">Hits of Anuradha Sriram</text>
                <text x="390" y="8" fontFamily="var(--font-mono)" fontSize="5.5">110</text>
                <text x="430" y="8" fontFamily="var(--font-mono)" fontSize="5.5">4:47</text>
              </g>
            </g>

            {/* Bottom Playback bar */}
            <line x1="130" y1="298" x2="600" y2="298" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            
            {/* Left side info (No song loaded) */}
            <rect x="145" y="306" width="22" height="22" rx="3.5" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" />
            <text x="145" y="319" fontSize="11" textAnchor="middle" transform="translate(11, 0)">🎵</text>
            <text x="174" y="314" fontFamily="var(--font-sans)" fontWeight="bold" fontSize="6.5" fill="rgba(255,255,255,0.35)">No song loaded</text>
            <text x="174" y="323" fontFamily="var(--font-sans)" fontSize="5" fill="rgba(255,255,255,0.2)">Choose a song to start playing</text>

            {/* Playback Controls (Center) */}
            <text x="285" y="316" fontSize="7" fill="rgba(255,255,255,0.4)" textAnchor="middle">🔀</text>
            <text x="305" y="316" fontSize="7" fill="rgba(255,255,255,0.4)" textAnchor="middle">⏮</text>
            
            <circle cx="330" cy="313" r="8.5" fill="#a855f7" />
            <polygon points="328.5,310 333.5,313 328.5,316" fill="#ffffff" />

            <text x="355" y="316" fontSize="7" fill="rgba(255,255,255,0.4)" textAnchor="middle">⏭</text>
            <text x="375" y="316" fontSize="7" fill="rgba(255,255,255,0.4)" textAnchor="middle">🔁</text>

            {/* Slider bar */}
            <rect x="250" y="328" width="160" height="1.5" rx="1" fill="rgba(255,255,255,0.06)" />
            <text x="242" y="330" fontFamily="var(--font-mono)" fontSize="4.8" fill="rgba(255,255,255,0.25)" textAnchor="end">0:00</text>
            <text x="418" y="330" fontFamily="var(--font-mono)" fontSize="4.8" fill="rgba(255,255,255,0.25)">0:00</text>

            {/* Sound Level control on right */}
            <text x="508" y="316" fontSize="7" fill="rgba(255,255,255,0.35)" textAnchor="middle">🔊</text>
            <rect x="517" y="314" width="38" height="1.5" rx="1" fill="rgba(255,255,255,0.06)" />
            <rect x="517" y="314" width="26" height="1.5" rx="1" fill="#a855f7" />
            <circle cx="543" cy="314.7" r="2" fill="#ffffff" />
            
            <text x="568" y="316" fontSize="7" fill="rgba(255,255,255,0.35)" textAnchor="middle">🗖</text>
            <text x="582" y="316" fontSize="7" fill="rgba(255,255,255,0.35)" textAnchor="middle">📋</text>
          </svg>
        )}
      </div>

      {/* Project Card Text Content */}
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-white/40 font-mono mb-1.5">
          {project.subtitle}
        </span>
        <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-neutral-100 mb-3 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-5">
          {project.description}
        </p>

        {/* Dynamic Project Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium tracking-tight px-2.5 py-0.5 bg-neutral-100 dark:bg-white/5 border border-neutral-200/50 dark:border-white/5 text-neutral-600 dark:text-white/60 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Dynamic Project Bullet Achievements */}
        <div className="flex flex-col gap-2.5 mb-6">
          {project.bullets.map((bullet, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-600 dark:text-neutral-400">
              <span className="flex-shrink-0 w-4 h-4 rounded-full bg-brand-success/10 dark:bg-emerald-500/20 flex items-center justify-center mt-0.5">
                <Check className="w-2.5 h-2.5 text-brand-success dark:text-emerald-400" />
              </span>
              <span>{bullet}</span>
            </div>
          ))}
        </div>

        {/* Project Links Section */}
        <div className="flex gap-3 mt-auto pt-4 border-t border-neutral-100 dark:border-white/5">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 border border-neutral-200 dark:border-white/10 bg-transparent text-neutral-600 dark:text-white/60 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-white/20 text-xs uppercase tracking-widest font-bold rounded-none transition-all duration-300 cursor-pointer"
          >
            <Github className="w-4 h-4" />
            <span>Code</span>
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-white/90 text-xs uppercase tracking-widest font-bold rounded-none transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-pointer"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
