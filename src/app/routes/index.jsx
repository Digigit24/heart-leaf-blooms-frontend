import { Routes, Route } from 'react-router-dom';
import { PATHS } from './paths';
import { ProtectedRoute, PublicRoute } from './routeGuards';

// Pages
import Home from '@/features/catalog/pages/Home';
import Login from '@/features/auth/pages/Login';
import Register from '@/features/auth/pages/Register';
import ForgotPassword from '@/features/auth/pages/ForgotPassword';
import VendorLogin from '@/features/auth/pages/VendorLogin';
import AdminLogin from '@/features/auth/pages/AdminLogin';
import Cart from '@/features/cart/pages/Cart';
import Checkout from '@/features/checkout/pages/Checkout';
import Orders from '@/features/orders/pages/Orders';
import OrderDetails from '@/features/orders/pages/OrderDetails';
import VendorDashboard from '@/features/vendorPanel/pages/Dashboard';
import AdminDashboard from '@/features/admin/pages/AdminDashboard';
import VendorList from '@/features/vendors/pages/VendorList';
import ProductDetails from '@/features/catalog/pages/ProductDetails';
import Category from '@/features/catalog/pages/Category';
import About from '@/features/info/pages/About';

import MainLayout from '@/components/layout/MainLayout';
import AdminLayout from '@/features/admin/components/AdminLayout';
import ManageProducts from '@/features/admin/pages/ManageProducts';
import ManageVendors from '@/features/admin/pages/ManageVendors';
import ManageOrders from '@/features/admin/pages/ManageOrders';

import { useConfig } from '@/context/ConfigContext';

const AppRoutes = () => {
    const { isMultivendor } = useConfig();
    return (
        <Routes>
            {/* Public Layout & Routes */}
            <Route element={<MainLayout />}>
                <Route path={PATHS.HOME} element={<Home />} />
                <Route path={PATHS.ABOUT} element={<About />} />
                {isMultivendor && <Route path={PATHS.VENDORS} element={<VendorList />} />}
                <Route path={PATHS.PRODUCTS} element={<Category />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path={PATHS.CART} element={<Cart />} />

                {/* Auth Routes (Public Only) */}
                <Route element={<PublicRoute />}>
                    <Route path={PATHS.LOGIN} element={<Login />} />
                    {isMultivendor && <Route path={PATHS.VENDOR_LOGIN} element={<VendorLogin />} />}
                    <Route path={PATHS.ADMIN_LOGIN} element={<AdminLogin />} />
                    <Route path={PATHS.REGISTER} element={<Register />} />
                    <Route path={PATHS.FORGOT_PASSWORD} element={<ForgotPassword />} />
                </Route>

                {/* User Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path={PATHS.CHECKOUT} element={<Checkout />} />
                    <Route path={PATHS.ORDERS} element={<Orders />} />
                    <Route path="/orders/:id" element={<OrderDetails />} />
                </Route>

                {/* Vendor Protected Routes */}
                {isMultivendor && (
                    <Route element={<ProtectedRoute allowedRoles={['vendor']} />}>
                        <Route path={PATHS.VENDOR_DASHBOARD} element={<VendorDashboard />} />
                    </Route>
                )}
            </Route>

            {/* Admin Routes (Admin Only) */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route element={<AdminLayout />}>
                    <Route path={PATHS.ADMIN_DASHBOARD} element={<AdminDashboard />} />
                    <Route path={PATHS.ADMIN_PRODUCTS} element={<ManageProducts />} />
                    {isMultivendor && <Route path={PATHS.ADMIN_VENDORS} element={<ManageVendors />} />}
                    <Route path={PATHS.ADMIN_ORDERS} element={<ManageOrders />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
