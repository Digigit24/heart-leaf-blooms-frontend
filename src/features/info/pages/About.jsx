import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Eye, Sprout, Target } from 'lucide-react';

// --- Animation Variants ---
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const About = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Subtle parallax for background elements
    const yBg = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#FDFBF7] relative overflow-hidden selection:bg-brand/20">
            {/* Ambient Background - Subtle Gradients */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">

                {/* --- Hero Section --- */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch mb-24 lg:mb-32">

                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative order-2 lg:order-1 h-full"
                    >
                        <div className="relative rounded-4xl overflow-hidden shadow-2xl shadow-brand/10 h-full max-h-[600px] w-full">
                            <img
                                src="/images/about-us.png"
                                alt="Our Green Sanctuary"
                                className="w-full h-full object-cover relative z-10 hover:scale-105 transition-transform duration-700"
                            />
                            {/* Overlay/Tint */}
                            <div className="absolute inset-0 bg-brand/5 z-20 pointer-events-none mix-blend-multiply"></div>
                        </div>

                        {/* Floating Decoration */}
                        <motion.div
                            style={{ y: yBg, rotate }}
                            className="absolute -top-12 -right-12 text-brand/10 opacity-50 z-0 pointer-events-none"
                        >
                            <Sprout size={200} strokeWidth={0.5} />
                        </motion.div>
                    </motion.div>

                    {/* Text Content */}
                    <div className="order-1 lg:order-2 flex flex-col justify-center h-full">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <span className="text-sm font-bold tracking-[0.25em] text-brand uppercase mb-4 block">Who We Are</span>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-primary leading-[0.9] tracking-tight mb-8">
                                Cultivating <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-brand to-[#8BC34A]">Happiness</span>
                            </h1>
                            <p className="text-lg md:text-xl text-text/70 leading-relaxed font-light max-w-lg">
                                We believe that nature isn't just a place to visit—it's home. Heart Leaf Blooms is a bridge between the wild and your windowsill.
                            </p>

                            <div className="pt-8 grid grid-cols-2 gap-8 border-t border-brand/10 mt-8">
                                <div>
                                    <p className="text-3xl font-heading font-bold text-primary mb-1">10k+</p>
                                    <p className="text-xs uppercase tracking-wider text-muted">Happy Plant Parents</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-heading font-bold text-primary mb-1">100%</p>
                                    <p className="text-xs uppercase tracking-wider text-muted">Organic Growth</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* --- Core Values (Clean Layout) --- */}
                <div className="mb-24 lg:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-2xl mx-auto mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Our Roots</h2>
                        <p className="text-text/60">Guided by principles that help us grow together.</p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-12 lg:gap-16"
                    >
                        {[
                            {
                                icon: Eye,
                                title: "Vision",
                                desc: "To transform every gray concrete corner into a thriving green sanctuary."
                            },
                            {
                                icon: Sprout,
                                title: "Mission",
                                desc: "Providing sustainable, healthy plants and the knowledge to keep them that way."
                            },
                            {
                                icon: Target,
                                title: "Promise",
                                desc: "Quality you can trust, delivered safely from our nursery to your doorstep."
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                className="text-center group"
                            >
                                <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center text-brand mb-6 shadow-sm shadow-brand/10 group-hover:scale-110 transition-transform duration-300">
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-primary mb-3">{item.title}</h3>
                                <p className="text-text/70 leading-relaxed text-sm md:text-base">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* --- Founder's Story (Clean Editorial) --- */}
                <div className="mb-24 relative">
                    <div className="grid md:grid-cols-12 gap-8 items-center bg-white/50 backdrop-blur-sm rounded-[3rem] p-8 md:p-0 overflow-hidden">

                        {/* Image Strip */}
                        <div className="md:col-span-5 h-[400px] md:h-full min-h-[500px] relative">
                            <img
                                src="/images/avatar-1.png"
                                alt="Founder"
                                className="w-full h-full object-cover md:absolute inset-0 grayscale-[10%]"
                            />
                        </div>

                        {/* Content */}
                        <div className="md:col-span-7 md:p-12 lg:p-20">
                            <span className="text-primary/20 font-heading font-black text-9xl absolute top-0 right-10 -translate-y-1/2 select-none z-0 opacity-20 hidden md:block">
                                ''
                            </span>

                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={staggerContainer}
                                className="relative z-10"
                            >
                                <motion.p variants={fadeInUp} className="text-sm font-bold text-brand uppercase tracking-widest mb-6">The Gardener's Note</motion.p>

                                <motion.blockquote variants={fadeInUp} className="text-2xl md:text-3xl font-serif text-primary/80 italic leading-relaxed mb-8">
                                    "I didn't choose this path; the plants chose me. In every new leaf, I found a new purpose."
                                </motion.blockquote>

                                <motion.div variants={fadeInUp} className="space-y-4 text-text/70 leading-loose">
                                    <p>
                                        Before Heart Leaf Blooms, I felt disconnected in the city. My balcony garden became my escape—a place where time slowed down.
                                    </p>
                                    <p>
                                        I founded this company to <strong className="text-primary">bridge the gap between people and nature</strong>, making plant parenthood accessible and rewarding for everyone.
                                    </p>
                                </motion.div>

                                <motion.div variants={fadeInUp} className="mt-8 pt-8 border-t border-brand/10 flex items-center gap-4">
                                    <div>
                                        <p className="font-heading font-bold text-primary text-lg">blooms</p>
                                        <p className="text-xs text-muted">Founder & Head Gardener</p>
                                    </div>
                                    <img src="/images/signature.png" alt="" className="h-8 opacity-50 ml-auto hidden" /> {/* Placeholder for signature if needed */}
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* --- Featured In (Minimal) --- */}
                <div className="border-t border-brand/5 pt-16 text-center opacity-60 hover:opacity-100 transition-opacity duration-500">
                    <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase mb-12">As Featured In</p>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-20">
                        {['Vogue Living', 'Architectural Digest', 'Plant Life', 'Modern Home'].map((brand) => (
                            <span key={brand} className="text-xl md:text-2xl font-serif text-primary/40 hover:text-primary transition-colors cursor-default">
                                {brand}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
