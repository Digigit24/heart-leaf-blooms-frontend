import { create } from 'zustand';
import { cartApi } from '@/features/cart/api/cart.api';

export const useCartStore = create((set, get) => ({
    items: [],
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
                // Determine payload structure expected by backend
                // Usually { productId, quantity }
                // Based on backend.md: Payload: { productId, quantity }
                await cartApi.addToCart(userId, {
                    product_id: item.id,
                    quantity: item.quantity || 1
                });
            } catch (error) {
                console.error("Failed to sync cart with server:", error);
                // Optionally rollback or show toast
            }
        }
    },
    removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
    clearCart: () => set({ items: [] }),
}));
