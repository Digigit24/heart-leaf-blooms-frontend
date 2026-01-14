import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

// Refined, Authentic Indian Reviews
const testimonials = [
    {
        id: 1,
        name: 'Priya Sharma',
        role: 'Home Maker, Mumbai',
        image: '/images/avatar-1.png',
        content: "Honestly, I was a bit worried about ordering plants online because of the heat in Mumbai, but the packaging was just too good! My Peace Lily arrived fresh and valid. It’s been 2 months now and it's flowering beautifully.",
        rating: 5,
    },
    {
        id: 2,
        name: 'Rahul Verma',
        role: 'Software Engineer, Bangalore',
        image: '/images/avatar-2.png',
        content: "The quality is unmatched. I’ve bought from local nurseries in Indiranagar before, but Heart Leaf Blooms has much healthier soil mixes. Their care guide for the Snake Plant was actually helpful for a beginner like me.",
        rating: 5,
    },
    {
        id: 3,
        name: 'Ananya Gupta',
        role: 'Interior Designer, Delhi',
        image: '/images/avatar-3.png',
        content: "Used their Areca Palms for a client's balcony makeover in Vasant Kunj. The consistent height and lush volume of every single plant was impressive. My client is very happy, and so am I!",
        rating: 5,
    },
    {
        id: 4,
        name: 'Dr. Arjun Mehta',
        role: 'Ayurveda Practitioner, Pune',
        image: '/images/avatar-1.png',
        content: "I needed specific medicinal herbs for my home garden. Their Tulsi and Aloe Vera plants are organic and very potent. You can feel the purity. Fast delivery to Pune as well.",
        rating: 5,
    },
    {
        id: 5,
        name: 'Sneha Reddy',
        role: 'Architect, Hyderabad',
        image: '/images/avatar-2.png',
        content: "Finally, a website that delivers what they show. The pot quality is premium, unlike the cheap plastic ones you usually get. Looks very elegant in my living room corner.",
        rating: 5,
    }
];

export default function TestimonialSection() {
    // Parallax Effect Hooks
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

    return (
        <section ref={containerRef} className="py-24 md:py-32 bg-[#FDFCF8] relative overflow-hidden isolate">

            {/* 🌿 Decorative Background Artifacts (Hibiscus & Jasmine) */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                {/* Top Right Hibiscus */}
                <motion.div
                    style={{ y: y1 }}
                    className="absolute -top-20 -right-20 w-[500px] h-[500px] opacity-[0.12] mix-blend-multiply"
                >
                    <img
                        src="/images/water-hibiscus.png"
                        alt=""
                        className="w-full h-full object-contain"
                        style={{ transform: 'translateY(-18.5033px) scale(1.8) rotate(92deg)' }}
                    />
                </motion.div>

                {/* Top Left Jasmine */}
                <motion.div
                    style={{ y: y2 }}
                    className="absolute -top-20 -left-20 w-[600px] h-[600px] opacity-[0.12] mix-blend-multiply"
                >
                    <img
                        src="/images/water-jasmine.png"
                        alt=""
                        className="w-full h-full object-contain"
                        style={{ transform: 'translateY(18.5033px) scale(1.6) rotate(262deg)' }}
                    />
                </motion.div>
            </div>


            <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

                {/* Header - Centered & Premium start */}
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                    <div className="flex items-center justify-center gap-4 opacity-80">
                        <span className="h-[1px] w-12 bg-brand-dark/30"></span>
                        <span className="text-brand-dark font-bold tracking-[0.2em] text-xs uppercase font-body">Community Love</span>
                        <span className="h-[1px] w-12 bg-brand-dark/30"></span>
                    </div>

                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark leading-tight">
                        Stories from Indian <br />
                        <span className="italic font-serif text-brand">Homes & Gardens</span>
                    </h2>
                    <p className="text-text-secondary text-lg font-light leading-relaxed font-body max-w-2xl mx-auto">
                        Real experiences from plant parents across the country who have welcomed nature into their lives.
                    </p>
                </div>
                {/* Header end */}

                {/* Marquee Wrapper - Review Cards */}
                <div className="relative w-full overflow-visible mask-linear-fade group/marquee py-4">
                    <style>
                        {`
                        @keyframes marquee {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee {
                            animation: marquee 60s linear infinite;
                        }
                        .animate-marquee:hover {
                            animation-play-state: paused;
                        }
                        `}
                    </style>
                    <div className="flex gap-8 w-max animate-marquee pl-4">
                        {/* Duplicate for Loop */}
                        {[...testimonials, ...testimonials].map((testimonial, index) => (
                            <div
                                key={`${testimonial.id}-${index}`}
                                className="w-[400px] md:w-[500px] bg-white p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E6E8E3] transition-all duration-300 hover:shadow-[0_20px_40px_rgb(86,186,57,0.08)] hover:-translate-y-1 group relative flex flex-col justify-between"
                            >
                                <Quote className="absolute top-8 right-8 w-10 h-10 text-brand-soft/50 fill-current" />

                                <div className="space-y-6">
                                    {/* Rating */}
                                    <div className="flex items-center gap-1">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-accent-clay text-accent-clay" />
                                        ))}
                                    </div>

                                    {/* Content - More "Review-like", less "Article-like" */}
                                    <blockquote className="relative">
                                        <p className="text-brand-dark text-[1.05rem] leading-[1.7] font-body font-normal opacity-90">
                                            "{testimonial.content}"
                                        </p>
                                    </blockquote>
                                </div>

                                {/* Author Info */}
                                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-dashed border-gray-100">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 shadow-inner bg-gray-50">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.src = '/images/placeholder-avatar.png'; }}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-heading font-bold text-brand-dark text-lg leading-tight">{testimonial.name}</h4>
                                        <p className="text-xs text-text-muted font-medium uppercase tracking-wider mt-0.5">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
