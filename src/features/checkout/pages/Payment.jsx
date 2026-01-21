import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, ShieldCheck, Banknote, Smartphone, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/app/store/cart.store';
import toast from 'react-hot-toast';

export default function Payment() {
    const navigate = useNavigate();
    const { items, clearCart } = useCartStore();
    const [selectedMethod, setSelectedMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);

    // Calculate totals based on real cart data
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal; // EXACTLY what the user saw in cart/checkout, no hidden fees.

    const handlePayment = () => {
        if (items.length === 0) {
            toast.error("Your cart is empty.");
            navigate('/products');
            return;
        }

        setIsProcessing(true);

        // Prepare serializable data for navigation state
        // We explicitly map only necessary fields to avoid passing Symbols/Functions (DataCloneError)
        const currentItems = items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            variant: item.variant || ''
        }));
        const currentTotal = total;
        const orderDate = new Date().toISOString();

        // Simulate payment processing
        setTimeout(() => {
            // Navigate FIRST with the data
            navigate('/orders/track/HLB-8293-XP', {
                state: {
                    orderDate,
                    items: currentItems,
                    total: currentTotal
                }
            });

            // THEN clear the cart
            clearCart();
            setIsProcessing(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-28 pb-20 px-4 md:px-8 font-sans">
            <div className="max-w-2xl mx-auto">

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-heading font-serif text-[#0F3D2E] mb-2">Secure Payment</h1>
                    <p className="text-[#0F3D2E]/60 text-sm">Review and pay ensuring 100% security</p>
                </div>

                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-[#0F3D2E]/5 border border-[#0F3D2E]/5">

                    {/* Amount Display - Hero */}
                    <div className="text-center mb-10 pb-8 border-b border-[#0F3D2E]/5">
                        <span className="inline-block px-3 py-1 rounded-full bg-[#0F3D2E]/5 text-[10px] uppercase font-bold tracking-widest text-[#0F3D2E]/60 mb-3">Total Payable</span>
                        <h2 className="text-5xl font-heading font-black text-[#0F3D2E]">₹{total.toLocaleString()}</h2>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-[#0F3D2E]/40 uppercase tracking-wider pl-1">Select Method</h3>

                        <div className="space-y-3">
                            {[
                                { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                                { id: 'upi', label: 'UPI / Wallet', icon: Smartphone },
                                { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
                            ].map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => setSelectedMethod(method.id)}
                                    className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-200 group ${selectedMethod === method.id
                                        ? 'bg-[#0F3D2E] border-[#0F3D2E] text-white shadow-lg shadow-[#0F3D2E]/20 scale-[1.02]'
                                        : 'bg-white border-[#0F3D2E]/10 text-[#0F3D2E] hover:border-[#0F3D2E]/30'}`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${selectedMethod === method.id ? 'bg-white/10' : 'bg-[#F2F8F5]'}`}>
                                        <method.icon size={18} />
                                    </div>
                                    <span className="font-bold flex-1 text-left text-lg">{method.label}</span>
                                    {selectedMethod === method.id && (
                                        <div className="w-6 h-6 rounded-full bg-[#C6A15B] flex items-center justify-center text-[#0F3D2E]">
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Fields based on selection */}
                    <div className="mt-8 pt-8 border-t border-[#0F3D2E]/5">
                        {selectedMethod === 'card' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                                <input type="text" placeholder="Card Number" className="w-full bg-[#FAFAFA] border-0 rounded-xl px-5 py-4 text-[#0F3D2E] font-medium placeholder:text-[#0F3D2E]/20 focus:ring-2 focus:ring-[#0F3D2E]/10 transition-all" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="MM/YY" className="w-full bg-[#FAFAFA] border-0 rounded-xl px-5 py-4 text-[#0F3D2E] font-medium placeholder:text-[#0F3D2E]/20 focus:ring-2 focus:ring-[#0F3D2E]/10 transition-all" />
                                    <input type="text" placeholder="CVC" className="w-full bg-[#FAFAFA] border-0 rounded-xl px-5 py-4 text-[#0F3D2E] font-medium placeholder:text-[#0F3D2E]/20 focus:ring-2 focus:ring-[#0F3D2E]/10 transition-all" />
                                </div>
                            </motion.div>
                        )}
                        {selectedMethod === 'upi' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <input type="text" placeholder="Enter UPI ID (e.g. name@okhdfcbank)" className="w-full bg-[#FAFAFA] border-0 rounded-xl px-5 py-4 text-[#0F3D2E] font-medium placeholder:text-[#0F3D2E]/20 focus:ring-2 focus:ring-[#0F3D2E]/10 transition-all" />
                            </motion.div>
                        )}
                        {selectedMethod === 'cod' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#F2F8F5] p-5 rounded-2xl text-[#0F3D2E]/70 text-sm leading-relaxed text-center">
                                Pay securely in cash or via QR Code when our delivery partner arrives at your doorstep.
                            </motion.div>
                        )}
                    </div>

                    <div className="mt-8">
                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="w-full bg-[#0F3D2E] text-white font-bold h-16 rounded-2xl shadow-xl shadow-[#0F3D2E]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Processing Payment...</span>
                                </>
                            ) : (
                                <>
                                    <ShieldCheck size={20} />
                                    <span>Pay Now</span>
                                </>
                            )}
                        </button>
                        <div className="flex justify-center items-center gap-2 mt-4 text-[#0F3D2E]/30 text-xs">
                            <Lock size={12} />
                            <span>Payments are 256-bit encrypted & secure</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
