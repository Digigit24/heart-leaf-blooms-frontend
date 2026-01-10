import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import QueryProvider from './providers/QueryProvider';
import ThemeProvider from './providers/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LeafLoader from '@/components/ui/LeafLoader';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate initial loading
        const timer = setTimeout(() => setIsLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <LeafLoader />
            </div>
        );
    }
    return (
        <Router>
            <ThemeProvider>
                <QueryProvider>
                    <div className="flex flex-col min-h-screen bg-bg text-text font-body">
                        <Header />
                        <main className="grow">
                            <AppRoutes />
                        </main>
                        <Footer />
                    </div>
                </QueryProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App;
