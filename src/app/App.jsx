import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import QueryProvider from './providers/QueryProvider';
import ThemeProvider from './providers/ThemeProvider';
import Header from '@/components/layout/Header';


function App() {
    return (
        <Router>
            <ThemeProvider>
                <QueryProvider>
                    <div className="flex flex-col min-h-screen bg-bg text-text font-body">
                        <Header />
                        <main className="grow">
                            <AppRoutes />
                        </main>

                    </div>
                </QueryProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App;
