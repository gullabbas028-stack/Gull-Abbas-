import React, { useState, useEffect } from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Mail, Terminal, Download } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { sounds } from '../utils/audio';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
  onTriggerEasterEgg: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenResume,
  onTriggerEasterEgg,
}) => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Karachi',
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' PKT'
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060608] border-t border-white/10 pt-16 pb-12 px-6 md:px-12 text-slate-400">
      {/* Top luminous glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-400/50 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-cyan-500 to-purple-600 p-px">
                <div className="w-full h-full bg-[#0d0d12] rounded-[7px] flex items-center justify-center font-display text-sm font-black text-cyan-400">
                  GA
                </div>
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white">
                {DEVELOPER_PROFILE.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Full Stack MERN Developer & Frontend Engineer in Lahore, Pakistan. Building responsive, modern web interfaces with React, Next.js, Node.js, Express, and MongoDB.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>
                Lahore, Pakistan: <span className="text-white font-medium">{timeStr}</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-white">
              Navigation
            </div>
            <ul className="space-y-2 text-sm">
              {['hero', 'about', 'services', 'skills', 'projects', 'contact'].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onNavigate(id);
                    }}
                    className="hover:text-cyan-400 transition-colors capitalize text-left"
                  >
                    {id === 'hero' ? 'Home' : id}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Documents & Easter Egg */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-white">
              Resources & Connect
            </div>
            <div className="space-y-2.5 text-sm">
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenResume();
                }}
                className="hover:text-cyan-400 transition-colors block text-left"
              >
                Inspect Interactive CV
              </button>
              <a
                href={DEVELOPER_PROFILE.cvPdfUrl}
                download="Gull_Abbas_CV.pdf"
                onClick={() => sounds.playClick()}
                className="hover:text-cyan-400 transition-colors flex items-center gap-2 text-slate-300"
              >
                <Download size={14} className="text-cyan-400" />
                <span>Download Official CV.pdf</span>
              </a>
              <button
                onClick={() => {
                  sounds.playEasterEgg();
                  onTriggerEasterEgg();
                }}
                className="hover:text-cyan-400 transition-colors flex items-center gap-2 text-cyan-400/90 font-mono text-xs pt-1"
              >
                <Terminal size={13} />
                <span>Launch Developer Terminal [⌘K]</span>
              </button>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={DEVELOPER_PROFILE.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-cyan-400 transition-colors border border-white/5"
              >
                <Github size={16} />
              </a>
              <a
                href={DEVELOPER_PROFILE.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-cyan-400 transition-colors border border-white/5"
              >
                <Linkedin size={16} />
              </a>
              
              <a
                href={`mailto:${DEVELOPER_PROFILE.contact.email}`}
                aria-label="Email"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-cyan-400 transition-colors border border-white/5"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} Gull Abbas. Built with React & ❤️ in Lahore, Pakistan.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-cyan-400 transition-colors p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp size={14} className="text-cyan-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
