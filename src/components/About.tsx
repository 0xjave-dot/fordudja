/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Quote, Radio } from 'lucide-react';

export default function About() {
  const [activeTab, setActiveTab] = useState<'credo' | 'roots' | 'notebook'>('credo');
  const notebookEntries = [
    {
      date: 'OCT 24, 2024',
      quote: 'The drum pattern must feel like a heartbeat recovering from a shock. If it\'s too clean, it\'s lying.',
      location: 'South End Basement'
    },
    {
      date: 'FEB 12, 2025',
      quote: 'Stumbled onto a synthesizer waveform that sounds like frozen copper. Added a red light filter in the booth to match the color.',
      location: 'Dudja Design Lab'
    },
    {
      date: 'JAN 08, 2026',
      quote: 'Moving On is not about leaving. It is about accelerating into the blur until the shadows can\'t keep up.',
      location: 'South Station Train Platform'
    }
  ];

  return (
    <section 
      id="about" 
      className="relative w-full py-28 px-4 md:px-12 bg-black border-t border-white/5 overflow-hidden"
    >
      {/* Dynamic Background Graphics */}
      <div className="absolute left-0 top-1/4 font-display text-[15rem] leading-none text-brand-red/[0.015] uppercase select-none pointer-events-none">
        VISION
      </div>
      <div className="absolute right-0 bottom-1/4 font-display text-[12rem] leading-none text-white/[0.01] uppercase select-none pointer-events-none">
        ROOTS
      </div>

      <div className="w-full max-w-7xl mx-auto z-10 relative">
        
        {/* Aesthetic Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div className="text-left max-w-2xl">
            <span className="font-mono text-xs tracking-[0.4em] text-brand-red uppercase block mb-3 font-bold">
              /// CREATIVE MANIFESTO
            </span>
            <h2 className="font-display text-5xl md:text-7xl text-brand-bone tracking-wide uppercase leading-none">
              THE SONIC CRUCIBLE
            </h2>
            <div className="w-20 h-1 bg-brand-red mt-5" />
          </div>
          
          <div className="font-mono text-[10px] tracking-widest text-[#a19c96] uppercase border border-white/10 px-4 py-2 bg-[#0c0c0c] rounded-md max-w-xs leading-relaxed">
            "Art is the only architecture immune to winter." &mdash; DUDJA SUPPLY DIRECTIVE
          </div>
        </div>

        {/* Major Grid: Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Poetic Narrative Block */}
          <div className="lg:col-span-12 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <span className="font-mono text-xs tracking-[0.2em] text-brand-red font-semibold uppercase flex items-center gap-2">
                <Flame className="w-4 h-4 text-brand-red" />
                ARTIST DOSSIER
              </span>
              
              <h3 className="font-display text-3xl sm:text-4xl text-brand-bone tracking-wide font-medium leading-snug uppercase">
                NO TEMPLATES. NO OUTSIDE PRODUCERS.
              </h3>

              <div className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed font-light space-y-4">
                <p>
                  Dudja grew up around Boston and started building his sound in basements. No templates, no outside producers &mdash; everything comes from him. The music sits somewhere between alternative, electronic, and soul, with production that leans into grit instead of polish. Sub-bass, tape saturation, drum machines, real lyrics. He's been doing it for years and the catalog shows it.
                </p>
                <p>
                  The range goes from claustrophobic (<em className="text-brand-red">"Everything Is NOT Awesome!!!"</em>) to wide open (<em className="text-brand-bone">"Moving On"</em>). What stays consistent is that none of it sounds like it was made to fit anywhere. That's not an accident.
                </p>
              </div>
            </div>

            {/* Credo & Interactive Selector Tabs */}
            <div className="bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex border-b border-white/5 pb-2 gap-4">
                {(['credo', 'roots', 'notebook'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`font-mono text-xs tracking-widest uppercase pb-2 transition-all relative cursor-pointer ${
                      activeTab === tab ? 'text-brand-bone font-bold' : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div 
                        layoutId="activeAboutTabLine"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-red" 
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-[120px] flex items-center">
                <AnimatePresence mode="wait">
                  {activeTab === 'credo' && (
                    <motion.div
                      key="credo-content"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3 text-left"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Quote className="w-5 h-5 text-brand-red" />
                        <span className="font-mono text-[10px] text-brand-red uppercase font-bold tracking-widest">THE THREE DIRECTIVES</span>
                      </div>
                      <p className="font-sans text-xs text-neutral-400 leading-relaxed uppercase">
                        1. <strong className="text-brand-bone">Structural Honesty:</strong> Never fake an emotion, an instrument, or an intention.
                        <br />
                        2. <strong className="text-brand-bone">Texture Over Polish:</strong> Let the tape hiss, the floorboards creek, the vocals clip.
                        <br />
                        3. <strong className="text-brand-bone">Autonomy:</strong> Code your sound, print your garments, control your signal.
                      </p>
                    </motion.div>
                  )}

                  {activeTab === 'roots' && (
                    <motion.div
                      key="roots-content"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2 text-left"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Radio className="w-5 h-5 text-brand-red" />
                        <span className="font-mono text-[10px] text-brand-red uppercase font-bold tracking-widest">THE BOSTON GEOGRAPHY</span>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                        Dudja’s creative geography is mapped onto the concrete of Boston. From the underground crawls in the South End where early modular synth jams were hosted, to the industrial warehouses of East Boston hosting raw projection art, the city\'s cold winters and severe geometry dictate the sonic palette.
                      </p>
                    </motion.div>
                  )}

                  {activeTab === 'notebook' && (
                    <motion.div
                      key="notebook-content"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4 w-full text-left"
                    >
                      {notebookEntries.map((entry, idx) => (
                        <div key={idx} className="border-l border-brand-red/35 pl-3 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[9px] text-[#837e76] uppercase font-bold">{entry.date}</span>
                            <span className="font-mono text-[9px] text-brand-red uppercase font-semibold">{entry.location}</span>
                          </div>
                          <p className="font-mono text-[11px] text-brand-bone italic leading-relaxed">
                            "{entry.quote}"
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
