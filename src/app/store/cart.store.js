import { create } from 'zustand';
import { cartApi } from '@/features/cart/api/cart.api';

export const useCartStore = create((set, get) => ({
    items: [],
    updateQuantity: async (id, quantity, userId) => {
        const item = get().items.find((i) => i.id === id);
        if (!item) return;

        set((state) => ({
            items: state.items.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)),
        }));

        if (userId && item.cart_id) {
            try {
                await cartApi.updateCartQuantity(userId, item.cart_id, { quantity });
            } catch (error) {
                console.error("Failed to update cart quantity:", error);
            }
        }
    },
    addItem: async (item, userId) => {
        // Optimistic UI update
        const currentItems = get().items;
        const exists = currentItems.find(i => i.id === item.id);

        let newItems;
        if (exists) {
            newItems = currentItems.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
            );
        } else {
            newItems = [...currentItems, { ...item, quantity: item.quantity || 1 }];
        }

        set({ items: newItems });

        // API Call if logged in
        if (userId) {
            try {
                // If the item already had a cart_id (and thus existed), we should technically UPDATE it if we are just increasing quantity.
                // However, the addItem logic merges quantities. 
                // If it was an *existing* item in our list, it likely has a cart_id.
                // Check if we are updating or adding.

                const existingItem = exists;
                if (existingItem && existingItem.cart_id) {
                    // It's an update
                    const newQty = existingItem.quantity + (item.quantity || 1); // This is the NEW total quantity based on logic above
                    await cartApi.updateCartQuantity(userId, existingItem.cart_id, {
                        quantity: newQty // API expects total quantity usually for PUT? Or delta? Assume Total based on standard PUT semantics.
                    });
                } else {
                    // It's a new add
                    const res = await cartApi.addToCart(userId, {
                        product_id: item.id,
                        quantity: item.quantity || 1
                    });

                    // Update the local item with the returned cart_id
                    if (res.data && res.data.item && res.data.item.cart_id) {
                        set((state) => ({
                            items: state.items.map(i => i.id === item.id ? { ...i, cart_id: res.data.item.cart_id } : i)
                        }));
                    }
                }
            } catch (error) {
                console.error("Failed to sync cart with server:", error);
            }
        }
    },
    removeItem: async (id, userId) => {
        const item = get().items.find((i) => i.id === id);

        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));

        if (userId && item?.cart_id) {
            try {
                await cartApi.removeFromCart(userId, item.cart_id);
            } catch (error) {
                console.error("Failed to remove item from cart:", error);
            }
        }
    },
    clearCart: () => set({ items: [] }),
}));
