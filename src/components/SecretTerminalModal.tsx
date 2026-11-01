import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Terminal, X, CornerDownLeft } from 'lucide-react';
import { sounds } from '../utils/audio';

interface SecretTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretTerminalModal: React.FC<SecretTerminalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [history, setHistory] = useState<string[]>([
    '>>> GULL ABBAS MERN KERNEL OS [v2026.2-RELEASE]',
    '>>> SECURE KERNEL LOADED: ALL 11 PROJECTS OPERATIONAL.',
    '>>> Type "help" to list available terminal commands.',
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      sounds.playEasterEgg();
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [isOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    sounds.playClick();

    if (!cmd) return;

    let response = '';
    switch (cmd) {
      case 'help':
        response = 'Commands: help | skills | projects | education | contact | clear | exit';
        break;
      case 'skills':
        response = 'Stack: HTML5, CSS3, JavaScript ES6+, React.js, Next.js, Node.js, Express.js, MongoDB, Tailwind CSS, Vite';
        break;
      case 'projects':
        response = 'Projects (11): DukaLink, FoodieHub, Faisal Dildar Real Estate, PlayNexus, LinkedIn Clone, Arbaz Shoes, Foodpanda Clone, Amazon Clone, Unity Assets, E-Commerce Store, Workflow Automation';
        break;
      case 'education':
        response = 'BS Computer Science (BSCS) @ Virtual University of Pakistan, Lahore (2025 – Present)';
        break;
      case 'contact':
        response = 'Email: gullabbas028@gmail.com | Phone: +92 347 1426033 | Location: Lahore, Pakistan';
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case 'exit':
        onClose();
        return;
      default:
        response = `Unknown command: "${cmd}". Type "help" for a list of directives.`;
    }

    setHistory((prev) => [...prev, `$ ${inputVal}`, response]);
    setInputVal('');
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        className="relative w-full max-w-2xl bg-[#090a0f] border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(0,212,255,0.25)] z-10 overflow-hidden font-mono text-xs sm:text-sm text-cyan-300"
      >
        {/* Terminal Header */}
        <div className="bg-[#12141f] px-4 py-3 flex items-center justify-between border-b border-cyan-500/30">
          <div className="flex items-center gap-2 text-slate-300">
            <Terminal size={15} className="text-cyan-400" />
            <span className="font-semibold text-white tracking-wide">
              gull-abbas-console (~/lahore-mern-dev)
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-6 h-80 overflow-y-auto space-y-2 bg-[#06070a]/90">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={line.startsWith('$') ? 'text-white font-medium' : 'text-cyan-400/90'}
            >
              {line}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input */}
        <form
          onSubmit={handleCommand}
          className="bg-[#0e1017] p-3 border-t border-cyan-500/20 flex items-center gap-2"
        >
          <span className="text-cyan-400 font-bold">$</span>
          <input
            type="text"
            autoFocus
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help' and press Enter..."
            className="flex-1 bg-transparent text-white focus:outline-none placeholder-slate-600 font-mono text-xs sm:text-sm"
          />
          <button type="submit" className="text-cyan-400 hover:text-cyan-300 p-1">
            <CornerDownLeft size={14} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
