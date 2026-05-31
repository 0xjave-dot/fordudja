/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, CreditCard, ShoppingCart } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (productId: string, size?: string) => void;
  onUpdateQty: (productId: string, delta: number, size?: string) => void;
  onCheckoutComplete?: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQty,
  onCheckoutComplete,
}: CartDrawerProps) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Trigger Mock or Real Stripe Checkout
  const handleStripeCheckout = async () => {
    console.log('--- STARTING STRIPE CHECKOUT ROUTE ---');
    console.log('Cart Items Selected:', cartItems);
    console.log('Publishable Key placeholder requested');
    
    if (onCheckoutComplete) {
      onCheckoutComplete();
    }
  };

  if (!isOpen) return null;

  return (
    <div id="cart-drawer-container" className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        exit={{ opacity: 0 }}
        id="cart-drawer-backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
      />

      {/* Drawer box sliding in */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          id="cart-drawer-panel"
          className="w-screen max-w-md bg-brand-bg-card border-l border-white/10 flex flex-col justify-between shadow-2xl relative"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-display text-3xl text-brand-bone tracking-wide uppercase flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-brand-red" />
              <span>SHOPPING CART</span>
            </h3>
            <button
              id="close-cart-btn"
              onClick={onClose}
              className="p-1 rounded-full border border-white/5 bg-[#121212] hover:border-brand-red hover:text-brand-red cursor-pointer text-[#a59f97] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart list layout */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {cartItems.length === 0 ? (
              <div id="empty-cart-state" className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 rounded-full bg-white/5 border border-white/15 text-neutral-400">
                  <ShoppingCart className="w-12 h-12 stroke-[1.2px]" />
                </div>
                <div>
                  <p className="font-display text-2xl text-brand-bone uppercase tracking-wider">YOUR CART IS EMPTY</p>
                  <p className="font-mono text-[10px] text-neutral-500 uppercase mt-1 tracking-widest">Load up on official Dudja merchandise</p>
                </div>
                <button
                  id="checkout-shop-now-btn"
                  onClick={onClose}
                  className="font-mono text-xs text-brand-red hover:underline font-bold tracking-widest uppercase"
                >
                  Return to shop &rarr;
                </button>
              </div>
            ) : (
              <div id="cart-items-list" className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize || 'OS'}`}
                    id={`cart-item-row-${item.product.id}-${item.selectedSize || 'OS'}`}
                    className="p-3 bg-black/40 border border-white/5 rounded-xl flex gap-4 items-center justify-between transition-colors hover:border-brand-red/20"
                  >
                    {/* Item Image */}
                    <div className="w-16 h-16 rounded-lg bg-[#0e0e0e] border border-white/5 overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className="font-display text-xl text-brand-bone truncate tracking-wide leading-tight uppercase">
                        {item.product.name}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                        <span className="font-mono text-[9px] text-neutral-500 truncate uppercase">
                          {item.product.type}
                        </span>
                        {item.selectedSize && (
                          <span className="font-mono text-[10px] bg-brand-red/10 border border-brand-red/30 px-1.5 py-0.2 rounded text-brand-red font-bold">
                            {item.selectedSize}
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs text-brand-red block font-bold mt-1">
                        ${item.product.price} USD
                      </span>
                    </div>

                    {/* Quantity controls + delete */}
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-1 bg-black/80 border border-white/10 rounded-md p-0.5">
                        <button
                          id={`qty-minus-${item.product.id}-${item.selectedSize || 'OS'}`}
                          onClick={() => onUpdateQty(item.product.id, -1, item.selectedSize)}
                          className="p-1 hover:text-brand-red text-neutral-400 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs text-brand-bone px-1 w-4 text-center font-bold">
                          {item.quantity}
                        </span>
                        <button
                          id={`qty-plus-${item.product.id}-${item.selectedSize || 'OS'}`}
                          onClick={() => onUpdateQty(item.product.id, 1, item.selectedSize)}
                          className="p-1 hover:text-brand-red text-neutral-400 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        id={`remove-item-${item.product.id}-${item.selectedSize || 'OS'}`}
                        onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                        className="text-neutral-500 hover:text-brand-red transition-colors flex items-center space-x-1 py-0.5 px-1 rounded hover:bg-brand-red/5 cursor-pointer"
                        title="Remove product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="font-mono text-[9px] uppercase tracking-widest">Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer and Checkout Button */}
          {cartItems.length > 0 && (
            <div id="cart-drawer-summary" className="p-6 border-t border-white/10 bg-[#0c0c0c] space-y-4">
              <div className="space-y-1.5 pb-2">
                <div className="flex justify-between font-mono text-xs text-neutral-400">
                  <span>SHIPPING</span>
                  <span className="text-zinc-500 uppercase tracking-widest font-bold">CALCULATED AT STRIPE</span>
                </div>
                <div className="flex justify-between font-mono text-xs text-neutral-400">
                  <span>TAXES</span>
                  <span className="text-zinc-500 uppercase tracking-widest font-bold">INCLUDED</span>
                </div>
                <div className="border-t border-white/5 my-2 pt-2 flex justify-between items-end">
                  <span className="font-mono text-xs tracking-widest uppercase text-brand-bone/60">SUBTOTAL AMOUNT</span>
                  <span className="font-display text-4xl text-brand-red font-bold tracking-wider leading-none">
                    ${subtotal}.00
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                id="cart-checkout-btn"
                onClick={handleStripeCheckout}
                className="w-full flex items-center justify-center space-x-3 py-4 bg-brand-red hover:bg-brand-red-hover text-brand-bone rounded-xl font-mono text-xs tracking-[0.2em] font-bold cursor-pointer transition-colors shadow-lg shadow-brand-red/15 uppercase"
              >
                <CreditCard className="w-4 h-4" />
                <span>CHECKOUT WITH STRIPE</span>
              </button>

              <p className="font-mono text-[9px] text-center text-white/30 uppercase tracking-widest">
                🔒 SSL Encrypted Checkout via Stripe
              </p>
            </div>
          )}

        </motion.div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #080808;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c0392b;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
