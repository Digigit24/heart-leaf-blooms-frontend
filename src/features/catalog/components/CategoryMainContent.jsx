import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, Grid, List, Search, Check } from 'lucide-react';
import ProductCard from '@/components/common/ProductCard';
import LeafLoader from '@/components/ui/LeafLoader';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/app/routes/paths';

export default function CategoryMainContent({
    products,
    loading,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    currentPage,
    setCurrentPage,
    totalPages,
    handleAddToCart,
    clearFilters
}) {
    const [isSortOpen, setIsSortOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            {/* Top Controls Toolbar - Wheat & Premium */}
            <div className="top-[72px] md:top-24 z-30 mb-8 p-1.5 rounded-3xl md:rounded-full bg-[#fdfaf5]/98 backdrop-blur-xl border border-[#efe9dd] shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 transition-all duration-300">
                <div className="flex flex-col md:flex-row items-center gap-2">

                    {/* Search Bar - Integrated Pill relative to container width */}
                    <div className="relative w-full md:flex-1 group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8c8475] group-focus-within:text-primary transition-colors duration-300">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Type to search..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            className="w-full h-11 bg-transparent border-none rounded-full py-2.5 pl-11 pr-4 text-primary font-medium placeholder:text-[#8c8475]/60 outline-none focus:bg-[#efe9dd]/40 transition-all cursor-text text-sm"
                        />
                    </div>

                    <div className="hidden md:block w-px h-6 bg-[#efe9dd]"></div>

                    {/* Controls Group - Right Aligned & Stable */}
                    <div className="flex items-center justify-between md:justify-end gap-2 w-full md:w-auto shrink-0">

                        {/* Sort Dropdown - Refined Pill */}
                        <div className="relative flex-1 md:flex-none">
                            <button
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="w-full md:w-auto whitespace-nowrap flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#F5DEB3]/20 hover:bg-[#F5DEB3]/40 border border-[#efe9dd] transition-all duration-300 text-sm group"
                            >
                                <span className="text-[#8c8475] font-medium text-xs uppercase tracking-wide">Sort:</span>
                                <span className="text-primary font-bold flex items-center gap-1">
                                    {sortBy === 'featured' && 'Featured'}
                                    {sortBy === 'price_asc' && 'Price: Low-High'}
                                    {sortBy === 'price_desc' && 'Price: High-Low'}
                                    {sortBy === 'name_asc' && 'Name: A-Z'}
                                    <ChevronDown size={14} className={`transition-transform duration-300 transform opacity-50 ${isSortOpen ? 'rotate-180' : ''}`} />
                                </span>
                            </button>

                            <AnimatePresence>
                                {isSortOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                        transition={{ type: "spring", bounce: 0, duration: 0.2 }}
                                        className="absolute right-0 top-full mt-2 w-full md:w-56 bg-[#fdfaf5] rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-[#efe9dd] p-1.5 z-50 origin-top-right ring-1 ring-black/5"
                                        onMouseLeave={() => setIsSortOpen(false)}
                                    >
                                        {[
                                            { val: 'featured', label: 'Featured Choice' },
                                            { val: 'price_asc', label: 'Price: Low to High' },
                                            { val: 'price_desc', label: 'Price: High to Low' },
                                            { val: 'name_asc', label: 'Alphabetical: A-Z' },
                                        ].map(opt => (
                                            <button
                                                key={opt.val}
                                                onClick={() => { setSortBy(opt.val); setIsSortOpen(false); }}
                                                className={`flex items-center justify-between w-full px-4 py-2.5 text-sm rounded-xl transition-all ${sortBy === opt.val
                                                    ? 'bg-[#F5DEB3]/30 text-primary font-bold'
                                                    : 'text-[#8c8475] hover:bg-[#efe9dd]/40 hover:text-primary'
                                                    }`}
                                            >
                                                {opt.label}
                                                {sortBy === opt.val && <motion.div layoutId="check" className="text-primary"><Check size={14} strokeWidth={3} /></motion.div>}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Divider */}
                        <div className="w-px h-6 bg-[#efe9dd] mx-1 hidden md:block"></div>

                        {/* View Toggle - Animated Switch */}
                        <div className="flex bg-[#efe9dd]/40 p-1 rounded-full border border-[#efe9dd] relative shrink-0">
                            {/* Animated Background Indicator */}
                            <div
                                className={`absolute top-1 bottom-1 rounded-full bg-white shadow-sm transition-all duration-300 ease-out z-0`}
                                style={{
                                    left: viewMode === 'grid' ? '4px' : '50%',
                                    width: 'calc(50% - 4px)',
                                }}
                            />

                            <button
                                onClick={() => setViewMode('grid')}
                                className={`relative z-10 w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-200 ${viewMode === 'grid' ? 'text-primary' : 'text-[#8c8475] hover:text-primary'}`}
                                title="Grid View"
                            >
                                <Grid size={16} strokeWidth={2.5} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`relative z-10 w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-200 ${viewMode === 'list' ? 'text-primary' : 'text-[#8c8475] hover:text-primary'}`}
                                title="List View"
                            >
                                <List size={16} strokeWidth={2.5} />
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="min-h-[400px]">
                {loading ? (
                    <LeafLoader />
                ) : products.length > 0 ? (
                    <div className={`grid gap-4 md:gap-6 ${viewMode === 'grid'
                        ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                        : 'grid-cols-1'
                        }`}>
                        <AnimatePresence mode="popLayout">
                            {products.map((product) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {viewMode === 'grid' ? (
                                        <ProductCard product={product} />
                                    ) : (
                                        <div className="flex flex-row gap-4 sm:gap-6 items-start sm:items-center bg-surface border border-border p-4 rounded-xl hover:shadow-lg transition-all group">
                                            <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-sage/10 rounded-lg overflow-hidden relative">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                                {!product.inStock && (
                                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-bold uppercase">Out of Stock</div>
                                                )}
                                            </div>
                                            <div className="flex-1 w-full min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 h-full">
                                                    <div className="flex flex-col gap-1 sm:flex-1">
                                                        <div className="text-[10px] sm:text-xs text-primary font-bold uppercase tracking-wider mb-0.5">{product.category}</div>
                                                        <h3 className="font-heading font-bold text-lg sm:text-xl text-primary mb-0.5 truncate">{product.name}</h3>
                                                        <p className="text-muted text-xs sm:text-sm line-clamp-1 hidden sm:block">Perfect for your home or office. Easy to care for.</p>
                                                    </div>

                                                    <div className="flex flex-col sm:items-end gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
                                                        <div className="text-left sm:text-right flex flex-col sm:items-end">
                                                            <div className="flex items-center gap-2 sm:justify-end">
                                                                <div className="text-xl sm:text-2xl font-bold text-primary">₹{product.price.toFixed(2)}</div>
                                                                {product.originalPrice && (
                                                                    <div className="text-xs sm:text-sm text-muted/60 line-through">₹{product.originalPrice.toFixed(2)}</div>
                                                                )}
                                                            </div>
                                                            {product.originalPrice && product.originalPrice > product.price && (
                                                                <div className="text-xs sm:text-sm font-bold text-[#56BA39] mt-0.5">
                                                                    Min. {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="flex flex-row gap-2 w-full sm:w-auto">
                                                            <button
                                                                disabled={!product.inStock}
                                                                onClick={(e) => handleAddToCart(e, product)}
                                                                className="flex-1 sm:flex-none px-3 sm:px-6 py-2 bg-[#2F6E1E] text-white text-xs sm:text-sm font-bold rounded-lg hover:bg-[#1f4a14] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">
                                                                Add to Cart
                                                            </button>
                                                            <button
                                                                disabled={!product.inStock}
                                                                onClick={(e) => {
                                                                    handleAddToCart(e, product);
                                                                    navigate(PATHS.CART || '/cart');
                                                                }}
                                                                className="flex-1 sm:flex-none px-3 sm:px-6 py-2 bg-[#56BA39] text-white text-xs sm:text-sm font-bold rounded-lg hover:bg-[#46992e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">
                                                                Buy Now
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mb-4 text-primary">
                            <Filter size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-2">No products found</h3>
                        <p className="text-muted max-w-sm mx-auto mb-6">Try adjusting your filters or search criteria to find what you're looking for.</p>
                        <button
                            onClick={clearFilters}
                            className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Pagination - Premium Style */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-12 bg-[#F7F4EE] px-6 py-4 rounded-xl shadow-sm border border-border/50 w-fit mx-auto">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border border-border/60 hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-border/60 disabled:hover:text-text transition-all bg-surface"
                        >
                            <ChevronDown size={20} className="rotate-90" />
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${currentPage === i + 1
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'text-muted hover:text-primary hover:bg-primary/5'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted"
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
