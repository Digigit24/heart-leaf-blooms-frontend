import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Gift, ShoppingBag, Sun, Truck, Star, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PATHS } from '@/app/routes/paths';

// --- Mock Offers Data ---
const LIMITED_TIME_OFFERS = [
    {
        id: 1,
        title: "Monsoon Madness Sale",
        description: "Get up to 40% off on all tropical rain-loving plants. Perfect for the season.",
        code: "MONSOON40",
        discount: "40% OFF",
        expiry: "2026-02-15T23:59:59",
        image: "https://images.unsplash.com/photo-1599598425947-6699d7a22eb3?q=80&w=1762&auto=format&fit=crop",
        color: "bg-teal-900",
        accent: "text-teal-200"
    },
    {
        id: 2,
        title: "New Plant Parent Kit",
        description: "Start your journey with 3 easy-care plants + 1 pot + soil mix at a special bundle price.",
        code: "NEWPARENT",
        discount: "Bundle @ ₹999",
        expiry: "2026-03-01T23:59:59",
        image: "https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=900&auto=format&fit=crop",
        color: "bg-terracotta-800",
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
        image: "https://images.unsplash.com/photo-1459416417751-936c5ad621db?q=80&w=1000&auto=format&fit=crop",
        colorClass: "bg-orange-600",
        accent: "text-yellow-200"
    },
    {
        id: 102,
        title: "Cool Shade Collection",
        description: "Lush ferns and tall palms to keep your interiors cool and fresh this summer.",
        discount: "Flat 20% OFF",
        code: "COOL20",
        image: "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1000&auto=format&fit=crop",
        colorClass: "bg-green-800",
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
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop",
        colorClass: "bg-slate-800",
        accent: "text-blue-200"
    },
    {
        id: 202,
        title: "Wedding & Event Favors",
        description: "Mini succulents and saplings for sustainable and memorable return gifts.",
        discount: "Starting @ ₹49",
        code: "EVENT_BULK",
        image: "https://images.unsplash.com/photo-1512428813835-6518081f8c4a?q=80&w=1000&auto=format&fit=crop",
        colorClass: "bg-pink-900",
        accent: "text-pink-200"
    }
];

const OfferCard = ({ offer, showTimer = false }) => (
    <motion.div
        whileHover={{ y: -8 }}
        className={`relative rounded-[32px] overflow-hidden shadow-2xl min-h-[420px] flex group ${offer.colorClass || offer.color}`}
    >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
            <img src={offer.image} alt={offer.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-transparent"></div>
        </div>

        <div className="relative z-10 p-10 flex flex-col justify-center max-w-lg h-full">
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded text-xs font-bold uppercase tracking-wider text-white w-fit mb-4 shadow-sm">
                {offer.discount}
            </div>
            <h3 className="text-4xl font-heading font-black text-white mb-4 leading-tight drop-shadow-lg">{offer.title}</h3>
            <p className="text-white/90 mb-8 leading-relaxed text-lg font-medium drop-shadow-md">{offer.description}</p>

            <div className="mt-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 w-fit group-hover:bg-white/20 transition-colors">
                    <p className="text-[10px] text-white/70 uppercase tracking-widest mb-1 font-bold">Use Coupon Code</p>
                    <div className="flex items-center gap-4">
                        <span className={`text-2xl font-mono font-bold tracking-wider ${offer.accent} drop-shadow-sm`}>{offer.code}</span>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(offer.code);
                            }}
                            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white border border-white/30 hover:border-white"
                            title="Copy Code"
                        >
                            <span className="text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Copy</span>
                        </button>
                    </div>
                </div>
                {showTimer && offer.expiry && <CountdownTimer targetDate={offer.expiry} />}
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
            <div className="text-primary relative overflow-hidden bg-brand/5">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand/20 rounded-full blur-[100px] opacity-40 translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] opacity-40 -translate-x-1/3 translate-y-1/3"></div>

                <div className="container mx-auto px-4 py-20 md:py-32 relative z-10 text-center">
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
                                className="px-8 py-3 bg-brand-dark text-white font-bold rounded-full hover:bg-brand transition-all shadow-lg active:scale-95 cursor-pointer"
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

                    <div className="relative z-10 max-w-2xl mx-auto text-white">
                        <Star className="w-12 h-12 mx-auto text-yellow-400 mb-6 fill-current" />
                        <h2 className="text-4xl md:text-5xl font-heading font-black mb-6">Need a Custom Deal?</h2>
                        <p className="text-lg text-white/80 mb-8 leading-relaxed">
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
