import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartSidebar from './CartSidebar';
import WishlistSidebar from './WishlistSidebar';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow">
                <Outlet />
            </main>
            <Footer />
            <CartSidebar />
            <WishlistSidebar />
        </div>
    );
};

export default MainLayout;
