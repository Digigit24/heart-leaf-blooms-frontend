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
];

export default function TestimonialSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="py-24 bg-surface-2 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-br-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-tl-full blur-3xl" />

            <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-accent text-sm font-bold tracking-widest uppercase block mb-3">Community Love</span>
                    <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-6">What Our Customers Say</h2>
                    <p className="text-muted text-lg font-light">Join thousands of happy plant parents who have found their perfect green companions with us.</p>
                </div>

                <div
                    ref={ref}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                            className="bg-surface p-8 rounded-2xl shadow-sm border border-transparent hover:border-primary/10 hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="flex items-center gap-1 text-[#C6A15B] mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>

                            <div className="mb-6 relative">
                                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/10 transform -scale-x-100" />
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
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
