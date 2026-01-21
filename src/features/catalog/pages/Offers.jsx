import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Gift, ShoppingBag, Sun, Truck, Star, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PATHS } from '@/app/routes/paths';

// --- Mock Offers Data ---
// --- Mock Offers Data ---
const LIMITED_TIME_OFFERS = [
    {
        id: 1,
        title: "Monsoon Madness Sale",
        description: "Get up to 40% off on all tropical rain-loving plants. Perfect for the season.",
        code: "MONSOON40",
        discount: "40% OFF",
        expiry: "2026-02-15T23:59:59",
        image: "/images/offers/monsoon_offer_plant_1768910679933.png",
        colorClass: "bg-teal-900",
        accent: "text-teal-200"
    },
    {
        id: 2,
        title: "New Plant Parent Kit",
        description: "Start your journey with 3 easy-care plants + 1 pot + soil mix at a special bundle price.",
        code: "NEWPARENT",
        discount: "Bundle @ ₹999",
        expiry: "2026-03-01T23:59:59",
        image: "/images/offers/new_parent_kit_1768910980974.png",
        colorClass: "bg-[#8B4513]",
        accent: "text-orange-200"
    }
];

const SUMMER_COLLECTION = [
    {
        id: 101,
        title: "Summer Sunshine Pack",
        description: "Brighten your space with sun-loving succulents and cacti. Drought tolerant and beautiful.",
        discount: "Buy 2 Get 1 Free",
        code: "SUNNY26",
        image: "/images/offers/summer_sunshine_1768911014626.png",
        colorClass: "bg-orange-700",
        accent: "text-yellow-200"
    },
    {
        id: 102,
        title: "Cool Shade Collection",
        description: "Lush ferns and tall palms to keep your interiors cool and fresh this summer.",
        discount: "Flat 20% OFF",
        code: "COOL20",
        image: "/images/offers/cool_shade_1768911033774.png",
        colorClass: "bg-green-900",
        accent: "text-green-200"
    }
];

const BULK_ORDERS = [
    {
        id: 201,
        title: "Corporate Green Gifting",
        description: "Bulk orders for office desks, events, or employee appreciation. Custom branding available.",
        discount: "Volume Discounts",
        code: "CORP_GIFT",
        image: "/images/offers/corporate_gift_1768911067128.png",
        colorClass: "bg-slate-900",
        accent: "text-blue-200"
    },
    {
        id: 202,
        title: "Wedding & Event Favors",
        description: "Mini succulents and saplings for sustainable and memorable return gifts.",
        discount: "Starting @ ₹49",
        code: "EVENT_BULK",
        image: "/images/offers/wedding_favors_1768911091705.png",
        colorClass: "bg-pink-900",
        accent: "text-pink-200"
    }
];

const OfferCard = ({ offer, showTimer = false }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className={`relative rounded-[2rem] overflow-hidden shadow-xl min-h-[450px] flex flex-col group ${offer.colorClass}`}
    >
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
            <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Stronger gradient for better text legibility */}
            <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/70 to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-8 md:p-10 flex flex-col h-full justify-between max-w-xl">

            {/* Top Badge & Text */}
            <div>
                <div className="inline-flex px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-xs font-bold uppercase tracking-widest text-white mb-6 shadow-sm">
                    {offer.discount}
                </div>
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 leading-tight drop-shadow-md">
                    {offer.title}
                </h3>
                <p className="text-white/80 leading-relaxed text-base md:text-lg font-light max-w-md drop-shadow-sm">
                    {offer.description}
                </p>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex flex-col sm:flex-row gap-6 sm:items-end">

                    {/* Coupon Code Box */}
                    <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 group-hover:bg-white/10 transition-colors w-full sm:w-auto">
                        <p className="text-[10px] text-white/50 uppercase tracking-widest mb-2 font-bold">Coupon Code</p>
                        <div className="flex items-center justify-between gap-4">
                            <span className={`text-xl font-mono font-bold tracking-widest ${offer.accent} drop-shadow-sm`}>
                                {offer.code}
                            </span>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(offer.code);
                                }}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white border border-white/20 hover:border-white/50"
                                title="Copy Code"
                            >
                                <span className="text-[10px] font-bold px-1 uppercase">Copy</span>
                            </button>
                        </div>
                    </div>

                    {/* Timer (if applicable) */}
                    {showTimer && offer.expiry && (
                        <div className="hidden sm:block">
                            <CountdownTimer targetDate={offer.expiry} />
                        </div>
                    )}
                </div>

                {/* Mobile Timer Fallback */}
                {showTimer && offer.expiry && (
                    <div className="block sm:hidden mt-6">
                        <CountdownTimer targetDate={offer.expiry} />
                    </div>
                )}
            </div>
        </div>
    </motion.div>
);

