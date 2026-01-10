import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '@/features/auth/api/auth.api';
import { PATHS } from '@/app/routes/paths';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    user_email: '',
    user_password: '',
    user_mobile: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Basic validation or mapping if needed
      await authApi.registerUser(formData);
      // On success, redirect to login
      navigate(PATHS.LOGIN);
    } catch (err) {
      console.error("Register Error:", err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-primary font-bold mb-2">Join Our Community</h1>
          <p className="text-muted text-sm">Create an account to start your journey.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#0F3D2E]/70 mb-2">Full Name</label>
            <input
              type="text"
              required
              className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#0F3D2E] focus:ring-1 focus:ring-[#0F3D2E] outline-none transition-all bg-surface-2/50"
              placeholder="John Doe"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#0F3D2E]/70 mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#0F3D2E] focus:ring-1 focus:ring-[#0F3D2E] outline-none transition-all bg-surface-2/50"
              placeholder="you@example.com"
              value={formData.user_email}
              onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
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
                value={formData.user_password}
                onChange={(e) => setFormData({ ...formData, user_password: e.target.value })}
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

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#0F3D2E]/70 mb-2">Mobile Number (Optional)</label>
            <input
              type="tel"
              className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#0F3D2E] focus:ring-1 focus:ring-[#0F3D2E] outline-none transition-all bg-surface-2/50"
              placeholder="+91 98765 43210"
              value={formData.user_mobile}
              onChange={(e) => setFormData({ ...formData, user_mobile: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#0F3D2E] text-white font-bold rounded-xl hover:bg-[#0F3D2E]/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-muted">
          Already have an account?{' '}
          <Link to={PATHS.LOGIN} className="font-bold text-[#0F3D2E] hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}