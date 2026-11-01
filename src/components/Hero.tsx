import React, { Suspense, lazy, useState, useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Twitter, Mail, FileText, ChevronRight, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { sounds } from '../utils/audio';

const HeroThreeCanvas = lazy(() =>
  import('./HeroThreeCanvas').then(({ HeroThreeCanvas }) => ({ default: HeroThreeCanvas })),
);

interface HeroProps {
  onExploreClick: () => void;
  onOpenResume: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenResume, onContactClick }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentRole = DEVELOPER_PROFILE.roles[roleIndex];
    const typingSpeed = isDeleting ? 35 : 75;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % DEVELOPER_PROFILE.roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 px-6 md:px-12 overflow-hidden"
    >
      {/* 3D WebGL Three.js interactive background */}
      <Suspense fallback={null}>
        <HeroThreeCanvas />
      </Suspense>

      {/* Atmospheric lighting gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-87.5 bg-linear-to-tr from-cyan-500/10 via-purple-600/10 to-transparent blur-[120px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Subtle status tag */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-300 mb-8 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>Full Stack MERN Developer · Lahore, Pakistan</span>
        </motion.div>

        {/* Large Bold Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 uppercase"
        >
          Hi, I'm <br className="hidden sm:inline" />
          <span className="text-gradient">{DEVELOPER_PROFILE.name}</span>
        </motion.h1>

        {/* Animated Typewriter Role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-2 text-lg sm:text-2xl md:text-3xl font-light text-slate-300 mb-8 h-10 font-mono"
        >
          <span className="text-cyan-400 font-medium">I'm a</span>
          <span className="text-slate-500">/</span>
          <span className="text-white font-medium">{displayedText}</span>
          <span className="w-0.5 h-6 bg-cyan-400 animate-pulse" />
        </motion.div>

        {/* Brief Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl text-sm sm:text-base md:text-lg text-slate-400 font-normal leading-relaxed mb-10 text-balance"
        >
          {DEVELOPER_PROFILE.tagline}. Turning ideas into responsive, pixel-perfect web experiences using MongoDB, Express.js, React.js, Next.js, and Node.js.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          {/* Primary View Work CTA */}
          <button
            onClick={() => {
              sounds.playClick();
              onExploreClick();
            }}
            onMouseEnter={() => sounds.playHover()}
            className="group relative px-7 py-3.5 rounded-xl bg-linear-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-sm shadow-[0_0_25px_rgba(0,212,255,0.4)] hover:shadow-[0_0_40px_rgba(0,212,255,0.7)] hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10">View My 11+ Projects</span>
            <ChevronRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Secondary CV / Resume CTA */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenResume();
            }}
            onMouseEnter={() => sounds.playHover()}
            className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40 text-slate-200 hover:text-white font-medium text-sm transition-all flex items-center gap-2 backdrop-blur-md active:scale-95"
          >
            <FileText size={16} className="text-cyan-400" />
            <span>Inspect Interactive CV</span>
          </button>

          {/* Direct PDF Download */}
          <a
            href={DEVELOPER_PROFILE.cvPdfUrl}
            download="CV.pdf"
            onClick={() => sounds.playClick()}
            onMouseEnter={() => sounds.playHover()}
            className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/40 text-cyan-300 text-sm font-medium transition-all flex items-center gap-2"
          >
            <Download size={15} />
            <span>Download CV.pdf</span>
          </a>

          {/* Hire Me CTA */}
          <button
            onClick={() => {
              sounds.playClick();
              onContactClick();
            }}
            onMouseEnter={() => sounds.playHover()}
            className="px-4 py-3.5 rounded-xl text-slate-400 hover:text-cyan-300 text-sm font-medium transition-colors hover:underline"
          >
            Hire Me ↗
          </button>
        </motion.div>

        {/* Social Media Links with Glowing Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center gap-5 text-slate-400"
        >
          <a
            href={DEVELOPER_PROFILE.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/40 hover:text-cyan-400 transition-all hover:scale-110"
          >
            <Github size={18} />
          </a>
          <a
            href={DEVELOPER_PROFILE.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/40 hover:text-cyan-400 transition-all hover:scale-110"
          >
            <Linkedin size={18} />
          </a>
          
          <a
            href={`mailto:${DEVELOPER_PROFILE.contact.email}`}
            aria-label="Email Gull Abbas"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/40 hover:text-cyan-400 transition-all hover:scale-110"
          >
            <Mail size={18} />
          </a>
        </motion.div>
      </div>

      {/* Floating Scroll Down Indicator */}
      <button
        onClick={() => {
          sounds.playClick();
          onExploreClick();
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs font-mono text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer group"
        aria-label="Scroll down to content"
      >
        <span className="uppercase tracking-widest text-[10px] group-hover:text-cyan-300">Scroll</span>
        <ArrowDown size={14} className="animate-bounce text-cyan-400" />
      </button>
    </section>
  );
};