const CountdownTimer = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        if (difference > 0) {
            return {
                d: Math.floor(difference / (1000 * 60 * 60 * 24)),
                h: Math.floor((difference / (1000 * 60 * 60)) % 24),
                m: Math.floor((difference / 1000 / 60) % 60),
                s: Math.floor((difference / 1000) % 60),
            };
        }
        return {};
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearTimeout(timer);
    });

    return (
        <div className="flex gap-2 text-xs font-mono font-bold tracking-widest mt-6">
            {Object.keys(timeLeft).length ? (
                <>
                    <TimeBox val={timeLeft.d} label="D" />
                    <TimeBox val={timeLeft.h} label="H" />
                    <TimeBox val={timeLeft.m} label="M" />
                    <TimeBox val={timeLeft.s} label="S" />
                </>
            ) : (
                <span className="text-red-300 font-bold px-3 py-1 bg-red-900/50 rounded">EXPIRED</span>
            )}
        </div>
    );
};

const TimeBox = ({ val, label }) => (
    <div className="flex flex-col items-center">
        <div className="bg-white/20 backdrop-blur-md w-10 h-10 flex items-center justify-center rounded-lg text-white border border-white/30 shadow-inner text-sm font-bold">
            {val}
        </div>
        <span className="text-[9px] text-white/60 mt-1">{label}</span>
    </div>
);

export default function Offers() {
    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            {/* --- Hero Header --- */}
            <div className="text-white relative overflow-hidden h-[600px] flex items-center">
                {/* Hero Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/images/offers/offers_hero_bg_1768910661300.png"
                        alt="Offers Hero"
                        className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-black/40 bg-linear-to-b from-black/60 via-transparent to-black/60"></div>
                </div>

                {/* Decorative Blobs (Preserved) */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand/20 rounded-full blur-[100px] opacity-40 translate-x-1/3 -translate-y-1/3 mix-blend-overlay"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] opacity-40 -translate-x-1/3 translate-y-1/3 mix-blend-overlay"></div>

                <div className="container mx-auto px-4 py-20 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full border border-brand/20 bg-white/50 backdrop-blur-sm text-sm font-bold uppercase tracking-[0.2em] mb-6 text-brand-dark">
                            Exclusive Deals
                        </span>
                        <h1 className="font-heading font-black text-5xl md:text-7xl mb-6 leading-tight text-brand-dark">
                            Green Deals <br /> <span className="text-primary italic font-serif">& Seasonal Offers</span>
                        </h1>
                        <p className="text-lg text-text/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                            Curated bundles, limited-time flash sales, and special discounts to help you grow your indoor jungle without breaking the bank.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => document.getElementById('flash-sales').scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-3 bg-brand-dark font-bold rounded-full hover:bg-brand transition-all shadow-lg active:scale-95 cursor-pointer"
                            >
                                View Flash Sales
                            </button>
                            <Link
                                to={PATHS.PRODUCTS}
                                className="px-8 py-3 border border-brand/30 text-brand-dark font-bold rounded-full hover:bg-brand/10 transition-all active:scale-95 cursor-pointer"
                            >
                                Shop All Plants
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">

                {/* --- Section 1: Flash Sales --- */}
                <div id="flash-sales" className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="p-3 bg-red-100 text-red-600 rounded-full shadow-sm">
                            <Clock size={28} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-4xl font-heading font-bold text-primary">Limited Time Offers</h2>
                            <p className="text-muted font-medium mt-1">Grab them before they grow away!</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {LIMITED_TIME_OFFERS.map(offer => (
                            <OfferCard key={offer.id} offer={offer} showTimer={true} />
                        ))}
                    </div>
                </div>

                {/* --- Section 2: Summer Collection --- */}
                <div className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="p-3 bg-orange-100 text-orange-600 rounded-full shadow-sm">
                            <Sun size={28} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-4xl font-heading font-bold text-primary">Summer Specials</h2>
                            <p className="text-muted font-medium mt-1">Hot deals for the hottest season.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {SUMMER_COLLECTION.map(offer => (
                            <OfferCard key={offer.id} offer={offer} />
                        ))}
                    </div>
                </div>

                {/* --- Section 3: Bulk / Corporate --- */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-full shadow-sm">
                            <Briefcase size={28} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-4xl font-heading font-bold text-primary">Bulk & Corporate</h2>
                            <p className="text-muted font-medium mt-1">Green gifting solutions for big occasions.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {BULK_ORDERS.map(offer => (
                            <OfferCard key={offer.id} offer={offer} />
                        ))}
                    </div>
                </div>

                {/* --- Bottom CTA --- */}
                <div className="mt-20 bg-brand-dark rounded-[40px] p-12 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed"></div>
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]"></div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <Star className="w-12 h-12 mx-auto text-yellow-400 mb-6 fill-current" />
                        <h2 className="text-4xl md:text-5xl font-heading font-black mb-6">Need a Custom Deal?</h2>
                        <p className="text-lg mb-8 leading-relaxed">
                            Looking for something specific or planning a large green event? Contact our sales team for personalized packages.
                        </p>
                        <button className="px-10 py-4 bg-white text-brand-dark font-bold text-lg rounded-full shadow-xl hover:bg-brand-soft hover:scale-105 transition-all active:scale-95 cursor-pointer">
                            Contact Sales Team
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
