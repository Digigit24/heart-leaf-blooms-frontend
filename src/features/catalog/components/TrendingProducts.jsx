import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/common/ProductCard';
import { cn } from '@/utils/cn';

import { useProducts } from '@/features/catalog/hooks/useProducts';

const FILTERS = [
    { id: 'featured', label: 'Featured' },
    { id: 'latest', label: 'Latest' },
    { id: 'bestseller', label: 'Bestseller' },
    { id: 'special', label: 'Special' },
];

export default function TrendingProducts() {
    const [activeFilter, setActiveFilter] = useState('featured');
    const { data: products = [], isLoading: loading } = useProducts();
    // No mapping needed here as hook does it
    const displayProducts = products.slice(0, 4);

    return (
        <section className="py-20 bg-surface">
            <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header & Filter */}
                <div className="flex flex-col items-center mb-12 space-y-8">
                    <div className="text-center space-y-2">
                        <span className="text-accent text-sm font-bold tracking-widest uppercase">Shop Our Collections</span>
                        <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary">Trending Products</h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-surface-2/50 backdrop-blur-sm rounded-2xl sm:rounded-full border border-border/50 w-full sm:w-auto">
                        {FILTERS.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={cn(
                                    "relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap shrink-0",
                                    activeFilter === filter.id
                                        ? "text-white"
                                        : "text-text/70 hover:text-primary"
                                )}
                            >
                                {activeFilter === filter.id && (
                                    <motion.div
                                        layoutId="activeFilter"
                                        className="absolute inset-0 bg-[#0F3D2E] rounded-full shadow-md"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{filter.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[300px]">
                    {loading ? (
                        // Skeleton / Loading State
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-gray-100 rounded-xl h-80 animate-pulse"></div>
                        ))
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {displayProducts.map((product) => (
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
                    )}
                </div>

                <div className="mt-16 text-center">
                    <Link to="/products" className="inline-flex items-center justify-center h-12 px-8 text-sm font-bold text-[#0F3D2E] uppercase tracking-widest border border-[#0F3D2E]/20 rounded-full hover:bg-[#0F3D2E] hover:text-white transition-all duration-300">
                        View All Products
                    </Link>
                </div>

            </div>
        </section>
    );
}
