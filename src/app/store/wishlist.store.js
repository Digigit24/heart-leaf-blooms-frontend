import { create } from 'zustand';
import { wishlistApi } from '@/features/wishlist/api/wishlist.api';
import { toast } from 'react-hot-toast';

export const useWishlistStore = create((set, get) => ({
    items: [], // Array of wishlist items with { id, product_id, product details, etc. }
    isLoading: false,
    error: null,

    // Check if item is in wishlist by product_id
    isInWishlist: (productId) => {
        return get().items.some(item =>
            item.product_id === productId ||
            item.admin_product_id === productId ||
            item.id === productId ||
            item._id === productId ||
            item.wishlist_id === productId ||
            item.product?.id === productId
        );
    },

    // Get wishlist item by product_id (to get the wishlist ID for deletion)
    getWishlistItem: (productId) => {
        return get().items.find(item =>
            item.product_id === productId ||
            item.admin_product_id === productId ||
            item.id === productId ||
            item._id === productId ||
            item.wishlist_id === productId ||
            item.product?.id === productId
        );
    },

    // Fetch wishlist from server
    fetchWishlist: async (userId) => {
        if (!userId) return;

        set({ isLoading: true, error: null });
        try {
            const response = await wishlistApi.getWishlist(userId);
            const wishlistItems = response.data?.wishlist || response.data || [];
            set({ items: wishlistItems, isLoading: false });
            console.log('Wishlist fetched successfully:', wishlistItems);
        } catch (error) {
            console.error('Failed to fetch wishlist:', error);
            set({ error: error.message, isLoading: false });
        }
    },

    // Add to wishlist
    addToWishlist: async (product, userId) => {
        if (!userId) {
            console.warn('User must be logged in to add to wishlist');
            return;
        }

        const { items } = get();
        const exists = get().getWishlistItem(product.id);

        if (exists) {
            // Item already in wishlist, remove it (toggle behavior)
            await get().removeFromWishlist(exists.wishlist_id || exists.id || exists._id, userId);
        } else {
            // Optimistically add to UI
            const tempItem = {
                ...product,
                product_id: product.id,
                _tempId: Date.now() // Temporary ID until we get the real one from server
            };
            set({ items: [...items, tempItem] });

            try {
                const response = await wishlistApi.addToWishlist(userId, {
                    product_id: product.id
                });

                // Replace temp item with actual item from server
                const newItem = response.data?.wishlist || response.data;

                // If newItem is valid, replace the temp item
                if (newItem) {
                    const currentItems = get().items;
                    const updatedItems = currentItems.filter(i => i._tempId !== tempItem._tempId);
                    set({ items: [...updatedItems, newItem] });
                    console.log('Added to wishlist successfully:', newItem);
                } else {
                    // If no data returned, keep the temp item but remove _tempId
                    const currentItems = get().items;
                    const updatedItems = currentItems.map(i =>
                        i._tempId === tempItem._tempId ? { ...i, _tempId: undefined } : i
                    );
                    set({ items: updatedItems });
                    console.log('Added to wishlist (no server data returned)');
                }
            } catch (error) {
                // Rollback on error
                const currentItems = get().items;
                set({ items: currentItems.filter(item => item._tempId !== tempItem._tempId) });
                console.error('Failed to add to wishlist:', error);
                alert('Failed to add to wishlist. Please try again.');
            }
        }
    },

    // Remove from wishlist
    removeFromWishlist: async (wishlistId, userId) => {
        if (!userId || !wishlistId) {
            console.warn('User ID and Wishlist ID are required');
            return;
        }

        const { items } = get();

        // Optimistically remove from UI
        const itemToRemove = items.find(item =>
            item.wishlist_id === wishlistId || item.id === wishlistId || item._id === wishlistId
        );
        const newItems = items.filter(item =>
            item.wishlist_id !== wishlistId && item.id !== wishlistId && item._id !== wishlistId
        );
        set({ items: newItems });

        // Get Product Name
        const productName = itemToRemove?.product?.name ||
            itemToRemove?.adminProduct?.product_name ||
            itemToRemove?.adminProduct?.product_title ||
            itemToRemove?.name ||
            'Product';

        try {
            await wishlistApi.removeFromWishlist(userId, wishlistId);
            console.log('Removed from wishlist successfully');
            toast.success(`${productName} has been removed from your wishlist.`, { duration: 3000 });
        } catch (error) {
            // Rollback on error
            if (itemToRemove) {
                set({ items: [...newItems, itemToRemove] });
            }
            console.error('Failed to remove from wishlist:', error);
            alert('Failed to remove from wishlist. Please try again.');
        }
    },

    // Clear wishlist (for logout)
    clearWishlist: () => set({ items: [], error: null }),

    // Initialize/Sync from server or local data
    setWishlist: (wishlistItems) => set({ items: wishlistItems || [] }),
}));
