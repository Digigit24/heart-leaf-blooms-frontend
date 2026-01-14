import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/common/ProductCard';
import { useProducts } from '@/features/catalog/hooks/useProducts';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function TrendingProducts() {
    const { data: products = [], isLoading: loading } = useProducts();
    const featuredProducts = products.filter(product => product.isFeatured).slice(0, 4);

    return (
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#FDFCF8] to-[#F4F7F3]">
            {/* 🌿 Decorative Background Artifacts */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Top Left Fern - Larger & More Visible */}
                <motion.div
                    animate={{ rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-32 -left-32 w-[600px] h-[600px] opacity-[0.15] mix-blend-multiply"
                >
                    <img src="/images/water-fern.png" alt="" className="w-full h-full object-contain" />
                </motion.div>

                {/* Bottom Right Eucalyptus - Larger & More Visible */}
                <motion.div
                    animate={{ rotate: [0, -5, 0], y: [0, 20, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-32 -right-20 w-[700px] h-[800px] opacity-[0.15] mix-blend-multiply"
                >
                    <img src="/images/water-eucalyptus.png" alt="" className="w-full h-full object-contain" />
                </motion.div>

                {/* Existing Subtle Leaf (Top Right) */}
                <div className="absolute -top-32 -right-32 w-[600px] h-[600px] pointer-events-none opacity-[0.03] rotate-12">
                    <img src="/images/water-leaf.png" alt="" className="w-full h-full object-contain" />
                </div>
            </div>

            <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
                    <div className="space-y-6 max-w-2xl relative">
                        {/* Decorative Pill Tag */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft/80 border border-brand/10 text-brand-dark text-xs font-bold tracking-widest uppercase">
                            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                            Shop Our Collections
                        </div>

                        <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-brand-dark leading-[0.9]">
                            Trending <br />
                            <span className="font-serif italic text-brand opacity-90">Favorites</span>
                        </h2>

                        <p className="text-text-secondary text-lg font-body font-light max-w-lg leading-relaxed pl-1">
                            Hand-picked selections that are currently blooming in hearts and homes across the country.
                        </p>
                    </div>

                    <div className="pb-2">
                        <Link
                            to="/products"
                            className="group flex items-center gap-3 px-8 py-4 bg-white border border-brand/20 rounded-full shadow-sm hover:shadow-lg hover:border-brand/40 transition-all duration-300"
                        >
                            <span className="font-heading font-bold text-brand-dark text-sm tracking-wide uppercase">View Full Collection</span>
                            <div className="w-8 h-8 rounded-full bg-brand-soft flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors">
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-[2rem] h-[450px] animate-pulse border border-brand/5 shadow-sm"></div>
                        ))
                    ) : (
                        featuredProducts.length > 0 ? (
                            featuredProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-24 bg-white/60 rounded-[3rem] border border-dashed border-brand/20">
                                <div className="w-16 h-16 rounded-full bg-brand-soft/50 flex items-center justify-center mb-4">
                                    <Sparkles className="w-8 h-8 text-brand" />
                                </div>
                                <h3 className="font-heading text-2xl text-brand-dark font-bold">Coming Soon</h3>
                                <p className="text-text-muted mt-2">Our curators are selecting the best blooms for you.</p>
                            </div>
                        )
                    )}
                </div>

                {/* Mobile Button (Duplicate for better UX on small screens) */}
                <div className="mt-12 text-center md:hidden">
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 text-brand-dark font-bold border-b border-brand-dark pb-0.5"
                    >
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    );
}
