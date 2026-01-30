import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/common/ProductCard';
import { useProducts } from '@/features/catalog/hooks/useProducts';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TrendingProducts() {
    const { data: products = [], isLoading: loading } = useProducts();
    const featuredProducts = products.filter(product => product.isFeatured);
    const scrollContainerRef = useRef(null);
    const sectionRef = useRef(null);

    // Parallax Logic
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const yFern = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const yEucalyptus = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const rotateFern = useTransform(scrollYProgress, [0, 1], [0, 10]);
    const opacityArtifacts = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.15, 0.15, 0]);


    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { current: container } = scrollContainerRef;
            // Dynamic scroll amount: Card Width + Gap (16px)
            const cardWidth = container.firstElementChild?.getBoundingClientRect().width || 300;
            const scrollAmount = cardWidth + 16;

            const maxScrollLeft = container.scrollWidth - container.clientWidth;
            // Buffer to detect edge
            const isAtEnd = container.scrollLeft >= maxScrollLeft - 10;
            const isAtStart = container.scrollLeft <= 10;

            if (direction === 'left') {
                if (isAtStart) {
                    container.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
            } else {
                if (isAtEnd) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }
        }
    };

    return (
        <section ref={sectionRef} className="py-12 md:py-24 relative overflow-hidden bg-gradient-to-b from-[#FDFCF8] to-[#F4F7F3]">
            {/* 🌿 Decorative Background Artifacts with PARALLAX */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Top Left Fern - Parallax Move Up */}
                <motion.div
                    style={{ y: yFern, rotate: rotateFern, opacity: opacityArtifacts }}
                    className="absolute -top-16 -left-16 md:-top-32 md:-left-32 w-[250px] h-[250px] md:w-[600px] md:h-[600px] mix-blend-multiply transition-transform duration-75 ease-out will-change-transform"
                >
                    <img src="/images/water-fern.png" alt="" className="w-full h-full object-contain" />
                </motion.div>

                {/* Bottom Right Eucalyptus - Parallax Move Down */}
                <motion.div
                    style={{ y: yEucalyptus, opacity: opacityArtifacts }}
                    className="absolute -bottom-16 -right-10 md:-bottom-32 md:-right-20 w-[280px] h-[300px] md:w-[700px] md:h-[800px] mix-blend-multiply transition-transform duration-75 ease-out will-change-transform"
                >
                    <img src="/images/water-eucalyptus.png" alt="" className="w-full h-full object-contain" />
                </motion.div>

                {/* Existing Subtle Leaf (Top Right) - Constant Rotation */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-20 -right-20 md:-top-32 md:-right-32 w-[250px] h-[250px] md:w-[600px] md:h-[600px] pointer-events-none opacity-[0.03]"
                >
                    <img src="/images/water-leaf.png" alt="" className="w-full h-full object-contain" />
                </motion.div>
            </div>

            <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 mb-10 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="space-y-4 md:space-y-6 max-w-2xl relative"
                    >
                        {/* Decorative Pill Tag */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 rounded-full bg-brand-soft/80 border border-brand/10 text-brand-dark text-[10px] md:text-xs font-bold tracking-widest uppercase">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand animate-pulse" />
                            Shop Our Collections
                        </div>

                        <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-brand-dark leading-[0.9]">
                            Trending <br />
                            <span className="font-serif italic text-brand opacity-90">Favorites</span>
                        </h2>

                        <p className="text-text-secondary text-base md:text-lg font-body font-light max-w-lg leading-relaxed pl-1">
                            Hand-picked selections that are currently blooming in hearts and homes across the country.
                        </p>
                    </motion.div>

                    {/* Desktop Navigation Buttons */}
                    <div className="hidden md:flex items-center gap-4 pb-2">
                        <button
                            onClick={() => scroll('left')}
                            className="w-12 h-12 rounded-full border border-brand/20 flex items-center justify-center text-brand-dark hover:bg-brand hover:text-white transition-all duration-300 active:scale-95"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-12 h-12 rounded-full border border-brand/20 flex items-center justify-center text-brand-dark hover:bg-brand hover:text-white transition-all duration-300 active:scale-95"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                        <Link
                            to="/products"
                            className="ml-4 group flex items-center gap-3 px-8 py-4 bg-white border border-brand/20 rounded-full shadow-sm hover:shadow-lg hover:border-brand/40 transition-all duration-300 active:scale-95"
                        >
                            <span className="font-heading font-bold text-brand-dark text-sm tracking-wide uppercase">View Full Collection</span>
                            <div className="w-8 h-8 rounded-full bg-brand-soft flex items-center justify-center group-hover:bg-brand transition-colors">
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Product Carousel */}
                <div className="relative group/carousel">
                    {/* Mobile Navigation Buttons (Absolute) */}
                    <div className="md:hidden absolute top-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none z-20 px-0">
                        <button
                            onClick={() => scroll('left')}
                            className="pointer-events-auto w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-brand/10 shadow-lg flex items-center justify-center text-brand-dark -ml-3 active:scale-90 transition-transform"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="pointer-events-auto w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-brand/10 shadow-lg flex items-center justify-center text-brand-dark -mr-3 active:scale-90 transition-transform"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-4 md:gap-8 pb-8 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {loading ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="w-[160px] min-w-[160px] md:w-auto md:min-w-[300px] flex-shrink-0 bg-white rounded-[2rem] h-[250px] md:h-[400px] animate-pulse border border-brand/5 shadow-sm snap-center"></div>
                            ))
                        ) : (
                            featuredProducts.length > 0 ? (
                                featuredProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        className="w-[160px] min-w-[160px] sm:min-w-[260px] md:min-w-[calc(25%-1.5rem)] flex-shrink-0 snap-center"
                                    >
                                        <ProductCard product={product} hideAddToCart={true} />
                                    </motion.div>
                                ))
                            ) : (
                                <div className="w-full flex flex-col items-center justify-center py-24 bg-white/60 rounded-[3rem] border border-dashed border-brand/20">
                                    <div className="w-16 h-16 rounded-full bg-brand-soft/50 flex items-center justify-center mb-4">
                                        <Sparkles className="w-8 h-8 text-brand" />
                                    </div>
                                    <h3 className="font-heading text-2xl text-brand-dark font-bold">Coming Soon</h3>
                                    <p className="text-text-muted mt-2">Our curators are selecting the best blooms for you.</p>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Mobile View All Link */}
                <div className="mt-4 text-center md:hidden">
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 text-brand-dark font-bold text-sm border-b border-brand-dark pb-0.5"
                    >
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    );
}
