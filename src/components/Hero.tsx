/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Music, ArrowDown } from 'lucide-react';

interface HeroProps {
  onListenClick: () => void;
  onShopClick: () => void;
}

export default function Hero({ onListenClick, onShopClick }: HeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const heroBackgroundImage =
    'https://images.zoogletools.com/s:bzglfiles/u/1305706/8965da133cacd007d9814fd7fa401afc3f4efb26/original/fileab6761610000e5ebe5f7dd6d61f1167378eae4a8/!!/b%3AW1siZXh0cmFjdCIseyJsZWZ0IjowLCJ0b3AiOjU1LCJ3aWR0aCI6NTMwLCJoZWlnaHQiOjUzMH1dLFsicmVzaXplIiw1MzBdLFsibWF4Il0sWyJ3ZSJdXQ%3D%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.jpg';

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center items-center py-24 px-4 overflow-hidden"
    >
      <img
        src={heroBackgroundImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-45 pointer-events-none"
      />
      <div className="absolute inset-0 z-0 bg-black/70 pointer-events-none" />

      {/* Background Radial Glow */}
      <div 
        id="hero-radial-glow"
        className="absolute inset-0 z-0 bg-radial-[circle_at_center,_var(--color-brand-red)_0%,_transparent_65%] opacity-[0.25] pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.15}px) scale(${1 + scrollY * 0.0005})`,
          transition: 'transform 0.1s ease-out'
        }}
      />

      {/* Giant Ghost Text - Parallax */}
      <div 
        id="hero-ghost-text"
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.35}px)`,
          transition: 'transform 0.05s ease-out'
        }}
      >
        <span className="font-display text-[26vw] leading-none tracking-[0.05em] text-white opacity-[0.025] uppercase">
          DUDJA
        </span>
      </div>

      {/* Foreground Content container */}
      <div id="hero-content" className="relative z-10 w-full max-w-5xl flex flex-col items-start justify-center text-left">
        {/* Boston City Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          id="hero-tag"
          className="flex items-center space-x-2 border border-brand-red/30 bg-brand-red/5 px-3.5 py-1.5 rounded-full mb-6 font-mono text-xs tracking-[0.2em] text-[#d4cfbd] uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
          <span>BOSTON, MA // SONIC BRUTALISM</span>
        </motion.div>

        {/* Stacked Word Art Banner: MIX OF FILLED AND OUTLINED */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          id="hero-header-stack"
          className="font-display text-8xl sm:text-[11rem] md:text-[14rem] leading-[0.8] tracking-[0.02em] font-extrabold flex flex-col uppercase mb-8"
        >
          <span id="hero-title-dud" className="text-brand-bone text-shadow">DUD</span>
          <span id="hero-title-ja" className="text-stroke-red text-shadow-red relative -mt-2">JA</span>
        </motion.div>

        {/* Artist Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          id="hero-tagline"
          className="font-sans text-xs sm:text-sm md:text-base text-[#aaa59e]/90 max-w-2xl leading-relaxed mb-10 tracking-wide font-light space-y-4"
        >
          <span className="block font-sans font-medium tracking-[0.25em] text-brand-bone uppercase text-xs sm:text-sm">
            Rapper &bull; Producer &bull; Singer-Songwriter
          </span>
          <span className="block mt-3 text-[#d1ccc4] text-[13px] sm:text-sm leading-relaxed">
            Dudja is a Boston-based multi-instrumentalist, that makes music  recorded somewhere cold and underground. He pulls from alternative, electronic, and soul, his analog bass, tape-saturated textures and synthesizers, hit like film scores, and then he raps over it in a way that feels more like confessional writing than performance. Nothing here is  safe or commercial. That's the whole  point.
          </span>
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          id="hero-ctas"
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button
            id="hero-listen-btn"
            onClick={onListenClick}
            className="flex items-center justify-center space-x-3 px-8 py-4 bg-brand-red text-brand-bone hover:bg-brand-red-hover transition-all duration-300 font-mono text-xs tracking-[0.2em] font-bold shadow-lg shadow-brand-red/10 group cursor-pointer"
          >
            <Music className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            <span>LISTEN NOW</span>
          </button>
          
          <button
            id="hero-shop-btn"
            onClick={onShopClick}
            className="flex items-center justify-center space-x-2 px-8 py-4 border border-brand-bone/25 bg-transparent hover:bg-brand-bone hover:text-black hover:border-brand-bone transition-all duration-300 font-mono text-xs tracking-[0.2em] font-semibold cursor-pointer"
          >
            <span>SHOP MERCH</span>
          </button>
        </motion.div>
      </div>

      {/* Floating Vertical Scroll Indicator (Bottom Right) */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        id="hero-scroll-indicator"
        className="absolute bottom-12 right-6 md:right-12 z-20 flex flex-col items-center space-y-4"
      >
        <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30 vertical-text flex items-center justify-center">
          SCROLL TO EXPLORE
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="p-1 rounded-full border border-white/15"
        >
          <ArrowDown className="w-3.5 h-3.5 text-brand-red" />
        </motion.div>
      </motion.div>

      {/* Custom Vertical Text Styles */}
      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        .text-shadow {
          text-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .text-shadow-red {
          text-shadow: 0 4px 24px rgba(192, 57, 43, 0.15);
        }
      `}</style>
    </section>
  );
}
