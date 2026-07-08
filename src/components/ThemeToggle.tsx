import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      id="theme-toggle"
      onClick={onToggle}
      className="relative w-10 h-10 rounded-xl border border-neutral-200 dark:border-white/10 bg-[#FCFCFD] dark:bg-[#1A1A1A] flex items-center justify-center text-neutral-800 dark:text-neutral-100 hover:border-neutral-400 hover:dark:border-white/20 active:scale-95 transition-all duration-300 shadow-sm overflow-hidden group cursor-pointer"
      aria-label="Toggle light/dark theme"
    >
      <span className="sr-only">Toggle theme</span>
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon */}
        <div
          className={`absolute transform transition-all duration-500 ${
            theme === 'dark'
              ? 'opacity-0 rotate-90 scale-50 pointer-events-none'
              : 'opacity-100 rotate-0 scale-100'
          }`}
        >
          <Sun className="w-5 h-5 text-neutral-800 group-hover:scale-110 transition-transform" />
        </div>

        {/* Moon Icon */}
        <div
          className={`absolute transform transition-all duration-500 ${
            theme === 'light'
              ? 'opacity-0 -rotate-90 scale-50 pointer-events-none'
              : 'opacity-100 rotate-0 scale-100'
          }`}
        >
          <Moon className="w-5 h-5 text-neutral-200 group-hover:rotate-12 transition-transform duration-300" />
        </div>
      </div>
    </button>
  );
}
