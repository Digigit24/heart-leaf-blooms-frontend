import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, Grid, List, Check, ArrowUpDown, Search, X } from 'lucide-react';
import ProductCard from '@/components/common/ProductCard';

// --- Mock Data ---

const CATEGORIES = [
    "Cactus & Succulents",
    "Indoor Plants",
    "Large Plants",
    "Flowering Plants",
    "Hanging Plants"
];

const FILTERS = {
    availability: [
        { id: 'in_stock', label: 'In Stock' },
        { id: 'out_stock', label: 'Out of Stock' }
    ],
    price: [
        { id: 'under_500', label: '₹0 - ₹500' },
        { id: '500_1000', label: '₹500 - ₹1000' },
        { id: '1000_2000', label: '₹1000 - ₹2000' },
        { id: 'over_2000', label: '₹2000+' },
    ],
    brands: [
        { id: 'Plant Co', label: 'The Plant Co' },
        { id: 'Green Life', label: 'Green Life' },
        { id: 'Nature@Home', label: 'Nature@Home' }
    ],
    colors: [
        { id: 'green', label: 'Green', color: '#166534' },
        { id: 'dark_green', label: 'Dark Green', color: '#064e3b' },
        { id: 'lime', label: 'Lime', color: '#bef264' },
        { id: 'variegated', label: 'Variegated', color: '#fcd34d' }
    ]
};

const PRODUCTS = [
    { id: 1, name: 'Monstera Deliciosa', price: 1499.00, rating: 5, reviews: 128, image: '/images/hero-1.png', tag: 'Best Seller', category: 'Indoor Plants', brand: 'Plant Co', color: 'green', inStock: true },
    { id: 2, name: 'Fiddle Leaf Fig', price: 2999.00, rating: 4, reviews: 85, image: '/images/hero-3.png', tag: 'Popular', category: 'Large Plants', brand: 'Green Life', color: 'dark_green', inStock: true },
    { id: 3, name: 'Rubber Plant', price: 899.00, rating: 5, reviews: 150, image: '/images/hero-2.png', category: 'Indoor Plants', brand: 'Nature@Home', color: 'dark_green', inStock: true },
    { id: 4, name: 'Golden Pothos', price: 499.00, rating: 5, reviews: 200, image: '/images/hero-1.png', category: 'Hanging Plants', brand: 'Plant Co', color: 'lime', inStock: true },
    { id: 5, name: 'Bird of Paradise', price: 3499.00, rating: 4, reviews: 64, image: '/images/hero-3.png', tag: 'New', category: 'Large Plants', brand: 'Green Life', color: 'green', inStock: false },
    { id: 6, name: 'Calathea Orbifolia', price: 1299.00, rating: 4, reviews: 32, image: '/images/hero-2.png', category: 'Indoor Plants', brand: 'Nature@Home', color: 'variegated', inStock: true },
    { id: 7, name: 'String of Pearls', price: 699.00, rating: 5, reviews: 45, image: '/images/hero-1.png', category: 'Hanging Plants', brand: 'Plant Co', color: 'green', inStock: true },
    { id: 8, name: 'Hoya Kerrii', price: 399.00, rating: 4, reviews: 20, image: '/images/hero-2.png', category: 'Cactus & Succulents', brand: 'Nature@Home', color: 'green', inStock: true },
    { id: 9, name: 'Peace Lily', price: 799.00, rating: 5, reviews: 210, image: '/images/hero-2.png', category: 'Flowering Plants', brand: 'Plant Co', color: 'green', inStock: true },
    { id: 10, name: 'Pothos Marble', price: 549.00, rating: 5, reviews: 312, image: '/images/hero-1.png', category: 'Hanging Plants', brand: 'Green Life', color: 'variegated', inStock: true },
    { id: 11, name: 'Snake Plant', price: 999.00, rating: 4, reviews: 96, image: '/images/hero-2.png', category: 'Cactus & Succulents', brand: 'Plant Co', color: 'variegated', inStock: true },
    { id: 12, name: 'ZZ Plant', price: 1199.00, rating: 5, reviews: 180, image: '/images/hero-1.png', tag: 'Sale', category: 'Indoor Plants', brand: 'Nature@Home', color: 'dark_green', inStock: false },
];

