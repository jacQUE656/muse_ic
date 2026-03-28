import { useState } from "react";
import { assets } from "../assets/assets";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react"; // Lucide Icons

const Login = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { login } = useAuth();

  // --- GOOGLE LOGIN HANDLER ---
  const handleGoogleLogin = () => {
    const GOOGLE_AUTH_URL = "https://muse-backend-1.onrender.com/oauth2/authorization/google";
    window.location.href = GOOGLE_AUTH_URL;
  };

  // --- EMAIL/PASSWORD HANDLER ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        toast.success("Welcome Back...");
        navigate('/home');
      } else if (result.needsVerification) {
        toast.error("Please verify your email before logging in.");
        navigate('/verify-email', { state: { email: email } });
      } else {
        setError(result.message);
      }
    } catch (err) {
      toast.error(err.message || 'An unexpected error occurred');
      setError('Server error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-300">

        {/* HEADER & LOGO */}
        <div className="text-center">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="flex items-center justify-center transition-transform hover:scale-110">
              <img src={assets.logo2} alt="MUSE_logo" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
              <h1 className="ml-3 text-3xl md:text-4xl font-black text-white tracking-tighter italic">
                MUSE
              </h1>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-gray-400 text-sm">Sign in to continue your session</p>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-2xl border border-white/10">

          {/* GOOGLE BUTTON */}
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full bg-white text-black py-3 px-4 rounded-full font-bold transition-all hover:bg-gray-200 active:scale-95 shadow-md mb-6"
          >
            <LogIn size={20} strokeWidth={2.5} />
            <span>CONTINUE WITH GOOGLE</span>
          </button>

          {/* DIVIDER */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0c120c] px-3 text-gray-500 font-bold tracking-widest">OR</span>
            </div>
          </div>

          {/* MANUAL LOGIN FORM */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 text-red-400 text-xs text-center">
                {error}
              </div>
            )}

            {/* EMAIL FIELD */}
            <div className="relative">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-500" size={18} />
                <input
                  type="email"
                  required
                  className="block w-full pl-12 pr-4 py-3.5 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD FIELD */}
            <div className="relative">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-500" size={18} />
                <input
                  type="password"
                  required
                  className="block w-full pl-12 pr-4 py-3.5 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="text-right mt-2">
                <Link to="/reset-password" name="forgot" className="text-xs text-green-400 hover:text-green-300 font-medium">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              disabled={loading}
              className="w-full flex justify-center items-center py-4 px-4 rounded-xl shadow-lg text-sm font-bold text-black bg-green-500 hover:bg-green-400 disabled:opacity-50 transition-all active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  PROCESSING...
                </>
              ) : (
                'SIGN IN'
              )}
            </button>
          </form>

          {/* FOOTER SWITCH */}
          <div className="mt-8 text-center pt-6 border-t border-white/5">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-green-400 hover:text-green-300 font-bold transition-colors"
                onClick={onSwitchToRegister}
              >
                Sign Up
              </Link>

            </p>
          </div>
        </div>

        <p className="text-center text-gray-500 text-[10px] uppercase tracking-[0.2em]">
          &copy; 2026 MUSE AI. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;