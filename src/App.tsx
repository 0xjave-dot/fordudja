/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem, Toast } from './types';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import StreamingBar from './components/StreamingBar';
import Music from './components/Music';
import About from './components/About';
import MerchStore from './components/MerchStore';
import CartDrawer from './components/CartDrawer';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import { Sparkles, Terminal } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'merch'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Trigger custom toast popups
  const launchToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    // Cleanup after 3.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handlePageChange = (page: 'home' | 'merch', sectionId?: string) => {
    setCurrentPage(page);
    if (page === 'home') {
      setTimeout(() => {
        const element = sectionId ? document.getElementById(sectionId) : null;
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Add Item to Cart (Size-Aware)
  const handleAddToCart = (product: Product, size?: string) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existing) {
        launchToast(`Added another ${product.name} (${size || 'OS'}) to your cart`, 'info');
        return prevItems.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      launchToast(`Added "${product.name}" (${size || 'OS'}) to cart`, 'success');
      return [...prevItems, { product, quantity: 1, selectedSize: size }];
    });
  };

  // Remove Item from Cart (Size-Aware)
  const handleRemoveItem = (productId: string, size?: string) => {
    setCartItems((prev) => {
      const target = prev.find((i) => i.product.id === productId && i.selectedSize === size);
      if (target) {
        launchToast(`Removed "${target.product.name}" (${size || 'OS'}) from your cart`, 'error');
      }
      return prev.filter((item) => !(item.product.id === productId && item.selectedSize === size));
    });
  };

  // Change Quantity (Size-Aware)
  const handleUpdateQty = (productId: string, delta: number, size?: string) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleBookingSubmit = (inquiry: { name: string; inquiryType: string }) => {
    launchToast(`Inquiry sent! Thank you ${inquiry.name}. We'll follow up shortly.`, 'success');
  };

  const handleCheckoutComplete = () => {
    setIsCartOpen(false);
    launchToast('Checkout successful! Thanks for supporting Dudja.', 'success');
    setCartItems([]);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartTotalBadge = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div id="website-root-container" className="min-h-screen bg-brand-bg text-[#d4cfc8] relative selection:bg-brand-red selection:text-white pb-12">
      {/* 1. Film Grain Backdrop Overlay */}
      <div id="grain-layer" className="grain-overlay" />

      {/* 2. Structured Fixed Header Navigation */}
      <Navigation 
        onCartClick={() => setIsCartOpen(true)} 
        cartCount={cartTotalBadge} 
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.div
            key="home-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* 3. Immersive Hero Section with glowing red gradients */}
            <Hero 
              onListenClick={() => scrollToSection('music')}
              onShopClick={() => handlePageChange('merch')}
            />

            {/* 4. Streaming Partners horizontal ribbon panel */}
            <StreamingBar />

            {/* 5. Deep Introspective Audio player and lyrics console */}
            <Music />

            {/* 5.5. Artistic Manifesto / Biography Vision Section */}
            <About />

            {/* 7. Contact Agency Booking application */}
            <BookingForm onFormSubmitted={handleBookingSubmit} />
          </motion.div>
        ) : (
          <motion.div
            key="merch-supplier"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pt-20"
          >
            {/* 6. Brutalist, high fidelity grid shop store as standalone page */}
            <MerchStore onAddToCart={handleAddToCart} isStandalonePage={true} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. Minimalistic low-opacity logo bottom footer */}
      <Footer />

      {/* 9. Sliding cart modal drawer (Right placement) */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onRemoveItem={handleRemoveItem}
            onUpdateQty={handleUpdateQty}
            onCheckoutComplete={handleCheckoutComplete}
          />
        )}
      </AnimatePresence>

      {/* 10. Core Slide-Up Toast Notifier Alerts */}
      <div id="toast-alerts-holder" className="fixed bottom-6 right-6 z-55 flex flex-col space-y-3 pointer-events-none max-w-sm w-full">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              key={t.id}
              id={`toast-alert-box-${t.id}`}
              className={`p-4 rounded-xl border flex items-center space-x-3 pointer-events-auto shadow-2xl ${
                t.type === 'error'
                  ? 'bg-black/95 border-brand-red text-red-400'
                  : t.type === 'info'
                  ? 'bg-black/95 border-brand-bone/35 text-brand-bone'
                  : 'bg-black/95 border-brand-red text-brand-bone'
              }`}
            >
              <div className="flex-shrink-0">
                {t.type === 'error' ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-red block animate-ping" />
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-red block" />
                )}
              </div>
              <div className="flex-1">
                <span className="font-mono text-[9px] uppercase text-neutral-500 block leading-none font-bold">SYSTEM MESSAGE</span>
                <p className="font-mono text-xs text-brand-bone/90 mt-1 uppercase leading-tight font-medium tracking-wide">
                  {t.message}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
