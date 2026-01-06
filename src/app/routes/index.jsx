import { Routes, Route } from 'react-router-dom';
import { PATHS } from './paths';

// Pages
import Home from '@/features/catalog/pages/Home';
import Login from '@/features/auth/pages/Login';
import Register from '@/features/auth/pages/Register';
import ForgotPassword from '@/features/auth/pages/ForgotPassword';
import Cart from '@/features/cart/pages/Cart';
import Checkout from '@/features/checkout/pages/Checkout';
import Orders from '@/features/orders/pages/Orders';
import OrderDetails from '@/features/orders/pages/OrderDetails';
import VendorDashboard from '@/features/vendorPanel/pages/Dashboard';
import AdminDashboard from '@/features/admin/pages/AdminDashboard';
import ProductDetails from '@/features/catalog/pages/ProductDetails';
import Category from '@/features/catalog/pages/Category';
import About from '@/features/info/pages/About';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={PATHS.HOME} element={<Home />} />
            <Route path={PATHS.ABOUT} element={<About />} />
            <Route path={PATHS.PRODUCTS} element={<Category />} />
            <Route path={PATHS.LOGIN} element={<Login />} />
            <Route path={PATHS.REGISTER} element={<Register />} />
            <Route path={PATHS.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path={PATHS.CART} element={<Cart />} />
            <Route path={PATHS.CHECKOUT} element={<Checkout />} />
            <Route path={PATHS.ORDERS} element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path={PATHS.VENDOR_DASHBOARD} element={<VendorDashboard />} />
            <Route path={PATHS.ADMIN_DASHBOARD} element={<AdminDashboard />} />
        </Routes>
    );
};

export default AppRoutes;