export default function Category() {
    const [viewMode, setViewMode] = useState('grid');
    const [selectedFilters, setSelectedFilters] = useState({
        availability: [],
        price: [],
        brands: [],
        colors: [],
        category: [] // Added category filter
    });
    const [sortBy, setSortBy] = useState('featured');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const itemsPerPage = 8;

    const toggleFilter = (type, id) => {
        setSelectedFilters(prev => {
            const current = prev[type];
            // If clicking a category, we might want single selection behavior or multi. Let's do multi for consistency, or single for strict categorization.
            // But usually Sidebar categories act as a filter.
            const updated = current.includes(id)
                ? current.filter(item => item !== id)
                : [...current, id];

            // Reset page when filtering
            setCurrentPage(1);
            return { ...prev, [type]: updated };
        });
    };

    const handleCategoryClick = (cat) => {
        // Helper to set category from sidebar
        setSelectedFilters(prev => {
            const isSelected = prev.category.includes(cat);
            const newCategory = isSelected ? [] : [cat]; // Single select behavior for sidebar categories
            setCurrentPage(1); // Reset page on category change
            return { ...prev, category: newCategory };
        });
    };

    // --- Filter Logic ---
    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter(product => {
            // Search
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchName = product.name.toLowerCase().includes(query);
                const matchCategory = product.category.toLowerCase().includes(query);
                if (!matchName && !matchCategory) return false;
            }

            // Availability
            if (selectedFilters.availability.length > 0) {
                const wantsInStock = selectedFilters.availability.includes('in_stock');
                const wantsOutStock = selectedFilters.availability.includes('out_stock');

                if (wantsInStock && !wantsOutStock && !product.inStock) return false;
                if (wantsOutStock && !wantsInStock && product.inStock) return false;
                // If both or neither are selected, this filter doesn't restrict.
                // If only in_stock is selected, and product is out of stock, filter out.
                // If only out_stock is selected, and product is in stock, filter out.
            }

            // Brands
            if (selectedFilters.brands.length > 0 && !selectedFilters.brands.includes(product.brand)) {
                return false;
            }

            // Colors
            if (selectedFilters.colors.length > 0 && !selectedFilters.colors.includes(product.color)) {
                return false;
            }

            // Categories (Sidebar)
            if (selectedFilters.category.length > 0 && !selectedFilters.category.includes(product.category)) {
                return false;
            }

            // Price
            if (selectedFilters.price.length > 0) {
                const priceMatches = selectedFilters.price.some(range => {
                    if (range === 'under_500') return product.price < 500;
                    if (range === '500_1000') return product.price >= 500 && product.price <= 1000;
                    if (range === '1000_2000') return product.price > 1000 && product.price <= 2000;
                    if (range === 'over_2000') return product.price > 2000;
                    return false;
                });
                if (!priceMatches) return false;
            }

            return true;
        });
    }, [selectedFilters]);

    // --- Sort Logic ---
    const sortedProducts = useMemo(() => {
        const sorted = [...filteredProducts];
        switch (sortBy) {
            case 'price_asc':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price_desc':
                return sorted.sort((a, b) => b.price - a.price);
            case 'name_asc':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            default: // featured / rating
                return sorted.sort((a, b) => b.rating - a.rating);
        }
    }, [filteredProducts, sortBy]);

    // --- Pagination Logic ---
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const paginatedProducts = sortedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="min-h-screen bg-bg">
            <div className="container mx-auto px-4 py-8 md:py-12">

                {/* Mobile Filter Toggle */}
                <div className="md:hidden mb-6">
                    <button
                        onClick={() => setShowMobileFilters(true)}
                        className="flex items-center gap-2 w-full justify-center bg-surface border border-border px-4 py-3 rounded-lg font-medium text-primary shadow-sm"
                    >
                        <Filter size={20} />
                        Filters & Sort
                    </button>
                </div>

                {/* Mobile Filter Drawer */}
                <AnimatePresence>
                    {showMobileFilters && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                                onClick={() => setShowMobileFilters(false)}
                            />
                            <motion.div
                                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed inset-y-0 right-0 w-80 bg-surface z-50 p-6 overflow-y-auto shadow-2xl md:hidden"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-heading font-bold text-primary">Filters & Sort</h2>
                                    <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-sage/10 rounded-full">
                                        <X size={24} />
                                    </button>
                                </div>
                                <div className="space-y-8 pb-10">
                                    {/* Categories Section */}
                                    <div>
                                        <h3 className="font-heading font-bold text-primary mb-4 text-lg">Categories</h3>
                                        <ul className="space-y-2.5">
                                            {CATEGORIES.map((cat, i) => (
                                                <li key={i}>
                                                    <button
                                                        onClick={() => { handleCategoryClick(cat); setShowMobileFilters(false); }}
                                                        className={`text-sm font-medium flex items-center justify-between group w-full text-left transition-colors ${selectedFilters.category.includes(cat) ? 'text-primary font-bold' : 'text-muted/80 hover:text-primary'}`}
                                                    >
                                                        {cat}
                                                        {selectedFilters.category.includes(cat) && <Check size={16} className="text-primary" strokeWidth={3} />}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <hr className="border-border/60" />
                                    {/* Dynamic Filters */}
                                    {Object.entries(FILTERS).map(([key, options]) => (
                                        <div key={key}>
                                            <h3 className="font-heading font-bold text-primary mb-4 capitalize text-sm tracking-wide">
                                                {key.replace('_', ' ')}
                                            </h3>

                                            {key === 'colors' ? (
                                                <div className="flex flex-wrap gap-3">
                                                    {options.map((opt) => (
                                                        <button
                                                            key={opt.id}
                                                            onClick={() => toggleFilter(key, opt.id)}
                                                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${selectedFilters[key].includes(opt.id) ? 'ring-2 ring-primary ring-offset-2' : 'hover:scale-110 shadow-sm'}`}
                                                            style={{ backgroundColor: opt.color }}
                                                            title={opt.label}
                                                        >
                                                            {selectedFilters[key].includes(opt.id) && <Check size={14} color={opt.id === 'lime' || opt.id === 'variegated' ? '#166534' : 'white'} />}
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="space-y-3">
                                                    {options.map((opt) => (
                                                        <label key={opt.id} className="flex items-center gap-3 cursor-pointer group select-none">
                                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedFilters[key].includes(opt.id) ? 'bg-primary border-primary' : 'border-muted/40 group-hover:border-primary bg-white'}`}>
                                                                {selectedFilters[key].includes(opt.id) && <Check size={14} color="white" strokeWidth={3} />}
                                                            </div>
                                                            <input
                                                                type="checkbox"
                                                                className="hidden"
                                                                checked={selectedFilters[key].includes(opt.id)}
                                                                onChange={() => toggleFilter(key, opt.id)}
                                                            />
                                                            <span className={`text-sm ${selectedFilters[key].includes(opt.id) ? 'text-primary font-medium' : 'text-muted/80 group-hover:text-primary'}`}>
                                                                {opt.label}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                <div className="flex flex-col md:flex-row gap-8 lg:gap-12">

                    {/* --- Sidebar (Sticky) --- */}
                    <aside className="hidden md:block w-64 shrink-0">
                        <div className="sticky top-24 space-y-8 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar pr-2 pb-10">

                            {/* Categories Section */}
                            <div>
                                <h3 className="font-heading font-bold text-primary mb-4 text-lg">Categories</h3>
                                <ul className="space-y-2.5">
                                    {CATEGORIES.map((cat, i) => (
                                        <li key={i}>
                                            <button
                                                onClick={() => handleCategoryClick(cat)}
                                                className={`text-sm font-medium flex items-center justify-between group w-full text-left transition-colors ${selectedFilters.category.includes(cat) ? 'text-primary font-bold' : 'text-muted/80 hover:text-primary'}`}
                                            >
                                                {cat}
                                                {selectedFilters.category.includes(cat) && <Check size={16} className="text-primary" strokeWidth={3} />}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <hr className="border-border/60" />

                            {/* Dynamic Filters */}
                            {Object.entries(FILTERS).map(([key, options]) => (
                                <div key={key}>
                                    <h3 className="font-heading font-bold text-primary mb-4 capitalize text-sm tracking-wide">
                                        {key.replace('_', ' ')}
                                    </h3>

                                    {key === 'colors' ? (
                                        <div className="flex flex-wrap gap-3">
                                            {options.map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => toggleFilter(key, opt.id)}
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${selectedFilters[key].includes(opt.id) ? 'ring-2 ring-primary ring-offset-2' : 'hover:scale-110 shadow-sm'}`}
                                                    style={{ backgroundColor: opt.color }}
                                                    title={opt.label}
                                                >
                                                    {selectedFilters[key].includes(opt.id) && <Check size={14} color={opt.id === 'lime' || opt.id === 'variegated' ? '#166534' : 'white'} />}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {options.map((opt) => (
                                                <label key={opt.id} className="flex items-center gap-3 cursor-pointer group select-none">
                                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedFilters[key].includes(opt.id) ? 'bg-primary border-primary' : 'border-muted/40 group-hover:border-primary bg-white'}`}>
                                                        {selectedFilters[key].includes(opt.id) && <Check size={14} color="white" strokeWidth={3} />}
                                                    </div>
                                                    <input
                                                        type="checkbox"
                                                        className="hidden"
                                                        checked={selectedFilters[key].includes(opt.id)}
                                                        onChange={() => toggleFilter(key, opt.id)}
                                                    />
                                                    <span className={`text-sm ${selectedFilters[key].includes(opt.id) ? 'text-primary font-medium' : 'text-muted/80 group-hover:text-primary'}`}>
                                                        {opt.label}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* --- Main Content --- */}
                    <main className="flex-1">

                        {/* Banner */}
                        <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden mb-10 bg-sage/10 shadow-sm">
                            <div className="absolute inset-0 bg-[url('/images/hero-1.png')] bg-cover bg-center opacity-20"></div>
                            <div className="absolute inset-0 bg-linear-to-r from-sage/30 to-primary/5"></div>
                            <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
                                <h1 className="font-heading font-black text-3xl md:text-5xl text-primary mb-2 drop-shadow-sm">Best Deal With Best Plant</h1>
                                <p className="text-primary/80 font-medium max-w-md">Upgrade your home with our premium selection of indoor greenery.</p>
                            </div>
                        </div>

                        {/* Toolbar */}
                        <div className="sticky top-[73px] md:top-20 z-30 bg-bg/95 backdrop-blur-md py-4 mb-6 border-b border-border/50">
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <div className="relative w-full sm:w-64">
                                        <input
                                            type="text"
                                            placeholder="Search plants..."
                                            value={searchQuery}
                                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                            className="w-full pl-9 pr-4 py-2 bg-surface border border-border/50 rounded-lg text-sm text-primary placeholder:text-muted/60 focus:outline-none focus:border-primary/50 transition-all shadow-xs"
                                        />
                                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                                    </div>
                                    <p className="hidden lg:block text-sm text-muted whitespace-nowrap">
                                        Showing <span className="font-bold text-primary">{paginatedProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span>–<span className="font-bold text-primary">{Math.min(currentPage * itemsPerPage, sortedProducts.length)}</span> of {sortedProducts.length}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    {/* View Toggle */}
                                    <div className="hidden sm:flex items-center bg-surface border border-border rounded-lg p-1">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-primary/10 text-primary shadow-xs' : 'text-muted hover:text-primary'}`}
                                        >
                                            <Grid size={18} />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-1.5 rounded transition-all ${viewMode === 'list' ? 'bg-primary/10 text-primary shadow-xs' : 'text-muted hover:text-primary'}`}
                                        >
                                            <List size={18} />
                                        </button>
                                    </div>

                                    {/* Sort Dropdown */}
                                    <div className="relative group">
                                        <button
                                            onClick={() => setIsSortOpen(!isSortOpen)}
                                            className="flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80 bg-surface px-3 py-1.5 rounded-lg border border-border/50 shadow-xs"
                                        >
                                            <ArrowUpDown size={14} />
                                            Sort by: <span className="underline">{sortBy.replace('_', ' ')}</span>
                                            <ChevronDown size={14} />
                                        </button>

                                        {/* Simple Dropdown Logic (could be refined) */}
                                        {isSortOpen && (
                                            <div className="absolute right-0 mt-2 w-48 bg-surface rounded-xl shadow-xl border border-border/50 z-50 py-1 overflow-hidden" onMouseLeave={() => setIsSortOpen(false)}>
                                                {[
                                                    { val: 'featured', label: 'Featured' },
                                                    { val: 'price_asc', label: 'Price: Low to High' },
                                                    { val: 'price_desc', label: 'Price: High to Low' },
                                                    { val: 'name_asc', label: 'Name: A-Z' },
                                                ].map(opt => (
                                                    <button
                                                        key={opt.val}
                                                        onClick={() => { setSortBy(opt.val); setIsSortOpen(false); }}
                                                        className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-sage/10 ${sortBy === opt.val ? 'text-primary font-bold bg-sage/5' : 'text-text/80'}`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="min-h-[400px]">
                            {paginatedProducts.length > 0 ? (
                                <div className={`grid gap-8 ${viewMode === 'grid'
                                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
                                    : 'grid-cols-1'
                                    }`}>
                                    <AnimatePresence mode="popLayout">
                                        {paginatedProducts.map((product) => (
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
                                                    <div className="flex gap-6 items-center bg-surface border border-border p-4 rounded-xl hover:shadow-lg transition-all group">
                                                        <div className="w-32 h-32 shrink-0 bg-sage/10 rounded-lg overflow-hidden relative">
                                                            <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                                            {!product.inStock && (
                                                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-bold uppercase">Out of Stock</div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <div className="text-xs text-primary font-bold uppercase tracking-wider mb-1">{product.category}</div>
                                                                    <h3 className="font-heading font-bold text-xl text-primary mb-1">{product.name}</h3>
                                                                    <p className="text-muted text-sm mb-3">Perfect for your home or office. Easy to care for.</p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className="text-2xl font-bold text-primary">₹{product.price.toFixed(2)}</div>
                                                                    <div className="text-xs text-muted">Free Shipping</div>
                                                                </div>
                                                            </div>

                                                            <div className="flex gap-3 mt-2">
                                                                <button disabled={!product.inStock} className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                                                    Add to Cart
                                                                </button>
                                                                <button className="px-4 py-2 border border-border text-text text-sm font-semibold rounded-lg hover:border-primary hover:text-primary transition-colors">
                                                                    Quick View
                                                                </button>
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
                                        onClick={() => setSelectedFilters({ availability: [], price: [], brands: [], colors: [], category: [] })}
                                        className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-16 flex justify-center items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted"
                                >
                                    &lt;
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
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}