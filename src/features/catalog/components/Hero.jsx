import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
    {
        id: 1,
        image: '/images/hero-1.png',
        title: 'Bring Nature Home',
        subtitle: 'Elevate your sanctuary with our curated collection of lush indoor plants.',
        cta: 'Shop Indoor Plants',
        path: '/products?category=indoor',
        color: '#0F3D2E'
    },
    {
        id: 2,
        image: '/images/hero-2.png',
        title: 'Timeless Elegance',
        subtitle: 'Hand-picked floral arrangements that add a touch of sophistication to any room.',
        cta: 'Explore Florals',
        path: '/products?category=flowers',
        color: '#B65B5B'
    },
    {
        id: 3,
        image: '/images/hero-3.png',
        title: 'Your Private Oasis',
        subtitle: 'Transform your balcony or patio into a modern green retreat.',
        cta: 'View Outdoor',
        path: '/products?category=outdoor',
        color: '#B9892F'
    }
];

export default function Hero() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    // Dynamic animations based on slide index
    const getTextAnimation = (index) => {
        if (index === 0) {
            return {
                initial: { x: -800, rotate: -270, opacity: 0 },
                animate: { x: 0, rotate: 0, opacity: 1 },
                exit: { opacity: 0 },
                transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
            };
        } else if (index === 1) {
            return {
                initial: { x: -800, opacity: 0 },
                animate: { x: 0, opacity: 1 },
                exit: { opacity: 0 },
                transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
            };
        } else {
            return {
                initial: { x: -1200, opacity: 0 },
                animate: { x: 0, opacity: 1 },
                exit: { opacity: 0 },
                transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] }
            };
        }
    };

    // Dynamic alignment based on slide index
    const getAlignmentClass = (index) => {
        if (index === 0) return "justify-center items-start text-left pl-4 md:pl-12";
        if (index === 1) return "justify-center items-center text-center mx-auto";
        if (index === 2) return "justify-center items-center ml-auto md:w-[60%] lg:w-[50%] text-left pr-4 md:pr-16";
        return "justify-center";
    };

    return (
        <section className="relative h-[85vh] w-full overflow-hidden bg-bg">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center transform transition-transform duration-10000 ease-linear scale-105"
                        style={{ backgroundImage: `url(${slides[current].image})` }}
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Content Container */}
            <div className={`relative h-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col ${getAlignmentClass(current)}`}>
                <AnimatePresence mode="wait">
                    <div className="max-w-3xl text-white space-y-6 w-full">
                        <motion.div
                            key={`content-${current}`}
                            {...getTextAnimation(current)}
                        >
                            <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs uppercase tracking-[0.2em] mb-4 backdrop-blur-sm">
                                New Collection
                            </span>
                            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6">
                                {slides[current].title}
                            </h1>
                            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-lg mb-8 bg-black/20 backdrop-blur-sm p-4 rounded-lg inline-block">
                                {slides[current].subtitle}
                            </p>
                            <div className="block">
                                <Link
                                    to={slides[current].path}
                                    className="group inline-flex items-center gap-3 bg-white text-[#0F3D2E] px-8 py-4 rounded-full font-medium transition-all hover:bg-[#C6A15B] hover:text-white hover:scale-105 active:scale-95 shadow-lg"
                                >
                                    {slides[current].cta}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="absolute bottom-8 right-8 flex gap-4 pr-8 z-20">
                <button
                    onClick={prevSlide}
                    className="p-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-[#0F3D2E] transition-all backdrop-blur-sm"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={nextSlide}
                    className="p-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-[#0F3D2E] transition-all backdrop-blur-sm"
                >
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-1 rounded-full transition-all duration-500 ${index === current ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                    />
                ))}
            </div>
        </section>
    );
}
