import { create } from 'zustand';
import { cartApi } from '@/features/cart/api/cart.api'; // Reusing cartApi as it contains wishlist endpoints

export const useWishlistStore = create((set, get) => ({
    items: [], // Array of product objects or IDs

    // Check if item is in wishlist
    isInWishlist: (productId) => {
        return get().items.some(item => (item.id === productId || item.product_id === productId || item._id === productId));
    },

    addToWishlist: async (product, userId) => {
        const { items } = get();
        const exists = items.find(item => item.id === product.id);

        if (exists) {
            // Remove from wishlist (Toggle)
            const newItems = items.filter(item => item.id !== product.id);
            set({ items: newItems });
            // API Call for Remove? Backend doc doesn't specify remove endpoint explicitly here, 
            // usually it's DELETE /wishlist/:userId/:productId or similar. 
            // Assuming Add for now. If toggle isn't supported by backend, only Add works.
            // Be careful.
        } else {
            // Add
            set({ items: [...items, product] });

            if (userId) {
                try {
                    await cartApi.addToWishlist(userId, { product_id: product.id });
                    console.log("Added to wishlist server-side");
                } catch (error) {
                    console.error("Failed to add to wishlist:", error);
                }
            }
        }
    },

    // Initialize/Sync from User Profile
    setWishlist: (wishlistItems) => set({ items: wishlistItems || [] }),
}));
