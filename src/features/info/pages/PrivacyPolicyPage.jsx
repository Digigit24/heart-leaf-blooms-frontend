import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database } from 'lucide-react';

const PrivacyPolicyPage = () => {
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
                        <h1 className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tight">Privacy Policy</h1>
                        <p className="text-white/70 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                            Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.
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
                    className="space-y-8"
                >
                    {/* Information Collection */}
                    <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-[#0F3D2E]/5 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <Database className="text-[#C6A15B] w-8 h-8" />
                            <h2 className="text-2xl font-heading font-bold text-[#0F3D2E]">Information We Collect</h2>
                        </div>
                        <p className="text-[#0F3D2E]/80 leading-relaxed font-light mb-4">
                            We collect information you provide directly to us when you create an account, make a purchase, or communicate with us.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-[#0F3D2E]/70">
                            <li>Name and contact information (email, phone number, address)</li>
                            <li>Payment information (processed securely by third-party providers)</li>
                            <li>Order history and preferences</li>
                            <li>Communication records</li>
                        </ul>
                    </div>

                    {/* How We Use Information */}
                    <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-[#0F3D2E]/5 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <Eye className="text-[#C6A15B] w-8 h-8" />
                            <h2 className="text-2xl font-heading font-bold text-[#0F3D2E]">How We Use Your Information</h2>
                        </div>
                        <ul className="list-disc pl-5 space-y-2 text-[#0F3D2E]/70">
                            <li>To process and deliver your orders</li>
                            <li>To send you transactional emails (order confirmations, shipping updates)</li>
                            <li>To enable secure login and authentication</li>
                            <li>To improve our website and customer service</li>
                            <li>With your consent, to send promotional emails about new products and offers</li>
                        </ul>
                    </div>

                    {/* Data Protection */}
                    <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-[#0F3D2E]/5 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <Shield className="text-[#C6A15B] w-8 h-8" />
                            <h2 className="text-2xl font-heading font-bold text-[#0F3D2E]">Data Protection</h2>
                        </div>
                        <p className="text-[#0F3D2E]/80 leading-relaxed font-light">
                            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. We do not sell your personal information to third parties.
                        </p>
                    </div>

                    {/* Cookies */}
                    <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-[#0F3D2E]/5 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <Lock className="text-[#C6A15B] w-8 h-8" />
                            <h2 className="text-2xl font-heading font-bold text-[#0F3D2E]">Cookies</h2>
                        </div>
                        <p className="text-[#0F3D2E]/80 leading-relaxed font-light">
                            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="text-center mt-12">
                        <p className="text-[#0F3D2E]/60 mb-2">If you have any questions regarding our privacy practices, please contact us at:</p>
                        <a href="mailto:heartleafbloomsonline@gmail.com" className="font-bold text-[#0F3D2E] hover:underline">heartleafbloomsonline@gmail.com</a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
