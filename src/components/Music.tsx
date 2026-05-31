/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, ExternalLink, Sliders, Volume2, Music4 } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  year: string;
  duration: string;
  type: string;
  lyrics: string;
  spotifyUrl: string;
  previewUrl: string;
  themeColor: string;
}

export default function Music() {
  const tracks: Track[] = [
    {
      id: 'i-miss-my-heart',
      title: 'I Miss My Heart',
      year: '2026',
      duration: '3:42',
      type: 'Single',
      lyrics: `[Intro]
(Hollow clock ticking... slow ambient pad swells)
I forgot the rhythm of my own chest.
Yeah, listen...

[Verse 1]
A hollow rib cage under washed-black threads
Replaying dialogue of things we never said
Walking down Boylston, breath like smoke
Another winter morning, another bitter joke
Found a cold metal beat where the pulse should play
Left my warmth in a drawer, locked and put away

[Chorus]
But I miss my heart today
Yeah, I miss the way it used to break
No shielding, no walls, no armor built to stay
Tell me how to feel again, don\'t let it slip away
I miss my heart... standard heavy beats...

[Outro]
Just a cold metal cage
Trying to find the page.`,
      spotifyUrl: 'https://open.spotify.com/track/024LYsNZIcAOF2vfVElVwE',
      previewUrl: 'https://p.scdn.co/mp3-preview/643c6b2a8a9d3bd86bc5ebede9c7fb4e8e54fdb7',
      themeColor: '#c0392b'
    },
    {
      id: 'moving-on',
      title: 'Moving On',
      year: '2026',
      duration: '4:15',
      type: 'Album Track',
      lyrics: `[Verse 1]
Packing the boxes, tape across the seams
Tear down the posters, discard the digital dreams
Boston in the rear view, red taillights bleed
Chasing a signal that I don't even need
No rear-view mirror confessionals today

[Chorus]
We\'re moving on, we\'re moving on, yeah
Leaving dust on standard floorboards
Never looking back to check the scores
We\'re moving on.

[Outro]
Across the bridge, into the fog.`,
      spotifyUrl: 'https://open.spotify.com/track/7q44KOaOihSlAKr7cpAP1e',
      previewUrl: 'https://p.scdn.co/mp3-preview/1933a0d4efb70d8ec3987274aa0ef6a18879a9a5',
      themeColor: '#d35400'
    },
    {
      id: 'egotistical-bastards',
      title: 'Egotistical Bastards',
      year: '2025',
      duration: '3:12',
      type: 'Single',
      lyrics: `[Verse 1]
Bouncing off walls in a Boston cellar
Speaking to ghosts or a fortune teller
They said success would make us clean
But we\'re just actors on a crimson screen
Checking the tallies, checking the shares
Convinced that nobody really cares

[Chorus]
We\'re just egotistical bastards running in place
Wearing a crown in a desolate space
Fearing the mirror, loving the chase.`,
      spotifyUrl: 'https://open.spotify.com/track/3k7dh5J2jL4d7Zlp2CNpGb',
      previewUrl: 'https://p.scdn.co/mp3-preview/f57e15fdbb851ab421cf09c94df33fe4e8859727',
      themeColor: '#8e44ad'
    },
    {
      id: 'not-awesome',
      title: 'Everything Is NOT Awesome!!!',
      year: '2025',
      duration: '3:58',
      type: 'Single',
      lyrics: `[Verse 1]
No yellow Lego blocks in this broken plan
Driving in circles, trying to find a hand
We fake the smiles, we drink the tea
Everything is NOT awesome, and let me be

[Chorus]
Rip off the bandage, show me the scars
Living in cardboard, reaching for stars
Everything is not awesome today.`,
      spotifyUrl: 'https://open.spotify.com/track/69rEpCIj7VRvPL1euDjvNj',
      previewUrl: 'https://p.scdn.co/mp3-preview/ba846c8408eff7fca396a189ec8f8728bb72e65f',
      themeColor: '#7f8c8d'
    }
  ];

  const [activeTrack, setActiveTrack] = useState<Track>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const visualizerInterval = useRef<NodeJS.Timeout | null>(null);
  const [framerHeights, setFramerHeights] = useState<number[]>([30, 15, 45, 60, 20, 80, 40, 10, 55, 30, 75, 45, 90, 20]);

  // Handle active music visualization animation effect
  useEffect(() => {
    if (isPlaying) {
      visualizerInterval.current = setInterval(() => {
        setFramerHeights(prev => prev.map(() => Math.floor(Math.random() * 85) + 15));
        setPlaybackProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
      }, 100);
    } else {
      if (visualizerInterval.current) {
        clearInterval(visualizerInterval.current);
      }
    }
    return () => {
      if (visualizerInterval.current) clearInterval(visualizerInterval.current);
    };
  }, [isPlaying]);

  // Clean play state on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const togglePreviewPlay = async () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    audioRef.current?.pause();
    const audio = new Audio(activeTrack.previewUrl);
    audioRef.current = audio;
    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        setPlaybackProgress((audio.currentTime / audio.duration) * 100);
      }
    });
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setPlaybackProgress(0);
    });

    await audio.play();
    setIsPlaying(true);
  };

  const handleTrackSelect = (track: Track) => {
    audioRef.current?.pause();
    setActiveTrack(track);
    setPlaybackProgress(0);
    setIsPlaying(false);
  };

  return (
    <section 
      id="music"
      className="relative w-full py-24 px-4 md:px-12 bg-brand-bg/60 border-t border-white/5 scroll-mt-20 overflow-hidden"
    >
      {/* Absolute Aesthetic Graphics */}
      <div className="absolute right-0 top-1/4 -translate-y-1/2 font-display text-[15rem] leading-none text-white/[0.01] uppercase select-none pointer-events-none">
        BOSTON
      </div>
      
      <div className="w-full max-w-7xl mx-auto z-10 relative">
        {/* Sections Headlines */}
        <div className="mb-12 text-left">
          <span className="font-mono text-xs tracking-[0.3em] text-brand-red uppercase block mb-2 font-bold">
            // DISCOGRAPHY
          </span>
          <h2 className="font-display text-5xl md:text-7xl text-brand-bone tracking-wide uppercase">
            MUSIC SENSATIONS
          </h2>
          <div className="w-16 h-1 bg-brand-red mt-4" />
        </div>

        {/* Integrated Iframe Core Players Grid */}
        <div id="media-players-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Spotify Artist Embedded Player Section */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="spotify-embed-card"
            className="p-4 bg-brand-bg-card rounded-2xl border border-white/5 shadow-2xl flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="font-mono text-[11px] tracking-wider text-green-500 font-bold flex items-center gap-1.5 uppercase">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Spotify Discography
              </span>
              <a 
                href="https://open.spotify.com/artist/6eZ4wMPiOBjFoDeWxGabGx" 
                target="_blank" 
                rel="noreferrer" 
                className="text-white/40 hover:text-green-500 transition-colors"
                id="spotify-external-link"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            
            {/* Real Spotify Responsive Embed */}
            <div className="rounded-xl overflow-hidden bg-black/40 h-[380px]">
              <iframe 
                id="spotify-iframe"
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/artist/6eZ4wMPiOBjFoDeWxGabGx?utm_source=generator&theme=0" 
                width="100%" 
                height="380" 
                frameBorder="0" 
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Soundcloud Embedded Profile Player Section */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            id="soundcloud-embed-card"
            className="p-4 bg-brand-bg-card rounded-2xl border border-white/5 shadow-2xl flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="font-mono text-[11px] tracking-wider text-amber-500 font-bold flex items-center gap-1.5 uppercase">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                SoundCloud Stream
              </span>
              <a 
                href="https://soundcloud.com/Dudja4life" 
                target="_blank" 
                rel="noreferrer" 
                className="text-white/40 hover:text-amber-500 transition-colors"
                id="soundcloud-external-link"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* SoundCloud Profile Responsive Embed */}
            <div className="rounded-xl overflow-hidden bg-black/40 h-[380px]">
              <iframe 
                id="soundcloud-iframe"
                width="100%" 
                height="380" 
                scrolling="no" 
                frameBorder="no" 
                allow="autoplay" 
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/359302631&color=%23c0392b&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
              />
            </div>
          </motion.div>
        </div>

        {/* Custom Interactive Player Studio Section */}
        <div id="lyrics-visualizer-studio" className="mt-16 bg-gradient-to-br from-brand-bg-card to-black p-6 md:p-10 rounded-2xl border border-white/10 shadow-3xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Part A: Track List selection */}
            <div className="w-full lg:w-1/3 flex flex-col space-y-3">
              <h3 className="font-mono text-xs tracking-widest text-brand-red font-bold uppercase mb-2">
                // ACTIVE AUDIO SELECTION
              </h3>
              
              <div className="flex flex-col space-y-2">
                {tracks.map((t) => (
                  <button
                    key={t.id}
                    id={`track-select-${t.id}`}
                    onClick={() => handleTrackSelect(t)}
                    className={`p-4 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all duration-300 ${
                      activeTrack.id === t.id 
                        ? 'bg-brand-red/10 border-brand-red text-brand-bone' 
                        : 'bg-[#121212]/55 border-white/5 hover:border-white/15 text-[#a19c96]'
                    }`}
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <Music4 className={`w-4 h-4 flex-shrink-0 ${activeTrack.id === t.id ? 'text-brand-red' : 'text-neutral-600'}`} />
                      <div className="truncate">
                        <p className="font-display tracking-wider text-xl">{t.title}</p>
                        <p className="font-mono text-[10px] uppercase opacity-60 mt-0.5">{t.type} &bull; {t.year}</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-neutral-500">{t.duration}</span>
                  </button>
                ))}
              </div>

              {/* Boston Cinematic Vinyl Record mock-up banner */}
              <div className="p-4 bg-[#141414] border border-white/5 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-red/20 border border-brand-red/45 flex items-center justify-center animate-spin" style={{ animationDuration: '6s' }}>
                  <div className="w-3.5 h-3.5 rounded-full bg-black flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                  </div>
                </div>
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-[#8a857e] uppercase block font-semibold">BOSTON ANALOG CAPTURE</span>
                  <span className="font-mono text-[10px] text-brand-bone block leading-tight">Dudja Studio Multi-stems</span>
                </div>
              </div>
            </div>

            {/* Part B: Deep Audio Playback Console + Simulated Equalizer */}
            <div className="w-full lg:w-2/3 flex flex-col justify-between">
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                {/* Visual Cover art + Playback Title */}
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/15 flex-shrink-0 bg-brand-bg group">
                    <div
                      aria-label="Spotify"
                      className="w-full h-full bg-[#1DB954] flex items-center justify-center group-hover:scale-105 transition-transform duration-500"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="w-11 h-11 text-black"
                        fill="currentColor"
                      >
                        <path d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75Zm4.7 14.78a.64.64 0 0 1-.88.21c-2.4-1.47-5.42-1.8-8.98-.98a.64.64 0 1 1-.29-1.25c3.9-.89 7.24-.51 9.94 1.13.3.19.4.58.21.89Zm1.26-2.81a.8.8 0 0 1-1.1.26c-2.75-1.69-6.94-2.18-10.2-1.19a.8.8 0 1 1-.47-1.53c3.72-1.13 8.34-.58 11.51 1.37.38.24.5.73.26 1.09Zm.11-2.92c-3.3-1.96-8.74-2.14-11.89-1.18a.96.96 0 0 1-.56-1.84c3.61-1.1 9.62-.89 13.43 1.37a.96.96 0 0 1-.98 1.65Z" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Volume2 className="w-5 h-5 text-brand-red" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-display text-3xl sm:text-4xl text-brand-bone tracking-wide">{activeTrack.title}</h4>
                    <p className="font-mono text-xs text-brand-red font-bold mt-1 tracking-wider uppercase">
                      RELEASE YEAR: {activeTrack.year} &bull; {activeTrack.type}
                    </p>
                  </div>
                </div>

                {/* Sub-label for lyrics showcase */}
                <span className="font-mono text-[11px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-brand-bone/70 uppercase">
                  Vulnerability Core // INTROSPECTIVE LYRICS
                </span>
              </div>

              {/* Lyrics Panel with sliding gradient overlay */}
              <div className="relative border border-white/5 rounded-xl p-5 h-56 bg-black/60 overflow-y-auto mb-6 custom-scrollbar-thin">
                <div className="font-sans text-xs sm:text-sm text-brand-bone/80 whitespace-pre-line leading-relaxed pb-8 tracking-wide">
                  {activeTrack.lyrics}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black to-transparent pointer-events-none" />
              </div>

              {/* Interactive Player controls block */}
              <div className="bg-[#121212] border border-white/5 rounded-xl p-4 md:p-6 flex flex-col space-y-4">
                
                {/* Waveform Equalizer Display */}
                <div className="h-16 flex items-end justify-between px-2 gap-[3px] border-b border-white/5 pb-2">
                  {framerHeights.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm transition-all duration-200"
                      style={{
                        height: isPlaying ? `${h}%` : '6px',
                        backgroundColor: isPlaying ? activeTrack.themeColor : '#222222',
                        opacity: isPlaying ? 0.95 - i * 0.02 : 0.4
                      }}
                    />
                  ))}
                </div>

                {/* Console slider & play utilities */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  
                  {/* Controls Actions Left */}
                  <div className="flex items-center space-x-4">
                    <button
                      id="studio-play-pause-btn"
                      onClick={togglePreviewPlay}
                      className="p-3.5 bg-brand-red text-brand-bone hover:bg-brand-red-hover rounded-full cursor-pointer hover:scale-105 transition-transform"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>
                    <div>
                      <span className="font-mono text-[10px] text-white/40 uppercase block font-semibold">CONSOLE STATE</span>
                      <span className="font-mono text-xs text-brand-bone font-bold block">
                        {isPlaying ? 'PLAYING SPOTIFY PREVIEW' : 'TAP PLAY FOR SPOTIFY PREVIEW'}
                      </span>
                    </div>
                  </div>

                  {/* Progress track */}
                  <div id="interactive-track-progress" className="w-full sm:flex-1 mx-2">
                    <div className="relative h-1 bg-neutral-800 rounded-full overflow-hidden">
                      <div 
                        className="absolute left-0 top-0 bottom-0 bg-brand-red rounded-full transition-all duration-300"
                        style={{ width: `${playbackProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between font-mono text-[9px] text-[#86817a] mt-1.5 uppercase">
                      <span>0:00 PREVIEW</span>
                      <span>{activeTrack.duration} FULL TRACK</span>
                    </div>
                  </div>

                  {/* Open Official Links right */}
                  <a
                    id="spotify-studio-btn"
                    href={activeTrack.spotifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-white tracking-widest bg-emerald-600 hover:bg-emerald-500 transition-colors px-4 py-2.5 rounded-full uppercase"
                  >
                    <span>FULL TRACK ON SPOTIFY</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      <style>{`
        .custom-scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar-thin::-webkit-scrollbar-track {
          background: #000;
        }
        .custom-scrollbar-thin::-webkit-scrollbar-thumb {
          background: #c0392b;
          border-radius: 2px;
        }
      `}</style>
    </section>
  );
}
