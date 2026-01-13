import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import QueryProvider from './providers/QueryProvider';
import ThemeProvider from './providers/ThemeProvider';
import { ConfigProvider } from '@/context/ConfigContext';
import LeafLoader from '@/components/ui/LeafLoader';
import { useWishlistStore } from '@/app/store/wishlist.store';
import { useAuthStore } from '@/app/store/auth.store';
import { authApi } from '@/features/auth/api/auth.api';
import ScrollToTop from '@/components/common/ScrollToTop';
import { Toaster } from 'react-hot-toast';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const login = useAuthStore((state) => state.login);

    useEffect(() => {
        const initAuth = async () => {
            const storedUserId = localStorage.getItem('userId');
            if (storedUserId) {
                try {
                    const res = await authApi.getUserProfile(storedUserId);
                    const user = res.data.user || res.data;
                    if (user) {
                        login(user);
                        // Sync Wishlist (if exists)
                        if (user.wishlist) {
                            useWishlistStore.getState().setWishlist(user.wishlist);
                        }
                    }
                } catch (error) {
                    console.error("Failed to restore session:", error);
                    localStorage.removeItem('userId'); // Clear invalid session
                    localStorage.removeItem('token');
                    document.cookie = "token=; path=/; max-age=0";
                }
            }
            // Minimum loading time for aesthetic purposes, but ensure auth check is done
            setTimeout(() => setIsLoading(false), 1000);
        };

        initAuth();
    }, [login]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <LeafLoader />
            </div>
        );
    }
    return (
        <Router>
            <ConfigProvider>
                <ThemeProvider>
                    <QueryProvider>
                        <ScrollToTop />
                        <div className="min-h-screen bg-bg text-text font-body">
                            <AppRoutes />
                            <Toaster position="bottom-center" />
                        </div>
                    </QueryProvider>
                </ThemeProvider>
            </ConfigProvider>
        </Router>
    );
}

export default App;
