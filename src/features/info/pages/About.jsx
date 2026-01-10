import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Eye, Sprout, Target } from 'lucide-react';

// --- Animation Variants ---

const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { ...transition, duration: 1 }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { ...transition, duration: 1.2 }
    }
};

// --- Helper Components ---

const SplitText = ({ children, className }) => {
    const letter = {
        visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 12, stiffness: 100 } },
        hidden: { y: 20, opacity: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    };

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.04 * i } }),
    };

    return (
        <motion.span variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`inline-block ${className}`}>
            {children.split("").map((char, index) => (
                <motion.span variants={letter} key={index} className="inline-block">
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.span>
    );
};

// Realistic Neem Leaf Component (Serrated, Elongated, Curvy)
const NeemLeaf = ({ className, style }) => (
    <motion.svg
        viewBox="0 0 100 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
    >
        {/* Elongated leaf shape with serrated edges */}
        <path
            d="M50 0 C60 20 80 50 85 100 C88 130 75 160 55 190 L50 200 L45 190 C25 160 12 130 15 100 C20 50 40 20 50 0 Z"
            fill="url(#neemGradient)"
        />

        {/* Serrated Edges Detail - stylised overlay */}
        <path d="M85 100 L90 105 L83 115" fill="none" class="hidden" />

        {/* Central Vein */}
        <path d="M50 5 L50 195" stroke="#14532d" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

        {/* Side Veins - Asymmetric and angled */}
        <path d="M50 30 C50 30 70 40 75 45" stroke="#164e3b" strokeWidth="0.8" opacity="0.4" />
        <path d="M50 50 C50 50 25 60 20 65" stroke="#164e3b" strokeWidth="0.8" opacity="0.4" />
        <path d="M50 70 C50 70 78 80 82 85" stroke="#164e3b" strokeWidth="0.8" opacity="0.4" />
        <path d="M50 90 C50 90 22 100 18 105" stroke="#164e3b" strokeWidth="0.8" opacity="0.4" />
        <path d="M50 110 C50 110 75 120 78 125" stroke="#164e3b" strokeWidth="0.8" opacity="0.4" />
        <path d="M50 130 C50 130 25 140 22 145" stroke="#164e3b" strokeWidth="0.8" opacity="0.4" />
        <path d="M50 150 C50 150 65 160 68 165" stroke="#164e3b" strokeWidth="0.8" opacity="0.4" />

        <defs>
            <linearGradient id="neemGradient" x1="50" y1="0" x2="50" y2="200" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#86EFAC" />
                <stop offset="0.6" stopColor="#22C55E" />
                <stop offset="1" stopColor="#15803D" />
            </linearGradient>
            <filter id="leafShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                <feOffset dx="2" dy="2" result="offsetblur" />
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.2" />
                </feComponentTransfer>
                <feMerge>
                    <feMergeNode in="offsetblur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
    </motion.svg>
);

const About = () => {
    // Refs for tracking elements
    const containerRef = useRef(null);
    const heroRef = useRef(null); // Added heroRef
    const goalCardRef = useRef(null);

    // Scroll progress for the entire container
    // Using a slightly longer offset to ensure full travel
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Ultra-smooth physics (Lenis-like feel)
    // Higher mass = more inertia, Lower stiffness = softer movement
    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 25,
        damping: 18,
        mass: 1.2
    });

    // --- Path Calculations ---

    // Vertical (Y):
    // Starts high (0), Falls down to the Founder's Story card (Middle-Bottom).
    // Adjusted to 1650px to land on the right side of the Founder/Blooms card.
    const y = useTransform(smoothScroll, [0, 1], [0, 1650]);

    // Horizontal (X) - Swaying "S" Curve:
    // Weaves Left/Right through content sections.
    // Ends at -60px (Moved left from start) to overlap the right edge of the Founder card.
    const x = useTransform(smoothScroll,
        [0, 0.25, 0.5, 0.75, 1],
        [0, -300, 50, -200, -60]
    );

    // Rotation - Synced with the S-curve turns
    const rotate = useTransform(smoothScroll,
        [0, 0.25, 0.5, 0.75, 1],
        [15, -30, 25, -20, 15]
    );

    // Scale:
    // Starts detached (normal), slight flutter.
    const scale = useTransform(smoothScroll, [0, 1], [1.2, 1.0]);

    return (
        <div ref={containerRef} className="min-h-screen bg-bg relative overflow-x-hidden selection:bg-primary/20">
            {/* Gradient Overlay for atmosphere (simulating light filtering through canopy) */}
            <div className="fixed inset-0 pointer-events-none z-0 bg-linear-to-b from-transparent via-sage/5 to-transparent"></div>

            {/* --- The Guided Neem Leaf Animation --- */}
            {/* Starting Position: Top Right, aligned with "Welcome to" header area approximately. */}
            <div
                className="absolute z-40 pointer-events-none hidden lg:block will-change-transform"
                style={{
                    top: '120px',
                    right: '12%', // Moved slightly inward to start near the text block
                }}
            >
                <NeemLeaf
                    className="w-16 h-32 drop-shadow-xl" // Narrower and taller for Neem
                    style={{
                        y,
                        x,
                        rotate,
                        scale,
                    }}
                />
            </div>

            <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
                {/* Hero Section */}
                <div ref={heroRef} className="flex flex-col md:flex-row items-center gap-16 md:gap-24 mb-32">

                    {/* Image Section - Left */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-start relative md:pl-8">
                        <motion.div
                            variants={scaleIn}
                            initial="hidden"
                            animate="visible"
                            className="relative z-10 w-full max-w-lg"
                        >
                            {/* Decorative ring */}
                            <motion.div
                                initial={{ opacity: 0, rotate: -15 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                className="absolute -inset-4 border border-sage/30 rounded-full z-0 transform scale-110"
                            />

                            {/* Main Image Container */}
                            <div className="relative overflow-hidden rounded-2xl group cursor-pointer shadow-2xl shadow-sage/20">
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                    className="bg-linear-to-br from-transparent to-sage/10 rounded-2xl border border-white/50 backdrop-blur-sm"
                                >
                                    <img
                                        src="/images/about-us.png"
                                        alt="About Heart Leaf Blooms"
                                        className="relative z-10 w-full object-contain drop-shadow-2xl"
                                    />
                                </motion.div>
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="absolute -bottom-6 -right-6 md:right-0 bg-surface/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/60 max-w-[180px]"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-leaf"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6L9 14" /></svg>
                                    </div>
                                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Est. 2020</span>
                                </div>
                                <p className="text-[11px] text-muted leading-tight font-medium">Cultivating nature for over 10,000 happy homes globally.</p>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Text Content - Right */}
                    <div className="w-full md:w-1/2 space-y-12 relative z-0">
                        <div className="space-y-6 relative">
                            <div className="overflow-hidden">
                                <motion.div
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ ...transition, delay: 0.2 }}
                                    className="flex flex-col gap-1"
                                >
                                    <span className="text-sm font-bold tracking-[0.3em] text-sage uppercase pl-1">Who We Are</span>
                                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-primary leading-[0.95] tracking-tight">
                                        <span className="block overflow-hidden pb-2"><SplitText>Welcome to</SplitText></span>
                                        <span className="block text-transparent bg-clip-text bg-linear-to-r from-sage to-primary overflow-hidden pb-4"><SplitText>Heart Leaf</SplitText></span>
                                    </h1>
                                </motion.div>
                            </div>

                            {/* This is the gap the leaf will pass through */}
                            <div className="h-4"></div>

                            <motion.p
                                variants={fadeInUp}
                                initial="hidden"
                                animate="visible"
                                className="text-muted text-lg leading-relaxed font-body max-w-xl pl-1 border-l-2 border-sage/30 bg-bg/50 backdrop-blur-[2px] rounded-r-lg"
                            >
                                We bring the serenity of nature directly to your home.
                                <span className="text-primary font-medium"> Heart Leaf Blooms</span> is more than a plant shop; it's a movement towards sustainable, greener living.
                                Each leaf tells a story of care, resilience, and beauty.
                            </motion.p>
                        </div>

                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-white/50 inline-block"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-4xl">🏆</span>
                                <div>
                                    <h2 className="text-lg font-heading font-bold text-primary">
                                        Best Online Plant Shop 2024
                                    </h2>
                                    <p className="text-muted text-sm font-medium">Recognized for Excellence in Quality</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Core Values Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 relative"
                >
                    {[
                        {
                            title: "Our Vision",
                            text: "To create a greener world where every indoor space is transformed into a sanctuary of life and calm.",
                            icon: Eye,
                            color: "text-blue-900/80"
                        },
                        {
                            title: "Our Mission",
                            text: "To provide healthy, sustainable, and beautiful plants while educating our community on the joy of plant parenthood.",
                            icon: Sprout,
                            color: "text-primary"
                        },
                        {
                            id: "goal-card", // Target for the leaf
                            title: "Our Goal",
                            text: "To be the most reliable and inspiring partner in your indoor gardening journey, offering quality you can trust.",
                            icon: Target,
                            color: "text-amber-700/80"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            ref={item.id ? goalCardRef : null}
                            variants={fadeInUp}
                            whileHover={{ y: -8 }}
                            className="relative bg-surface/60 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 group overflow-hidden z-20"
                        >
                            {/* Hover Gradient Background */}
                            <div className="absolute inset-0 bg-linear-to-br from-transparent to-sage/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            {/* Icon */}
                            <div className="relative z-10 w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 border border-sage/10">
                                <item.icon className={`w-8 h-8 ${item.color} stroke-[1.5px]`} />
                            </div>

                            {/* Target Anchor for the Leaf Land */}
                            {item.id === 'goal-card' && (
                                <div className="absolute top-0 right-0 w-8 h-8 opacity-0" id="goal-target-anchor"></div>
                            )}

                            <h3 className="relative z-10 text-xl font-heading font-bold text-primary mb-3 bg-clip-text">
                                {item.title}
                            </h3>
                            <p className="relative z-10 text-muted leading-relaxed font-body text-sm">
                                {item.text}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Founder's Story Section */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mb-32 max-w-5xl mx-auto"
                >
                    <div className="flex flex-col md:flex-row items-center gap-12 bg-surface/50 backdrop-blur-sm rounded-[40px] p-8 md:p-16 border border-white shadow-sm relative overflow-hidden">

                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sage/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                        {/* Image */}
                        <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 relative group">
                            <div className="absolute inset-0 rounded-full border border-primary/10 transform rotate-6 transition-transform group-hover:rotate-12"></div>
                            <div className="absolute inset-0 rounded-full border border-sage/20 transform -rotate-3 transition-transform group-hover:-rotate-6"></div>
                            <img
                                src="/images/avatar-1.png"
                                alt="xyz"
                                className="w-full h-full object-cover rounded-full border-4 border-white shadow-2xl relative z-10 grayscale-[10%] group-hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute bottom-4 right-4 z-20 bg-white p-2 rounded-full shadow-lg text-primary">
                                <Sprout size={20} />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-center md:text-left relative z-10">
                            <span className="inline-block py-1 px-3 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">The Root of It All</span>
                            <h2 className="text-3xl md:text-4xl font-heading font-black text-primary mb-2">blooms</h2>
                            <p className="text-sm font-bold text-sage uppercase tracking-widest mb-8">Founder & Head Gardener</p>

                            <div className="space-y-6">
                                <p className="text-text/80 leading-relaxed font-serif text-lg italic border-l-4 border-accent/30 pl-6 my-6">
                                    "I didn't choose this path; the plants chose me. It started with a single dying pothos I nursed back to health, and in its new leaf, I found a new purpose."
                                </p>
                                <p className="text-muted leading-relaxed">
                                    Before Heart Leaf Blooms, I was caught in the concrete jungle, disconnected from nature. My small balcony garden became my sanctuary—a place where time slowed down. I realized that plants are more than just decor; they are living companions that heal our spaces and spirits.
                                </p>
                                <p className="text-muted leading-relaxed">
                                    I founded this company with a simple mission: <span className="text-primary font-semibold">to bridge the gap between people and nature</span>, making plant parenthood accessible, rewarding, and undeniably beautiful for everyone.
                                </p>
                            </div>

                            {/* Signoff */}
                            <div className="mt-8 pt-8 border-t border-border/40 flex items-center justify-center md:justify-start gap-4">
                                <div className="h-px w-12 bg-primary/20"></div>
                                <span className="font-serif italic text-2xl text-primary/80 transform -rotate-2">blooms.</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Brands / Featured In */}
                <div className="border-t border-border/60 pt-20 relative">
                    <p className="text-center text-xs font-bold tracking-[0.2em] text-muted uppercase mb-16 opacity-60">As Featured In</p>
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12"
                    >
                        {['Vogue Living', 'Architectural Digest', 'Plant Life', 'Modern Home', 'Green Spaces'].map((brand, i) => (
                            <motion.span
                                key={brand}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05, color: "var(--primary)" }}
                                className={`text-2xl md:text-3xl font-serif font-medium text-muted/40 hover:text-primary transition-all duration-300 cursor-default select-none ${i % 2 === 0 ? 'italic' : ''}`}
                            >
                                {brand}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
