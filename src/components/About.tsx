import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Monitor,
  Layers,
  Palette,
  Smartphone,
  Zap,
  Share2,
  LucideIcon,
} from 'lucide-react';
import { DEVELOPER_PROFILE, TIMELINE_EXPERIENCE, SERVICES } from '../data/portfolioData';
import { sounds } from '../utils/audio';

const serviceIconMap: Record<string, LucideIcon> = {
  Monitor,
  Layers,
  Palette,
  Smartphone,
  Zap,
  Share2,
};

export const About: React.FC = () => {
  const [expandedBio, setExpandedBio] = useState(false);
  const [photoTilt, setPhotoTilt] = useState({ rotateX: 0, rotateY: 0 });
  const photoRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });

  // 3D Tilt interaction for the professional photo
  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setPhotoTilt({ rotateX, rotateY });
  };

  const handlePhotoMouseLeave = () => {
    setPhotoTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section id="about" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="mb-20">
        <div className="flex items-center gap-3 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
          <span>01</span>
          <span className="w-8 h-px bg-cyan-400/40" />
          <span>Who I Am</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
          About <span className="text-gradient">Gull Abbas</span>
        </h2>
      </div>

      {/* Split Layout: Photo on Left, Story on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
        {/* Left Column: Professional Photo with Rotating Gradient Border & 3D Tilt */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            ref={photoRef}
            onMouseMove={handlePhotoMouseMove}
            onMouseLeave={handlePhotoMouseLeave}
            className="relative w-full max-w-md group cursor-pointer"
            style={{
              perspective: '1000px',
            }}
          >
            {/* Rotating gradient background halo */}
            <div className="absolute -inset-1.5 rounded-3xl bg-linear-to-r from-cyan-500 via-indigo-500 to-purple-600 opacity-70 blur-lg group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

            {/* Tiltable card container */}
            <div
              className="relative rounded-2xl overflow-hidden glass-panel-elevated p-2 transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${photoTilt.rotateX}deg) rotateY(${photoTilt.rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="relative aspect-3/4 w-full rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={DEVELOPER_PROFILE.portraitImage}
                  alt="Gull Abbas - Full Stack MERN Developer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Overlaid Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white tracking-wide">
                      {DEVELOPER_PROFILE.name}
                    </div>
                    <div className="text-[11px] text-cyan-300 font-mono">
                      {DEVELOPER_PROFILE.contact.shortLocation}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    MERN Stack Dev
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Narrative & Expandable Deep-Dive */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            <h3 className="font-display text-2xl font-bold text-white">
              Full Stack MERN & Frontend Developer Crafting Modern Web Experiences
            </h3>
            <p className="font-light text-slate-200">{DEVELOPER_PROFILE.bio}</p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {DEVELOPER_PROFILE.extendedBio}
            </p>

            {/* Quick Contact & Location Pill List from Old Portfolio */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="glass-panel p-3.5 rounded-xl flex items-center gap-3 border border-white/5">
                <Mail size={16} className="text-cyan-400 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Email</div>
                  <div className="text-xs font-medium text-white truncate">
                    {DEVELOPER_PROFILE.contact.email}
                  </div>
                </div>
              </div>
              <div className="glass-panel p-3.5 rounded-xl flex items-center gap-3 border border-white/5">
                <Phone size={16} className="text-cyan-400 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Phone</div>
                  <div className="text-xs font-medium text-white truncate">
                    {DEVELOPER_PROFILE.contact.rawPhone}
                  </div>
                </div>
              </div>
              <div className="glass-panel p-3.5 rounded-xl flex items-center gap-3 border border-white/5">
                <MapPin size={16} className="text-cyan-400 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Location</div>
                  <div className="text-xs font-medium text-white truncate">
                    Lahore, Pakistan
                  </div>
                </div>
              </div>
            </div>

            {expandedBio && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 pt-4 text-sm sm:text-base text-slate-400 border-t border-white/10"
              >
                <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                  Core Engineering Strengths & Languages
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DEVELOPER_PROFILE.strengths.map((str, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-mono text-slate-300">
                      <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </div>
                  ))}
                  <div className="flex items-start gap-2 text-xs font-mono text-slate-300">
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>Languages: {DEVELOPER_PROFILE.languages.join(' · ')}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs font-mono text-slate-300">
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>BSCS @ Virtual University of Pakistan</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div>
            <button
              onClick={() => {
                sounds.playClick();
                setExpandedBio(!expandedBio);
              }}
              onMouseEnter={() => sounds.playHover()}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors py-2"
            >
              <span>{expandedBio ? 'Show Less' : 'Read More About My Background'}</span>
              {expandedBio ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics / Stat Counters */}
      <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-28">
        {DEVELOPER_PROFILE.stats.map((stat, idx) => (
          <div
            key={idx}
            className="glass-panel p-6 rounded-2xl hover:border-cyan-500/30 transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-baseline gap-1 mb-2">
              <span className="font-display text-4xl sm:text-5xl font-extrabold text-white group-hover:text-cyan-300 transition-colors tabular-nums">
                {isStatsInView ? stat.value : '0'}
              </span>
              <span className="font-display text-2xl font-bold text-cyan-400">
                {stat.suffix}
              </span>
            </div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Services Section (Converted from Old Portfolio) */}
      <div id="services" className="mb-28 pt-6">
        <div className="flex items-center gap-3 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
          <span>02</span>
          <span className="w-8 h-px bg-cyan-400/40" />
          <span>What I Offer</span>
        </div>
        <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          My <span className="text-gradient">Services</span>
        </h3>
        <p className="max-w-2xl text-slate-400 text-sm sm:text-base mb-12">
          Specialized frontend and MERN stack web development services tailored to turn your ideas into responsive, high-performing digital products.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = serviceIconMap[service.iconName] || Monitor;
            return (
              <div
                key={service.id}
                className="glass-panel p-7 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1.5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                  <Icon size={22} />
                </div>
                <h4 className="font-display text-xl font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                  {service.deliverables.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono text-slate-300 bg-white/5 px-2.5 py-0.5 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Experience & Education Timeline */}
      <div id="experience" className="pt-6">
        <div className="flex items-center gap-3 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
          <span>03</span>
          <span className="w-8 h-px bg-cyan-400/40" />
          <span>Education & Experience</span>
        </div>
        <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white mb-12">
          Academic Journey & Professional Internships
        </h3>

        <div className="relative border-l border-white/10 ml-4 md:ml-8 pl-6 md:pl-10 space-y-10">
          {TIMELINE_EXPERIENCE.map((item, index) => (
            <div key={index} className="relative group">
              {/* Timeline marker node */}
              <div className="absolute -left-7.75 md:-left-11.75 top-1.5 w-3.5 h-3.5 rounded-full bg-[#08080a] border-2 border-cyan-400 shadow-[0_0_12px_rgba(0,212,255,0.8)] group-hover:scale-125 transition-transform" />

              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-cyan-500/20 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    {item.type === 'education' ? (
                      <GraduationCap size={14} />
                    ) : (
                      <Briefcase size={14} />
                    )}
                    <span className="uppercase">{item.type}</span>
                    <span>·</span>
                    <Calendar size={13} />
                    <span>{item.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <MapPin size={13} />
                    <span>{item.location}</span>
                  </div>
                </div>

                <h4 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
                  {item.role}
                </h4>
                <div className="text-sm font-medium text-cyan-300/90 mb-4">
                  {item.organization}
                </div>

                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  {item.description}
                </p>

                {/* Key Achievements */}
                <div className="space-y-2 mb-6">
                  {item.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-light">
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">▸</span>
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 text-[11px] font-mono rounded bg-white/5 text-slate-300 border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
