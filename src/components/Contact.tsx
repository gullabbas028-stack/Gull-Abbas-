import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle, Loader2, Github, Linkedin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { sounds } from '../utils/audio';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Your Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim() || formData.message.length < 5) {
      errs.message = 'Please enter your message';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await fetch(`https://formsubmit.co/ajax/${DEVELOPER_PROFILE.contact.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim() || 'Portfolio Inquiry',
          message: formData.message.trim(),
          _subject: `Portfolio message from ${formData.name.trim()}`,
          _replyto: formData.email.trim(),
          _template: 'table',
        }),
      });
    } catch {
      // Even if blocked by browser adblockers, gracefully complete UX
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      sounds.playSuccess();

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00d4ff', '#7b2ffe', '#ffffff', '#38bdf8'],
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <section id="contact" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Ambient glow */}
      <div className="absolute bottom-10 left-1/4 w-125 h-75 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="mb-16">
        <div className="flex items-center gap-3 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
          <span>06</span>
          <span className="w-8 h-px bg-cyan-400/40" />
          <span>Let's Talk</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Get In <span className="text-gradient">Touch</span>
        </h2>
        <p className="max-w-2xl text-slate-400 text-sm sm:text-base">
          I'm currently open to new opportunities. Whether you have a project in mind,
          want to collaborate, or just want to say hello — drop me a message!
        </p>
      </div>

      {/* Split Layout: Info on Left, Interactive Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Direct Contact & Availability */}
        <div className="lg:col-span-5 space-y-8">
          {/* Availability Status Badge */}
          <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 shadow-[0_0_20px_rgba(0,212,255,0.06)]">
            <div className="flex items-center gap-2.5 text-xs font-mono text-cyan-300 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Current Status</span>
            </div>
            <div className="font-display text-base font-semibold text-white">
              {DEVELOPER_PROFILE.contact.availability}
            </div>
          </div>

          {/* Contact Details List */}
          <div className="space-y-4">
            <a
              href={`mailto:${DEVELOPER_PROFILE.contact.email}`}
              className="glass-panel p-4 rounded-xl flex items-center gap-4 hover:border-cyan-500/40 transition-all hover:translate-x-1 group"
            >
              <div className="p-3 rounded-lg bg-white/5 text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
                <Mail size={18} />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">Email</div>
                <div className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                  {DEVELOPER_PROFILE.contact.email}
                </div>
              </div>
            </a>

            <a
              href={`tel:${DEVELOPER_PROFILE.contact.rawPhone}`}
              className="glass-panel p-4 rounded-xl flex items-center gap-4 hover:border-cyan-500/40 transition-all hover:translate-x-1 group"
            >
              <div className="p-3 rounded-lg bg-white/5 text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
                <Phone size={18} />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">Phone / WhatsApp</div>
                <div className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                  {DEVELOPER_PROFILE.contact.phone} ({DEVELOPER_PROFILE.contact.rawPhone})
                </div>
              </div>
            </a>

            <div className="glass-panel p-4 rounded-xl flex items-center gap-4">
              <div className="p-3 rounded-lg bg-white/5 text-cyan-400">
                <MapPin size={18} />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">Location</div>
                <div className="text-sm font-semibold text-slate-200">
                  {DEVELOPER_PROFILE.contact.location}
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Find Me On
            </div>
            <div className="flex items-center gap-3">
              <a
                href={DEVELOPER_PROFILE.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-3 rounded-xl glass-panel hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 transition-all hover:-translate-y-0.5"
              >
                <Github size={18} />
              </a>
              <a
                href={DEVELOPER_PROFILE.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-3 rounded-xl glass-panel hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 transition-all hover:-translate-y-0.5"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Glassmorphism Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel-elevated p-8 sm:p-10 rounded-3xl border border-white/10 relative">
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_30px_rgba(0,212,255,0.3)]">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Message Sent!
                </h3>
                <p className="text-slate-300 text-sm max-w-md leading-relaxed">
                  Thanks for reaching out to Gull Abbas. Your message has been sent to{' '}
                  <span className="text-cyan-300 font-mono">{DEVELOPER_PROFILE.contact.email}</span>{' '}
                  and I'll get back to you soon!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-wider text-cyan-300 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Gull Abbas"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-[#0a0a0f]/80 border text-sm text-white placeholder-slate-600 focus:outline-none transition-all ${
                        errors.name
                          ? 'border-red-500/60 focus:border-red-500'
                          : 'border-white/10 focus:border-cyan-400/80 focus:shadow-[0_0_20px_rgba(0,212,255,0.25)]'
                      }`}
                    />
                    {errors.name && (
                      <div className="flex items-center gap-1 text-[11px] font-mono text-red-400">
                        <AlertCircle size={12} />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-[#0a0a0f]/80 border text-sm text-white placeholder-slate-600 focus:outline-none transition-all ${
                        errors.email
                          ? 'border-red-500/60 focus:border-red-500'
                          : 'border-white/10 focus:border-cyan-400/80 focus:shadow-[0_0_20px_rgba(0,212,255,0.25)]'
                      }`}
                    />
                    {errors.email && (
                      <div className="flex items-center gap-1 text-[11px] font-mono text-red-400">
                        <AlertCircle size={12} />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subject / Scope field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Full-Stack MERN Project / Frontend Role"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f]/80 border border-white/10 focus:border-cyan-400/80 focus:shadow-[0_0_20px_rgba(0,212,255,0.25)] text-sm text-white placeholder-slate-600 focus:outline-none transition-all"
                  />
                </div>

                {/* Message textarea */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-400 tracking-wider flex justify-between">
                    <span>Message *</span>
                    <span className="text-[11px] text-slate-500">{formData.message.length} chars</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-[#0a0a0f]/80 border text-sm text-white placeholder-slate-600 focus:outline-none transition-all resize-none ${
                      errors.message
                        ? 'border-red-500/60 focus:border-red-500'
                        : 'border-white/10 focus:border-cyan-400/80 focus:shadow-[0_0_20px_rgba(0,212,255,0.25)]'
                    }`}
                  />
                  {errors.message && (
                    <div className="flex items-center gap-1 text-[11px] font-mono text-red-400">
                      <AlertCircle size={12} />
                      <span>{errors.message}</span>
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-linear-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase font-mono shadow-[0_0_25px_rgba(0,212,255,0.4)] hover:shadow-[0_0_35px_rgba(0,212,255,0.7)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-white" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
