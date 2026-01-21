import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import CategorySidebar from '@/features/catalog/components/CategorySidebar';
import CategoryMainContent from '@/features/catalog/components/CategoryMainContent';
import { useProducts } from '@/features/catalog/hooks/useProducts';
import { useCartStore } from '@/app/store/cart.store';
import { useAuthStore } from '@/app/store/auth.store';
import { toast } from 'react-hot-toast';
import { PATHS } from '@/app/routes/paths';

export default function Category() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const vendorId = searchParams.get('vendor');

    const { data: products = [], isLoading: loading } = useProducts();
    const { addItem } = useCartStore();
    const { user } = useAuthStore();

    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        if (!user) {
            navigate(PATHS.LOGIN);
            return;
        }
        addItem({ ...product, quantity: 1 }, user?.id || user?._id);
        toast.success('Added to cart!');
    };

    const [viewMode, setViewMode] = useState('grid');
    const [selectedFilters, setSelectedFilters] = useState({
        availability: [],
        price: [],
        brands: [],
        colors: [],
        category: []
    });
    const [sortBy, setSortBy] = useState('featured');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const itemsPerPage = 12;

    // --- Handlers ---
    const toggleFilter = (type, value) => {
        setSelectedFilters(prev => {
            const current = prev[type];
            const updated = current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value];
            return { ...prev, [type]: updated };
        });
        setCurrentPage(1);
    };

    const handleCategoryClick = (category) => {
        toggleFilter('category', category);
    };

    const clearFilters = () => {
        setSelectedFilters({ availability: [], price: [], brands: [], colors: [], category: [] });
        navigate('/products');
    };

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            if (vendorId) {
                if (!product.vendorId) return false;
                if (String(product.vendorId) !== String(vendorId)) return false;
            }

            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchName = product.name.toLowerCase().includes(query);
                const matchCategory = product.category.toLowerCase().includes(query);
                if (!matchName && !matchCategory) return false;
            }

            if (selectedFilters.availability.length > 0) {
                const wantsInStock = selectedFilters.availability.includes('in_stock');
                const wantsOutStock = selectedFilters.availability.includes('out_stock');
                if (wantsInStock && !wantsOutStock && !product.inStock) return false;
                if (wantsOutStock && !wantsInStock && product.inStock) return false;
            }

            if (selectedFilters.brands.length > 0 && !selectedFilters.brands.includes(product.brand)) {
                return false;
            }

            if (selectedFilters.colors.length > 0 && !selectedFilters.colors.includes(product.color)) {
                return false;
            }

            if (selectedFilters.category.length > 0) {
                const productCat = product.category.toLowerCase();
                const hasMatch = selectedFilters.category.some(cat =>
                    productCat === cat.toLowerCase() || productCat.includes(cat.toLowerCase())
                );
                if (!hasMatch) return false;
            }

            if (selectedFilters.price.length > 0) {
                const priceMatches = selectedFilters.price.some(range => {
                    const price = product.price;
                    if (range === 'under_500') return price < 500;
                    if (range === '500_1000') return price >= 500 && price <= 1000;
                    if (range === '1000_2000') return price > 1000 && price <= 2000;
                    if (range === 'over_2000') return price > 2000;
                    return false;
                });
                if (!priceMatches) return false;
            }

            return true;
        });
    }, [selectedFilters, products, vendorId, searchQuery]);

    const sortedProducts = useMemo(() => {
        const sorted = [...filteredProducts];
        switch (sortBy) {
            case 'price_asc':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price_desc':
                return sorted.sort((a, b) => b.price - a.price);
            case 'name_asc':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            default:
                return sorted.sort((a, b) => b.rating - a.rating);
        }
    }, [filteredProducts, sortBy]);

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const paginatedProducts = sortedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <div className="container mx-auto px-4 py-8">

                {/* Mobile Filter Toggle */}
                <div className="md:hidden mb-4">
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
                                className="fixed inset-y-0 right-0 w-80 bg-[#FDFCF8] z-50 p-6 overflow-y-auto shadow-2xl md:hidden border-l border-[#2F6E1E]/5"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-heading font-bold text-primary">Filters & Sort</h2>
                                    <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-sage/10 rounded-full">
                                        <X size={24} />
                                    </button>
                                </div>
                                <CategorySidebar
                                    selectedFilters={selectedFilters}
                                    toggleFilter={toggleFilter}
                                    handleCategoryClick={handleCategoryClick}
                                />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* --- Hero Banner --- */}
                <div className="mb-8 relative h-40 md:h-48 lg:h-52 rounded-2xl overflow-hidden bg-sage/10 shadow-sm">
                    <div className="absolute inset-0 bg-[url('/images/hero-1.png')] bg-cover bg-center opacity-20"></div>
                    <div className="absolute inset-0 bg-linear-to-r from-sage/30 to-primary/5"></div>
                    <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
                        <h1 className="font-heading font-black text-2xl md:text-5xl text-primary mb-2 drop-shadow-sm">Best Deal With Best Plant</h1>
                        <p className="text-primary/80 font-medium max-w-md text-sm md:text-base">Upgrade your home with our premium selection of indoor greenery.</p>
                    </div>
                </div>

                {/* --- Main Content Area --- */}
                <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">

                    {/* Sidebar - Sticky on Desktop */}
                    <aside className="hidden md:block w-64 shrink-0 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
                        <CategorySidebar
                            selectedFilters={selectedFilters}
                            toggleFilter={toggleFilter}
                            handleCategoryClick={handleCategoryClick}
                        />
                    </aside>

                    {/* Product Grid & Controls */}
                    <main className="flex-1 min-w-0">
                        <CategoryMainContent
                            products={paginatedProducts}
                            loading={loading}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            viewMode={viewMode}
                            setViewMode={setViewMode}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                            handleAddToCart={handleAddToCart}
                            clearFilters={clearFilters}
                        />
                    </main>

                </div>
            </div>
        </div>
    );
}
