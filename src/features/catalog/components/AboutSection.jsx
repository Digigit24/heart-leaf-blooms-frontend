import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutSection() {
    return (
        <section className="py-20 md:py-28 bg-surface overflow-hidden">
            <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                    {/* Image Side */}
                    <div className="w-full md:w-1/2 relative group">
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
                            <img
                                src="/images/about-us.png"
                                alt="Florist arranging plants"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                        </div>

                        {/* decorative elements */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#F1EFE7] rounded-full z-[-1]" />
                        <div className="absolute -top-6 -left-6 w-24 h-24 border border-primary/20 rounded-full z-[-1]" />

                        {/* Experience Badge */}
                        <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md p-6 rounded-xl shadow-xl max-w-[200px]">
                            <p className="font-heading font-bold text-4xl text-primary mb-1">15+</p>
                            <p className="text-sm text-text/80 font-medium">Years of cultivating nature's beauty</p>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full md:w-1/2 space-y-8">
                        <div className="space-y-4">
                            <span className="text-accent text-sm font-bold tracking-widest uppercase">Our Story</span>
                            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary leading-tight">
                                Growing Green Sanctuaries Since 2010
                            </h2>
                        </div>

                        <p className="text-lg text-muted font-light leading-relaxed">
                            At Heart Leaf Blooms, we believe that bringing nature indoors transforms not heavily just your space, but your well-being. What started as a small local nursery has bloomed into a passion-driven community dedicated to connecting people with the perfect plants for their unique lifestyles.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-text mb-1">Sustainably Sourced</h4>
                                    <p className="text-sm text-muted">We partner with eco-conscious growers who prioritize the planet.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-text mb-1">Expertly Curated</h4>
                                    <p className="text-sm text-muted">Every plant is hand-selected for health, beauty, and longevity.</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Link
                                to="/about"
                                className="inline-flex items-center gap-2 text-primary font-bold border-b-2 border-accent pb-1 hover:text-accent transition-colors"
                            >
                                Read More About Us <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
