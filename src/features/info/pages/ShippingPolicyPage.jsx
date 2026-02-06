import React from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, Calendar, Package, AlertTriangle } from 'lucide-react';

const ShippingPolicyPage = () => {
    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#0F3D2E]/20">
            {/* Header Section */}
            <div className="bg-[#0F3D2E] text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A15B]/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tight">Shipping & Delivery</h1>
                        <p className="text-white/70 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                            From our nursery to your doorstep. We ensure your plants arrive healthy, happy, and on time.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid gap-8"
                >

                    {/* Delivery Areas */}
                    <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-[#0F3D2E]/5 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <MapPin className="text-[#C6A15B] w-8 h-8" />
                            <h2 className="text-2xl font-heading font-bold text-[#0F3D2E]">Where We Ship</h2>
                        </div>
                        <p className="text-[#0F3D2E]/80 leading-relaxed font-light text-lg mb-4">
                            Heart Leaf Blooms currently ships to most major cities and towns across <strong>India</strong>.
                        </p>
                        <div className="bg-[#F9F8F6] p-6 rounded-2xl flex flex-col md:flex-row gap-6 md:items-center">
                            <div className="flex-1">
                                <strong className="block text-[#0F3D2E] mb-1">Standard Delivery</strong>
                                <span className="text-sm text-[#0F3D2E]/60">All serviceable pin codes across India via trusted courier partners (Delhivery, BlueDart, DTDC).</span>
                            </div>
                            <div className="flex-1">
                                <strong className="block text-[#0F3D2E] mb-1">Hyperlocal Express</strong>
                                <span className="text-sm text-[#0F3D2E]/60">Available for select locations in Pune & PCMC (Same-day delivery visible at checkout if applicable).</span>
                            </div>
                        </div>
                    </div>

                    {/* Timeline & Fees */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-[2rem] border border-[#0F3D2E]/5 shadow-sm hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-12 h-12 bg-[#E6F4EA] rounded-full flex items-center justify-center text-[#0F3D2E] mb-6">
                                <Calendar size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-[#0F3D2E] mb-3">Processing Time</h3>
                            <p className="text-[#0F3D2E]/80 font-light leading-relaxed">
                                Orders are processed within <strong>24-48 hours</strong>. We do not dispatch live plants on weekends (Saturday/Sunday) to avoid them being stuck in transit hubs.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-[2rem] border border-[#0F3D2E]/5 shadow-sm hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-12 h-12 bg-[#FDF0D5] rounded-full flex items-center justify-center text-[#d97706] mb-6">
                                <Truck size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-[#0F3D2E] mb-3">Estimated Delivery</h3>
                            <p className="text-[#0F3D2E]/80 font-light leading-relaxed">
                                <strong>Metro Cities:</strong> 3-5 Business Days<br />
                                <strong>Rest of India:</strong> 5-9 Business Days<br />
                                <span className="text-xs opacity-60 mt-2 block">*Remote areas may take slightly longer.</span>
                            </p>
                        </div>
                    </div>

                    {/* Packaging Quality */}
                    <div className="bg-[#0F3D2E] text-white p-8 md:p-10 rounded-[2rem] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                                <Package size={32} className="text-[#C6A15B]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-heading font-bold mb-4">Secure Plant Packaging</h2>
                                <p className="text-white/80 leading-relaxed font-light mb-4">
                                    We use specially designed, eco-friendly corrugated boxes that secure the pot in place. The soil is covered to retain moisture and prevent spillage, and the foliage is protected to ensure breathability.
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/70">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#C6A15B] rounded-full"></div> Moisture Retention Gel</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#C6A15B] rounded-full"></div> Ventilated Boxes</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#C6A15B] rounded-full"></div> Impact Resistant</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#C6A15B] rounded-full"></div> Recyclable Materials</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-[#FFF5F5] p-6 rounded-2xl border border-red-100 flex gap-4 items-start">
                        <AlertTriangle className="text-red-400 shrink-0 mt-1" size={20} />
                        <div>
                            <h4 className="font-bold text-red-900 mb-1">Note on Delays</h4>
                            <p className="text-sm text-red-800/80 leading-relaxed">
                                While we strive to meet all delivery timelines, unforeseen circumstances like extreme weather, strikes, or courier delays may occur. In such cases, our team will proactively communicate with you.
                            </p>
                        </div>
                    </div>

                </motion.div>
            </div>
        </div>
    );
};

export default ShippingPolicyPage;
