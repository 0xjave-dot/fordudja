/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Compass, HelpCircle, Activity, Heart, Quote, Radio, Zap } from 'lucide-react';

export default function About() {
  const [activeTab, setActiveTab] = useState<'credo' | 'roots' | 'notebook'>('credo');
  const [selectedGear, setSelectedGear] = useState<string | null>(null);

  const aestheticInfluences = [
    {
      id: 'fog',
      title: 'Boston Winter Fog',
      category: 'Atmosphere',
      desc: 'The thick, saline mist rolling off the harbor and settling over Boylston Street. It blanked out the noise of the city, leaving only cold echo chambers for late-night vocal tracking.'
    },
    {
      id: 'echo',
      title: 'Space Echo RE-201',
      category: 'Analog Gear',
      desc: 'A legendary physical tape-delay unit. Dudja pushes it to self-oscillate, creating the cascading swell of shadows that pads the intros of tracks like "I Miss My Heart".'
    },
    {
      id: 'brutalism',
      title: 'Concrete Brutalism',
      category: 'Architecture',
      desc: 'Boston City Hall’s imposing concrete block. Coarse textures, massive shapes with zero ornamentation. This cold structural honesty forms the bedrock of Dudja\'s supply and sound design.'
    },
    {
      id: 'fever',
      title: 'Bedroom Tape Loops',
      category: 'Process',
      desc: 'Slowing down vintage soul records on cassette four-track tapes, physically warbling the spools by thumb to inject raw human imperfection into the computerized percussion grid.'
    }
  ];

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

        {/* Major Grid: Story on Left, Interactive Console on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Poetic Narrative Block (6 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <span className="font-mono text-xs tracking-[0.2em] text-brand-red font-semibold uppercase flex items-center gap-2">
                <Flame className="w-4 h-4 text-brand-red" />
                ARTIST DOSSIER
              </span>
              
              <h3 className="font-display text-3xl sm:text-4xl text-brand-bone tracking-wide font-medium leading-snug uppercase">
                BREATHING RAW IMPERFECTION INTO DIGITAL CANVAS
              </h3>

              <div className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed font-light space-y-4">
                <p>
                  Born out of the damp basements and industrial fringes of Boston, Massachusetts, 
                  <strong className="text-brand-bone font-medium"> Dudja </strong> 
                  stands as an uncompromising figure in the experimental music landscape. Rejecting the clean, 
                  hyper-processed safety of modern commercial production, he has spent years building a sonic bunker where 
                  sub-bass tremors, tape saturation, and poetic vulnerability collide in high-velocity friction.
                </p>
                <p>
                  Dudja\'s sound is a raw physical texture. It is a dense, smoke-tinted architecture made of vintage 
                  drum machinery, cascading analog echoes, and heavy lyrical narratives. Every single vocal line, synthesizer 
                  swell, and metallic percussion loop is engineered in-house, ensuring that the artist’s raw, unmodified 
                  spirit is directly embedded into the copper lines of the audio files.
                </p>
                <p>
                  This is not merely entertainment. This is an ongoing battle to document real youth culture, existential solitude, 
                  and persistent hope within the concrete canyons of the American East Coast. From the claustrophobic dread of 
                  <em className="text-brand-red"> "Everything Is NOT Awesome!!!" </em> to the soaring, cathartic momentum of 
                  <em className="text-brand-bone"> "Moving On"</em>, every frequency is a document of survival.
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
                        3. <strong className="text-brand-bone">Autonomy:</strong> Code your sound, print your merch, control your signal.
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

          {/* Aesthetic Interactive Directory (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 md:p-8 flex-1 flex flex-col justify-between relative overflow-hidden group">
              {/* Corner Grid lines */}
              <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-white/5 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-white/5 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs tracking-[0.2em] text-brand-red font-bold uppercase flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-brand-red animate-pulse" />
                    SONIC GEAR CATALOG
                  </span>
                  <span className="font-mono text-[8px] border border-brand-red/40 px-2 py-0.5 rounded text-brand-red font-bold uppercase">
                    ACTIVE SENSORS
                  </span>
                </div>

                <p className="font-sans text-xs text-neutral-400 max-w-sm mb-6 leading-relaxed">
                  Interactive directory highlighting the tactile stimuli and modular equipment feeding Dudja\'s current studio cycle:
                </p>

                <div className="space-y-3">
                  {aestheticInfluences.map((inf) => (
                    <button
                      key={inf.id}
                      id={`gear-item-${inf.id}`}
                      onClick={() => setSelectedGear(selectedGear === inf.id ? null : inf.id)}
                      className={`w-full p-4 text-left border rounded-xl flex flex-col space-y-2 cursor-pointer transition-all duration-300 ${
                        selectedGear === inf.id
                          ? 'bg-brand-red/10 border-brand-red shadow-lg'
                          : 'bg-[#101010]/40 border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display text-lg text-brand-bone tracking-wide">{inf.title}</span>
                        <span className="font-mono text-[9px] bg-white/5 px-2 py-0.5 rounded text-neutral-500 uppercase">{inf.category}</span>
                      </div>

                      <AnimatePresence initial={false}>
                        {selectedGear === inf.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light pt-2 border-t border-white/5">
                              {inf.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live telemetry visualizer mock in line with branding */}
              <div className="mt-8 p-4 bg-black/80 border border-white/5 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-red/10 border border-brand-red/30 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-brand-red" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-[#86817b] uppercase block font-semibold">SIGNAL ANALYSIS</span>
                    <span className="font-mono text-[10px] text-brand-bone block">DUMMY_SYNTH_ACTIVE_FREQ</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-ping" />
                  <span className="font-mono text-[10px] text-neutral-500 uppercase">STREAMING</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
