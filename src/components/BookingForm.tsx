/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, Send, Mail, MapPin, Calendar, Globe, Square } from 'lucide-react';

interface BookingFormProps {
  onFormSubmitted: (inquiry: { name: string; inquiryType: string }) => void;
}

export default function BookingForm({ onFormSubmitted }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Live Performance / Show',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields before sending inquiry.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API request to Formspree
    setTimeout(() => {
      onFormSubmitted({
        name: formData.name,
        inquiryType: formData.inquiryType
      });
      setFormData({
        name: '',
        email: '',
        inquiryType: 'Live Performance / Show',
        message: ''
      });
      setIsSubmitting(false);
    }, 1200);
  };

  const socials = [
    { name: 'Instagram', handle: '@TheRealDudja', url: 'https://instagram.com/TheRealDudja' },
    { name: 'SoundCloud', handle: 'Dudja4life', url: 'https://soundcloud.com/Dudja4life' },
    { name: 'Twitter / X', handle: '@TheRealDudja', url: 'https://twitter.com/TheRealDudja' },
    { name: 'Facebook', handle: '@TheRealDudja', url: 'https://facebook.com/TheRealDudja' }
  ];

  return (
    <section 
      id="booking"
      className="relative w-full py-24 bg-brand-bg-card border-y border-white/5 scroll-mt-20 overflow-hidden"
    >
      {/* Decorative vertical coordinates overlay */}
      <div className="absolute left-6 top-10 font-mono text-[9px] text-[#55524d] tracking-widest hidden md:block">
        SYS.LOC // 42.3601 N, 71.0589 W &bull; BOSTON HUB
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-12">
        <div id="booking-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Column A: Context & Social Handles */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-center">
            
            <div className="text-left">
              <span className="font-mono text-xs tracking-[0.3em] text-brand-red uppercase block mb-2 font-bold">
                // CONTACT &amp; AGENT DIRECT
              </span>
              <h2 className="font-display text-5xl md:text-7xl text-brand-bone tracking-wide uppercase leading-tight">
                BOOKING INQUIRIES
              </h2>
              <div className="w-16 h-1 bg-brand-red mt-4" />
            </div>

            <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed font-light">
              Dudja is available for live shows, music festivals, vocal features, production collaborations, and authentic brand partnerships that align with alternative art direction. Fill out the console form, and our management team will review and reply within 48 hours.
            </p>

            {/* Direct Contacts Grid details */}
            <div className="space-y-4 pt-4 border-t border-white/5 font-mono text-xs">
              <div className="flex items-center space-x-3 text-brand-bone">
                <MapPin className="w-4 h-4 text-brand-red" />
                <span className="tracking-wide">Boston, MA // Professional Representation</span>
              </div>
              <div className="flex items-center space-x-3 text-brand-bone">
                <Mail className="w-4 h-4 text-brand-red" />
                <span className="tracking-wide">mgmt@dudjamusic.com</span>
              </div>
            </div>

            {/* Structured Social list */}
            <div className="space-y-3 pt-6 border-t border-white/5">
              <span className="font-mono text-[10px] tracking-widest text-[#8a857e] uppercase block font-semibold">
                OFFICIAL SOCIAL LINKS
              </span>
              <div className="grid grid-cols-2 gap-3">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    id={`booking-social-${s.name.toLowerCase().replace(/\s+/g, '-')}`}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-2 text-zinc-400 hover:text-brand-red transition-colors py-1.5"
                  >
                    <Square className="w-1.5 h-1.5 fill-brand-red text-brand-red" />
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] uppercase text-zinc-500 block leading-none">{s.name}</span>
                      <span className="font-mono text-xs text-brand-bone font-medium truncate block mt-0.5">{s.handle}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column B: Interactive Contact console Form */}
          <div className="lg:col-span-7">
            {/* Formspree Ready Form Frame */}
            {/* Note: Developer can swap action URL value cleanly */}
            <form 
              id="booking-form"
              onSubmit={handleSubmit}
              action="https://formspree.io/f/placeholder_id" 
              method="POST"
              className="bg-brand-bg rounded-2xl border border-white/10 p-6 md:p-8 space-y-6 relative shadow-2xl"
            >
              <div className="space-y-4">
                {/* Visual anchor bar */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="font-mono text-[10px] tracking-widest text-[#a19c95] uppercase font-bold flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-brand-red" />
                    INQUIRY FORM
                  </span>
                  <span className="font-mono text-[9px] text-[#706c66] uppercase">FORM_ID // DX-900</span>
                </div>

                {/* Input grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="booking-name" className="block font-mono text-[10px] uppercase text-[#a59f96] tracking-widest mb-1.5 font-bold">
                      Full Name *
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Rachel Adams"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#111] text-brand-bone border border-white/10 focus:border-brand-red py-3 px-4 rounded-lg font-mono text-xs transition-colors outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-email" className="block font-mono text-[10px] uppercase text-[#a59f96] tracking-widest mb-1.5 font-bold">
                      Email Address *
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. rachel@agency.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#111] text-brand-bone border border-white/10 focus:border-brand-red py-3 px-4 rounded-lg font-mono text-xs transition-colors outline-none"
                    />
                  </div>
                </div>

                {/* Inquiry Type Select Dropdown */}
                <div>
                  <label htmlFor="booking-type" className="block font-mono text-[10px] uppercase text-[#a59f96] tracking-widest mb-1.5 font-bold">
                    Inquiry Category
                  </label>
                  <select
                    id="booking-type"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full bg-[#111] text-brand-bone border border-white/10 focus:border-brand-red py-3 px-4 rounded-lg font-mono text-xs transition-colors outline-none cursor-pointer"
                  >
                    <option value="Live Performance / Show">Live Performance / Show</option>
                    <option value="Festival Booking">Festival Booking</option>
                    <option value="Feature / Vocal Collab">Feature / Vocal Collab</option>
                    <option value="Brand Partnership">Brand Partnership</option>
                    <option value="Press / Interview">Press / Interview</option>
                    <option value="Other">Other Category</option>
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="booking-message" className="block font-mono text-[10px] uppercase text-[#a59f96] tracking-widest mb-1.5 font-bold">
                    Inquiry Details *
                  </label>
                  <textarea
                    id="booking-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Provide details about dates, location, rates, and visual expectations..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#111] text-brand-bone border border-white/10 focus:border-brand-red py-3 px-4 rounded-lg font-mono text-xs transition-colors outline-none resize-none"
                  />
                </div>
              </div>

              {/* Submit Action */}
              <button
                id="booking-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 py-4 bg-brand-red hover:bg-brand-red-hover text-brand-bone rounded-lg font-mono text-xs tracking-widest font-bold cursor-pointer transition-colors uppercase disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'TRANSMITTING...' : 'SEND INQUIRY'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
