/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      id="footer-section"
      className="relative w-full bg-black border-t border-white/5 py-12 px-4 md:px-12 overflow-hidden select-none"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Ghost branding left */}
        <div className="text-left flex flex-col md:flex-row items-center gap-4">
          <span className="font-display text-5xl tracking-[0.2em] text-[#222222] font-extrabold uppercase">
            DUDJA
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#444] hidden md:inline">
            // BOSTON SOUND CATALOGUE
          </span>
        </div>

        {/* Legal right */}
        <div className="flex flex-col md:items-end text-center md:text-right space-y-1.5">
          <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
            &copy; {currentYear} DUDJA. ALL RIGHTS RESERVED WORLDWIDE.
          </p>
          <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">
            DESIGNED &bull; PRODUCED &bull; EXPERIENCED IN BOSTON // REPRESENTATION BY DM-90
          </p>
          <a
            id="footer-social-anchor"
            href="https://twitter.com/TheRealDudja"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[10px] text-brand-red hover:text-brand-red-hover hover:underline inline-block uppercase tracking-widest"
          >
            @TheRealDudja ↗
          </a>
        </div>

      </div>
    </footer>
  );
}
