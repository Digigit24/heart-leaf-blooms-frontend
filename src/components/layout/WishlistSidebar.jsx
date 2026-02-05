import { useNavigate } from 'react-router-dom';
import { useWishlistStore } from '@/app/store/wishlist.store';
import { useCartStore } from '@/app/store/cart.store';
import { useUIStore } from '@/app/store/ui.store';
import { useAuthStore } from '@/app/store/auth.store';
import Drawer from '@/components/common/Drawer';
import { Heart, ShoppingBag, X } from 'lucide-react';

export default function WishlistSidebar() {
    const navigate = useNavigate();
    const { isWishlistOpen, closeWishlist } = useUIStore();
    const { items, addToWishlist } = useWishlistStore(); // toggle remove via addToWishlist logic
    const { items: itemsInCart, addItem } = useCartStore();
    const { user } = useAuthStore();

    const handleAddToCart = (product) => {
        // Need to handle variants if possible? 
        // For sidebar quick-add, we assume defaults or redirect.
        // Let's redirect to product details if complexity is high, 
        // OR add default variant. 
        // Given the data structure, we might have full prod object.

        // Safer: Redirect to product
        closeWishlist();
        navigate(`/products/${product.id}`);
    };

    const handleRemove = (product) => {
        const wishlistItemId = product.id || product._id;
        const { removeFromWishlist } = useWishlistStore.getState();
        removeFromWishlist(wishlistItemId, user?.user_id || user?.id || user?._id);
    };

    return (
        <Drawer isOpen={isWishlistOpen} onClose={closeWishlist} title={`Wishlist (${items.length})`}>
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <div className="p-4 bg-red-50 rounded-full">
                        <Heart size={32} className="text-red-300" />
                    </div>
                    <p className="text-muted">Your wishlist is empty.</p>
                    <button onClick={closeWishlist} className="text-primary font-bold hover:underline">Explore Plants</button>
                </div>
            ) : (
                <div className="space-y-6">
                    {items.map((item) => {
                        // Check if in cart
                        const cartItem = itemsInCart.find(c => c.id === item.id);
                        const isInCart = !!cartItem;
                        // Image resolution
                        const imageSrc = item.images?.[0]?.small_url || item.images?.[0]?.medium_url || item.images?.[0] || item.image;

                        return (
                            <div key={item.id} className="group relative flex gap-4 p-2 hover:bg-gray-50 rounded-xl transition-colors">
                                <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0 cursor-pointer relative" onClick={() => handleAddToCart(item)}>
                                    <img src={imageSrc} alt={item.name} className="w-full h-full object-cover" />
                                    {isInCart && (
                                        <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] font-bold text-center py-0.5 backdrop-blur-sm">
                                            In Cart
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-heading font-bold text-primary line-clamp-1 cursor-pointer" onClick={() => handleAddToCart(item)}>{item.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-sm font-bold text-primary">₹{item.price}</p>
                                        {isInCart && (
                                            <span className="text-[10px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                                                Qty: {cartItem.quantity}
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="mt-3 text-xs font-bold text-primary uppercase tracking-wider hover:underline flex items-center gap-1"
                                    >
                                        View Product
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleRemove(item)}
                                    className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </Drawer>
    );
}
