import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PATHS } from '@/app/routes/paths';
import { Map, ArrowRight } from 'lucide-react';

const SitemapPage = () => {
    const links = [
        { title: "Shop", path: PATHS.PRODUCTS },
        { title: "Indoor Plants", path: '/category/indoor' },
        { title: "Outdoor Plants", path: '/category/outdoor' },
        { title: "About Us", path: PATHS.ABOUT },
        { title: "Contact", path: PATHS.CONTACT },
        { title: "Corporate Gifts", path: PATHS.CORPORATE_PACKAGE },
        { title: "Terms & Conditions", path: PATHS.TERMS },
        { title: "Privacy Policy", path: PATHS.PRIVACY_POLICY },
        { title: "Shipping Policy", path: PATHS.SHIPPING_POLICY },
        { title: "Cancellation Policy", path: PATHS.CANCELLATION_REFUND },
    ];

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#0F3D2E]/20">
            {/* Header */}
            <div className="bg-[#0F3D2E] text-white py-16 text-center">
                <h1 className="text-4xl font-heading font-bold mb-4">Sitemap</h1>
                <p className="text-white/60">Overview of available pages</p>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-3xl">
                <div className="grid md:grid-cols-2 gap-4">
                    {links.map((link, i) => (
                        <Link
                            key={i}
                            to={link.path}
                            className="bg-white p-4 rounded-xl border border-[#0F3D2E]/10 flex items-center justify-between hover:shadow-md transition-all group"
                        >
                            <span className="font-bold text-[#0F3D2E]">{link.title}</span>
                            <ArrowRight size={18} className="text-[#C6A15B] transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SitemapPage;
