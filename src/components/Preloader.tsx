import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sounds } from '../utils/audio';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Systems');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const statusMessages = [
      { at: 15, text: 'Calibrating 3D WebGL Mesh' },
      { at: 40, text: 'Compiling Shader Shards' },
      { at: 70, text: 'Synchronizing High-Throughput Buffers' },
      { at: 90, text: 'Rendering Spatial Assets' },
      { at: 100, text: 'Systems Nominal — Welcome' },
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.floor(Math.random() * 8) + 3;
        const next = Math.min(prev + increment, 100);

        const currentMsg = statusMessages.find((m) => next >= m.at);
        if (currentMsg) {
          setStatusText(currentMsg.text);
        }

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 800);
          }, 350);
        }
        return next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  const handleSkip = () => {
    sounds.playClick();
    setIsDone(true);
    setTimeout(onComplete, 400);
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -60, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070709] text-white px-6 overflow-hidden"
        >
          {/* Subtle geometric background grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.06),transparent_60%)] pointer-events-none" />
          
          <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center">
            {/* Animated Logo Mark */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-16 h-16 mb-8 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(0,212,255,0.2)]"
            >
              <div className="absolute inset-0 rounded-2xl bg-linear-to-tr from-cyan-500/20 to-purple-500/20 animate-pulse" />
              <span className="font-display text-2xl font-black tracking-wider text-gradient">
                GA
              </span>
            </motion.div>

            {/* Wordmark */}
            <motion.h1
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white mb-2"
            >
              GULL ABBAS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-8 font-mono"
            >
              Full Stack MERN Portfolio
            </motion.p>

            {/* Progress Counter & Bar */}
            <div className="w-full space-y-3">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                <span className="truncate max-w-60 text-left">{statusText}</span>
                <span className="text-cyan-400 font-semibold tabular-nums">{progress}%</span>
              </div>

              {/* Progress track */}
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
                <motion.div
                  className="h-full bg-linear-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-full shadow-[0_0_12px_rgba(0,212,255,0.7)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>
            </div>

            {/* Quick Skip button */}
            <button
              onClick={handleSkip}
              className="mt-8 text-xs font-mono text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-widest px-4 py-1.5 rounded border border-white/5 hover:border-cyan-500/30"
            >
              Skip Intro [Space]
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
