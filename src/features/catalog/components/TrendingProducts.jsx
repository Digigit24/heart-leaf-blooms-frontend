import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/common/ProductCard';
import { cn } from '@/utils/cn';

// Mock Data
const ALL_PRODUCTS = [
    // Featured
    { id: 101, name: 'Monstera Deliciosa', price: 45.00, rating: 5, reviews: 128, image: '/images/hero-1.png', category: 'featured', tag: 'Top Pick' },
    { id: 102, name: 'Fiddle Leaf Fig', price: 65.00, rating: 4, reviews: 85, image: '/images/hero-3.png', category: 'featured', tag: 'Popular' },
    { id: 103, name: 'Rubber Plant', price: 42.00, rating: 5, reviews: 150, image: '/images/hero-2.png', category: 'featured' },
    { id: 104, name: 'Golden Pothos', price: 25.00, rating: 5, reviews: 200, image: '/images/hero-1.png', category: 'featured' },

    // Latest
    { id: 201, name: 'Bird of Paradise', price: 75.00, rating: 4, reviews: 64, image: '/images/hero-3.png', category: 'latest', tag: 'New' },
    { id: 202, name: 'Calathea Orbifolia', price: 38.00, rating: 4, reviews: 32, image: '/images/hero-2.png', category: 'latest', tag: 'New' },
    { id: 203, name: 'String of Pearls', price: 22.00, rating: 5, reviews: 45, image: '/images/hero-1.png', category: 'latest' },
    { id: 204, name: 'Hoya Kerrii', price: 18.00, rating: 4, reviews: 20, image: '/images/hero-2.png', category: 'latest' },

    // Bestseller
    { id: 301, name: 'Peace Lily', price: 35.00, rating: 5, reviews: 210, image: '/images/hero-2.png', category: 'bestseller', tag: 'Best Seller' },
    { id: 302, name: 'Pothos Marble', price: 22.00, rating: 5, reviews: 312, image: '/images/hero-1.png', category: 'bestseller' },
    { id: 303, name: 'Aloe Vera', price: 15.00, rating: 5, reviews: 500, image: '/images/hero-3.png', category: 'bestseller' },
    { id: 304, name: 'Snake Plant', price: 28.00, rating: 4, reviews: 96, image: '/images/hero-2.png', category: 'bestseller' },

    // Special
    { id: 401, name: 'ZZ Plant', price: 38.00, rating: 5, reviews: 180, image: '/images/hero-1.png', category: 'special', tag: '-15%' },
    { id: 402, name: 'Jade Plant', price: 32.00, rating: 4, reviews: 110, image: '/images/hero-3.png', category: 'special', tag: 'Deal' },
    { id: 403, name: 'Bamboo Palm', price: 55.00, originalPrice: 70.00, rating: 4, reviews: 75, image: '/images/hero-2.png', category: 'special', tag: '-20%' },
    { id: 404, name: 'Majesty Palm', price: 60.00, originalPrice: 85.00, rating: 3, reviews: 50, image: '/images/hero-1.png', category: 'special', tag: 'Sale' },
];

const FILTERS = [
    { id: 'featured', label: 'Featured' },
    { id: 'latest', label: 'Latest' },
    { id: 'bestseller', label: 'Bestseller' },
    { id: 'special', label: 'Special' },
];

export default function TrendingProducts() {
    const [activeFilter, setActiveFilter] = useState('featured');

    // Strictly filter products by category and limit to 4
    const filteredProducts = ALL_PRODUCTS.filter(p => p.category === activeFilter).slice(0, 4);

    return (
        <section className="py-20 bg-surface">
            <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header & Filter */}
                <div className="flex flex-col items-center mb-12 space-y-8">
                    <div className="text-center space-y-2">
                        <span className="text-accent text-sm font-bold tracking-widest uppercase">Shop Our Collections</span>
                        <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary">Trending Products</h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-surface-2/50 backdrop-blur-sm rounded-full border border-border/50">
                        {FILTERS.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={cn(
                                    "relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                                    activeFilter === filter.id
                                        ? "text-white"
                                        : "text-text/70 hover:text-primary"
                                )}
                            >
                                {activeFilter === filter.id && (
                                    <motion.div
                                        layoutId="activeFilter"
                                        className="absolute inset-0 bg-[#0F3D2E] rounded-full shadow-md" // Hardcoded deep green
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{filter.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <div className="mt-16 text-center">
                    <Link to="/products" className="inline-flex items-center justify-center h-12 px-8 text-sm font-bold text-[#0F3D2E] uppercase tracking-widest border border-[#0F3D2E]/20 rounded-full hover:bg-[#0F3D2E] hover:text-white transition-all duration-300">
                        View All Products
                    </Link>
                </div>

            </div>
        </section>
    );
}
