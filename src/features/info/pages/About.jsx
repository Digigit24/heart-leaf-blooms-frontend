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
        <div ref={containerRef} className="min-h-screen bg-[#FDFBF7] relative font-sans selection:bg-brand/20">

            {/* --- Background Wrapper (Handles Overflow for artifacts) --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                {/* --- Noise Texture (Subtle Grain) --- */}
                <div className="absolute inset-0 opacity-[0.03] z-0 mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

                {/* --- Organic Blobs --- */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-linear-to-bl from-[#E6F4EA] to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-60 z-0"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-linear-to-tr from-[#FDF0D5] to-transparent rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 opacity-50 z-0"></div>
            </div>

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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* Card 1: Vision (Large) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="md:col-span-2 bg-[#0F3D2E] rounded-[2.5rem] p-10 relative overflow-hidden group hover:shadow-xl transition-shadow duration-500 min-h-[320px] flex flex-col justify-between"
                        >
                            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-[#C6A15B] shadow-sm mb-6 border border-white/10">
                                    <Eye className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-heading font-bold text-white mb-4">Our Vision</h3>
                                    <p className="text-white/80 text-lg leading-relaxed max-w-2xl font-light">
                                        To transform every gray concrete corner into a thriving green sanctuary. We see a future where nature isn't just a destination you visit, but a daily companion in every home—purifying the air, calming the mind, and reminding us of our deep connection to the earth.
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
                            className="bg-[#2D2D2D] md:row-span-2 rounded-[2.5rem] p-10 relative overflow-hidden text-white flex flex-col justify-between min-h-[400px] lg:h-full"
                        >
                            <div className="absolute inset-0 bg-[url('/images/pattern-leaf.png')] opacity-5"></div>
                            <div className="relative z-10 h-full flex flex-col">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8 backdrop-blur-md">
                                    <Target className="w-7 h-7" />
                                </div>

                                <h3 className="text-3xl font-heading font-bold mb-6 text-[#FDFBF7]">The Mission</h3>
                                <ul className="space-y-6 text-white/70 flex-1">
                                    <li className="flex items-start gap-4">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#8BC34A] shrink-0"></span>
                                        <div>
                                            <span className="block font-bold text-white mb-1">Sustainable Sourcing</span>
                                            <span className="text-sm font-light">We work directly with ethical growers who prioritize soil health.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#8BC34A] shrink-0"></span>
                                        <div>
                                            <span className="block font-bold text-white mb-1">Plant Education</span>
                                            <span className="text-sm font-light">Democratizing botanical knowledge for every skill level.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#8BC34A] shrink-0"></span>
                                        <div>
                                            <span className="block font-bold text-white mb-1">Community Growth</span>
                                            <span className="text-sm font-light">Fostering a global network of passionate plant lovers.</span>
                                        </div>
                                    </li>
                                </ul>

                                <div className="mt-8 pt-8 border-t border-white/10">
                                    <p className="text-xs font-bold uppercase tracking-widest text-[#8BC34A]">Since 2020</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 3: Care (Light) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-[2.5rem] p-10 border border-[#0F3D2E]/5 shadow-sm hover:border-[#0F3D2E]/10 transition-colors duration-300 min-h-[280px] flex flex-col"
                        >
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="w-14 h-14 bg-[#F5F3EF] rounded-2xl flex items-center justify-center text-[#C6A15B] mb-6">
                                    <Heart className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-heading font-bold text-[#0F3D2E] mb-3">Our Promise</h3>
                                    <p className="text-[#0F3D2E]/70 text-sm leading-relaxed">
                                        Every plant is hand-inspected by our experts and shipped with eco-friendly care. We stand by our roots with a <strong>14-day happiness guarantee</strong>—if your plant doesn't thrive, we help you fix it or replace it.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 4: Light (Light) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-[#FDF0D5] rounded-[2.5rem] p-10 relative overflow-hidden min-h-[280px] flex flex-col"
                        >
                            <div className="absolute -right-8 -bottom-8 text-[#F9E2B2]">
                                <Sun size={150} />
                            </div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="w-14 h-14 bg-white/40 rounded-2xl flex items-center justify-center text-[#d97706] mb-6 backdrop-blur-sm">
                                    <Sun className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-heading font-bold text-[#0F3D2E] mb-3">Expert Light</h3>
                                    <p className="text-[#0F3D2E]/70 text-sm max-w-[200px] leading-relaxed">
                                        Not sure where to place your new friend? We guide you to the perfect spot for every leaf with personalized light analysis and care tips.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* --- Founders Section --- */}
                <div className="mb-32">
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block"
                        >
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#0F3D2E] mb-4">Our Founders</h2>
                            <div className="w-full h-1 bg-[#C6A15B] rounded-full transform scale-x-50"></div>
                        </motion.div>
                    </div>

                    <div className="space-y-32">
                        {/* Founder 1: Geetanjali Makhija */}
                        <div className="grid lg:grid-cols-12 gap-12 items-start">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="lg:col-span-5 sticky top-24 self-start"
                            >
                                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-[#0F3D2E]/20 group">
                                    <div className="absolute inset-0 bg-[#0F3D2E]/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                    <img src="/images/Geetanjali-Makhija.jpeg" alt="Geetanjali Makhija" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#FDF0D5] rounded-full -z-10 blur-xl opacity-60"></div>
                                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#E6F4EA] rounded-full -z-10 blur-xl opacity-60"></div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="lg:col-span-7 space-y-8"
                            >
                                <div>
                                    <h3 className="text-4xl font-heading font-bold text-[#0F3D2E] mb-2">Geetanjali Makhija</h3>
                                    <p className="text-[#C6A15B] font-serif italic text-xl">Co-Founder of Heartleaf Blooms</p>
                                </div>

                                <blockquote className="p-6 border-l-4 border-[#C6A15B] bg-white/50 backdrop-blur-sm rounded-r-xl italic text-[#0F3D2E]/80">
                                    "Dynamic professional with a unique trifecta of a Computer Engineering foundation, a Masters in Management and International Business from the UK, and extensive MNC corporate experience."
                                </blockquote>

                                <div className="space-y-6">
                                    <h4 className="font-heading font-bold text-[#0F3D2E] text-xl border-b border-[#0F3D2E]/10 pb-2">Professional Narrative</h4>

                                    <div className="grid gap-6">
                                        {[
                                            {
                                                title: "The Engineering Foundation",
                                                text: "My career began with a deep dive into Computer Engineering, where I developed a first-principles approach to problem-solving. This technical rigors allows me to communicate effectively with developers and architect scalable digital infrastructures that serve as the backbone of modern business."
                                            },
                                            {
                                                title: "The Global Management Perspective",
                                                text: "Earning my Masters in Management and International Business in the United Kingdom provided a global lens on organizational behaviour, international trade, and strategic finance. This period sharpened my ability to navigate diverse markets and understand the nuances of global consumer trends."
                                            },
                                            {
                                                title: "The Corporate Rigor (MNC Experience)",
                                                text: "With a proven track record across various functions in Multi-National Corporations, I have mastered the art of operational excellence. I bring the discipline of corporate governance, structured project management, and high-level stakeholder management to every venture I touch."
                                            },
                                            {
                                                title: "The Current Venture: Heartleaf Blooms",
                                                text: "I am currently channeling my technical expertise and business acumen into building a next-generation E-commerce venture. By automating operations and focusing on a Horticulture Market and value to customers simultaneous, I am scaling a brand that prioritizes both technological efficiency and market relevance."
                                            }
                                        ].map((item, idx) => (
                                            <div key={idx} className="group">
                                                <h5 className="font-bold text-[#0F3D2E] mb-1 group-hover:text-[#C6A15B] transition-colors">{idx + 1}. {item.title}</h5>
                                                <p className="text-sm text-[#0F3D2E]/70 leading-relaxed text-justify">{item.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-[#0F3D2E] text-white p-6 rounded-2xl space-y-4">
                                    <div>
                                        <p className="text-[#C6A15B] text-xs font-bold uppercase tracking-wider mb-1">Vision</p>
                                        <p className="font-light italic">Harmonizing technology with environmental stewardship to build ventures that promote ecological health.</p>
                                    </div>
                                    <div>
                                        <p className="text-[#C6A15B] text-xs font-bold uppercase tracking-wider mb-1">Mission</p>
                                        <p className="font-light italic">We strongly believe that the next industrial revolution must be a biological one. Technically horticulturalist can use AI to monitor soil, Plant health and promote urban greening.</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Founder 2: Bintu Kisan Pawar */}
                        <div className="grid lg:grid-cols-12 gap-12 items-start">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="lg:col-span-5 lg:order-2 sticky top-24 self-start"
                            >
                                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-[#0F3D2E]/20 group">
                                    <div className="absolute inset-0 bg-[#0F3D2E]/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                    <img src="/images/Bintu-Kisan-Pawar.jpeg" alt="Bintu Kisan Pawar" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#FDF0D5] rounded-full -z-10 blur-xl opacity-60"></div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="lg:col-span-7 lg:order-1 space-y-8"
                            >
                                <div>
                                    <h3 className="text-4xl font-heading font-bold text-[#0F3D2E] mb-2">Bintu Kisan Pawar</h3>
                                    <p className="text-[#C6A15B] font-serif italic text-xl">Director at Ramvatika Agribiotech LLP</p>
                                </div>

                                <div className="prose prose-stone text-[#0F3D2E]/80">
                                    <p className="lead border-l-4 border-[#8BC34A] pl-4 italic">
                                        "To use at best my knowledge of Agriculture & Management of almost 19 years in agriculture field & effective co-ordination of both to attain objective of perusing PhD to gain more knowledge in Agriculture and Floriculture field for betterment of Indian Farmers."
                                    </p>
                                </div>

                                {/* Accordion for Comprehensive Profile */}
                                <div className="space-y-4">
                                    <details className="group bg-white rounded-xl border border-[#0F3D2E]/10 overflow-hidden transition-all duration-300 open:shadow-md">
                                        <summary className="flex items-center justify-between p-4 cursor-pointer bg-[#F5F3EF] hover:bg-[#EBE8E0]">
                                            <span className="font-bold text-[#0F3D2E]">Key Ventures & Responsibilities</span>
                                            <span className="transform group-open:rotate-180 transition-transform duration-300 text-[#0F3D2E]">▼</span>
                                        </summary>
                                        <div className="p-6 space-y-6 bg-white max-h-[400px] overflow-y-auto custom-scrollbar overscroll-contain" data-lenis-prevent>
                                            {[
                                                {
                                                    role: "Director and Partner",
                                                    company: "Ramvatika Agribiotech LLP",
                                                    period: "Jan-2021 To Date",
                                                    desc: "Managing all operations of production and selling ornamental, Seasonal, Tissue culture and rooted cutting saplings. Producing and selling 30 million plants of more than 400 products. Target FY 2023-24 is ₹10 crore INR business."
                                                },
                                                {
                                                    role: "Director and Partner",
                                                    company: "RamRehyann Agrotech LLP",
                                                    period: "Feb-2022 To Date",
                                                    desc: "Heading as CEO. Managing operations of Geranium oil extraction project, plantation, contract farming, and international sales. Target for next 3 years business is > ₹50 crore INR."
                                                },
                                                {
                                                    role: "Director and Partner",
                                                    company: "Deccan Planet Agrotech LLP",
                                                    period: "Sept-2021 To Date",
                                                    desc: "Selling customized cocopeat, cocochips, Pots, Trays, Peatmoss, etc., with a ₹8 Crore INR target."
                                                },
                                                {
                                                    role: "Partner and CFO",
                                                    company: "Rehyann Nursery (NPL Group)",
                                                    period: "Jan-2021 To Date",
                                                    desc: "Handling commercial production and selling of pot plants in 20 Acres. Target: 1 million pots."
                                                },
                                                {
                                                    role: "Director",
                                                    company: "RamRehyann Aroma and Perfumes Pvt Ltd",
                                                    period: "Nov-2022 To Date",
                                                    desc: "Strategic planning, product development, and sales of essential oils. Own Distillation unit and GC Lab setup."
                                                },
                                                {
                                                    role: "Senior Production & Marketing Manager",
                                                    company: "Scientific Seedlings India Pvt. Ltd",
                                                    period: "Jan-2005 To Mar-2021",
                                                    desc: "Managed 30+ labors, dealer networks, and end-to-end customer relations. Production of vegetable products, flowers, and ornamental seedlings."
                                                }
                                            ].map((job, i) => (
                                                <div key={i} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                                                    <div className="flex justify-between items-baseline mb-1">
                                                        <h5 className="font-bold text-[#0F3D2E] text-sm">{job.role}</h5>
                                                        <span className="text-xs text-[#0F3D2E]/50 font-mono">{job.period}</span>
                                                    </div>
                                                    <p className="text-xs font-semibold text-[#8BC34A] mb-2">{job.company}</p>
                                                    <p className="text-xs text-[#0F3D2E]/70">{job.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </details>

                                    <details className="group bg-white rounded-xl border border-[#0F3D2E]/10 overflow-hidden transition-all duration-300 open:shadow-md">
                                        <summary className="flex items-center justify-between p-4 cursor-pointer bg-[#F5F3EF] hover:bg-[#EBE8E0]">
                                            <span className="font-bold text-[#0F3D2E]">Achievements & Milestones</span>
                                            <span className="transform group-open:rotate-180 transition-transform duration-300 text-[#0F3D2E]">▼</span>
                                        </summary>
                                        <div className="p-6 bg-white">
                                            <ul className="space-y-3">
                                                <li className="flex gap-3 text-sm text-[#0F3D2E]/80">
                                                    <span className="text-[#C6A15B] font-bold">•</span>
                                                    <span>Part of Ahmedabad Municipal Corporation team achieving <strong className="text-[#0F3D2E]">Guineas World Record</strong> for Longest Flower structure (221 mtr).</span>
                                                </li>
                                                <li className="flex gap-3 text-sm text-[#0F3D2E]/80">
                                                    <span className="text-[#C6A15B] font-bold">•</span>
                                                    <span>Ram Mandir Ayodhya Garbha Gruha and Sajja Decoration (Volunteer basis).</span>
                                                </li>
                                                <li className="flex gap-3 text-sm text-[#0F3D2E]/80">
                                                    <span className="text-[#C6A15B] font-bold">•</span>
                                                    <span>Successfully executed 22+ National and International projects/Flower Shows (Statue of Unity, International Jambooree, Daman Flower Show, etc.) in extremely short timelines.</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </details>

                                    <details className="group bg-white rounded-xl border border-[#0F3D2E]/10 overflow-hidden transition-all duration-300 open:shadow-md">
                                        <summary className="flex items-center justify-between p-4 cursor-pointer bg-[#F5F3EF] hover:bg-[#EBE8E0]">
                                            <span className="font-bold text-[#0F3D2E]">Education</span>
                                            <span className="transform group-open:rotate-180 transition-transform duration-300 text-[#0F3D2E]">▼</span>
                                        </summary>
                                        <div className="p-6 bg-white">
                                            <div className="mb-4">
                                                <h6 className="font-bold text-[#0F3D2E] text-sm">Masters degree in Botany</h6>
                                                <p className="text-xs text-[#0F3D2E]/60">Savitribai Phule Pune University (SPPU)</p>
                                                <p className="text-xs text-[#0F3D2E]/60">Specialization: Genetics and Plant breeding</p>
                                                <p className="text-xs text-[#0F3D2E]/60 mt-1">Grade: 7.22</p>
                                            </div>
                                        </div>
                                    </details>
                                </div>
                            </motion.div>
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
                
                /* Custom Scrollbar for Accordion */
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #0F3D2E;
                    border-radius: 4px;
                    opacity: 0.5;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #0A291F;
                }
            `}</style>
        </div>
    );
};

export default About;
