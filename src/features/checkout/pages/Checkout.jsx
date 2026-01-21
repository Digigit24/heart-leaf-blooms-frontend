import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, MapPin, Mail, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/app/store/cart.store';
import { useAuthStore } from '@/app/store/auth.store';
import { authApi } from '@/features/auth/api/auth.api';
import toast from 'react-hot-toast';

export default function Checkout() {
  const navigate = useNavigate();
  const { items } = useCartStore();
  const { user } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [isNewAddress, setIsNewAddress] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    status: '', // state/region
    postalCode: '',
    phone: ''
  });

  // Fetch User Data
  useEffect(() => {
    if (user?.id) {
      // Pre-fill from user object if available, also fetch latest
      const splitName = (user.name || '').split(' ');
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        firstName: splitName[0] || '',
        lastName: splitName.slice(1).join(' ') || '',
        phone: user.phone || '',
        address: user.address || '',
        // If address is unstructured string, put in address, otherwise mapped fields
      }));

      // Fetch full profile to get structured address if exists
      authApi.getUserProfile(user.id).then(res => {
        const profile = res.data;
        if (profile) {
          const splitName = (profile.name || '').split(' ');
          setFormData({
            email: profile.email || '',
            firstName: splitName[0] || '',
            lastName: splitName.slice(1).join(' ') || '',
            address: profile.address || '',
            city: profile.city || '',
            postalCode: profile.zip || '',
            phone: profile.phone || '',
            state: profile.state || ''
          });
        }
      }).catch(err => console.error("Failed to fetch profile", err));
    }
  }, [user]);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal; // Free shipping logic assumption

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isNewAddress || !user.address) {
        // Update user profile with new address if prompted
        const updateData = {
          address: formData.address,
          city: formData.city,
          zip: formData.postalCode,
          phone: formData.phone,
          state: formData.state
        };
        if (user?.id) {
          await authApi.updateUser(user.id, updateData);
          toast.success("Address updated successfully!");
        }
      }
      navigate('/checkout/payment');
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Failed to update address. Proceeding anyway.");
      navigate('/checkout/payment'); // Proceed even if update fails for demo flow
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-28 pb-20 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-serif text-[#0F3D2E] mb-3">Checkout</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-[#0F3D2E]/50">
            <span className="text-[#0F3D2E] font-medium">Shipping</span>
            <ChevronRight size={14} />
            <span>Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Left: Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleContinue} className="space-y-8">

              {/* Contact Info */}
              <div className="bg-white rounded-3xl p-8 border border-[#0F3D2E]/5 shadow-sm">
                <h2 className="text-xl font-bold text-[#0F3D2E] flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-full bg-[#0F3D2E]/5 flex items-center justify-center text-[#0F3D2E]"><Mail size={16} /></span>
                  Contact Info
                </h2>
                <div className="space-y-4">
                  <div className="relative">
                    <label className="text-xs font-bold text-[#0F3D2E]/50 uppercase tracking-wider mb-1 block pl-1">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#FAFAFA] border-0 rounded-xl px-5 py-4 text-[#0F3D2E] font-medium placeholder:text-[#0F3D2E]/20 focus:ring-2 focus:ring-[#0F3D2E]/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-3xl p-8 border border-[#0F3D2E]/5 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-[#0F3D2E] flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#0F3D2E]/5 flex items-center justify-center text-[#0F3D2E]"><MapPin size={16} /></span>
                    Shipping Address
                  </h2>
                  {user?.address && (
                    <button type="button" onClick={() => setIsNewAddress(!isNewAddress)} className="text-sm text-[#C6A15B] font-bold hover:underline">
                      {isNewAddress ? 'Use Saved Address' : 'Use Different Address'}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0F3D2E]/50 uppercase tracking-wider pl-1">First Name</label>
                    <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-[#FAFAFA] border-0 rounded-xl px-5 py-4 text-[#0F3D2E] font-medium focus:ring-2 focus:ring-[#0F3D2E]/20 transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0F3D2E]/50 uppercase tracking-wider pl-1">Last Name</label>
                    <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-[#FAFAFA] border-0 rounded-xl px-5 py-4 text-[#0F3D2E] font-medium focus:ring-2 focus:ring-[#0F3D2E]/20 transition-all" />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-[#0F3D2E]/50 uppercase tracking-wider pl-1">Address</label>
                    <input required type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="123 Green St" className="w-full bg-[#FAFAFA] border-0 rounded-xl px-5 py-4 text-[#0F3D2E] font-medium focus:ring-2 focus:ring-[#0F3D2E]/20 transition-all" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0F3D2E]/50 uppercase tracking-wider pl-1">City</label>
                    <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-[#FAFAFA] border-0 rounded-xl px-5 py-4 text-[#0F3D2E] font-medium focus:ring-2 focus:ring-[#0F3D2E]/20 transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0F3D2E]/50 uppercase tracking-wider pl-1">Postal Code</label>
                    <input required type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} className="w-full bg-[#FAFAFA] border-0 rounded-xl px-5 py-4 text-[#0F3D2E] font-medium focus:ring-2 focus:ring-[#0F3D2E]/20 transition-all" />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-[#0F3D2E]/50 uppercase tracking-wider pl-1">Phone</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-[#FAFAFA] border-0 rounded-xl px-5 py-4 text-[#0F3D2E] font-medium focus:ring-2 focus:ring-[#0F3D2E]/20 transition-all" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#0F3D2E] text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-[#0F3D2E]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>Processing <Loader className="animate-spin" size={16} /></>
                  ) : (
                    <>Proceed to Payment <ChevronRight size={18} /></>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/60 backdrop-blur-md rounded-[2rem] p-8 border border-[#0F3D2E]/5 sticky top-28">
              <h3 className="font-heading font-serif text-xl text-[#0F3D2E] mb-6">Order Summary</h3>

              <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar space-y-6 mb-8">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-white rounded-2xl border border-[#0F3D2E]/5 p-2 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#0F3D2E] truncate">{item.name}</h4>
                      <p className="text-sm text-[#0F3D2E]/50 mb-1">{item.variant}</p>
                      <p className="text-xs text-[#0F3D2E]/40">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium text-[#0F3D2E]">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                {items.length === 0 && <p className="text-center text-[#0F3D2E]/40 py-4">Cart is empty</p>}
              </div>

              <div className="space-y-3 pt-6 border-t border-[#0F3D2E]/10">
                <div className="flex justify-between text-[#0F3D2E]/70 text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#0F3D2E]/70 text-sm">
                  <span>Shipping</span>
                  <span className="text-[#0F3D2E] font-medium">Free</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-[#0F3D2E]/10">
                  <span className="text-lg font-bold text-[#0F3D2E]">Total</span>
                  <span className="text-2xl font-serif font-black text-[#0F3D2E]">₹{total.toLocaleString()}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}