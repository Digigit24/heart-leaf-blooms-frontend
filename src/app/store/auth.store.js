import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    login: (user) => set({ user, isAuthenticated: true }),
    logout: () => {
        // Clear Local Storage
        localStorage.removeItem('token');
        localStorage.removeItem('admin_token');
        localStorage.removeItem('vendor_token');
        localStorage.removeItem('userId');

        // Clear Cookies
        document.cookie = 'token=; path=/; max-age=0;';
        document.cookie = 'vendor_token=; path=/; max-age=0;';
        document.cookie = 'admin_token=; path=/; max-age=0;';

        set({ user: null, isAuthenticated: false });
    },
}));
