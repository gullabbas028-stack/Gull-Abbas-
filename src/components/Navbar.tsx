import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  currentTheme: string;
  onChangeTheme: (theme: string) => void;
  onOpenResume: () => void;
  onTriggerEasterEgg: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  currentTheme,
  onChangeTheme,
  onOpenResume,
  onTriggerEasterEgg,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    sounds.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const themes = [
    { id: 'cyan', label: 'Cyan Matrix', color: '#00d4ff' },
    { id: 'purple', label: 'Cyber Violet', color: '#a855f7' },
    { id: 'gold', label: 'Imperial Gold', color: '#f59e0b' },
    { id: 'emerald', label: 'Neon Emerald', color: '#10b981' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08080a]/80 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between gap-3 lg:gap-5">
        {/* Zone 1: Single element wordmark brand mark */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="group flex items-center gap-2.5 text-left focus:outline-none"
          aria-label="Gull Abbas Home"
        >
          <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-cyan-500 to-purple-600 p-px shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#0d0d12] rounded-[7px] flex items-center justify-center">
              <span className="font-display text-sm font-black text-cyan-400">GA</span>
            </div>
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors whitespace-nowrap">
      
          </span>
        </button>

        {/* Zone 2: Navigation Links (single line, hover underline, active highlight) */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8 text-xs xl:text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                onMouseEnter={() => sounds.playHover()}
                className={`relative py-1 whitespace-nowrap transition-colors ${
                  isActive ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-cyan-400 to-purple-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Theme, Resume, Mobile toggle) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Theme palette picker */}
          <div className="relative">
            <button
              onClick={() => {
                setThemeDropdownOpen(!themeDropdownOpen);
                sounds.playClick();
              }}
              title="Theme accent switch"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-cyan-400 border border-white/5 transition-colors focus:outline-none"
              aria-label="Color Themes"
            >
              <Sparkles size={16} />
            </button>

            {themeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#0f1017] border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 py-1">
                  Accent Atmosphere
                </div>
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onChangeTheme(t.id);
                      setThemeDropdownOpen(false);
                      sounds.playClick();
                    }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left ${
                      currentTheme === t.id
                        ? 'bg-white/10 text-white font-medium'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: t.color }}
                    />
                    <span className="truncate">{t.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary CTA: Resume View */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenResume();
            }}
            onMouseEnter={() => sounds.playHover()}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg bg-linear-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_20px_rgba(0,212,255,0.35)] hover:shadow-[0_0_28px_rgba(0,212,255,0.6)] hover:brightness-110 active:scale-95 transition-all whitespace-nowrap"
          >
            <span>Curriculum Vitae</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              sounds.playClick();
            }}
            className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left py-2 px-3 rounded-lg text-base font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-cyan-500/10 text-cyan-400 font-semibold'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenResume();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg bg-cyan-500 text-black hover:bg-cyan-400 transition-colors font-mono"
            >
              View Full CV
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
