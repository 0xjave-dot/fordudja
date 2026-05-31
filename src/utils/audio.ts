/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Web Audio API Synthesizer for Dudja's alternative hip-hop preview stems
class AudioSynthEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private stepInterval: number | null = null;
  private activeOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];
  private masterGain: GainNode | null = null;

  private currentTrackId = '';

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Generate real-time aesthetic sound structures corresponding to track motifs
  public play(trackId: string) {
    this.stop();
    this.initCtx();
    if (!this.ctx) return;

    this.isPlaying = true;
    this.currentTrackId = trackId;

    // Master configuration
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime); // Safe volume level
    this.masterGain.connect(this.ctx.destination);

    let tempo = 90; // BPM
    if (trackId === 'i-miss-my-heart') tempo = 84;
    else if (trackId === 'moving-on') tempo = 100;
    else if (trackId === 'egotistical-bastards') tempo = 92;
    else tempo = 96;

    const stepDuration = 60 / tempo / 2; // Eighth notes
    let stepCount = 0;

    // Start beat sequencer loop
    this.stepInterval = window.setInterval(() => {
      this.triggerStep(stepCount, trackId);
      stepCount = (stepCount + 1) % 16;
    }, stepDuration * 1000);
  }

  private triggerStep(step: number, trackId: string) {
    if (!this.ctx || !this.isPlaying || !this.masterGain) return;

    const now = this.ctx.currentTime;

    // Kick / Bass heartbeat triggers
    if (trackId === 'i-miss-my-heart') {
      // Double "heartbeat" thump on step 0 and 1
      if (step === 0 || step === 1 || step === 8 || step === 9) {
        this.synthKick(now, 58); // Deep suby kick
      }
      // Moody R&B Rhodes minor chords swell
      if (step === 0) {
        this.synthSwell(now, [110, 130.81, 164.81, 196.00], 1.2); // AbMaj7 outline
      } else if (step === 8) {
        this.synthSwell(now, [110, 146.83, 174.61, 220.00], 1.2); // Dm7 outline
      }
      // Sub-snare clap on steps 4 and 12
      if (step === 4 || step === 12) {
        this.synthRim(now);
      }
    } else if (trackId === 'moving-on') {
      // Driving electronic bassline
      if (step === 0 || step === 6 || step === 10) {
        this.synthKick(now, 65);
      }
      // Bright lofi synth notes
      const notes = [261.63, 293.66, 329.63, 392.00]; // C, D, E, G
      const tone = notes[step % notes.length];
      if (step % 2 === 0) {
        this.synthSynthLeads(now, tone, 0.25);
      }
      if (step === 4 || step === 12) {
        this.synthSnareNoise(now);
      }
    } else if (trackId === 'egotistical-bastards') {
      // Fast electronic street beat (alternative rap style)
      if (step % 4 === 0) {
        this.synthKick(now, 72);
      }
      if (step === 4 || step === 12) {
        this.synthSnareNoise(now);
      }
      // Constant high-hat clicks
      if (step % 2 === 1) {
        this.synthHat(now);
      }
      // Dynamic melodic pluck
      if (step === 2 || step === 7 || step === 11) {
        this.synthPluck(now, 220); // A3
      } else if (step === 14) {
        this.synthPluck(now, 246.94); // B3
      }
    } else {
      // Default: "Everything is NOT Awesome" moody lofi track
      if (step === 0 || step === 8) {
        this.synthKick(now, 50);
      }
      if (step === 4 || step === 12) {
        this.synthRim(now);
      }
      if (step % 4 === 2) {
        this.synthSynthLeads(now, 196.00, 0.4); // G3
      }
    }
  }

  // Deep Sub Kick/Heartbeat synthesizer
  private synthKick(time: number, startFreq: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.18);

    gain.gain.setValueAtTime(1.0, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.18);

    osc.start(time);
    osc.stop(time + 0.2);

    this.activeOscillators.push({ osc, gain });
    this.cleanOscRefsDelayed(osc, gain, 200);
  }

  // Snare noisy crack
  private synthSnareNoise(time: number) {
    if (!this.ctx || !this.masterGain) return;

    // Create a tiny buffer of white noise
    const bufferSize = this.ctx.sampleRate * 0.12;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.11);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noiseSource.start(time);
    noiseSource.stop(time + 0.13);
  }

  // High hat crack
  private synthHat(time: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(10000, time);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7000, time);

    gain.gain.setValueAtTime(0.08, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.04);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.05);

    this.activeOscillators.push({ osc, gain });
    this.cleanOscRefsDelayed(osc, gain, 60);
  }

  // Rim shot clap substitute
  private synthRim(time: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, time);

    gain.gain.setValueAtTime(0.18, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.06);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.07);

    this.activeOscillators.push({ osc, gain });
    this.cleanOscRefsDelayed(osc, gain, 80);
  }

  // Atmospheric chord swells
  private synthSwell(time: number, frequencies: number[], duration: number) {
    if (!this.ctx || !this.masterGain) return;

    frequencies.forEach((freq) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      // Lowpass swell filter to sound R&B/lofi
      const lpf = this.ctx.createBiquadFilter();
      lpf.type = 'lowpass';
      lpf.frequency.setValueAtTime(250, time);
      lpf.frequency.exponentialRampToValueAtTime(800, time + duration / 2);
      lpf.frequency.exponentialRampToValueAtTime(150, time + duration);

      gain.gain.setValueAtTime(0.01, time);
      gain.gain.linearRampToValueAtTime(0.12, time + duration / 3);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(lpf);
      lpf.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + duration + 0.1);

      this.activeOscillators.push({ osc, gain });
      this.cleanOscRefsDelayed(osc, gain, (duration + 0.2) * 1000);
    });
  }

  // Melodic leads notes
  private synthSynthLeads(time: number, freq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.01, time);
    gain.gain.linearRampToValueAtTime(0.08, time + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration);

    this.activeOscillators.push({ osc, gain });
    this.cleanOscRefsDelayed(osc, gain, duration * 1000);
  }

  // Plucks
  private synthPluck(time: number, freq: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, time);
    filter.frequency.exponentialRampToValueAtTime(100, time + 0.1);

    gain.gain.setValueAtTime(0.09, time);
    gain.gain.exponentialRampToValueAtTime(0.005, time + 0.15);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.18);

    this.activeOscillators.push({ osc, gain });
    this.cleanOscRefsDelayed(osc, gain, 200);
  }

  // Memory cleanup
  private cleanOscRefsDelayed(osc: OscillatorNode, gain: GainNode, delayMs: number) {
    setTimeout(() => {
      try {
        osc.disconnect();
        gain.disconnect();
      } catch (e) {}
      this.activeOscillators = this.activeOscillators.filter(item => item.osc !== osc);
    }, delayMs);
  }

  public stop() {
    this.isPlaying = false;
    if (this.stepInterval) {
      clearInterval(this.stepInterval);
      this.stepInterval = null;
    }

    // Stop and disconnect all active oscillators
    this.activeOscillators.forEach((item) => {
      try {
        item.osc.stop();
        item.osc.disconnect();
        item.gain.disconnect();
      } catch (e) {}
    });
    this.activeOscillators = [];

    if (this.masterGain) {
      try {
        this.masterGain.disconnect();
      } catch (e) {}
      this.masterGain = null;
    }
    this.currentTrackId = '';
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  public getTrackId() {
    return this.currentTrackId;
  }
}

export const DudjaAudioSynth = new AudioSynthEngine();
