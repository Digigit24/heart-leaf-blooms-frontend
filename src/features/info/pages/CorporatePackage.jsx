import { motion } from 'framer-motion';
import { Leaf, Sun, Wind, Maximize, Palette, CheckCircle2, Droplets, ArrowRight, Layout, Flower, Armchair, Coffee, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- PPT CONTENT DATA ---

const CONSIDERATIONS = [
    {
        title: "Low Maintenance",
        desc: "Plants should thrive with minimal care (watering once or twice a week). Preference to hardy species that tolerate occasional neglect.",
        icon: Droplets
    },
    {
        title: "Light Conditions",
        desc: "Must adapt to low or medium light since many offices lack direct sunlight. Fluorescent-light–friendly plants.",
        icon: Sun
    },
    {
        title: "Air Quality & Health",
        desc: "Plants that improve air quality (e.g., snake plant, peace lily). Non-toxic options if pets or children visit the office.",
        icon: Wind
    },
    {
        title: "Space & Size",
        desc: "Suggesting Compact plants for desks and shelves. Larger statement plants for corners or reception areas.",
        icon: Maximize
    },
    {
        title: "Aesthetic & Mood",
        desc: "Using Green foliage for freshness and calm. Options with interesting shapes or variegated leaves for visual appeal.",
        icon: Palette
    },
    {
        title: "Practical Considerations",
        desc: "Avoiding plants with strong scents or pollen. Use decorative pots that match office design.",
        icon: CheckCircle2
    }
];

const PLANTER_TYPES = [
    {
        title: "Ceramic Pots",
        look: "Glossy, colorful, or patterned finishes.",
        pros: "Stylish, wide variety of designs, good for statement pieces.",
        cons: "Heavy, can break easily, usually no drainage unless designed.",
        image: "/assets/corporate/ceramic.png"
    },
    {
        title: "Terracotta Pots",
        look: "Classic earthy orange-brown clay.",
        pros: "Breathable material prevents overwatering, natural rustic charm.",
        cons: "Fragile, dries soil quickly (needs more frequent watering).",
        image: "/assets/corporate/terracotta.png"
    },
    {
        title: "Plastic Pots",
        look: "Lightweight, available in many colors and shapes.",
        pros: "Affordable, durable, easy to move, often with drainage holes.",
        cons: "Less elegant, may fade over time.",
        image: "/assets/corporate/plastic.png"
    },
    {
        title: "Metal Planters",
        look: "Sleek, modern, industrial vibe (stainless steel, brass, copper).",
        pros: "Durable, stylish, great for contemporary offices.",
        cons: "Can rust if not coated, may heat up roots in direct sun.",
        image: "/assets/corporate/metal.png"
    },
    {
        title: "Concrete / Stone",
        look: "Minimalist, modern, heavy-duty.",
        pros: "Very sturdy, excellent for large plants, chic aesthetic.",
        cons: "Very heavy, not easy to move.",
        image: "/assets/corporate/concrete.png"
    },
    {
        title: "Wooden Planters",
        look: "Warm, natural, blends with furniture.",
        pros: "Eco-friendly, rustic charm, good for larger decorative setups.",
        cons: "Needs lining to prevent rot, heavier than plastic.",
        image: "/assets/corporate/wooden.png"
    },
    {
        title: "Fabric Grow Bags",
        look: "Soft, casual, often in neutral colors.",
        pros: "Breathable, lightweight, easy to store.",
        cons: "Less formal, not ideal for office décor unless styled well.",
        image: "/assets/corporate/fabric.png"
    },
    {
        title: "Self-Watering Pots",
        look: "Modern, functional designs.",
        pros: "Perfect for busy offices, reduces risk of over/under watering.",
        cons: "Slightly more expensive, limited design variety.",
        image: "/assets/corporate/self-watering.png"
    }
];

const ZONES = [
    {
        title: "Reception Area",
        plants: "Fiddle Leaf Fig, Areca Palm, Rubber Plant",
        impact: "Creates a welcoming, professional first impression.",
        custom: "Branded pots with company logo or color scheme.",
        icon: Layout
    },
    {
        title: "Workstations",
        plants: "Snake Plant, ZZ Plant, Succulents, Pothos",
        impact: "Boosts focus, reduces stress, adds greenery without clutter.",
        custom: "Neutral-toned planters (white, grey, black) for a clean look.",
        icon: Leaf
    },
    {
        title: "Meeting Rooms",
        plants: "Peace Lily, Dracaena, Bamboo Palm",
        impact: "Enhances calmness and creativity during discussions.",
        custom: "Minimalist planters that match furniture finishes.",
        icon: Award
    },
    {
        title: "Breakout Zones",
        plants: "Hanging Pothos, Spider Plants, Herbs in grow bags",
        impact: "Relaxed, refreshing atmosphere for breaks.",
        custom: "Colorful or patterned pots to add vibrancy.",
        icon: Coffee
    },
    {
        title: "Executive Cabins",
        plants: "Bonsai trees, Orchids, Corner Dracaena",
        impact: "Adds a touch of elegance and status.",
        custom: "Premium ceramic or stone pots on side tables.",
        icon: Armchair
    },
    {
        title: "Corridors",
        plants: "Aglaonema, Vertical wall gardens",
        impact: "Utilizes transitional space, improves air flow.",
        custom: "Alternating floor planters, Accent lighting.",
        icon: Flower
    }
];

export default function CorporatePackage() {
    return (
        <div className="bg-[#FFFFFF] min-h-screen font-sans text-gray-800">

            {/* --- HERO SECTION --- */}
            <section className="relative h-[85vh] w-full flex items-center justify-center bg-[#FDFBF7] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
                        alt="Corporate Office Greenery"
                        className="w-full h-full object-cover transform scale-105 opacity-90"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto text-white mt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-2 px-6 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-sm font-bold uppercase tracking-[0.2em] mb-6">
                            Corporate Solutions
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight mb-6">
                            Transform Your <br /> <span className="text-[#C6A15B] italic font-serif">Workspace</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto mb-10 leading-relaxed">
                            We help you choose the perfect office décor considering maintenance, light, air quality, and aesthetics.
                        </p>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl inline-block max-w-md w-full">
                            <p className="text-sm uppercase tracking-widest text-white/70 mb-1">Corporate Package Starts At</p>
                            <div className="text-4xl md:text-5xl font-bold text-[#C6A15B] font-serif">
                                ₹29,999<span className="text-lg text-white font-sans font-normal ml-1">/setup</span>
                            </div>
                        </div>

                        <div className="mt-10">
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 bg-[#52e766] text-[#0F3D2E] text-lg font-bold px-10 py-4 rounded-full hover:bg-white transition-all shadow-xl hover:-translate-y-1"
                            >
                                Get a Free Consultation <ArrowRight size={20} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- CONSIDERATIONS (We Help You Choose) --- */}
            <section className="py-24 px-6 md:px-12 relative overflow-hidden">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <motion.img
                        src="/assets/corporate/selection-bg.png"
                        alt="Botanical Texture"
                        className="w-full h-full object-cover opacity-80"
                        initial={{ scale: 1.1 }}
                        animate={{
                            scale: [1.1, 1.25, 1.1],
                            y: [0, -15, 0],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <div className="absolute inset-0 bg-[#0F231C]/60 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0F231C] via-transparent to-[#0F231C]" />
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C6A15B]/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#56BA39]/5 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2 pointer-events-none z-0" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold !text-white mb-4">Selection Criteria</h2>
                        <div className="w-16 h-1 bg-[#C6A15B] mx-auto rounded-full mb-6" />
                        <p className="text-white/70 max-w-2xl mx-auto text-lg">
                            We analyze six key factors to ensure your green space is beautiful, sustainable, and functional.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
                        {CONSIDERATIONS.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div key={idx} className="flex gap-5 group items-start p-6 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
                                    <div className="shrink-0 w-14 h-14 rounded-full bg-[#C6A15B]/10 group-hover:bg-[#C6A15B] flex items-center justify-center transition-all duration-300 shadow-lg shadow-black/20 group-hover:shadow-[#C6A15B]/20">
                                        <Icon size={24} className="text-[#C6A15B] group-hover:text-[#0F2F24] transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold !text-white mb-2">{item.title}</h3>
                                        <p className="!text-gray-300 leading-relaxed text-sm md:text-[15px] group-hover:!text-white transition-colors">{item.desc}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* --- PLANTER OPTIONS (Grid Layout) --- */}
            <section className="py-24 px-6 md:px-12 bg-[#F9F9F9]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-[#C6A15B] font-bold uppercase tracking-widest text-xs">Aesthetics</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F3D2E] mt-3">Premium Planters & Pots</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                        {PLANTER_TYPES.map((pot, idx) => (
                            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group">
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={pot.image}
                                        alt={pot.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-lg font-bold text-[#0F3D2E] mb-3 border-b border-gray-100 pb-2">{pot.title}</h3>
                                    <div className="space-y-3 text-sm flex-1">
                                        <div>
                                            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wide">Look</span>
                                            <p className="text-gray-700">{pot.look}</p>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-green-600 uppercase tracking-wide">Pros</span>
                                            <p className="text-gray-600 leading-snug">{pot.pros}</p>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-red-500 uppercase tracking-wide">Cons</span>
                                            <p className="text-gray-500 leading-snug">{pot.cons}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CUSTOMIZATION ZONES (Premium Interactive Section) --- */}
            <section className="py-24 px-6 md:px-12 bg-[#F5F7F6]">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row justify-between items-end mb-16"
                    >
                        <div>
                            <span className="text-[#C6A15B] font-bold uppercase tracking-widest text-xs">Strategic Placement</span>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F3D2E] mt-3">Curated Green Zones</h2>
                            <p className="text-gray-500 mt-4 text-lg max-w-xl">
                                We treat every corner of your office as a unique ecosystem, selecting species that align with the specific energy and function of the space.
                            </p>
                        </div>
                        <Link to="/contact" className="hidden md:flex items-center gap-2 text-[#0F3D2E] font-bold border-b border-[#0F3D2E] pb-1 hover:text-[#C6A15B] hover:border-[#C6A15B] transition-all">
                            Start Your Planning <ArrowRight size={18} />
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ZONES.map((zone, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className="group relative bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-linear-to-br from-[#EAF6E6]/0 via-[#EAF6E6]/0 to-[#EAF6E6] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-[#0F3D2E]/5 group-hover:bg-[#0F3D2E] text-[#0F3D2E] group-hover:text-[#C6A15B] flex items-center justify-center transition-all duration-300">
                                            <zone.icon size={24} />
                                        </div>
                                        <span className="text-4xl font-serif font-bold text-gray-100 group-hover:text-[#C6A15B]/20 transition-colors">0{idx + 1}</span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-[#0F3D2E] mb-4 group-hover:translate-x-1 transition-transform">{zone.title}</h3>

                                    <div className="space-y-4">
                                        <div className="bg-[#FAF9F6] p-4 rounded-lg group-hover:bg-white/80 transition-colors">
                                            <span className="text-xs font-bold text-[#C6A15B] uppercase tracking-wider mb-1 block">Impact</span>
                                            <p className="text-sm text-gray-600 leading-relaxed">{zone.impact}</p>
                                        </div>

                                        <div>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Ideal Flora</span>
                                            <div className="flex flex-wrap gap-2">
                                                {zone.plants.split(',').map((plant, i) => (
                                                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md border border-gray-200">
                                                        {plant.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100">
                                            <div className="flex items-start gap-2">
                                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
                                                <p className="text-xs text-gray-500 italic">
                                                    <span className="font-bold text-gray-700 not-italic mr-1">Design Tip:</span>
                                                    {zone.custom}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Link to="/contact" className="inline-flex items-center gap-2 text-[#0F3D2E] font-bold border-b border-[#0F3D2E] pb-1">
                            Start Your Planning <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA (Creative Bento Grid) --- */}
            <section className="py-24 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-left mb-12">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-7xl font-serif font-bold text-[#0F3D2E] leading-[0.9]"
                        >
                            Green Your <br /> <span className="text-[#C6A15B]">Office.</span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[500px]">

                        {/* 1. Main Action Card (Large) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 0.99 }}
                            transition={{ duration: 0.4 }}
                            className="md:col-span-8 relative rounded-[2rem] overflow-hidden bg-[#0F3D2E] text-white p-6 md:p-12 flex flex-col justify-between group cursor-pointer shadow-2xl"
                        >
                            <Link to="/contact" className="absolute inset-0 z-20" />
                            <div className="absolute inset-0 z-0">
                                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301" className="w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700" alt="Office" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D2E] via-transparent to-transparent" />
                            </div>

                            <div className="relative z-10 flex justify-between items-start">
                                <div className="bg-[#C6A15B] text-[#0F3D2E] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-lg">Most Popular</div>
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-[#C6A15B] group-hover:text-[#0F3D2E] transition-all duration-300">
                                    <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                </div>
                            </div>

                            <div className="relative z-10 mt-20 md:mt-0">
                                <h3 className="text-3xl md:text-5xl font-serif font-medium mb-4">Request a <br /> Site Visit</h3>
                                <p className="text-white/80 max-w-sm text-lg leading-relaxed border-l-2 border-[#C6A15B] pl-4">
                                    Our experts will measure your light, space, and flow to propose a custom greenprint for free.
                                </p>
                            </div>
                        </motion.div>

                        {/* 2. Secondary Column */}
                        <div className="md:col-span-4 flex flex-col gap-6">

                            {/* Top: Download Brochure */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                whileHover={{ y: -5 }}
                                transition={{ delay: 0.1 }}
                                className="flex-1 bg-[#F5F7F6] rounded-[2rem] p-8 flex flex-col justify-center relative border border-gray-100 group cursor-pointer shadow-lg hover:shadow-xl transition-all"
                            >
                                <Link to="/contact" className="absolute inset-0 z-20" />
                                <div className="absolute top-8 right-8 text-[#C6A15B]">
                                    <ArrowRight size={24} className="-rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </div>
                                <div className="w-12 h-12 bg-[#0F3D2E] rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                                    <Layout size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#0F3D2E] mb-1">Catalogue '26</h3>
                                <p className="text-gray-500 text-sm">Download our complete corporate collection guide PDF.</p>
                            </motion.div>

                            {/* Bottom: Quick Contact */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                whileHover={{ y: -5 }}
                                transition={{ delay: 0.2 }}
                                className="flex-1 bg-[#C6A15B] rounded-[2rem] p-8 flex flex-col justify-center text-[#0F3D2E] relative overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all"
                            >
                                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Leaf size={120} />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-1 flex items-center gap-2"><CheckCircle2 size={18} /> Expert Support</h3>
                                    <p className="text-[#0F3D2E]/80 text-xs mb-4">Immediate assistance for bulk orders</p>
                                    <div className="text-3xl font-serif font-bold tracking-tight group-hover:scale-105 transition-transform origin-left"> +91 9011600622</div>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
