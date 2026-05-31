/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavigationProps {
  onCartClick: () => void;
  cartCount: number;
  currentPage: 'home' | 'merch';
  onPageChange: (page: 'home' | 'merch', sectionId?: string) => void;
}

export default function Navigation({ onCartClick, cartCount, currentPage, onPageChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollDir, setScrollDir] = useState<'up' | 'down' | 'top'>('top');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY <= 10) {
        setScrollDir('top');
      } else if (currentScrollY > lastScrollY) {
        setScrollDir('down');
      } else {
        setScrollDir('up');
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleItemClick = (id: string) => {
    setIsMobileMenuOpen(false);
    if (id === 'merch') {
      onPageChange('merch');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentPage === 'merch') {
        onPageChange('home', id);
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false);
    if (currentPage === 'merch') {
      onPageChange('home', 'hero');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Compute navigation background style based on scroll status
  // "Background fades from solid black to transparent as you scroll down; returns on scroll up"
  const getNavBgClass = () => {
    if (scrollDir === 'top') {
      return 'bg-brand-bg border-b border-white/5';
    }
    if (scrollDir === 'down') {
      return 'bg-transparent border-b border-transparent pointer-events-none md:pointer-events-auto';
    }
    // scrollDir === 'up'
    return 'bg-brand-bg/95 backdrop-blur-md border-b border-brand-red/20 shadow-md';
  };

  const menuItems = [
    { label: 'MUSIC', id: 'music' },
    { label: 'VISION', id: 'about' },
    { label: 'MERCH', id: 'merch' },
    { label: 'BOOKING', id: 'booking' },
    { label: 'SPOTIFY', href: 'https://open.spotify.com/artist/6eZ4wMPiOBjFoDeWxGabGx' }
  ];

  return (
    <>
      <nav 
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-500 ease-in-out px-4 md:px-12 flex items-center justify-between ${getNavBgClass()}`}
      >
        {/* Logo */}
        <button 
          id="nav-logo"
          onClick={handleLogoClick}
          className="font-display text-4xl tracking-[0.2em] text-brand-bone hover:text-brand-red cursor-pointer transition-colors"
        >
          DUDJA
        </button>

        {/* Desktop Links (Center) */}
        <div id="desktop-menu" className={`hidden md:flex items-center space-x-12 ${scrollDir === 'down' ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'} transition-all duration-500`}>
          {menuItems.map((item) => (
            item.id ? (
              <button
                key={item.label}
                id={`nav-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`font-mono text-xs tracking-widest hover:text-brand-bone transition-colors cursor-pointer relative py-2 group ${
                  (currentPage === 'merch' && item.id === 'merch') ? 'text-brand-bone font-bold' : 'text-[#a5a099]'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-[1.5px] bg-brand-red transition-all duration-300 ${
                  (currentPage === 'merch' && item.id === 'merch') ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            ) : (
              <a
                key={item.label}
                id={`nav-${item.label.toLowerCase()}`}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs tracking-widest text-brand-red hover:text-brand-red-hover transition-colors py-2"
              >
                {item.label} ↗
              </a>
            )
          ))}
        </div>

        {/* Right Side Controls (Cart + Mobile Toggle) */}
        <div id="nav-controls" className="flex items-center space-x-4 md:space-x-6">
          <button
            id="nav-cart-btn"
            onClick={onCartClick}
            className="relative p-2.5 rounded-full border border-white/10 bg-brand-bg-card hover:bg-brand-red hover:border-brand-red text-brand-bone transition-all duration-300 group cursor-pointer pointer-events-auto"
            aria-label="Toggle shopping cart"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  id="nav-cart-badge"
                  className="absolute -top-1.5 -right-1.5 bg-brand-red text-brand-bone font-mono text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-bg font-bold shadow-lg"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            id="nav-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-full border border-white/10 bg-brand-bg-card text-brand-bone hover:border-brand-red md:hidden cursor-pointer pointer-events-auto"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="mobile-nav-overlay"
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md md:hidden flex flex-col justify-center px-8"
          >
            <div id="mobile-nav-links" className="space-y-8 flex flex-col items-start">
              {menuItems.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="w-full"
                >
                  {item.id ? (
                    <button
                      id={`mobile-nav-link-${item.id}`}
                      onClick={() => handleItemClick(item.id)}
                      className="font-display text-5xl tracking-[0.1em] text-brand-bone hover:text-brand-red text-left w-full cursor-pointer uppercase py-1"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <a
                      id={`mobile-nav-link-${item.label.toLowerCase()}`}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-display text-5xl tracking-[0.1em] text-brand-red hover:text-brand-red-hover text-left block w-full py-1"
                    >
                      {item.label} ↗
                    </a>
                  )}
                </motion.div>
              ))}
            </div>

            <div id="mobile-nav-footer" className="absolute bottom-12 left-8 border-t border-white/10 right-8 pt-8">
              <span className="font-mono text-xs text-white/40 block mb-2">BOSTON, MA</span>
              <a 
                id="mobile-nav-social"
                href="https://instagram.com/TheRealDudja" 
                target="_blank" 
                rel="noreferrer" 
                className="font-mono text-xs text-brand-red hover:underline"
              >
                @TheRealDudja
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
