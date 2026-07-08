import React, { useState, useEffect } from 'react';
import { Award, ArrowUpRight, ShieldCheck, X, UploadCloud, Trash2, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Certification } from '../types';

interface CertificateCardProps {
  cert: Certification;
  index: number;
}

export default function CertificateCard({ cert, index }: CertificateCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customImg, setCustomImg] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Load custom persisted certificate image from localStorage on mount
  useEffect(() => {
    const savedImg = localStorage.getItem(`cert_img_${cert.id}`);
    if (savedImg) {
      setCustomImg(savedImg);
    }
  }, [cert.id]);

  // Handle custom image upload
  const processFile = (file: File) => {
    if (file && (file.type.startsWith('image/') || file.name.endsWith('.pdf'))) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setCustomImg(base64String);
        localStorage.setItem(`cert_img_${cert.id}`, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomImg(null);
    localStorage.removeItem(`cert_img_${cert.id}`);
  };

  // Custom high-fidelity brand SVGs
  const renderLogo = () => {
    if (cert.iconType === 'google') {
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
        </svg>
      );
    }
    if (cert.iconType === 'python') {
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
          <path d="M11.87 0c-1.85 0-3.34.14-4.22.42-1.35.43-1.87 1.25-1.87 2.5v1.88h6.24c1.84 0 3.33 1.48 3.33 3.33v3.13h1.87c1.47 0 2.29-.53 2.71-1.88.42-.87.42-2.37.42-4.22s0-3.35-.42-4.22c-.42-1.35-1.24-1.87-2.71-1.87L11.87 0zm-2.81 1.88c.39 0 .63.23.63.62 0 .39-.24.63-.63.63a.62.62 0 01-.62-.63c0-.39.23-.62.62-.62zm2.81 7.29c-1.47 0-2.29.52-2.7 1.87-.43.88-.43 2.38-.43 4.22s0 3.35.43 4.22c.41 1.35 1.23 1.88 2.7 1.88h5.31c1.85 0 3.34-.14 4.22-.42 1.35-.43 1.87-1.25 1.87-2.5v-1.88h-6.24c-1.84 0-3.33-1.48-3.33-3.33V9.17H11.87zm3.13 10.94c.39 0 .62.24.62.63 0 .39-.23.62-.62.62a.62.62 0 01-.63-.62c0-.39.24-.63.63-.63zm-6.25-8.44c-1.84 0-3.33-1.48-3.33-3.33V5.21H3.54c-1.47 0-2.29.52-2.7 1.87C.4 7.95.4 9.45.4 11.3s0 3.35.41 4.22c.42 1.35 1.24 1.88 2.7 1.88h1.88V11.2c0-1.85 1.48-3.33 3.33-3.33h3.13V5.21c0-1.47-.53-2.29-1.88-2.71a16.8 16.8 0 00-1.24-.13z" fill="#3776AB" />
        </svg>
      );
    }
    // Skill India / NSDC Tricolor star emblem
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="none" stroke="#FF9933" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="8" fill="none" stroke="#128807" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4.5" fill="none" stroke="#000080" strokeWidth="1.2" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI) / 4;
          return (
            <line
              key={i}
              x1={12}
              y1={12}
              x2={12 + 4.5 * Math.cos(angle)}
              y2={12 + 4.5 * Math.sin(angle)}
              stroke="#000080"
              strokeWidth="0.8"
            />
          );
        })}
      </svg>
    );
  };

  // Beautiful interactive circular/shield badge graphics matching the screenshot
  const renderBadgeVisual = (id: string) => {
    if (id === 'google-ai-essentials') {
      return (
        <div className="relative w-12 h-12 flex-shrink-0 select-none">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_2px_8px_rgba(168,85,247,0.25)]">
            <defs>
              <radialGradient id="ai-bg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1E0B36" />
                <stop offset="100%" stopColor="#080211" />
              </radialGradient>
              <linearGradient id="ai-border" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D946EF" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
              <radialGradient id="ai-glow" cx="50%" cy="50%" r="40%">
                <stop offset="0%" stopColor="#EC4899" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ai-core-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="50%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#60A5FA" />
              </linearGradient>
            </defs>

            {/* Badge Background */}
            <circle cx="60" cy="60" r="54" fill="url(#ai-bg)" stroke="url(#ai-border)" strokeWidth="1.8" />
            
            {/* Ambient Glow */}
            <circle cx="60" cy="60" r="44" fill="url(#ai-glow)" />

            {/* Inner dashed track */}
            <circle cx="60" cy="60" r="46" fill="none" stroke="#8B5CF6" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.5" />

            {/* Orbit lines */}
            <ellipse cx="60" cy="60" rx="36" ry="14" fill="none" stroke="url(#ai-border)" strokeWidth="1" strokeOpacity="0.6" transform="rotate(-15 60 60)" />
            <ellipse cx="60" cy="60" rx="36" ry="14" fill="none" stroke="url(#ai-border)" strokeWidth="1" strokeOpacity="0.6" transform="rotate(45 60 60)" />

            {/* Central Glowing Core representing AI/Data */}
            <circle cx="60" cy="60" r="14" fill="url(#ai-core-grad)" />
            <circle cx="60" cy="60" r="10" fill="#080211" />
            <circle cx="60" cy="60" r="5" fill="url(#ai-border)" />

            {/* Orbiting particles */}
            <circle cx="34" cy="48" r="2" fill="#F472B6" />
            <circle cx="86" cy="72" r="2.5" fill="#60A5FA" />
            <circle cx="48" cy="84" r="1.5" fill="#C084FC" />
            <circle cx="72" cy="36" r="2" fill="#D946EF" />

            {/* Tiny stars */}
            <path d="M60,18 L61,22 L65,23 L61,24 L60,28 L59,24 L55,23 L59,22 Z" fill="#FFF" opacity="0.8" />
            <path d="M36,70 L36.5,72 L38.5,72.5 L36.5,73 L36,75 L35.5,73 L33.5,72.5 L35.5,72 Z" fill="#FFF" opacity="0.6" />
            <path d="M84,40 L84.5,42 L86.5,42.5 L84.5,43 L84,45 L83.5,43 L81.5,42.5 L83.5,42 Z" fill="#FFF" opacity="0.6" />
          </svg>
        </div>
      );
    }
    if (id === 'google-prompting-essentials') {
      return (
        <div className="relative w-12 h-12 flex-shrink-0 select-none">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_2px_8px_rgba(20,184,166,0.25)]">
            <defs>
              <radialGradient id="prompt-bg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#051E24" />
                <stop offset="100%" stopColor="#01080A" />
              </radialGradient>
              <linearGradient id="prompt-border" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2DD4BF" />
                <stop offset="50%" stopColor="#0D9488" />
                <stop offset="100%" stopColor="#0891B2" />
              </linearGradient>
              <radialGradient id="prompt-glow" cx="50%" cy="50%" r="40%">
                <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="prompt-core" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2DD4BF" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>

            {/* Badge Background */}
            <circle cx="60" cy="60" r="54" fill="url(#prompt-bg)" stroke="url(#prompt-border)" strokeWidth="1.8" />

            {/* Ambient Glow */}
            <circle cx="60" cy="60" r="44" fill="url(#prompt-glow)" />

            {/* Concentric prompt rings */}
            <circle cx="60" cy="60" r="46" fill="none" stroke="#14B8A6" strokeWidth="0.8" strokeDasharray="4 2" strokeOpacity="0.4" />
            <circle cx="60" cy="60" r="38" fill="none" stroke="#2DD4BF" strokeWidth="0.8" strokeOpacity="0.2" />

            {/* Terminal prompt symbol '>_' in center */}
            <g transform="translate(42, 45)" stroke="url(#prompt-core)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path d="M 0,5 L 14,14 L 0,23" strokeWidth="4.5" />
              <line x1="18" y1="23" x2="32" y2="23" strokeWidth="5.5" />
            </g>

            {/* Prompt sparks and sparkles */}
            <path d="M60,18 L61,22 L65,23 L61,24 L60,28 L59,24 L55,23 L59,22 Z" fill="#2DD4BF" opacity="0.8" />
            <circle cx="85" cy="50" r="2" fill="#2DD4BF" />
            <circle cx="35" cy="80" r="1.5" fill="#06B6D4" />
            <circle cx="80" cy="80" r="2.5" fill="#14B8A6" />
            <circle cx="35" cy="40" r="1.5" fill="#5EEAD4" />
          </svg>
        </div>
      );
    }
    if (id === 'python-internshala') {
      return (
        <div className="relative w-12 h-12 flex-shrink-0 select-none">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_2px_8px_rgba(59,130,246,0.25)]">
            <defs>
              <linearGradient id="py-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B132B" />
                <stop offset="100%" stopColor="#050814" />
              </linearGradient>
              <linearGradient id="py-border" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
              <linearGradient id="py-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3776AB" />
                <stop offset="100%" stopColor="#1F4E79" />
              </linearGradient>
              <linearGradient id="py-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE873" />
                <stop offset="100%" stopColor="#FFD43B" />
              </linearGradient>
            </defs>

            {/* Badge container rounded-xl */}
            <rect x="6" y="6" width="108" height="108" rx="20" fill="url(#py-bg)" stroke="url(#py-border)" strokeWidth="1.8" />

            {/* Concentric border lines */}
            <rect x="12" y="12" width="96" height="96" rx="15" fill="none" stroke="#3B82F6" strokeWidth="0.8" strokeOpacity="0.3" />

            {/* Internshala banner label */}
            <text x="60" y="102" fill="#94A3B8" fontSize="7.5" fontWeight="900" letterSpacing="1.2" textAnchor="middle" fontFamily="monospace">
              INTERNSHALA
            </text>

            {/* Python Logo group centered */}
            <g transform="translate(36, 24) scale(2)" stroke="#0B132B" strokeWidth="0.5">
              {/* Blue top snake */}
              <path
                d="M 12,0 C 5.37,0 0,5.37 0,12 L 0,15 L 3.5,15 L 3.5,12 C 3.5,7.3 7.3,3.5 12,3.5 L 15,3.5 L 15,0 Z M 12,3 C 12.55,3 13,3.45 13,4 C 13,4.55 12.55,5 12,5 C 11.45,5 11,4.55 11,4 C 11,3.45 11.45,3 12,3 Z"
                fill="url(#py-blue)"
              />
              {/* Yellow bottom snake (rotated / offset) */}
              <path
                d="M 12,24 C 18.63,24 24,18.63 24,12 L 24,9 L 20.5,9 L 20.5,12 C 20.5,16.7 16.7,20.5 12,20.5 L 9,20.5 L 9,24 Z M 12,21 C 11.45,21 11,20.55 11,20 C 11,19.45 11.45,19 12,19 C 12.55,19 13,19.45 13,20 C 13,20.55 12.55,21 12,21 Z"
                fill="url(#py-yellow)"
              />
            </g>
          </svg>
        </div>
      );
    }
    // Skill India / NSDC Badge Shield
    return (
      <div className="relative w-12 h-12 flex-shrink-0 select-none">
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_2px_8px_rgba(229,169,60,0.25)]">
          <defs>
            <linearGradient id="shield-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5D061" />
              <stop offset="50%" stopColor="#C39B62" />
              <stop offset="100%" stopColor="#8A642B" />
            </linearGradient>
            <linearGradient id="shield-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#121814" />
              <stop offset="100%" stopColor="#060A07" />
            </linearGradient>
            <linearGradient id="india-saffron" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF9933" />
              <stop offset="100%" stopColor="#D87A1C" />
            </linearGradient>
            <linearGradient id="india-green" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#128807" />
              <stop offset="100%" stopColor="#0B5D04" />
            </linearGradient>
          </defs>

          {/* Golden Shield path */}
          <path
            d="M 60,10 L 104,22 L 104,65 C 104,92 84,111 60,117 C 36,111 16,92 16,65 L 16,22 Z"
            fill="url(#shield-bg)"
            stroke="url(#shield-gold)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Inner gold line */}
          <path
            d="M 60,16 L 98,27 L 98,65 C 98,88 80,105 60,110 C 40,105 22,88 22,65 L 22,27 Z"
            fill="none"
            stroke="url(#shield-gold)"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />

          {/* Tricolor background waves or curves behind the wheel */}
          <path d="M 28,45 C 40,38 50,48 60,45 C 70,42 80,52 92,45 L 92,55 C 80,62 70,52 60,55 C 50,58 40,48 28,55 Z" fill="url(#india-saffron)" opacity="0.15" />
          <path d="M 28,65 C 40,58 50,68 60,65 C 70,62 80,72 92,65 L 92,75 C 80,82 70,72 60,75 C 50,78 40,68 28,75 Z" fill="url(#india-green)" opacity="0.15" />

          {/* Central Ashoka Chakra structure */}
          <g transform="translate(60, 60)">
            {/* Blue outer wheel */}
            <circle cx="0" cy="0" r="22" fill="#0A0C0A" stroke="#000080" strokeWidth="2" />
            <circle cx="0" cy="0" r="18" fill="none" stroke="url(#shield-gold)" strokeWidth="1.2" />

            {/* spokes */}
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 360) / 24;
              return (
                <line
                  key={i}
                  x1="0"
                  y1="0"
                  x2={18 * Math.cos((angle * Math.PI) / 180)}
                  y2={18 * Math.sin((angle * Math.PI) / 180)}
                  stroke="#000080"
                  strokeWidth="0.8"
                />
              );
            })}

            {/* Inner hubs */}
            <circle cx="0" cy="0" r="4" fill="url(#shield-gold)" />
            <circle cx="0" cy="0" r="2" fill="#000080" />
          </g>

          {/* Skill India lettering */}
          <text x="60" y="32" fill="url(#shield-gold)" fontSize="6.5" fontWeight="900" letterSpacing="1.8" textAnchor="middle" fontFamily="sans-serif">
            SKILL INDIA
          </text>
          
          <text x="60" y="100" fill="#94A3B8" fontSize="5.5" fontWeight="700" letterSpacing="1.2" textAnchor="middle" fontFamily="sans-serif">
            NSDC ACCREDITED
          </text>
        </svg>
      </div>
    );
  };

  // Beautiful Vector Certificate graphics rendered with HTML & CSS
  const renderVectorCertificate = () => {
    const isGoogle = cert.iconType === 'google';
    const isPython = cert.iconType === 'python';
    
    if (isGoogle) {
      return (
        <div className="w-full aspect-[1.414/1] bg-white p-8 sm:p-12 border-8 border-neutral-100 shadow-md relative flex flex-col justify-between text-[#202124] overflow-hidden rounded-md select-none">
          {/* Top Google branding */}
          <div className="flex justify-between items-start">
            <div className="flex gap-1 items-center">
              <span className="font-display font-extrabold text-lg tracking-tight">Google</span>
              <span className="text-neutral-300 text-sm">|</span>
              <span className="text-xs font-semibold text-neutral-500 font-sans">Grow with Google</span>
            </div>
            <div className="text-right text-[9px] font-mono text-neutral-400">
              ID: COURSERA-{cert.id.toUpperCase()}-VERIFY
            </div>
          </div>

          {/* Certificate Body */}
          <div className="my-auto flex flex-col items-center text-center">
            <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-indigo-600 mb-4">
              Online Specialization Certificate
            </p>
            <p className="text-xs text-neutral-500 font-sans mb-1">
              This is to certify that
            </p>
            <h4 className="font-serif text-3xl font-extrabold text-neutral-900 tracking-wide italic my-3 border-b border-neutral-200 pb-2 px-10">
              Marimuthu A
            </h4>
            <p className="text-xs text-neutral-500 font-sans max-w-md leading-relaxed">
              has successfully completed all requirements and is officially certified in
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-black text-neutral-900 mt-2.5 mb-4 tracking-tight leading-none">
              {cert.name}
            </h3>
            <p className="text-[11px] text-neutral-400 font-medium">
              An online non-credit program authorized by Google and offered through Coursera
            </p>
          </div>

          {/* Signatures & Badges */}
          <div className="flex justify-between items-end border-t border-neutral-100 pt-6">
            <div className="text-left">
              <div className="font-serif italic text-xs text-neutral-700">Grow with Google Team</div>
              <div className="w-24 h-[1px] bg-neutral-200 my-1"></div>
              <div className="text-[8px] font-semibold text-neutral-400 uppercase tracking-wider">Authorized Signature</div>
            </div>

            {/* Glowing Google Badge Icon */}
            <div className="w-14 h-14 rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center shadow-inner relative">
              <div className="absolute inset-1 rounded-full border border-dashed border-indigo-200 flex items-center justify-center">
                <Award className="w-6 h-6 text-indigo-500" />
              </div>
            </div>

            <div className="text-right">
              <div className="text-[9px] font-semibold text-neutral-600">{cert.issueDate}</div>
              <div className="text-[8px] font-mono text-neutral-400">VERIFIED CREDENTIAL</div>
            </div>
          </div>
        </div>
      );
    }

    if (cert.id === 'python-skillindia') {
      return (
        <div className="w-full aspect-[1.414/1] bg-[#FDFBF7] p-8 sm:p-12 border-8 border-[#C39B62] shadow-md relative flex flex-col justify-between text-[#2D241E] overflow-hidden rounded-md select-none">
          {/* Classical Ornate Corner Decorations */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#C39B62]/30"></div>
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#C39B62]/30"></div>
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#C39B62]/30"></div>
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#C39B62]/30"></div>

          {/* Top Skill India & NSDC headers */}
          <div className="flex justify-between items-center border-b border-[#C39B62]/20 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-xs border border-amber-600/20 font-bold text-[#FF9933]">
                SI
              </div>
              <div className="text-left">
                <div className="text-[9px] font-bold tracking-wider uppercase text-[#FF9933]">Skill India</div>
                <div className="text-[7px] font-semibold uppercase text-neutral-500 tracking-wide">National Skill Dev. Corp.</div>
              </div>
            </div>
            <div className="text-center">
              <h5 className="text-[9px] font-extrabold tracking-[0.2em] text-[#128807] uppercase">NSDC Accredited</h5>
              <p className="text-[7px] text-neutral-400">Reg No: SI-NSDC-PY-2025</p>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="my-auto flex flex-col items-center text-center px-4">
            <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C39B62] mb-3">
              Certificate of Completion
            </p>
            <p className="text-[10px] text-neutral-500 font-sans italic">
              This is to certify that
            </p>
            <h4 className="font-serif text-2xl font-bold text-neutral-800 tracking-wide italic my-2 border-b border-[#C39B62]/20 pb-1.5 px-8">
              Marimuthu A
            </h4>
            <p className="text-[10px] text-neutral-500 font-sans max-w-sm leading-relaxed">
              has successfully completed the intensive classroom and hands-on laboratory assessment requirements for the program
            </p>
            <h3 className="font-display text-lg font-extrabold text-neutral-950 mt-1 mb-2 tracking-tight">
              {cert.name}
            </h3>
            <p className="text-[9px] text-[#128807] font-semibold bg-[#128807]/5 py-0.5 px-3 border border-[#128807]/10 inline-block rounded-full">
              Awarded Grade B • Joint Certification with Scholiverse Educare
            </p>
          </div>

          {/* Signatures & Stamp Seals */}
          <div className="flex justify-between items-end pt-4 border-t border-[#C39B62]/15">
            <div className="text-left">
              <div className="font-serif italic text-[10px] text-neutral-700">Academic Director</div>
              <div className="w-20 h-[1px] bg-neutral-300 my-0.5"></div>
              <div className="text-[7px] font-semibold text-neutral-400 uppercase tracking-wider">Authorized Signature</div>
            </div>

            {/* Official Looking Gold Emblem Stamp Seal */}
            <div className="w-14 h-14 rounded-full bg-[#FCF5E3] border-4 border-double border-[#C39B62] flex items-center justify-center shadow-md relative group select-none">
              <div className="absolute inset-0.5 rounded-full border border-[#C39B62] flex flex-col items-center justify-center text-[5px] font-black text-[#C39B62] uppercase tracking-[0.05em] leading-none text-center p-1">
                <span>SKILL INDIA</span>
                <span className="text-[7px] my-0.5">★</span>
                <span>NSDC APPROVED</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[8px] font-bold text-neutral-600">Issued: {cert.issueDate}</div>
              <div className="text-[7px] font-mono text-neutral-400 uppercase tracking-widest">Skill Council India</div>
            </div>
          </div>
        </div>
      );
    }

    // Default Internshala Python/Default Certificate Style
    return (
      <div className="w-full aspect-[1.414/1] bg-[#F9FBFD] p-8 sm:p-12 border-8 border-[#008BD2]/30 shadow-md relative flex flex-col justify-between text-[#1E2E3C] overflow-hidden rounded-md select-none">
        {/* Ornate corner widgets */}
        <div className="absolute top-0 left-0 w-3 h-3 bg-[#008BD2]"></div>
        <div className="absolute top-0 right-0 w-3 h-3 bg-[#008BD2]"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 bg-[#008BD2]"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#008BD2]"></div>

        {/* Top Header branding */}
        <div className="flex justify-between items-center pb-4 border-b border-neutral-200">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg bg-[#008BD2] flex items-center justify-center text-white font-black text-sm">
              is
            </div>
            <span className="font-display font-extrabold text-sm tracking-tight text-[#1E2E3C]">internshala</span>
            <span className="text-xs text-neutral-400 font-sans uppercase tracking-widest">trainings</span>
          </div>
          <span className="text-[8px] font-mono text-neutral-400">No: IS-PY-{cert.id.toUpperCase()}</span>
        </div>

        {/* Certificate Body */}
        <div className="my-auto flex flex-col items-center text-center px-4">
          <p className="text-[9px] uppercase font-bold tracking-[0.3em] text-[#008BD2] mb-3">
            Certificate of Training completion
          </p>
          <p className="text-[10px] text-neutral-500 font-sans italic">
            This is to certify that
          </p>
          <h4 className="font-serif text-2xl font-bold text-neutral-800 tracking-wide italic my-1.5 border-b border-neutral-200 pb-1 px-8">
            Marimuthu A
          </h4>
          <p className="text-[10px] text-neutral-500 font-sans max-w-sm leading-relaxed">
            has successfully completed a six-week intensive online training module in
          </p>
          <h3 className="font-display text-lg font-black text-[#1E2E3C] mt-1 mb-2 tracking-tight">
            {cert.name}
          </h3>
          <p className="text-[9px] text-neutral-400 font-medium">
            The training consisted of Python Programming Basics, Object Oriented Programming, Database Integration, and GUI Application development labs
          </p>
        </div>

        {/* Signatures & stamps */}
        <div className="flex justify-between items-end pt-4 border-t border-neutral-200">
          <div className="text-left">
            <div className="font-serif italic text-[10px] text-[#1E2E3C]/80">Founder & CEO, Internshala</div>
            <div className="w-20 h-[1px] bg-neutral-300 my-0.5"></div>
            <div className="text-[7px] font-semibold text-neutral-400 uppercase tracking-wider">Authorized Representative</div>
          </div>

          {/* Verification details */}
          <div className="text-right">
            <div className="text-[8px] font-bold text-neutral-600">Issued: {cert.issueDate}</div>
            <div className="text-[7px] text-[#008BD2] font-semibold">VERIFIED INTERNSHALA TRAINING</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* CARD COMPONENT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
        className="group relative flex flex-col p-6 sm:p-7 bg-[#FCFCFD] dark:bg-[#131313] border border-neutral-200 dark:border-neutral-800/80 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:border-neutral-300 dark:hover:border-neutral-700/80 transition-all duration-300 cursor-pointer h-full"
        onClick={() => setIsOpen(true)}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.01)_0%,_transparent_60%)] pointer-events-none" />

        {/* Top Header: Logo box and View details eye */}
        <div className="flex justify-between items-start mb-5">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-[#1D1D1D] text-neutral-800 dark:text-white flex items-center justify-center border border-neutral-200/50 dark:border-neutral-800 group-hover:scale-105 transition-transform duration-300">
            {renderLogo()}
          </div>
          
          <button
            className="w-7 h-7 rounded-lg bg-neutral-50 dark:bg-white/5 border border-neutral-200/40 dark:border-white/5 text-neutral-400 hover:text-neutral-900 hover:dark:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-display font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight leading-snug mb-1 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
          {cert.name === 'Programming with Python (Grade B)' ? 'Programming with Python' : cert.name}
        </h3>

        {/* Organization */}
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium mb-2.5">
          {cert.organization === 'Internshala Trainings (Six-week intensive)' ? 'Internshala Trainings' : cert.organization}
        </p>

        {/* Large stylized Issued Date */}
        <div className="font-display font-medium text-neutral-400 dark:text-neutral-500 tracking-wide text-[15px] sm:text-base mt-1.5 mb-5 select-none">
          Issued: <span className="font-semibold">{cert.issueDate}</span>
        </div>

        {/* Rich Badge Container exactly like the screenshot */}
        <div className="bg-neutral-50 dark:bg-[#0C0C0C] border border-neutral-200/60 dark:border-neutral-900/60 rounded-xl p-3.5 flex items-center gap-3.5 mb-5 shadow-sm">
          {/* Custom high-fidelity badge vector graphic */}
          {renderBadgeVisual(cert.id)}

          {/* Badge text on the right */}
          <div className="flex flex-col min-w-0">
            {/* Top Indicator */}
            {cert.badgeUrl ? (
              <span className="text-[8px] sm:text-[9px] text-[#10B981] font-extrabold tracking-wider uppercase flex items-center gap-1 mb-0.5">
                <span className="w-1 h-1 rounded-full bg-[#10B981]" />
                Credly Verified
              </span>
            ) : cert.id === 'python-internshala' ? (
              <span className="text-[8px] sm:text-[9px] text-neutral-400 dark:text-neutral-500 font-mono font-extrabold tracking-widest uppercase mb-0.5">
                Training Badge
              </span>
            ) : (
              <span className="text-[8px] sm:text-[9px] text-neutral-400 dark:text-neutral-500 font-mono font-extrabold tracking-widest uppercase mb-0.5">
                Skill Portal
              </span>
            )}

            {/* Badge Title */}
            <span className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 truncate leading-tight">
              {cert.name === 'Programming with Python (Grade B)' ? 'Programming with Python' : cert.name}
            </span>

            {/* Action text or Course info */}
            {cert.badgeUrl ? (
              <a
                href={cert.badgeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] font-bold text-[#E5A93C] hover:text-[#F3B84E] hover:underline flex items-center gap-0.5 mt-1 transition-colors w-fit"
              >
                <span>View Credly Badge</span>
                <span className="text-[8px]">↗</span>
              </a>
            ) : cert.id === 'python-internshala' ? (
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
                6-Week Intensive Course
              </span>
            ) : (
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
                Government Verified Joint Program
              </span>
            )}
          </div>
        </div>

        {/* Verify Credentials uppercase link at the bottom */}
        <div className="mt-auto pt-3 border-t border-neutral-100 dark:border-neutral-900/40">
          <a
            href={cert.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors duration-200 uppercase tracking-widest"
          >
            <span>Verify Credentials</span>
            <span className="text-[9px] font-normal">↗</span>
          </a>
        </div>
      </motion.div>

      {/* FULL SCREEN MODAL VIEWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, cubicBezier: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl bg-[#FCFCFD] dark:bg-[#151515] border border-neutral-200 dark:border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row items-stretch max-h-[90vh] md:max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10 text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* LEFT SIDE: Certificate view */}
              <div className="w-full md:w-[65%] p-6 sm:p-10 bg-neutral-100 dark:bg-[#0A0A0A] flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-neutral-200 dark:border-white/10 overflow-y-auto">
                <div className="w-full max-w-xl">
                  <h4 className="text-2xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2 font-mono text-center">
                    Certificate Document Display
                  </h4>

                  {/* Render loaded image OR stunning vector certificate fallback */}
                  <div className="relative group rounded-lg overflow-hidden border border-neutral-200/50 dark:border-white/10 shadow-md">
                    {customImg ? (
                      <div className="relative w-full aspect-[1.414/1] bg-white dark:bg-neutral-900 flex items-center justify-center">
                        <img
                          src={customImg}
                          alt={`${cert.name} Verified Certificate`}
                          className="w-full h-full object-contain max-h-[50vh]"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <button
                            onClick={handleRemoveImage}
                            className="p-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-all"
                            title="Remove Certificate Image"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Remove Image</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full">
                        {renderVectorCertificate()}
                      </div>
                    )}
                  </div>

                  {/* Dynamic upload widget */}
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`mt-4 p-4 border-2 border-dashed rounded-xl transition-all text-center flex flex-col items-center justify-center relative ${
                      dragActive
                        ? 'border-indigo-500 bg-indigo-500/5'
                        : 'border-neutral-300 dark:border-white/10 hover:border-neutral-400 dark:hover:border-white/20'
                    }`}
                  >
                    <UploadCloud className="w-6 h-6 text-neutral-400 mb-1" />
                    <p className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400">
                      Drag &amp; drop your actual certificate image here, or{' '}
                      <label className="text-indigo-600 dark:text-cyan-400 hover:underline cursor-pointer font-bold">
                        browse files
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </p>
                    <p className="text-[8px] text-neutral-400 mt-0.5 uppercase tracking-wide">
                      Supports JPG, PNG, WEBP (Persisted in LocalStorage)
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: Information sidebar */}
              <div className="w-full md:w-[35%] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="p-1 rounded-md bg-neutral-100 dark:bg-white/5 border border-neutral-200/50 dark:border-white/10 flex-shrink-0 text-neutral-800 dark:text-white">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em] font-mono">
                      Verified Credential
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-black text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-4">
                    {cert.organization}
                  </p>

                  <div className="grid grid-cols-2 gap-4 py-3 border-y border-neutral-200/50 dark:border-white/10 mb-5 font-sans">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 block">Issue Date</span>
                      <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">{cert.issueDate}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 block">Recipient</span>
                      <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Marimuthu A</span>
                    </div>
                  </div>

                  {/* Skills description list */}
                  <div className="mb-6">
                    <h5 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                      Verified Competencies
                    </h5>
                    {cert.skillsLearned && cert.skillsLearned.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skillsLearned.map((skill) => (
                          <span
                            key={skill}
                            className="text-2xs font-medium py-1 px-2.5 bg-neutral-100 dark:bg-neutral-900/40 text-neutral-700 dark:text-neutral-300 border border-neutral-200/40 dark:border-white/5 rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-neutral-400">Core software engineering competencies.</p>
                    )}
                  </div>
                </div>

                {/* Verification Links and Badges below the credentials inside modal too */}
                <div className="flex flex-col gap-2.5 pt-4 border-t border-neutral-200/50 dark:border-white/10">
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-white/95 text-xs font-bold uppercase tracking-wider text-white dark:text-black transition-colors rounded-none"
                  >
                    <span>Verify at Issuer Portal</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  {cert.badgeUrl && (
                    <a
                      href={cert.badgeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#F5F1FF] hover:bg-[#ECE5FF] dark:bg-[#1C162A] dark:hover:bg-[#281F3D] border border-indigo-500/20 hover:border-indigo-500/30 text-indigo-600 dark:text-[#C59BFF] text-xs font-bold uppercase tracking-wider transition-all rounded-none"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                      <span>Credly Verified Badge</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
