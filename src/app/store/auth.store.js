import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '@/features/auth/api/auth.api';
import { useWishlistStore } from '@/app/store/wishlist.store';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            login: (user) => {
                set({ user, isAuthenticated: true });

                // Fetch wishlist after login
                const userId = user?.user_id || user?.id || user?._id;
                if (userId) {
                    const { fetchWishlist } = useWishlistStore.getState();
                    fetchWishlist(userId);
                }
            },
            logout: async () => {
                const { user } = get();

                try {
                    // Attempt to call server-side logout to clear HttpOnly cookies
                    if (user?.role === 'admin') {
                        await authApi.logoutAdmin();
                    } else if (user?.role === 'vendor') {
                        await authApi.logoutVendor();
                    } else {
                        // Default to user logout
                        await authApi.logoutUser();
                    }
                } catch (error) {
                    console.error("Logout API failed (offline?):", error);
                    // Continue to clear client state anyway
                }

                // Clear Local Storage
                ['token', 'admin_token', 'vendor_token', 'userId'].forEach(key => localStorage.removeItem(key));

                // Aggressive Cookie Clearing Helper
                const clearCookie = (name) => {
                    const host = window.location.hostname;
                    const domains = [host, `.${host}`];
                    // If localhost, we often don't set domain, so we try without it too.

                    const paths = ['/']; // Main path used in app

                    paths.forEach(path => {
                        // 1. Try clearing with exact attributes used in Login (Verified: path=/, secure, samesite=strict)
                        document.cookie = `${name}=; path=${path}; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict`;

                        // 2. Fallback: Try generic clearing (no secure/samesite constraints)
                        document.cookie = `${name}=; path=${path}; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

                        // 3. Try with explicit domain
                        domains.forEach(domain => {
                            document.cookie = `${name}=; path=${path}; domain=${domain}; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict`;
                            document.cookie = `${name}=; path=${path}; domain=${domain}; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                        });
                    });
                };

                ['token', 'admin_token', 'vendor_token'].forEach(clearCookie);

                // Clear wishlist on logout
                const { clearWishlist } = useWishlistStore.getState();
                clearWishlist();

                set({ user: null, isAuthenticated: false });
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
        }
    )
);
