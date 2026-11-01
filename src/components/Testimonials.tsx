import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';
import { sounds } from '../utils/audio';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    sounds.playClick();
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    sounds.playClick();
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
        <div>
          <div className="flex items-center gap-3 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <span>05</span>
            <span className="w-8 h-px bg-cyan-400/40" />
            <span>Endorsements</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Leadership & Client Testimonials
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="p-3 rounded-xl glass-panel hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="p-3 rounded-xl glass-panel hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Featured Testimonial Card */}
      <div className="glass-panel-elevated p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-linear-to-br from-cyan-500/10 to-purple-600/10 rounded-full blur-2xl pointer-events-none" />
        <Quote size={48} className="text-cyan-400/20 mb-6" />

        <p className="font-display text-lg sm:text-2xl md:text-3xl text-slate-100 font-normal leading-relaxed mb-8">
          "{current.quote}"
        </p>

        <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-linear-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-display font-bold text-white shadow-lg">
              {current.avatar}
            </div>
            <div>
              <div className="font-semibold text-white tracking-wide text-base">
                {current.author}
              </div>
              <div className="text-xs text-slate-400 font-mono">
                {current.role} · <span className="text-slate-300">{current.company}</span>
              </div>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-xs">
            Measured Impact: <span className="font-semibold text-white">{current.metric}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
