import React, { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { SecretTerminalModal } from './components/SecretTerminalModal';
import { sounds } from './utils/audio';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [currentTheme, setCurrentTheme] = useState('cyan');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'services', 'experience', 'skills', 'projects', 'contact'];
      const scrollY = window.scrollY;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 150;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId === 'experience' ? 'about' : sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Konami Code Detector: ↑ ↑ ↓ ↓ ← → ← → B A
  useEffect(() => {
    const konamiSequence = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];
    let keyIndex = 0;

    const onKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + K shortcut for terminal
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sounds.playEasterEgg();
        setIsTerminalOpen(true);
        return;
      }

      if (e.key === konamiSequence[keyIndex]) {
        keyIndex++;
        if (keyIndex === konamiSequence.length) {
          keyIndex = 0;
          sounds.playEasterEgg();
          setIsTerminalOpen(true);
        }
      } else {
        keyIndex = 0;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 relative">
      {/* Noise texture overlay for cinematic luxury feel */}
      <div className="fixed inset-0 bg-noise pointer-events-none z-30 opacity-70" />

      {/* Fullscreen Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Smooth glowing cursor with follower */}
      <CustomCursor />

      {/* Top Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        currentTheme={currentTheme}
        onChangeTheme={setCurrentTheme}
        onOpenResume={() => setIsResumeOpen(true)}
        onTriggerEasterEgg={() => setIsTerminalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          onExploreClick={() => handleNavigate('projects')}
          onOpenResume={() => setIsResumeOpen(true)}
          onContactClick={() => handleNavigate('contact')}
        />

        <About />

        <Skills />

        <Projects />

        <Testimonials />

        <Contact />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenResume={() => setIsResumeOpen(true)}
        onTriggerEasterEgg={() => setIsTerminalOpen(true)}
      />

      {/* Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <SecretTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}
