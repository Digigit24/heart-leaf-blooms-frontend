import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/app/store/auth.store';
import { authApi } from '@/features/auth/api/auth.api';
import { PATHS } from '@/app/routes/paths';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authApi.loginUser(formData);
      console.log('Login Response:', response.data);

      const user = response.data.user || response.data; // Adjust based on actual backend response
      if (!user) throw new Error("No user data returned");

      login(user); // Update Store
      const userId = user._id || user.id;
      if (userId) {
        localStorage.setItem('userId', userId); // Persist ID
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
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-primary font-bold mb-2">Welcome Back</h1>
          <p className="text-muted text-sm">Sign in to continue to your garden.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#0F3D2E]/70 mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#0F3D2E] focus:ring-1 focus:ring-[#0F3D2E] outline-none transition-all bg-surface-2/50"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            className="w-full h-12 bg-[#0F3D2E] text-white font-bold rounded-xl hover:bg-[#0F3D2E]/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-muted">
          Don't have an account?{' '}
          <Link to={PATHS.REGISTER} className="font-bold text-[#0F3D2E] hover:underline">
            Create Account
          </Link>
        </div>

        <div className="mt-4 text-center text-xs text-muted/60">
          <Link to={PATHS.VENDORS} className="hover:text-primary transition-colors">Viewing as Vendor?</Link>
        </div>
      </div>
    </div>
  );
}