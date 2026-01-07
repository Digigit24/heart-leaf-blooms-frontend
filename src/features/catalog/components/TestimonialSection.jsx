import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Sarah Mitchell',
        role: 'Interior Designer',
        image: '/images/avatar-1.png',
        content: "Heart Leaf Blooms has completely transformed my design projects. The quality of their plants is unmatched, and they arrive in perfect condition every single time. It's my go-to for all things green.",
        rating: 5,
    },
    {
        id: 2,
        name: 'James Carter',
        role: 'Plant Enthusiast',
        image: '/images/avatar-2.png',
        content: "I was skeptical about ordering plants online, but the packaging was incredible. My Fiddle Leaf Fig is thriving! The care guides included were a thoughtful touch that really helped.",
        rating: 5,
    },
    {
        id: 3,
        name: 'Emily Chen',
        role: 'Urban Gardener',
        image: '/images/avatar-3.png',
        content: "The selection of exotic plants is amazing. I found rare species here that I couldn't find anywhere else. Customer service is top-notch and super responsive. Highly recommend!",
        rating: 5,
    },
    {
        id: 4,
        name: 'Michael Ross',
        role: 'Home Stylist',
        image: '/images/avatar-1.png',
        content: "Absolute perfection. The plants are lush, healthy, and larger than I expected. The shipping was fast, and the sustainable packaging is a huge plus for me.",
        rating: 5,
    },
    {
        id: 5,
        name: 'Linda Wei',
        role: 'Botanist',
        image: '/images/avatar-2.png',
        content: "I'm impressed by the root health of these plants. It's rare to see such vigorous growth from nursery stock. Truly professional quality.",
        rating: 5,
    }
];

export default function TestimonialSection() {
    return (
        <section className="py-24 bg-surface-2 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-br-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-tl-full blur-3xl opacity-50" />

            <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-accent text-sm font-bold tracking-widest uppercase block mb-3">Community Love</span>
                    <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-6">What Our Customers Say</h2>
                    <p className="text-muted text-lg font-light">Join thousands of happy plant parents who have found their perfect green companions with us.</p>
                </div>

                {/* Marquee Wrapper */}
                <div className="relative w-full overflow-hidden mask-linear-fade group/marquee">
                    <style>
                        {`
                        @keyframes marquee {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee {
                            animation: marquee 40s linear infinite;
                        }
                        .animate-marquee:hover {
                            animation-play-state: paused;
                        }
                        `}
                    </style>
                    <div
                        className="flex gap-8 w-max animate-marquee"
                    >
                        {/* Duplicate Key workaround for seamless loop - rendering list twice */}
                        {[...testimonials, ...testimonials].map((testimonial, index) => (
                            <div
                                key={`${testimonial.id}-${index}`}
                                className="w-[350px] md:w-[400px] bg-surface p-8 rounded-2xl shadow-sm border border-transparent hover:border-primary/10 hover:shadow-xl transition-all duration-300 group shrink-0"
                            >
                                <div className="flex items-center gap-1 text-[#C6A15B] mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>

                                <div className="mb-6 relative">
                                    <p className="text-text/80 leading-relaxed relative z-10 italic">"{testimonial.content}"</p>
                                </div>

                                <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-offset-2 ring-primary/20 group-hover:ring-primary transition-all">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-heading font-bold text-primary">{testimonial.name}</h4>
                                        <p className="text-xs text-muted font-medium uppercase tracking-wider">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Horizontal Fade Masks */}
                    <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-surface-2 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-surface-2 to-transparent z-10 pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
}
