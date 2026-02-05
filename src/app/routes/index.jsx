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
import Offers from '@/features/catalog/pages/Offers';
import Contact from '@/features/info/pages/Contact';
import CorporatePackage from '@/features/info/pages/CorporatePackage';
import OrderTracking from '@/features/orders/pages/OrderTracking';
import Payment from '@/features/checkout/pages/Payment';
import AddressList from '@/features/profile/pages/AddressList';
import AddressForm from '@/features/profile/pages/AddressForm';
import WishlistPage from '@/features/wishlist/pages/WishlistPage';

import MainLayout from '@/components/layout/MainLayout';
import AdminLayout from '@/features/admin/components/AdminLayout';
import ManageProducts from '@/features/admin/pages/ManageProducts';
import ManageVendors from '@/features/admin/pages/ManageVendors';
import ManageOrders from '@/features/admin/pages/ManageOrders';

import ManageBanners from '@/features/admin/pages/ManageBanners';
import ManageCategories from '@/features/admin/pages/ManageCategories';
import ManageReviews from '@/features/admin/pages/ManageReviews';

import { useConfig } from '@/context/ConfigContext';

const AppRoutes = () => {
    const { isMultivendor } = useConfig();
    return (
        <Routes>
            {/* Public Layout & Routes */}
            <Route element={<MainLayout />}>
                <Route path={PATHS.HOME} element={<Home />} />
                <Route path={PATHS.ABOUT} element={<About />} />
                <Route path={PATHS.OFFERS} element={<Offers />} />
                <Route path={PATHS.CONTACT} element={<Contact />} />
                <Route path={PATHS.CORPORATE_PACKAGE} element={<CorporatePackage />} />
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
                    <Route path="/checkout/payment" element={<Payment />} />

                    <Route path={PATHS.ORDERS} element={<Orders />} />
                    <Route path="/orders/:id" element={<OrderDetails />} />
                    <Route path="/orders/track/:id" element={<OrderTracking />} />

                    {/* Profile Routes */}
                    <Route path="/profile/addresses" element={<AddressList />} />
                    <Route path="/profile/addresses/new" element={<AddressForm />} />
                    <Route path="/profile/addresses/edit/:id" element={<AddressForm />} />
                    <Route path={PATHS.WISHLIST} element={<WishlistPage />} />
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
                    <Route path={PATHS.ADMIN_BANNERS} element={<ManageBanners />} />
                    <Route path={PATHS.ADMIN_CATEGORIES} element={<ManageCategories />} />
                    <Route path={PATHS.ADMIN_REVIEWS} element={<ManageReviews />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
