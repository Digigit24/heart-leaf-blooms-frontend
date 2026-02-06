import React from 'react';
import { motion } from 'framer-motion';
import { Scroll, ShieldCheck, Scale, AlertCircle } from 'lucide-react';

const TermsPage = () => {
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
                        <h1 className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tight">Terms & Conditions</h1>
                        <p className="text-white/70 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                            Please read these terms carefully before using our services. They outline the rules and regulations for the use of Heart Leaf Blooms' Website.
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
                    {/* Introduction */}
                    <Section title="1. Introduction" icon={Scroll}>
                        <p>
                            Welcome to <strong>Heart Leaf Blooms</strong>. By accessing this website we assume you accept these terms and conditions.
                            Do not continue to use Heart Leaf Blooms if you do not agree to take all of the terms and conditions stated on this page.
                        </p>
                        <p className="mt-4">
                            These Terms apply to all visitors, users, and others who access or use the Service.
                        </p>
                    </Section>

                    {/* Intellectual Property */}
                    <Section title="2. Intellectual Property" icon={ShieldCheck}>
                        <p>
                            Unless otherwise stated, Heart Leaf Blooms and/or its licensors own the intellectual property rights for all material on Heart Leaf Blooms.
                            All intellectual property rights are reserved. You may access this from Heart Leaf Blooms for your own personal use subjected to restrictions set in these terms and conditions.
                        </p>
                        <ul className="list-disc pl-5 mt-4 space-y-2 marker:text-[#C6A15B]">
                            <li>Republish material from Heart Leaf Blooms</li>
                            <li>Sell, rent or sub-license material from Heart Leaf Blooms</li>
                            <li>Reproduce, duplicate or copy material from Heart Leaf Blooms</li>
                            <li>Redistribute content from Heart Leaf Blooms</li>
                        </ul>
                    </Section>

                    {/* User Accounts */}
                    <Section title="3. User Accounts & Responsibilities" icon={Scale}>
                        <p>
                            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                        </p>
                        <p className="mt-4">
                            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                        </p>
                    </Section>

                    {/* Limitation of Liability */}
                    <Section title="4. Limitation of Liability" icon={AlertCircle}>
                        <p>
                            In no event shall Heart Leaf Blooms, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                        </p>
                        <ul className="list-disc pl-5 mt-4 space-y-2 marker:text-[#C6A15B]">
                            <li>Your access to or use of or inability to access or use the Service;</li>
                            <li>Any conduct or content of any third party on the Service;</li>
                            <li>Any content obtained from the Service; and</li>
                            <li>Unauthorized access, use or alteration of your transmissions or content.</li>
                        </ul>
                    </Section>

                    {/* Governing Law */}
                    <Section title="5. Governing Law">
                        <p>
                            These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                        </p>
                    </Section>

                    {/* Contact */}
                    <div className="bg-[#0F3D2E]/5 p-8 rounded-[2rem] border border-[#0F3D2E]/10 text-center">
                        <h3 className="text-xl font-heading font-bold text-[#0F3D2E] mb-4">Questions about the Terms?</h3>
                        <p className="text-[#0F3D2E]/70 mb-6">If you have any questions about our Terms and Conditions, please contact us.</p>
                        <a href="mailto:heartleafbloomsonline@gmail.com" className="inline-block bg-[#0F3D2E] text-white px-8 py-3 rounded-full font-bold hover:bg-[#0A291F] transition-colors shadow-lg shadow-[#0F3D2E]/20">
                            Contact Support
                        </a>
                    </div>

                </motion.div>
            </div>
        </div>
    );
};

// Reusable Section Component
const Section = ({ title, icon: Icon, children }) => (
    <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-[#0F3D2E]/5 shadow-sm hover:shadow-md transition-shadow duration-300">
        <h2 className="text-2xl font-heading font-bold text-[#0F3D2E] mb-6 flex items-center gap-3">
            {Icon && <Icon className="text-[#C6A15B]" size={28} />}
            {title}
        </h2>
        <div className="text-[#0F3D2E]/80 leading-relaxed font-light text-base md:text-lg">
            {children}
        </div>
    </div>
);

export default TermsPage;
