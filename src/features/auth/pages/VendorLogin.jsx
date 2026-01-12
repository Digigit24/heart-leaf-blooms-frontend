import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/app/store/auth.store';
import { authApi } from '@/features/auth/api/auth.api';
import { PATHS } from '@/app/routes/paths';
import { Eye, EyeOff, Loader2, Store } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VendorLogin() {
    const navigate = useNavigate();
    const { login } = useAuthStore(); // Using same auth store for now, generic user/vendor handling
    const [formData, setFormData] = useState({ vendorId: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Updated Payload keys for Vendor Login: vendorId, password
            const response = await authApi.loginVendor(formData);
            const data = response.data;
            const vendor = data.vendor || data;
            const token = data.token; // Correct field for vendor token per API guide

            if (token) {
                // Specific vendor token handling if needed, or share same storage
                localStorage.setItem('vendor_token', token);
                document.cookie = `vendor_token=${token}; path=/; max-age=604800; secure; samesite=strict`;
            }

            // Login to store - ensure store can handle vendor role or just generic user object
            login({ ...vendor, role: 'vendor' });

            toast.success(`Welcome back, ${vendor.shopName || 'Vendor'}!`);
            navigate(PATHS.VENDOR_DASHBOARD); // Vendor specific dashboard route

        } catch (err) {
            console.error("Vendor Login Error:", err);
            toast.error(err.response?.data?.message || 'Login failed. Invalid Vendor ID or Password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] px-4 py-12">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl translate-x-10 -translate-y-10 pointer-events-none" />

                <div className="text-center mb-8 relative z-10">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary">
                        <Store size={24} />
                    </div>
                    <h1 className="font-serif text-3xl text-primary font-bold mb-2">Vendor Portal</h1>
                    <p className="text-muted text-sm">Manage your shop and orders.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#0F3D2E]/70 mb-2">Vendor ID</label>
                        <input
                            type="text"
                            required
                            className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#0F3D2E] focus:ring-1 focus:ring-[#0F3D2E] outline-none transition-all bg-surface-2/50"
                            placeholder="e.g. 677e2b..."
                            value={formData.vendorId}
                            onChange={(e) => setFormData({ ...formData, vendorId: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#0F3D2E]/70 mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#0F3D2E] focus:ring-1 focus:ring-[#0F3D2E] outline-none transition-all bg-surface-2/50 pr-12"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0F3D2E] transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-accent text-primary font-bold rounded-xl hover:bg-accent/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : 'Login to Shop'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-muted">
                    Not a vendor?{' '}
                    <Link to={PATHS.LOGIN} className="font-bold text-[#0F3D2E] hover:underline">
                        Customer Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
