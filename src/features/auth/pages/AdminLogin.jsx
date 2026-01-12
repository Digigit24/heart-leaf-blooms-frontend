import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/app/store/auth.store';
import { authApi } from '@/features/auth/api/auth.api';
import { PATHS } from '@/app/routes/paths';
import { Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLogin() {
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await authApi.loginAdmin(formData);
            const { token, admin, message } = response.data;

            // Token is set in cookie by backend (HttpOnly/Secure), so we don't manually set document.cookie
            // We store the token in localStorage mostly as a client-side flag if needed by store/interceptors
            if (token) {
                localStorage.setItem('admin_token', token);
                document.cookie = `token=${token}; path=/; max-age=604800; secure; samesite=strict`;
            }

            if (admin) {
                // Login to store with admin details
                login({ ...admin, role: 'admin' });
                toast.success(message || 'Welcome, Administrator.');
                navigate(PATHS.ADMIN_DASHBOARD);
            } else {
                throw new Error("Invalid response: Admin data missing");
            }

        } catch (err) {
            console.error("Admin Login Error:", err);
            toast.error(err.response?.data?.message || 'Access Denied. Invalid Credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#111827] px-4 py-12">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-gray-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl translate-x-10 -translate-y-10 pointer-events-none" />

                <div className="text-center mb-8 relative z-10">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary">
                        <ShieldCheck size={24} />
                    </div>
                    <h1 className="font-serif text-3xl text-gray-900 font-bold mb-2">Admin Access</h1>
                    <p className="text-gray-500 text-sm">Secure area. Authorized personnel only.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Admin Email</label>
                        <input
                            type="email"
                            required
                            className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-gray-50"
                            placeholder="admin@heartleaf.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-gray-50 pr-12"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : 'Authenticate'}
                    </button>
                </form>
            </div>
        </div>
    );
}
