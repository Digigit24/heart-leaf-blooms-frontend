import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
    {
        id: 1,
        title: "Bring Nature Indoors",
        subtitle: "Premium Indoor Plants",
        description: "Transform your living space into a lush sanctuary with our curated collection of exotic indoor greenery.",
        image: "/images/offers/offers_hero_bg_1768910661300.png",
        cta: "Shop Now",
        link: "/products",
        color: "text-white"
    },
    {
        id: 2,
        title: "Monsoon Madness",
        subtitle: "Seasonal Sale",
        description: "Get up to 40% OFF on rain-loving tropicals. The perfect time to expand your jungle.",
        image: "/images/offers/monsoon_offer_plant_1768910679933.png",
        cta: "View Offer",
        link: "/offers",
        color: "text-teal-50"
    },
    {
        id: 3,
        title: "New Parent Kit",
        subtitle: "Beginner Friendly",
        description: "Start small, grow big. Our curated kit of 3 unkillable plants is perfect for beginners.",
        image: "/images/offers/new_parent_kit_1768910980974.png",
        cta: "Get the Kit",
        link: "/offers",
        color: "text-amber-50"
    },
    {
        id: 4,
        title: "Summer Sunshine",
        subtitle: "Succulents & Cacti",
        description: "Drought-tolerant beauties that love the sun as much as you do.",
        image: "/images/offers/summer_sunshine_1768911014626.png",
        cta: "Shop Summer",
        link: "/offers",
        color: "text-orange-50"
    }
];

export default function Hero() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent(prev => (prev + 1) % SLIDES.length);
    const prevSlide = () => setCurrent(prev => (prev - 1 + SLIDES.length) % SLIDES.length);

    return (
        <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-stone-900 font-sans">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src={SLIDES[current].image}
                            alt={SLIDES[current].title}
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="max-w-2xl"
                        >
                            <span className={`inline-block px-3 py-1 mb-4 border border-white/30 rounded-full text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-sm ${SLIDES[current].color}`}>
                                {SLIDES[current].subtitle}
                            </span>
                            <h1 className={`text-5xl md:text-7xl font-black mb-6 leading-tight drop-shadow-2xl ${SLIDES[current].color}`}>
                                {SLIDES[current].title}
                            </h1>
                            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-lg drop-shadow-md font-light">
                                {SLIDES[current].description}
                            </p>
                            <Link
                                to={SLIDES[current].link}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-stone-900 font-bold rounded-full hover:bg-brand hover:text-green-800 transition-all transform hover:scale-105 shadow-xl"
                            >
                                {SLIDES[current].cta}
                                <ArrowRight size={20} />
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Preserved 'Left Corner Plant' Overlay (Palm) */}
            <div className="absolute -bottom-10 -left-10 z-30 pointer-events-none w-64 md:w-96 opacity-80 mix-blend-overlay">
                <img src="https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/hero-section-gradient.style/img/palm.png" alt="Decorative" />
            </div>

            {/* Controls */}
            <div className="absolute bottom-10 right-10 z-30 flex gap-4">
                <button onClick={prevSlide} className="p-3 rounded-full border border-white/20 bg-black/20 text-white hover:bg-white hover:text-stone-900 transition-all backdrop-blur-md">
                    <ChevronLeft size={24} />
                </button>
                <button onClick={nextSlide} className="p-3 rounded-full border border-white/20 bg-black/20 text-white hover:bg-white hover:text-stone-900 transition-all backdrop-blur-md">
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {SLIDES.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`h-1 rounded-full transition-all duration-300 ${idx === current ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                    />
                ))}
            </div>
        </section>
    );
}
