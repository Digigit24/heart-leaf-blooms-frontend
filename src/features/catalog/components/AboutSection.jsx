import { motion } from 'framer-motion';
import { ArrowRight, Leaf, CheckCircle2, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutSection() {
    return (
        <section className="relative py-24 md:py-32 overflow-hidden bg-[#FDFCF8] isolate">
            {/* Background Artifacts */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                <motion.div
                    animate={{ y: [0, -15, 0], rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 -left-20 w-[600px] h-[600px] opacity-40 mix-blend-multiply"
                >
                    <img src="/images/water-leaf.png" alt="" className="w-full h-full object-contain" />
                </motion.div>

                <motion.div
                    animate={{ y: [0, 20, 0], rotate: [0, -5, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-20 -right-20 w-[700px] h-[700px] opacity-30 mix-blend-multiply"
                >
                    <img src="/images/water-flower.png" alt="" className="w-full h-full object-contain" />
                </motion.div>
            </div>

            <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

                    {/* Image Column */}
                    <div className="w-full lg:w-[45%] flex-shrink-0 relative top-2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-brand-dark/10 bg-white p-2"
                        >
                            <div className="rounded-[2rem] overflow-hidden">
                                <img
                                    src="/images/about-us.png"
                                    alt="Our florist team selecting plants"
                                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </div>
                        </motion.div>

                        {/* Experience Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50"
                        >
                            <div className="flex items-center gap-1">
                                <span className="font-heading font-black text-5xl text-brand-dark">15</span>
                                <span className="font-heading font-bold text-3xl text-accent-clay">+</span>
                            </div>
                            <p className="text-xs text-text-primary uppercase tracking-widest font-bold mt-1 pl-1">Years of<br />Growth</p>
                        </motion.div>
                    </div>

                    {/* Content Column */}
                    <div className="w-full lg:w-[55%] flex flex-col items-start space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="space-y-6 w-full"
                        >
                            {/* Tag - Aligned Left (No padding) */}
                            <div className="flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-accent-clay rounded-full"></span>
                                <span className="text-accent-clay font-subheading font-bold tracking-[0.2em] text-xs uppercase">
                                    Our Narrative
                                </span>
                            </div>

                            {/* Headline - Rounded Font (Poppins) */}
                            <h2 className="font-subheading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark leading-[1.15]">
                                Art of Nature, <br />
                                <span className="text-brand">Curated for Living.</span>
                            </h2>

                            {/* Expanded Intro Text - SEO Friendly */}
                            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed font-body font-light max-w-2xl">
                                At Heart Leaf Blooms, we don't just supply plants; we cultivate personal sanctuaries.
                                Since 2010, our journey has been rooted in the belief that every home deserves a touch of nature's wild elegance.
                                We bridge the gap between avid collectors and first-time plant parents through education, quality, and care.
                            </p>
                        </motion.div>

                        {/* Grid Layout for Features for Better Space Usage */}
                        <div className="grid sm:grid-cols-2 gap-8 w-full pt-2">
                            {/* Feature 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="group flex flex-col items-start gap-4"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-brand-soft/60 flex items-center justify-center text-brand-dark group-hover:bg-brand group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-brand/20 group-hover:scale-110 group-hover:rotate-3">
                                    <Leaf className="w-7 h-7" />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-subheading font-bold text-xl text-brand-dark">Sustainably Grown</h4>
                                    <p className="text-text-muted text-base leading-relaxed">
                                        We partner exclusively with eco-conscious growers who prioritize soil health and biodiversity over mass production.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Feature 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true }}
                                className="group flex flex-col items-start gap-4"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-brand-soft/60 flex items-center justify-center text-brand-dark group-hover:bg-brand group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-brand/20 group-hover:scale-110 group-hover:-rotate-3">
                                    <CheckCircle2 className="w-7 h-7" />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-subheading font-bold text-xl text-brand-dark">Hand-Curated Quality</h4>
                                    <p className="text-text-muted text-base leading-relaxed">
                                        Each plant is inspected root-to-leaf for vitality, ensuring only the most resilient specimens reach your doorstep.
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            viewport={{ once: true }}
                            className="pt-4"
                        >
                            <Link
                                to="/about"
                                className="group inline-flex items-center gap-3 bg-brand-dark text-white px-8 py-4 rounded-full font-subheading font-medium tracking-wide transition-all hover:bg-brand hover:shadow-lg hover:shadow-brand/25 hover:-translate-y-1"
                            >
                                <Sprout className="w-5 h-5 group-hover:animate-bounce" />
                                <span>Discover Our Journey</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
