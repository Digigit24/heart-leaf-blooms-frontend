import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/app/store/auth.store';
import { authApi } from '@/features/auth/api/auth.api';
import { PATHS } from '@/app/routes/paths';
import { Eye, EyeOff, Loader2, Store, ArrowRight, Sparkles, Leaf } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VendorLogin() {
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const [formData, setFormData] = useState({ vendorId: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await authApi.loginVendor(formData);
            const data = response.data;
            const vendor = data.vendor || data;
            const token = data.token;

            if (token) {
                localStorage.setItem('vendor_token', token);
                const host = window.location.hostname;
                document.cookie = `vendor_token=${token}; path=/; max-age=604800; secure; samesite=strict`;
                document.cookie = `vendor_token=${token}; path=/; domain=${host}; max-age=604800; secure; samesite=strict`;
            }

            login({ ...vendor, role: 'vendor' });
            toast.success(`Welcome back, ${vendor.shopName || 'Vendor'}!`);
            navigate(PATHS.VENDOR_DASHBOARD);

        } catch (err) {
            console.error("Vendor Login Error:", err);
            toast.error(err.response?.data?.message || 'Login failed. Invalid Vendor ID or Password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-[#FDFBF7]">
            {/* Left Panel - Greenhouse Visual */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#0F3D2E] text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=3432&auto=format&fit=crop"
                        alt="Greenhouse Nursery"
                        className="w-full h-full object-cover opacity-70 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0F3D2E] via-[#0F3D2E]/20 to-transparent" />
                </div>

                <div className="relative z-10 flex flex-col justify-between p-16 w-full">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-500/20 backdrop-blur-md flex items-center justify-center border border-yellow-500/30 text-[#C6A15B]">
                            <Store size={18} />
                        </div>
                        <span className="font-serif text-xl tracking-wide italic text-[#F1EFE7]">Heart Leaf <span className="text-[#C6A15B]">Partners</span></span>
                    </div>

                    <div className="space-y-6 max-w-lg">
                        <h1 className="font-serif text-5xl leading-tight">
                            Grow your <br />
                            <span className="text-[#C6A15B] italic">business</span> with us.
                        </h1>
                        <p className="text-[#F1EFE7]/80 text-lg font-light leading-relaxed">
                            Join a curated marketplace of premium botanicals. Manage your inventory, track orders, and reach passionate plant lovers.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-[#F1EFE7]/60 font-medium tracking-widest uppercase">
                        <Leaf size={16} className="text-[#C6A15B]" />
                        <span>Verified Vendors Only</span>
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16 relative">
                {/* Mobile Background Texture (Subtle) */}
                <div className="absolute inset-0 lg:hidden bg-[#FDFBF7]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6A15B]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0F3D2E]/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="w-full max-w-md relative z-10">
                    <div className="mb-10">
                        <h2 className="font-serif text-4xl text-[#0F3D2E] mb-3">Partner Login</h2>
                        <p className="text-[#5C6B63]">Access your shop dashboard.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative group">
                            <input
                                type="text"
                                required
                                className={`peer w-full h-14 px-4 bg-white rounded-xl border-2 outline-none transition-all duration-300 font-medium text-[#0F3D2E] placeholder-transparent
                                    ${focusedField === 'vendorId' || formData.vendorId ? 'border-[#C6A15B] shadow-lg shadow-[#C6A15B]/5' : 'border-gray-200 hover:border-gray-300'}
                                `}
                                id="vendor-id"
                                placeholder="Vendor ID"
                                value={formData.vendorId}
                                onChange={(e) => setFormData({ ...formData, vendorId: e.target.value })}
                                onFocus={() => setFocusedField('vendorId')}
                                onBlur={() => setFocusedField(null)}
                            />
                            <label
                                htmlFor="vendor-id"
                                className={`absolute left-4 transition-all duration-300 pointer-events-none text-[#5C6B63] font-medium
                                    ${focusedField === 'vendorId' || formData.vendorId
                                        ? '-top-3 bg-white px-2 text-xs text-[#C6A15B] font-bold tracking-wider'
                                        : 'top-1/2 -translate-y-1/2 text-sm'}
                                `}
                            >
                                VENDOR ID
                            </label>
                        </div>

                        <div className="relative group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                className={`peer w-full h-14 px-4 bg-white rounded-xl border-2 outline-none transition-all duration-300 font-medium text-[#0F3D2E] placeholder-transparent pr-12
                                    ${focusedField === 'password' || formData.password ? 'border-[#C6A15B] shadow-lg shadow-[#C6A15B]/5' : 'border-gray-200 hover:border-gray-300'}
                                `}
                                id="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                onFocus={() => setFocusedField('password')}
                                onBlur={() => setFocusedField(null)}
                            />
                            <label
                                htmlFor="password"
                                className={`absolute left-4 transition-all duration-300 pointer-events-none text-[#5C6B63] font-medium
                                    ${focusedField === 'password' || formData.password
                                        ? '-top-3 bg-white px-2 text-xs text-[#C6A15B] font-bold tracking-wider'
                                        : 'top-1/2 -translate-y-1/2 text-sm'}
                                `}
                            >
                                PASSWORD
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5C6B63] hover:text-[#0F3D2E] transition-colors p-1"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full h-14 bg-[#0F3D2E] text-white font-bold rounded-xl overflow-hidden hover:shadow-xl hover:shadow-[#0F3D2E]/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                            <div className="relative flex items-center justify-center gap-2 tracking-widest text-sm uppercase">
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={18} />
                                        <span>Opening Shop...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Enter Shop</span>
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-[#5C6B63]">
                        Not a vendor?{' '}
                        <Link to={PATHS.LOGIN} className="font-bold text-[#0F3D2E] hover:underline decoration-2 underline-offset-4">
                            Customer Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
