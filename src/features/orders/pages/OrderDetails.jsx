import React from 'react';
import { motion } from 'framer-motion';
import { Package, Calendar, CreditCard, ChevronLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_ORDER = {
  id: 'HLB-8293-XP',
  date: 'October 24, 2024',
  status: 'Processing',
  items: [
    { id: 1, name: 'Monstera Deliciosa', variant: 'Large (10")', price: 2499, quantity: 1, image: '/images/products/monstera.png' },
    { id: 2, name: 'Ceramic Pot - Minimal White', variant: 'Standard', price: 899, quantity: 2, image: '/images/products/pot-white.png' },
    { id: 3, name: 'Organic Soil Mix', variant: '5kg', price: 499, quantity: 1, image: '/images/products/soil.png' }
  ],
  subtotal: 4796,
  shipping: 0,
  tax: 239,
  total: 5035,
  paymentMethod: 'Credit Card ending in 4242',
  shippingAddress: {
    name: 'Jane Doe',
    line1: '123 Green Avenue, Ivy Tower',
    line2: 'Floor 4, Apt 402',
    city: 'Pune',
    state: 'MH',
    zip: '411001',
    country: 'India'
  }
};

export default function OrderDetails() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-28 pb-12 px-4 md:px-8 font-sans">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Link to="/profile/orders" className="w-10 h-10 rounded-full border border-[#0F3D2E]/10 flex items-center justify-center text-[#0F3D2E] hover:bg-[#0F3D2E] hover:text-white transition-colors">
              <ChevronLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-heading font-serif text-[#0F3D2E]">Order Details</h1>
              <p className="text-[#0F3D2E]/50 text-sm">View and track your order</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 border border-[#0F3D2E]/20 rounded-full text-[#0F3D2E] text-sm font-medium hover:bg-[#0F3D2E]/5 transition-colors">
            <Download size={16} />
            Download Invoice
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Items & Status */}
          <div className="lg:col-span-2 space-y-6">

            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2rem] p-8 shadow-lg shadow-[#0F3D2E]/5 border border-[#0F3D2E]/5 flex justify-between items-center"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#0F3D2E]/40 mb-1">Order Status</p>
                <p className="text-xl font-bold text-[#0F3D2E]">{MOCK_ORDER.status}</p>
              </div>
              <div className="px-4 py-2 bg-[#E6F4EA] text-[#0F3D2E] rounded-full text-sm font-bold border border-[#0F3D2E]/10">
                Estimated Delivery: Today
              </div>
            </motion.div>

            {/* Items List */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[2rem] p-8 shadow-lg shadow-[#0F3D2E]/5 border border-[#0F3D2E]/5"
            >
              <h3 className="text-lg font-bold text-[#0F3D2E] mb-6">Items Ordered</h3>
              <div className="space-y-6">
                {MOCK_ORDER.items.map((item, i) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-20 h-20 bg-[#FDFBF7] rounded-xl flex items-center justify-center p-2">
                      <Package size={24} className="text-[#0F3D2E]/20" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#0F3D2E]">{item.name}</h4>
                      <p className="text-sm text-[#0F3D2E]/50">{item.variant}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#0F3D2E]">₹{item.price.toLocaleString()}</p>
                      <p className="text-sm text-[#0F3D2E]/50">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Column - Calculations & Info */}
          <div className="space-y-6">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[2rem] p-8 shadow-lg shadow-[#0F3D2E]/5 border border-[#0F3D2E]/5"
            >
              <h3 className="text-lg font-bold text-[#0F3D2E] mb-6">Order Summary</h3>
              <div className="space-y-3 pb-6 border-b border-[#0F3D2E]/5">
                <div className="flex justify-between text-sm">
                  <span className="text-[#0F3D2E]/60">Subtotal</span>
                  <span className="font-medium text-[#0F3D2E]">₹{MOCK_ORDER.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#0F3D2E]/60">Shipping</span>
                  <span className="font-medium text-[#0F3D2E]">{MOCK_ORDER.shipping === 0 ? 'Free' : `₹${MOCK_ORDER.shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#0F3D2E]/60">Tax</span>
                  <span className="font-medium text-[#0F3D2E]">₹{MOCK_ORDER.tax.toLocaleString()}</span>
                </div>
              </div>
              <div className="pt-6 flex justify-between items-center">
                <span className="font-bold text-lg text-[#0F3D2E]">Total</span>
                <span className="font-heading font-black text-2xl text-[#0F3D2E]">₹{MOCK_ORDER.total.toLocaleString()}</span>
              </div>
            </motion.div>

            {/* Shipping Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#FDFBF7] rounded-[2rem] p-8 border border-[#0F3D2E]/10"
            >
              <h3 className="text-sm font-bold text-[#0F3D2E] uppercase tracking-widest mb-4">Shipping To</h3>
              <address className="not-italic text-[#0F3D2E]/70 leading-relaxed text-sm">
                <strong className="block text-[#0F3D2E] mb-1">{MOCK_ORDER.shippingAddress.name}</strong>
                {MOCK_ORDER.shippingAddress.line1}<br />
                {MOCK_ORDER.shippingAddress.line2}<br />
                {MOCK_ORDER.shippingAddress.city}, {MOCK_ORDER.shippingAddress.state} {MOCK_ORDER.shippingAddress.zip}<br />
                {MOCK_ORDER.shippingAddress.country}
              </address>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}