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
            <section className="py-24 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0F3D2E] mb-4">Selection Criteria</h2>
                        <div className="w-16 h-1 bg-[#C6A15B] mx-auto rounded-full mb-6" />
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                            We analyze six key factors to ensure your green space is beautiful, sustainable, and functional.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {CONSIDERATIONS.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div key={idx} className="flex gap-5 group items-start">
                                    <div className="shrink-0 w-14 h-14 rounded-full bg-[#F5F5F5] group-hover:bg-[#0F3D2E] flex items-center justify-center transition-colors duration-300">
                                        <Icon size={24} className="text-[#0F3D2E] group-hover:text-[#C6A15B] transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0F3D2E] mb-2">{item.title}</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm md:text-[15px]">{item.desc}</p>
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

            {/* --- CUSTOMIZATION ZONES (Timeline / Vertical List Style) --- */}
            <section className="py-24 px-6 md:px-12 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-2 border-gray-100 pb-6">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F3D2E]">Customized Zones</h2>
                            <p className="text-gray-500 mt-2 text-lg">Tailored plantscapes for every corner of your office.</p>
                        </div>
                        <Link to="/contact" className="hidden md:inline-block px-6 py-3 bg-[#0F3D2E] text-white rounded-lg font-bold hover:bg-[#1C5B45] transition-colors">
                            Get Your Plan
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        {ZONES.map((zone, idx) => (
                            <div key={idx} className="flex gap-6">
                                <div className="hidden sm:flex shrink-0 w-16 h-16 rounded-2xl bg-[#EAF6E6] text-[#0F3D2E] items-center justify-center">
                                    <span className="font-serif font-bold text-xl opacity-40">0{idx + 1}</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <zone.icon size={20} className="text-[#C6A15B] sm:hidden" />
                                        <h3 className="text-2xl font-bold text-[#0F3D2E]">{zone.title}</h3>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 text-sm bg-[#F9F9F9] p-5 rounded-xl border border-gray-100 hover:border-[#C6A15B]/30 transition-colors">
                                        <div>
                                            <span className="font-bold text-[#0F3D2E] block mb-1">Recommended Plants:</span>
                                            <p className="text-gray-600">{zone.plants}</p>
                                        </div>
                                        <div>
                                            <span className="font-bold text-[#0F3D2E] block mb-1">Impact:</span>
                                            <p className="text-gray-600">{zone.impact}</p>
                                        </div>
                                        <div>
                                            <span className="font-bold text-[#0F3D2E] block mb-1">Customization:</span>
                                            <p className="text-gray-600 italic">"{zone.custom}"</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="relative py-24 bg-[#0F3D2E] text-white text-center px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20" />
                <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                    <h2 className="text-4xl md:text-5xl font-serif font-medium">Ready to Green Your Office?</h2>
                    <p className="text-xl text-white/80">
                        Join 100+ corporates who trust Heart Leaf Blooms for their workspace transformation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Link to="/contact" className="px-10 py-4 bg-[#C6A15B] hover:bg-[#D4AF37] text-[#0F3D2E] font-bold rounded-lg transition-transform hover:scale-105 shadow-xl">
                            Request Corporate Quote
                        </Link>
                        <a href="tel:+919876543210" className="px-10 py-4 border border-white/30 hover:bg-white/10 rounded-lg font-bold transition-colors">
                            Call Our Experts
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
}
