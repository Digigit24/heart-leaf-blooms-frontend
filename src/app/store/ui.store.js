import { create } from 'zustand';

export const useUIStore = create((set) => ({
    isSidebarOpen: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

    isCartOpen: false,
    openCart: () => set({ isCartOpen: true, isWishlistOpen: false }),
    closeCart: () => set({ isCartOpen: false }),
    toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen, isWishlistOpen: false })),

    isWishlistOpen: false,
    openWishlist: () => set({ isWishlistOpen: true, isCartOpen: false }),
    closeWishlist: () => set({ isWishlistOpen: false }),
    toggleWishlist: () => set((state) => ({ isWishlistOpen: !state.isWishlistOpen, isCartOpen: false })),

    closeAll: () => set({ isCartOpen: false, isWishlistOpen: false, isSidebarOpen: false }),
}));
