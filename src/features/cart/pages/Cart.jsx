import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/app/store/cart.store';

export default function Cart() {
  const { items, updateQuantity, removeItem } = useCartStore();

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Or logic for shipping
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-12 px-4 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-[#0F3D2E]/5 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-[#0F3D2E]/40" />
        </div>
        <h1 className="text-3xl font-heading font-serif text-[#0F3D2E] mb-4">Your cart is empty</h1>
        <p className="text-[#0F3D2E]/60 mb-8 max-w-sm">Looks like you haven't added any plants to your collection yet.</p>
        <Link to="/products" className="bg-[#0F3D2E] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-[#1a4f3b] transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
          Start Shopping <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-28 pb-12 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

        {/* Left Column: Cart Items */}
        <div className="lg:col-span-8">
          <h1 className="text-3xl font-heading font-serif text-[#0F3D2E] mb-8">Shopping Cart ({items.length})</h1>

          <div className="space-y-6">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-[2rem] p-6 flex gap-6 items-center shadow-sm border border-[#0F3D2E]/5"
              >
                {/* Image */}
                <div className="w-24 h-24 bg-[#F8F6F1] rounded-xl flex items-center justify-center p-2 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-[#0F3D2E] text-lg">{item.name}</h3>
                      <p className="text-sm text-[#0F3D2E]/50">{item.variant || 'Standard'}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-[#0F3D2E]/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-4 bg-[#FDFBF7] rounded-lg p-1 border border-[#0F3D2E]/5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-[#0F3D2E]"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-bold text-[#0F3D2E] w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-[#0F3D2E]"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-bold text-xl text-[#0F3D2E]">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-[2.5rem] p-8 sticky top-28 shadow-xl shadow-[#0F3D2E]/5 border border-[#0F3D2E]/5">
            <h3 className="text-xl font-heading font-serif text-[#0F3D2E] mb-6">Order Summary</h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-[#0F3D2E]/70">
                <span>Subtotal</span>
                <span className="font-medium text-[#0F3D2E]">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#0F3D2E]/70">
                <span>Shipping</span>
                <span className="font-medium text-[#0F3D2E] text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-[#0F3D2E]/70">
                <span>Tax (5%)</span>
                <span className="font-medium text-[#0F3D2E]">₹{(subtotal * 0.05).toFixed(0)}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-[#0F3D2E]/10 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-[#0F3D2E]">Total</span>
                <span className="text-3xl font-heading font-black text-[#0F3D2E]">₹{(total + (subtotal * 0.05)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>

            <Link to="/checkout" className="w-full bg-[#0F3D2E] text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:shadow-[#0F3D2E]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="mt-6 flex flex-col gap-2 text-center">
              <p className="text-xs text-[#0F3D2E]/40">Secure Checkout - SSL Encrypted</p>
              <div className="flex justify-center gap-2 opacity-30 grayscale">
                <CreditCard size={20} />
                {/* Add other payment icons if needed */}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}