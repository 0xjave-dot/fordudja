/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function StreamingBar() {
  const providers = [
    { name: 'SPOTIFY', url: 'https://open.spotify.com/artist/6eZ4wMPiOBjFoDeWxGabGx', color: '#1DB954' },
    { name: 'APPLE MUSIC', url: 'https://music.apple.com/us/artist/dudja/955447237', color: '#FC3C44' },
    { name: 'SOUNDCLOUD', url: 'https://soundcloud.com/Dudja4life', color: '#FF5500' },
    { name: 'TIDAL', url: 'https://tidal.com/browse/artist/6443740', color: '#00FFE0' },
    { name: 'YOUTUBE', url: 'https://youtube.com/@dudja', color: '#FF0000' }
  ];

  return (
    <div 
      id="streaming-bar"
      className="relative z-20 w-full bg-brand-bg-card border-y border-white/5 py-6 px-4 md:px-12"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Label Header */}
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
          <span className="font-mono text-xs tracking-[0.25em] text-brand-bone/60 uppercase">
            STREAM MUSIC ON:
          </span>
        </div>

        {/* Horizontal Navigation Pills Grid */}
        <div className="flex flex-wrap justify-center items-center gap-3">
          {providers.map((p) => (
            <motion.a
              whileHover={{ 
                scale: 1.05, 
                borderColor: p.color,
                boxShadow: `0 4px 15px ${p.color}20`
              }}
              whileTap={{ scale: 0.98 }}
              key={p.name}
              id={`stream-provider-${p.name.toLowerCase().replace(/\s+/g, '-')}`}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 px-4 py-2 border border-white/10 rounded-full bg-[#111111] font-mono text-[11px] tracking-widest text-[#d8d3ca] hover:text-white transition-all duration-300"
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
              <span>{p.name}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
