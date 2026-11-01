import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if target is interactive
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.dataset.cursor === 'hover')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  // Smooth follower animation
  useEffect(() => {
    if (isTouch) return;
    let animId: number;
    const updateFollower = () => {
      setFollowerPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      animId = requestAnimationFrame(updateFollower);
    };
    animId = requestAnimationFrame(updateFollower);
    return () => cancelAnimationFrame(animId);
  }, [pos, isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Primary sharp cursor dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      >
        <div
          className={`rounded-full bg-cyan-400 transition-all duration-150 ${
            isHovered
              ? 'w-3 h-3 bg-cyan-300 shadow-[0_0_12px_rgba(0,212,255,0.9)]'
              : 'w-2 h-2 shadow-[0_0_8px_rgba(0,212,255,0.7)]'
          }`}
        />
      </div>

      {/* Trailing luminous ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-9998 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          transform: `translate3d(${followerPos.x}px, ${followerPos.y}px, 0)`,
        }}
      >
        <div
          className={`rounded-full border border-cyan-400/40 transition-all duration-200 ease-out ${
            isHovered
              ? 'w-12 h-12 bg-cyan-500/10 scale-125 border-cyan-400/70 shadow-[0_0_24px_rgba(0,212,255,0.25)]'
              : 'w-8 h-8 scale-100 bg-transparent'
          }`}
        />
      </div>
    </>
  );
};
