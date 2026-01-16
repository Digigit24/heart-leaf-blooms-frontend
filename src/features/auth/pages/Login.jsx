import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/app/store/auth.store';
import { authApi } from '@/features/auth/api/auth.api';
import { PATHS } from '@/app/routes/paths';
import { Eye, EyeOff, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';

export default function Login() {
  const navigate = useNavigate();
  const { isMultivendor } = useConfig();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({ user_email: '', user_password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authApi.loginUser(formData);
      const data = response.data;
      const user = data.user || data;
      const token = data.token;

      if (!user) throw new Error("No user data returned");

      if (token) {
        localStorage.setItem('token', token);
        // Set cookies aggressively matching the logout logic
        const host = window.location.hostname;
        document.cookie = `token=${token}; path=/; max-age=604800; secure; samesite=strict`;
        document.cookie = `token=${token}; path=/; domain=${host}; max-age=604800; secure; samesite=strict`;
      }

      login(user);
      const userId = user._id || user.id;
      if (userId) {
        localStorage.setItem('userId', userId);
      }

      navigate(PATHS.HOME);
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FDFBF7]">
      {/* Left Panel - Visual & Brand */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#0F3D2E] text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1614531341773-3e9750e0ce64?q=80&w=3348&auto=format&fit=crop"
            alt="Botanical Background"
            className="w-full h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-16 w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Sparkles size={18} className="text-[#C6A15B]" />
            </div>
            <span className="font-serif text-xl tracking-wide italic">Heart Leaf Blooms</span>
          </div>

          <div className="space-y-6 max-w-lg">
            <h1 className="font-serif text-5xl leading-tight">
              Bring nature's <br />
              <span className="text-[#C6A15B] italic">serenity</span> indoors.
            </h1>
            <p className="text-white/80 text-lg font-light leading-relaxed">
              Curating the finest rare plants and botanical accessories for your personal sanctuary. Join our community of plant lovers today.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-white/60 font-medium tracking-widest uppercase">
            <span>Est. 2024</span>
            <div className="w-12 h-px bg-white/20" />
            <span>Premium Botanicals</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16 relative">
        {/* Mobile Background Texture (Subtle) */}
        <div className="absolute inset-0 lg:hidden bg-[#FDFBF7]">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#C6A15B]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#0F3D2E]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="mb-10">
            <h2 className="font-serif text-4xl text-[#0F3D2E] mb-3">Welcome Back</h2>
            <p className="text-[#5C6B63]">Please enter your details to sign in.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100 flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <input
                type="email"
                required
                className={`peer w-full h-14 px-4 bg-white rounded-xl border-2 outline-none transition-all duration-300 font-medium text-[#0F3D2E] placeholder-transparent
                  ${focusedField === 'email' || formData.user_email ? 'border-[#0F3D2E] shadow-lg shadow-[#0F3D2E]/5' : 'border-gray-200 hover:border-gray-300'}
                `}
                id="email"
                placeholder="Email"
                value={formData.user_email}
                onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              />
              <label
                htmlFor="email"
                className={`absolute left-4 transition-all duration-300 pointer-events-none text-[#5C6B63] font-medium
                  ${focusedField === 'email' || formData.user_email
                    ? '-top-3 bg-white px-2 text-xs text-[#0F3D2E] font-bold tracking-wider'
                    : 'top-1/2 -translate-y-1/2 text-sm'}
                `}
              >
                EMAIL ADDRESS
              </label>
            </div>

            <div className="relative group">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className={`peer w-full h-14 px-4 bg-white rounded-xl border-2 outline-none transition-all duration-300 font-medium text-[#0F3D2E] placeholder-transparent pr-12
                  ${focusedField === 'password' || formData.user_password ? 'border-[#0F3D2E] shadow-lg shadow-[#0F3D2E]/5' : 'border-gray-200 hover:border-gray-300'}
                `}
                id="password"
                placeholder="Password"
                value={formData.user_password}
                onChange={(e) => setFormData({ ...formData, user_password: e.target.value })}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
              />
              <label
                htmlFor="password"
                className={`absolute left-4 transition-all duration-300 pointer-events-none text-[#5C6B63] font-medium
                  ${focusedField === 'password' || formData.user_password
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0F3D2E] focus:ring-[#0F3D2E] transition-all cursor-pointer" />
                <span className="text-[#5C6B63] group-hover:text-[#0F3D2E] transition-colors">Remember me</span>
              </label>
              <Link to={PATHS.FORGOT_PASSWORD} className="font-medium text-[#C6A15B] hover:text-[#0F3D2E] transition-colors">
                Forgot Password?
              </Link>
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
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>

          <div className="mt-10 flex items-center gap-4">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-xs text-[#5C6B63] font-medium uppercase tracking-wider">Or continue with</span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          <div className="mt-6 text-center">
            <p className="text-[#5C6B63]">
              Don't have an account?{' '}
              <Link to={PATHS.REGISTER} className="font-bold text-[#0F3D2E] hover:underline decoration-2 underline-offset-4">
                Create free account
              </Link>
            </p>
          </div>

          {isMultivendor && (
            <div className="mt-8 text-center">
              <Link
                to={PATHS.VENDOR_LOGIN}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-xs font-bold text-[#5C6B63] hover:border-[#0F3D2E] hover:text-[#0F3D2E] bg-white transition-all uppercase tracking-wider"
              >
                <Sparkles size={14} />
                Vendor Access
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}