import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Download, Printer, FileText, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { DEVELOPER_PROFILE, TIMELINE_EXPERIENCE, SKILL_CATEGORIES, PROJECTS } from '../data/portfolioData';
import { sounds } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'interactive' | 'original'>('interactive');

  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto glass-panel-elevated rounded-3xl p-6 sm:p-12 border border-white/20 z-10 shadow-2xl text-slate-200"
      >
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-300">
              Gull Abbas — Curriculum Vitae
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Toggle: Interactive vs Original CV.png */}
            <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => {
                  sounds.playClick();
                  setViewMode('interactive');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  viewMode === 'interactive'
                    ? 'bg-cyan-500 text-black font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText size={13} />
                <span>Interactive</span>
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setViewMode('original');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  viewMode === 'original'
                    ? 'bg-cyan-500 text-black font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ImageIcon size={13} />
                <span>Original CV Sheet</span>
              </button>
            </div>

            <button
              onClick={handlePrint}
              title="Print CV"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10"
            >
              <Printer size={16} />
            </button>

            <a
              href={DEVELOPER_PROFILE.cvPdfUrl}
              download="Gull_Abbas_CV.pdf"
              onClick={() => sounds.playClick()}
              className="px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-black border border-cyan-500/30 text-xs font-mono font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <Download size={14} />
              <span>Download CV.pdf</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/10"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {viewMode === 'original' ? (
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white">
            <img
              src={DEVELOPER_PROFILE.cvImageUrl}
              alt="Gull Abbas Official CV"
              className="w-full h-auto object-contain"
            />
          </div>
        ) : (
          <>
            {/* CV Header */}
            <div className="space-y-4 mb-10">
              <h2 className="font-display text-3xl sm:text-4xl font-black text-white">
                {DEVELOPER_PROFILE.name}
              </h2>
              <div className="text-cyan-400 font-mono text-sm sm:text-base font-semibold">
                {DEVELOPER_PROFILE.title}
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-slate-400">
                <span>{DEVELOPER_PROFILE.contact.email}</span>
                <span>·</span>
                <span>{DEVELOPER_PROFILE.contact.phone}</span>
                <span>·</span>
                <span>{DEVELOPER_PROFILE.contact.location}</span>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-3 mb-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 border-b border-white/10 pb-1">
                Professional Summary
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                {DEVELOPER_PROFILE.bio} {DEVELOPER_PROFILE.extendedBio}
              </p>
            </div>

            {/* Technical Competencies Grid */}
            <div className="space-y-4 mb-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 border-b border-white/10 pb-1">
                Technical Skills
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SKILL_CATEGORIES.map((cat) => (
                  <div key={cat.id} className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="text-xs font-mono uppercase text-cyan-300 mb-2">
                      {cat.label}
                    </div>
                    <div className="text-xs text-slate-300 flex flex-wrap gap-1.5">
                      {cat.skills.map((s, idx) => (
                        <span key={idx} className="bg-black/40 px-2 py-0.5 rounded border border-white/5">
                          {s.name} ({s.level}%)
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience & Education Timeline */}
            <div className="space-y-6 mb-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 border-b border-white/10 pb-1">
                Experience & Education
              </h3>
              <div className="space-y-6">
                {TIMELINE_EXPERIENCE.map((t, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="font-display font-bold text-white text-base">
                        {t.role} <span className="text-cyan-400">— {t.organization}</span>
                      </div>
                      <div className="text-xs font-mono text-slate-400">{t.period}</div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {t.description}
                    </p>
                    <div className="space-y-1 pl-2">
                      {t.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="text-xs text-slate-400 flex items-start gap-2">
                          <span className="text-cyan-400">▸</span>
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Projects List */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 border-b border-white/10 pb-1">
                Selected Production Projects ({PROJECTS.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECTS.map((p) => (
                  <a
                    key={p.id}
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyan-500/30 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">{p.title}</div>
                      <div className="text-[11px] font-mono text-cyan-300 truncate">
                        {p.liveUrl?.replace('https://', '')}
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-slate-400 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};
