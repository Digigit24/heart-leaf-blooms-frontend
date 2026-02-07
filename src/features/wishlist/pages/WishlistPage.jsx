import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, Sprout, ShoppingBag, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlistStore } from '@/app/store/wishlist.store';
import { useAuthStore } from '@/app/store/auth.store';
import ProductCard from '@/components/common/ProductCard';
import LeafLoader from '@/components/ui/LeafLoader';
import { PATHS } from '@/app/routes/paths';

export default function WishlistPage() {
    const navigate = useNavigate();
    const { items, isLoading, fetchWishlist } = useWishlistStore();
    const { user, isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated && (user?.user_id || user?.id || user?._id)) {
            // Use user_id if available, fallback to id/_id
            const userId = user.user_id || user.id || user._id;
            console.log(`[WishlistPage] Calling GET /wishlist/${userId}...`);
            fetchWishlist(userId);
        } else if (!isAuthenticated) {
            navigate(PATHS.LOGIN);
        }
    }, [isAuthenticated, user, fetchWishlist, navigate]);

    if (isLoading && items.length === 0) {
        return <LeafLoader />;
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemAnim = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    // DEBUG LOGGING
    console.log('Wishlist Items Structure:', items);
    if (items.length > 0) {
        console.log('First item sample:', items[0]);
        console.log('Mapped for Card:', items[0].product || items[0]);
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-8 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center p-3 text-red-500 bg-red-50 rounded-full mb-4"
                    >
                        <Heart size={32} fill="currentColor" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif font-medium text-primary"
                    >
                        My Wishlist
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted text-lg max-w-2xl mx-auto"
                    >
                        Your curated collection of green dreams. Save them for later or bring them home today.
                    </motion.p>
                </div>

                {/* Content Section */}
                {!isAuthenticated ? (
                    <div className="text-center py-20">
                        <p>Please login to view your wishlist.</p>
                        <Link to={PATHS.LOGIN} className="btn-primary mt-4 inline-block">Login</Link>
                    </div>
                ) : items.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border/40 rounded-3xl bg-white/50"
                    >
                        <div className="w-24 h-24 bg-surface-2 rounded-full flex items-center justify-center mb-6 text-primary/40">
                            <Sprout size={48} />
                        </div>
                        <h3 className="text-2xl font-serif text-primary mb-3">Your wishlist is empty</h3>
                        <p className="text-muted mb-8 max-w-md">
                            Your heart hasn't bloomed for any plants yet. Explore our collection and find your perfect green companion.
                        </p>
                        <Link
                            to={PATHS.PRODUCTS}
                            className="group inline-flex items-center gap-2 bg-[#0F3D2E] text-white px-8 py-3 rounded-full font-heading font-bold uppercase tracking-widest text-sm hover:bg-[#0F3D2E]/90 transition-all hover:pr-10 relative overflow-hidden"
                        >
                            <span>Explore Plants</span>
                            <ArrowRight size={16} className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0" />
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
                    >
                        <AnimatePresence>
                            {items.map((item) => {
                                const productData = item.product || (item.adminProduct ? {
                                    id: item.adminProduct.product_id,
                                    name: item.adminProduct.product_name || item.adminProduct.product_title,
                                    image: item.adminProduct.images?.[0]?.large_url || item.adminProduct.images?.[0]?.medium_url || item.adminProduct.images?.[0]?.small_url,
                                    price: parseFloat(item.adminProduct.discount_price || item.adminProduct.product_price),
                                    originalPrice: parseFloat(item.adminProduct.product_price),
                                    inStock: item.adminProduct.stock > 0,
                                    tag: item.adminProduct.is_featured ? 'Featured' : null,
                                    category: item.adminProduct.category_id
                                } : item);

                                return (
                                    <motion.div
                                        key={item.wishlist_id || item.id || item._id || item._tempId}
                                        variants={itemAnim}
                                        layout
                                        className="relative group"
                                    >
                                        <ProductCard product={productData} hideCategory={true} />
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                const wishlistItemId = item.wishlist_id || item.id || item._id;
                                                // Assuming removeFromWishlist is available from useWishlistStore hook above
                                                items.find(i => i === item) && fetchWishlist && useWishlistStore.getState().removeFromWishlist(wishlistItemId, user?.user_id || user?.id || user?._id);
                                            }}
                                            className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-md text-gray-400 hover:text-red-500 hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-20 transform hover:scale-110"
                                            title="Remove from Wishlist"
                                        >
                                            <X size={18} />
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
