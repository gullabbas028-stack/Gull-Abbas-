import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Sparkles, ArrowUpRight, X, CheckCircle2 } from 'lucide-react';
import { PROJECTS, DEVELOPER_PROFILE } from '../data/portfolioData';
import { Project } from '../types';
import { sounds } from '../utils/audio';

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ecommerce' | 'food' | 'webapp' | 'automation'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featuredProject = PROJECTS.find((p) => p.featured) || PROJECTS[0];

  const filteredProjects =
    activeFilter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  const filterTabs = [
    { id: 'all', label: `All Projects (${PROJECTS.length})` },
    { id: 'ecommerce', label: 'E-Commerce Stores' },
    { id: 'food', label: 'Food Delivery Apps' },
    { id: 'webapp', label: 'Web Apps & Portals' },
    { id: 'automation', label: 'CI/CD & Automation' },
  ];

  const handleOpenModal = (project: Project) => {
    sounds.playClick();
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    sounds.playClick();
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Ambient background light */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-3 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <span>04</span>
            <span className="w-8 h-px bg-cyan-400/40" />
            <span>What I've Built</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            My <span className="text-gradient">Projects</span>
          </h2>
        </div>
        <p className="max-w-md text-slate-400 text-sm leading-relaxed">
          All {PROJECTS.length} production web applications built by Gull Abbas—ranging from full-stack MERN e-commerce platforms and food delivery apps to real estate and gaming portals.
        </p>
      </div>

      {/* Featured Showcase Project (Split Layout) */}
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-10 lg:p-12 mb-20 border border-white/10 overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-3 sm:p-6 flex items-center gap-2 z-10">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={12} />
            <span>Featured MERN Project</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Device Mockup & Image */}
          <div
            onClick={() => handleOpenModal(featuredProject)}
            className="lg:col-span-7 relative rounded-2xl overflow-hidden cursor-pointer group/img"
          >
            <div className="aspect-video w-full bg-slate-900 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-6">
              <span className="px-4 py-2 rounded-lg bg-cyan-500 text-black text-xs font-semibold tracking-wider uppercase font-mono shadow-lg">
                View Project Details ↗
              </span>
            </div>
          </div>

          {/* Right: Detailed Description & Metrics */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              {featuredProject.metrics}
            </div>
            <h3 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
              {featuredProject.title}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {featuredProject.fullOverview}
            </p>

            <div className="space-y-2">
              <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                Key Highlights
              </div>
              {featuredProject.keyFeatures.slice(0, 3).map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                  <span className="text-cyan-400 font-mono text-xs">▸</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {featuredProject.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-white/5 text-slate-300 border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
              {featuredProject.liveUrl && (
                <a
                  href={featuredProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick()}
                  onMouseEnter={() => sounds.playHover()}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-semibold text-xs tracking-wider uppercase font-mono shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(0,212,255,0.7)] transition-all flex items-center gap-2"
                >
                  <span>Live Demo</span>
                  <ArrowUpRight size={15} />
                </a>
              )}

              <a
                href={featuredProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                onMouseEnter={() => sounds.playHover()}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-mono transition-colors flex items-center gap-2"
              >
                <Github size={15} />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl glass-panel max-w-fit mb-12 border border-white/10">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playClick();
                setActiveFilter(tab.id as typeof activeFilter);
              }}
              onMouseEnter={() => sounds.playHover()}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                isActive
                  ? 'bg-linear-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Bento Grid of All 11 Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {filteredProjects.map((project) => (
          <motion.div
            layout
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="group glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-500/40 transition-all duration-500 flex flex-col hover:-translate-y-1.5 hover:shadow-[0_15px_40px_rgba(0,212,255,0.12)] cursor-pointer"
            onClick={() => handleOpenModal(project)}
          >
            {/* Project Thumbnail with Zoom & Hover Scrim */}
            <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#08080a] via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Metric chip */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-mono text-cyan-300">
                {project.metrics}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h4 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5 flex items-center justify-between gap-2">
                  <span>{project.title}</span>
                  <ArrowUpRight
                    size={18}
                    className="text-slate-500 shrink-0 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="space-y-4">
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 text-slate-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Direct Live Demo & GitHub Buttons */}
                <div
                  className="flex items-center gap-2.5 pt-3 border-t border-white/5"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sounds.playClick()}
                      className="flex-1 py-2 px-3 rounded-lg bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-black font-mono text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border border-cyan-500/30"
                    >
                      <ExternalLink size={13} />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sounds.playClick()}
                      className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-mono text-xs transition-all flex items-center justify-center gap-1.5 border border-white/10"
                    >
                      <Github size={13} />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* GitHub Repository Link Button */}
      <div className="flex justify-center">
        <a
          href={DEVELOPER_PROFILE.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sounds.playClick()}
          onMouseEnter={() => sounds.playHover()}
          className="group px-7 py-3.5 rounded-xl glass-panel hover:bg-white/10 border border-white/10 hover:border-cyan-400/40 text-slate-200 hover:text-white font-mono text-xs uppercase tracking-widest transition-all flex items-center gap-3 shadow-lg active:scale-95"
        >
          <Github size={18} className="text-cyan-400 group-hover:rotate-12 transition-transform" />
          <span>Explore All Repositories on GitHub (@gullabbas028-stack)</span>
          <ArrowUpRight size={15} />
        </a>
      </div>

      {/* Project Deep-Dive Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-white/15 z-10 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/10"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-block px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-xs uppercase tracking-wider">
                    {selectedProject.metrics}
                  </div>
                  <h3 className="font-display text-2xl sm:text-4xl font-bold text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="text-slate-400 text-sm font-mono">
                    {selectedProject.tagline}
                  </p>
                </div>

                {/* Big Preview Image */}
                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-xl">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Overview */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                    Project Overview
                  </h4>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {selectedProject.fullOverview}
                  </p>
                </div>

                {/* Key Features List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                    Key Features & Implementation
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.keyFeatures.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5"
                      >
                        <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 text-xs font-mono rounded-lg bg-white/5 text-slate-200 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Footer Links */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-linear-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-xs tracking-wider uppercase font-mono shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:brightness-110 transition-all flex items-center gap-2"
                      >
                        <span>Open Live Demo</span>
                        <ArrowUpRight size={15} />
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-mono transition-colors flex items-center gap-2"
                      >
                        <Github size={15} />
                        <span>View GitHub</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={handleCloseModal}
                    className="text-xs font-mono text-slate-400 hover:text-white uppercase tracking-wider py-2"
                  >
                    Close [ESC]
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
