import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/app/store/auth.store';
import { authApi } from '@/features/auth/api/auth.api';
import { PATHS } from '@/app/routes/paths';
import { Eye, EyeOff, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';
import Lottie from "lottie-react";

export default function Login() {
  const navigate = useNavigate();
  const { isMultivendor } = useConfig();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({ user_email: '', user_password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/images/animations/blooming-flowers.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load Lottie animation:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login form submitted", formData);
    // DEBUG ALERTS
    // alert(`Submitting Form with: ${JSON.stringify(formData)}`);

    setLoading(true);
    setError('');

    // DEMO LOGIN BYPASS MOVED TO CATCH BLOCK
    // Attempts API first, then falls back if credentials match demo user.
    /*
    if (formData.user_email === 'user@demo.com' && formData.user_password === 'demo') {
      console.log("Using demo bypass");
      const demoUser = {
        _id: 'demo-user-123',
        name: 'Demo User',
        email: 'user@demo.com',
        role: 'user',
        phone: '1234567890',
        address: '123 Demo St, Demo City'
      };
      login(demoUser);
      localStorage.setItem('token', 'demo-token-123');
      localStorage.setItem('userId', demoUser._id);
      navigate(PATHS.HOME);
      setLoading(false);
      return;
    }
    */

    try {
      console.log("Calling authApi.loginUser with:", formData);
      // alert("About to call API");

      const response = await authApi.loginUser(formData);

      console.log("Login API Response:", response);
      // alert(`API Response Recieved: ${response.status}`);

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

      console.log("Login successful, navigating home");
      navigate(PATHS.HOME);
    } catch (err) {
      console.error("Login Error:", err);

      // FALLBACK FOR DEMO USER (If API fails with 404/etc)
      if (formData.user_email === 'user@demo.com' && formData.user_password === 'demo') {
        console.log("API failed for demo user, using local fallback");
        const demoUser = {
          _id: 'demo-user-123',
          name: 'Demo User',
          email: 'user@demo.com',
          role: 'user',
          phone: '1234567890',
          address: '123 Demo St, Demo City'
        };
        login(demoUser);
        localStorage.setItem('token', 'demo-token-123');
        localStorage.setItem('userId', demoUser._id);
        navigate(PATHS.HOME);
        setLoading(false);
        return;
      }

      // alert(`Login Failed: ${err.message}`);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FDFBF7] p-4">
      {/* Centered Card Container */}
      <div className="bg-white w-full max-w-[1000px] h-[600px] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row shadow-[#0F3D2E]/10">

        {/* Left Panel - Visual & Brand (Restricted width) */}
        <div className="hidden lg:flex w-5/12 relative  text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            {animationData && (
              <Lottie
                animationData={animationData}
                loop={true}
                className="w-full h-full object-cover opacity-90 scale-110"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-[#0F3D2E]/50 to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col justify-between p-10 w-full h-full">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Sparkles size={14} className="text-[#C6A15B]" />
              </div>
            </div>


          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-7/12 h-full flex flex-col justify-center p-8 lg:p-12 relative bg-white">
          <div className="w-full max-w-sm mx-auto space-y-5">

            <div className="text-center lg:text-left mb-6">
              <h2 className="font-serif text-3xl text-[#0F3D2E] mb-2">Welcome Back</h2>
              <p className="text-[#5C6B63] text-sm">Please enter your details to sign in.</p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-xs font-medium rounded-lg border border-red-100 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="relative group">
                  <input
                    type="email"
                    required
                    className={`peer w-full h-11 px-4 bg-[#F8F9FA] rounded-xl border outline-none transition-all duration-300 font-medium text-[#0F3D2E] placeholder-transparent focus:bg-white
                      ${focusedField === 'email' || formData.user_email ? 'border-[#0F3D2E] ring-1 ring-[#0F3D2E]/5' : 'border-transparent hover:border-gray-200'}
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
                        ? '-top-2 bg-white px-2 text-[10px] text-[#0F3D2E] font-bold tracking-widest'
                        : 'top-1/2 -translate-y-1/2 text-xs'}
                    `}
                  >
                    EMAIL ADDRESS
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className={`peer w-full h-11 px-4 bg-[#F8F9FA] rounded-xl border outline-none transition-all duration-300 font-medium text-[#0F3D2E] placeholder-transparent focus:bg-white pr-10
                      ${focusedField === 'password' || formData.user_password ? 'border-[#0F3D2E] ring-1 ring-[#0F3D2E]/5' : 'border-transparent hover:border-gray-200'}
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
                        ? '-top-2 bg-white px-2 text-[10px] text-[#0F3D2E] font-bold tracking-widest'
                        : 'top-1/2 -translate-y-1/2 text-xs'}
                    `}
                  >
                    PASSWORD
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C6B63] hover:text-[#0F3D2E] transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 text-[#0F3D2E] focus:ring-[#0F3D2E] transition-all cursor-pointer" />
                  <span className="text-[#5C6B63] group-hover:text-[#0F3D2E] transition-colors font-medium">Remember me</span>
                </label>
                <Link to={PATHS.FORGOT_PASSWORD} className="font-bold text-[#0F3D2E] hover:text-[#C6A15B] transition-colors">
                  Forgot Password?
                </Link>
              </div>

              <div className="h-14 w-full relative">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-star"
                >
                  {loading ? (
                    <div className="flex items-center gap-2 relative z-10">
                      <Loader2 className="animate-spin" size={18} />
                      <span>Authenticating...</span>
                    </div>
                  ) : (
                    <span className="relative z-10">Sign In</span>
                  )}

                  {/* Star Animations */}
                  <div className="star-1">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={{ shapeRendering: "geometricPrecision", textRendering: "geometricPrecision", imageRendering: "optimizeQuality", fillRule: "evenodd", clipRule: "evenodd" }} viewBox="0 0 784.11 815.53">
                      <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                        <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
                      </g>
                    </svg>
                  </div>
                  <div className="star-2">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={{ shapeRendering: "geometricPrecision", textRendering: "geometricPrecision", imageRendering: "optimizeQuality", fillRule: "evenodd", clipRule: "evenodd" }} viewBox="0 0 784.11 815.53">
                      <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                        <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
                      </g>
                    </svg>
                  </div>
                  <div className="star-3">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={{ shapeRendering: "geometricPrecision", textRendering: "geometricPrecision", imageRendering: "optimizeQuality", fillRule: "evenodd", clipRule: "evenodd" }} viewBox="0 0 784.11 815.53">
                      <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                        <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
                      </g>
                    </svg>
                  </div>
                  <div className="star-4">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={{ shapeRendering: "geometricPrecision", textRendering: "geometricPrecision", imageRendering: "optimizeQuality", fillRule: "evenodd", clipRule: "evenodd" }} viewBox="0 0 784.11 815.53">
                      <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                        <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
                      </g>
                    </svg>
                  </div>
                  <div className="star-5">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={{ shapeRendering: "geometricPrecision", textRendering: "geometricPrecision", imageRendering: "optimizeQuality", fillRule: "evenodd", clipRule: "evenodd" }} viewBox="0 0 784.11 815.53">
                      <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                        <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
                      </g>
                    </svg>
                  </div>
                  <div className="star-6">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={{ shapeRendering: "geometricPrecision", textRendering: "geometricPrecision", imageRendering: "optimizeQuality", fillRule: "evenodd", clipRule: "evenodd" }} viewBox="0 0 784.11 815.53">
                      <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                        <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
                      </g>
                    </svg>
                  </div>
                </button>
              </div>
            </form>

            <div className="mt-6 flex items-center gap-3 opacity-60">
              <div className="h-px bg-gray-300 flex-1" />
              <span className="text-[10px] text-[#5C6B63] font-bold uppercase tracking-wider">Or</span>
              <div className="h-px bg-gray-300 flex-1" />
            </div>

            <div className="flex flex-col items-center gap-4">
              <p className="text-[#5C6B63] text-xs">
                New here?{' '}
                <Link to={PATHS.REGISTER} className="font-bold text-[#0F3D2E] hover:underline decoration-[#C6A15B] decoration-2 underline-offset-4">
                  Create an account
                </Link>
              </p>
              {isMultivendor && (
                <Link to={PATHS.VENDOR_LOGIN} className="text-[10px] text-[#5C6B63] hover:text-[#0F3D2E] transition-colors uppercase tracking-widest font-bold">
                  Vendor Portal
                </Link>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}