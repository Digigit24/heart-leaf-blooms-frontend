import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/app/store/auth.store';
import { authApi } from '@/features/auth/api/auth.api';
import { PATHS } from '@/app/routes/paths';
import { Eye, EyeOff, Loader2, ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLogin() {
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // DEMO ADMIN LOGIN BYPASS
        if (formData.email === 'admin@demo.com' && formData.password === 'admin') {
            const demoAdmin = {
                id: 'demo-admin-123',
                name: 'Demo Admin',
                email: 'admin@demo.com',
                role: 'admin',
            };

            localStorage.setItem('admin_token', 'demo-admin-token-123');
            const host = window.location.hostname;
            document.cookie = `token=demo-admin-token-123; path=/; max-age=604800; secure; samesite=strict`;

            login({ ...demoAdmin, role: 'admin' });
            toast.success('Welcome, Demo Administrator.');
            navigate(PATHS.ADMIN_DASHBOARD);
            setLoading(false);
            return;
        }

        try {
            const response = await authApi.loginAdmin(formData);
            const { token, admin, message } = response.data;

            if (token) {
                localStorage.setItem('admin_token', token);
                const host = window.location.hostname;
                document.cookie = `token=${token}; path=/; max-age=604800; secure; samesite=strict`;
                document.cookie = `token=${token}; path=/; domain=${host}; max-age=604800; secure; samesite=strict`;
            }

            if (admin) {
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
        <div className="min-h-screen flex bg-[#FDFBF7]">
            {/* Left Panel - Authoritative Visual (Green Theme) */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#0F3D2E] text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=3270&auto=format&fit=crop"
                        alt="Admin Workspace"
                        className="w-full h-full object-cover opacity-100"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                </div>

                <div className="relative z-10 flex flex-col justify-between p-16 w-full">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                            <ShieldCheck size={18} className="text-[#C6A15B]" />
                        </div>
                        <span className="font-serif text-xl tracking-wide italic">Heart Leaf <span className="not-italic font-sans text-xs bg-[#C6A15B] text-[#0F3D2E] px-2 py-0.5 rounded-full ml-2 font-bold uppercase tracking-wider">Admin</span></span>
                    </div>

                    <div className="space-y-6 max-w-lg">
                        <h1 className="font-serif text-5xl leading-tight">
                            Command <span className="text-[#C6A15B] italic">Center</span>
                        </h1>
                        <p className="text-white/80 text-lg font-light leading-relaxed">
                            Secure gateway for system administration. Monitor performance, manage users, and update content in real-time.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-white/60 font-medium tracking-widest uppercase">
                        <Lock size={14} className="text-[#C6A15B]" />
                        <span>256-Bit SSL Encrypted</span>
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16 relative">
                {/* Mobile Background Texture */}
                <div className="absolute inset-0 lg:hidden bg-[#FDFBF7]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6A15B]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0F3D2E]/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="w-full max-w-md relative z-10">
                    <div className="mb-10">
                        <h2 className="font-serif text-4xl text-[#0F3D2E] mb-3">System Login</h2>
                        <p className="text-[#5C6B63]">Enter your credentials to access the dashboard.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative group">
                            <input
                                type="email"
                                required
                                className={`peer w-full h-14 px-4 bg-white rounded-xl border-2 outline-none transition-all duration-300 font-medium text-[#0F3D2E] placeholder-transparent
                                    ${focusedField === 'email' || formData.email ? 'border-[#0F3D2E] shadow-lg shadow-[#0F3D2E]/5' : 'border-gray-200 hover:border-gray-300'}
                                `}
                                id="admin-email"
                                placeholder="Admin Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                            />
                            <label
                                htmlFor="admin-email"
                                className={`absolute left-4 transition-all duration-300 pointer-events-none text-[#5C6B63] font-medium
                                    ${focusedField === 'email' || formData.email
                                        ? '-top-3 bg-white px-2 text-xs text-[#0F3D2E] font-bold tracking-wider'
                                        : 'top-1/2 -translate-y-1/2 text-sm'}
                                `}
                            >
                                ADMIN EMAIL
                            </label>
                        </div>

                        <div className="relative group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                className={`peer w-full h-14 px-4 bg-white rounded-xl border-2 outline-none transition-all duration-300 font-medium text-[#0F3D2E] placeholder-transparent pr-12
                                    ${focusedField === 'password' || formData.password ? 'border-[#0F3D2E] shadow-lg shadow-[#0F3D2E]/5' : 'border-gray-200 hover:border-gray-300'}
                                `}
                                id="admin-password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                onFocus={() => setFocusedField('password')}
                                onBlur={() => setFocusedField(null)}
                            />
                            <label
                                htmlFor="admin-password"
                                className={`absolute left-4 transition-all duration-300 pointer-events-none text-[#5C6B63] font-medium
                                    ${focusedField === 'password' || formData.password
                                        ? '-top-3 bg-white px-2 text-xs text-[#0F3D2E] font-bold tracking-wider'
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
                                        <span>Verifying...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Authenticate</span>
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                        </button>
                    </form>

                    <div className="mt-8 text-center text-xs text-[#5C6B63]">
                        Protected by centralized authentication system.
                    </div>
                </div>
            </div>
        </div>
    );
}
