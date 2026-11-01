import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code,
  FileCode,
  Layers,
  Palette,
  Activity,
  Monitor,
  Server,
  Database,
  Terminal,
  Zap,
  Share2,
  Radio,
  Box,
  Cpu,
  Cloud,
  GitBranch,
  LineChart,
  Shield,
  Figma,
  GitPullRequest,
  CheckCircle,
  Gauge,
  LucideIcon,
} from 'lucide-react';
import { SKILL_CATEGORIES, TECH_MARQUEE } from '../data/portfolioData';
import { sounds } from '../utils/audio';

const iconMap: Record<string, LucideIcon> = {
  Code,
  FileCode,
  Layers,
  Palette,
  Activity,
  Monitor,
  Server,
  Database,
  Terminal,
  Zap,
  Share2,
  Radio,
  Box,
  Cpu,
  Cloud,
  GitBranch,
  LineChart,
  Shield,
  Figma,
  GitPullRequest,
  CheckCircle,
  Gauge,
};

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState(SKILL_CATEGORIES[0].id);

  const activeCategory =
    SKILL_CATEGORIES.find((cat) => cat.id === activeTab) || SKILL_CATEGORIES[0];

  return (
    <section id="skills" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-150 h-75 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
          <span>03</span>
          <span className="w-8 h-px bg-cyan-400/40" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Technical Arsenal & Tooling
        </h2>
        <p className="max-w-2xl text-slate-400 text-sm sm:text-base">
          A battle-tested stack architected for sub-second user interactions,
          deterministic distributed state, and clean, maintainable codebases.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl glass-panel max-w-fit mb-12 border border-white/10">
        {SKILL_CATEGORIES.map((cat) => {
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                sounds.playClick();
                setActiveTab(cat.id);
              }}
              onMouseEnter={() => sounds.playHover()}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-linear-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Animated Skills Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
        >
          {activeCategory.skills.map((skill, idx) => {
            const Icon = iconMap[skill.iconName] || Code;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 group hover:shadow-[0_10px_30px_rgba(0,212,255,0.08)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-cyan-400 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-colors">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white tracking-wide">
                        {skill.name}
                      </h4>
                      <div className="text-[11px] font-mono text-slate-400">
                        {skill.experience} mastery
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-semibold text-cyan-300 tabular-nums">
                    {skill.level}%
                  </span>
                </div>

                {/* Glowing Progress Bar */}
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden p-px border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.08, ease: 'easeOut' }}
                    className="h-full bg-linear-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-full shadow-[0_0_10px_rgba(0,212,255,0.6)]"
                  />
                </div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Infinite Marquee Tech Banner */}
      <div className="relative w-full overflow-hidden py-6 border-y border-white/10 glass-panel rounded-2xl">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-[#08080a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-[#08080a] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-8 text-xs sm:text-sm font-mono tracking-wider uppercase text-slate-400">
          {TECH_MARQUEE.concat(TECH_MARQUEE).map((item, index) => (
            <div key={index} className="flex items-center gap-8 shrink-0 hover:text-cyan-300 transition-colors cursor-default">
              <span>{item}</span>
              <span className="text-cyan-500/40">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
