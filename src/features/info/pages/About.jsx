import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Eye, Sprout, Target, Heart, Sun, Droplets } from 'lucide-react';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const stagger = {
    visible: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

// Counter Component
const Counter = ({ from, to }) => {
    const nodeRef = useRef();

    React.useEffect(() => {
        const node = nodeRef.current;
        const controls = {
            duration: 2000,
            step: (timestamp) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / controls.duration, 1);
                node.textContent = Math.floor(progress * (to - from) + from).toLocaleString();
                if (progress < 1) {
                    window.requestAnimationFrame(controls.step);
                }
            }
        };
        let start = null;
        window.requestAnimationFrame(controls.step);
    }, [from, to]);

    return <span ref={nodeRef} />;
};

const About = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const yHero = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const rotateShape = useTransform(scrollYProgress, [0, 1], [0, 90]);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#FDFBF7] relative overflow-hidden font-sans selection:bg-brand/20">

            {/* --- Noise Texture (Subtle Grain) --- */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

            {/* --- Organic Blobs --- */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-linear-to-bl from-[#E6F4EA] to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-60 z-0"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-linear-to-tr from-[#FDF0D5] to-transparent rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none opacity-50 z-0"></div>

            <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">

                {/* --- Hero: Editorial Style --- */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch mb-32">

                    {/* Visual Side */}
                    <div className="order-2 lg:order-1 relative group h-full">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="relative h-full w-full rounded-[3rem] overflow-hidden"
                        >
                            <div className="absolute inset-0 border-[1px] border-white/40 z-20 rounded-[3rem] m-4 pointer-events-none"></div>
                            <img
                                src="/images/about-us.png"
                                alt="Sanctuary"
                                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.5s]"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-[#0F3D2E]/80 to-transparent z-10"></div>

                            {/* Floating Stat Card */}
                            <motion.div
                                style={{ y: yHero }}
                                className="absolute bottom-12 left-8 md:left-12 z-30 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl max-w-[200px]"
                            >
                                <div className="text-4xl font-heading font-black text-white mb-1 flex items-baseline">
                                    <Counter from={0} to={12} /><span>k+</span>
                                </div>
                                <p className="text-white/80 text-xs font-medium uppercase tracking-wider">Happy Plants Delivered</p>
                            </motion.div>
                        </motion.div>

                        {/* Geometric Accent */}
                        <motion.div
                            style={{ rotate: rotateShape }}
                            className="absolute -top-12 -left-12 w-24 h-24 border-2 border-brand/20 rounded-full z-0 flex items-center justify-center"
                        >
                            <div className="w-2 h-2 bg-brand rounded-full"></div>
                        </motion.div>
                    </div>

                    {/* Content Side */}
                    <div className="order-1 lg:order-2 flex flex-col justify-center h-full relative">
                        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>

                            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
                                <span className="h-px w-12 bg-brand/30"></span>
                                <span className="text-xs font-bold tracking-[0.3em] text-brand uppercase">Our Philosophy</span>
                            </motion.div>

                            <motion.h1 variants={fadeInUp} className="text-6xl md:text-7xl lg:text-8xl font-heading font-black text-[#0F3D2E] leading-[0.9] tracking-tighter mb-8 ml-[-4px]">
                                Grow <br />
                                <span className="italic font-serif font-light text-[#C6A15B]">Wilder.</span>
                            </motion.h1>

                            <motion.p variants={fadeInUp} className="text-xl text-[#0F3D2E]/70 leading-relaxed font-light max-w-lg mb-10">
                                Usually, nature is "out there." We're bringing it <span className="font-semibold text-[#0F3D2E] underline decoration-[#C6A15B]/50 decoration-2 underline-offset-4">in here</span>.
                                Heart Leaf Blooms bridges the gap between the concrete jungle and your personal sanctuary.
                            </motion.p>

                            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-8 max-w-sm">
                                <div className="pl-4 border-l border-brand/20">
                                    <p className="font-bold text-lg text-[#0F3D2E]">100% Organic</p>
                                    <p className="text-xs text-[#0F3D2E]/50 uppercase tracking-wider mt-1">Sourcing</p>
                                </div>
                                <div className="pl-4 border-l border-brand/20">
                                    <p className="font-bold text-lg text-[#0F3D2E]">Zero Plastic</p>
                                    <p className="text-xs text-[#0F3D2E]/50 uppercase tracking-wider mt-1">Packaging</p>
                                </div>
                            </motion.div>

                        </motion.div>
                    </div>
                </div>

                {/* --- Bento Grid Values --- */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-heading font-bold text-[#0F3D2E] mb-4">Why We Do It</h2>
                        <div className="w-24 h-1 bg-brand/10 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

                        {/* Card 1: Vision (Large) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="md:col-span-2 bg-[#E6F4EA] rounded-[2.5rem] p-10 relative overflow-hidden group hover:shadow-xl transition-shadow duration-500"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#0F3D2E] shadow-sm mb-6">
                                    <Eye className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-heading font-bold text-[#0F3D2E] mb-3">Our Vision</h3>
                                    <p className="text-[#0F3D2E]/70 text-lg leading-relaxed max-w-md">
                                        To transform every gray concrete corner into a thriving green sanctuary. We see a future where every home breathes.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 2: Mission (Tall) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-[#2D2D2D] md:row-span-2 rounded-[2.5rem] p-10 relative overflow-hidden text-white flex flex-col"
                        >
                            <div className="absolute inset-0 bg-[url('/images/pattern-leaf.png')] opacity-5"></div> {/* Placeholder pattern */}
                            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-auto backdrop-blur-md">
                                <Target className="w-7 h-7" />
                            </div>
                            <div className="mt-8">
                                <h3 className="text-3xl font-heading font-bold mb-4 text-[#FDFBF7]">The Mission</h3>
                                <ul className="space-y-4 text-white/70">
                                    <li className="flex items-start gap-3">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8BC34A] shrink-0"></span>
                                        <span>Sustainable Sourcing</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8BC34A] shrink-0"></span>
                                        <span>Plant Education</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8BC34A] shrink-0"></span>
                                        <span>Community Growth</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-auto pt-8 border-t border-white/10">
                                <p className="text-xs font-bold uppercase tracking-widest text-[#8BC34A]">Since 2020</p>
                            </div>
                        </motion.div>

                        {/* Card 3: Care (Light) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-[2.5rem] p-10 border border-[#0F3D2E]/5 shadow-sm hover:border-[#0F3D2E]/10 transition-colors duration-300"
                        >
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-[#F5F3EF] rounded-2xl flex items-center justify-center text-[#C6A15B] mb-6">
                                    <Heart className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-heading font-bold text-[#0F3D2E] mb-2">Our Promise</h3>
                                <p className="text-[#0F3D2E]/60 text-sm leading-relaxed">
                                    Every plant is hand-inspected and comes with a 14-day happiness guarantee.
                                </p>
                            </div>
                        </motion.div>

                        {/* Card 4: Light (Light) - New Grid Item */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-[#FDF0D5] rounded-[2.5rem] p-10 relative overflow-hidden"
                        >
                            <div className="absolute -right-8 -bottom-8 text-[#F9E2B2]">
                                <Sun size={150} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-heading font-bold text-[#0F3D2E] mb-2">Expert Light</h3>
                                <p className="text-[#0F3D2E]/60 text-sm max-w-[150px]">
                                    We guide you to the perfect spot for every leaf.
                                </p>
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* --- Founder: Clean Editorial Style --- */}
                <div className="mb-32 max-w-6xl mx-auto">
                    <div className="bg-white relative p-8 md:p-16 rounded-[2rem] shadow-xl shadow-[#0F3D2E]/5 border border-[#0F3D2E]/5">

                        <div className="grid md:grid-cols-12 gap-12 items-center">
                            <div className="md:col-span-4 relative group">
                                <div className="relative rounded-[2rem] overflow-hidden">
                                    <img src="/images/avatar-1.png" alt="Founder" className="w-full h-full object-cover aspect-[4/5]" />
                                </div>
                            </div>

                            <div className="md:col-span-8">
                                <h2 className="text-4xl md:text-5xl font-serif font-medium text-[#0F3D2E] mb-8 leading-tight">
                                    "I didn't choose this path; the plants <span className="italic text-[#C6A15B]">chose me.</span>"
                                </h2>
                                <div className="space-y-6 text-lg text-[#0F3D2E]/70 font-light leading-relaxed">
                                    <p>
                                        It started with a single dying pothos I nursed back to health on a cramped city balcony. In its new leaf, I found a new purpose.
                                    </p>
                                    <p>
                                        I founded <span className="font-bold text-[#0F3D2E]">Heart Leaf Blooms</span> to prove that you don't need a backyard to have a garden. You just need a little light and a lot of love.
                                    </p>
                                </div>
                                <div className="mt-12 flex items-center justify-between border-t border-[#0F3D2E]/10 pt-8">
                                    <div>
                                        <p className="font-heading font-bold text-[#0F3D2E] text-xl">blooms</p>
                                        <p className="text-xs uppercase tracking-widest text-[#0F3D2E]/50">Founder & Head Gardener</p>
                                    </div>
                                    <div className="font-serif italic text-3xl text-[#0F3D2E]/20 select-none">blooms.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Featured In: Marquee --- */}
                <div className="py-12 border-y border-[#0F3D2E]/5 overflow-hidden">
                    <p className="text-center text-xs font-bold tracking-[0.2em] text-[#0F3D2E]/30 uppercase mb-8">As Seen In</p>
                    <div className="relative flex overflow-x-hidden group">
                        <div className="flex animate-marquee whitespace-nowrap gap-24 group-hover:[animation-play-state:paused] opacity-40">
                            {['VOGUE', 'ARCHITECTURAL DIGEST', 'ELLE DECOR', 'PLANT LIFE', 'MODERN HOME', 'VOGUE', 'ARCHITECTURAL DIGEST'].map((brand, i) => (
                                <span key={i} className="text-4xl font-heading font-bold text-transparent text-stroke hover:text-[#0F3D2E] transition-colors duration-300 cursor-default">
                                    {brand}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            <style>{`
                .text-stroke {
                    -webkit-text-stroke: 1px #0F3D2E;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default About;
