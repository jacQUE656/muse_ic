import { useState } from "react";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import EmailVerification from "./EmailVerifiation";
import { Link } from "react-router-dom";
import { LogIn, User, Phone, Mail, Lock, Loader2 } from "lucide-react"; // Added Lucide Icons

const Register = ({ onSwitchToLogin }) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();
    const [isVerifying, setIsVerifying] = useState(false);

    // --- GOOGLE REGISTER HANDLER ---
    const handleGoogleLogin = () => {
        const GOOGLE_AUTH_URL = "https://muse-backend-1.onrender.com/oauth2/authorization/google";
        window.location.href = GOOGLE_AUTH_URL;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!firstname || !lastname || !phonenumber || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            toast.error('Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            toast.error('Passwords do not match!');
            return;
        }
        setLoading(true);
        try {
            const result = await register(firstname, lastname, phonenumber, email, password);
            if (result.success) {
                toast.success(result.message);
                setIsVerifying(true);
            }
        } catch (err) {
            toast.error('Server error occurred...');
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-900 flex items-center justify-center px-4 py-8 md:py-12">
            {isVerifying ? (
                <EmailVerification prefilledEmail={email} />
            ) : (
                <div className="w-full max-w-md space-y-6 md:space-y-8 animate-in fade-in zoom-in duration-300">
                    {/* HEADER */}
                    <div className="text-center">
                        <div className="flex flex-col items-center justify-center mb-4 md:mb-6">
                            <div className="flex items-center justify-center transition-transform hover:scale-110">
                                <img src={assets.logo2} alt="MUSE_logo" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
                                <h1 className="ml-3 text-2xl md:text-3xl font-black text-white tracking-tighter italic">
                                    MUSE
                                </h1>
                            </div>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                            Join MUSE
                        </h2>
                        <p className="text-gray-400 text-sm">
                            Create your account to start listening
                        </p>
                    </div>

                    {/* REGISTER CARD */}
                    <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10">

                        {/* GOOGLE SIGN UP */}
                        <button
                            onClick={handleGoogleLogin}
                            className="flex items-center justify-center gap-3 w-full bg-white text-black py-3 px-4 rounded-xl font-bold transition-all hover:bg-gray-200 active:scale-95 shadow-md mb-6"
                        >
                            <LogIn size={18} strokeWidth={2.5} />
                            <span className="text-sm">SIGN UP WITH GOOGLE</span>
                        </button>

                        {/* DIVIDER */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#0c120c] px-3 text-gray-500 font-bold tracking-widest text-[10px]">OR REGISTER WITH EMAIL</span>
                            </div>
                        </div>

                        <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-xs md:text-sm text-center">
                                    {error}
                                </div>
                            )}

                            {/* NAME FIELDS GRID */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="relative">
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">First Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3.5 top-3 text-gray-500" size={16} />
                                        <input
                                            type="text"
                                            required
                                            className="block w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white text-sm focus:ring-2 focus:ring-green-500 transition-all outline-none"
                                            placeholder="John"
                                            value={firstname}
                                            onChange={e => setFirstname(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="relative">
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">Last Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3.5 top-3 text-gray-500" size={16} />
                                        <input
                                            type="text"
                                            required
                                            className="block w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white text-sm focus:ring-2 focus:ring-green-500 transition-all outline-none"
                                            placeholder="Doe"
                                            value={lastname}
                                            onChange={e => setLastname(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* PHONE FIELD */}
                            <div className="relative">
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3.5 top-3 text-gray-500" size={16} />
                                    <input
                                        type="tel"
                                        required
                                        className="block w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white text-sm focus:ring-2 focus:ring-green-500 transition-all outline-none"
                                        placeholder="+1 (555) 000-0000"
                                        value={phonenumber}
                                        onChange={e => setPhonenumber(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* EMAIL FIELD */}
                            <div className="relative">
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-3 text-gray-500" size={16} />
                                    <input
                                        type="email"
                                        required
                                        className="block w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white text-sm focus:ring-2 focus:ring-green-500 transition-all outline-none"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* PASSWORD FIELDS GRID */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="relative">
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-3 text-gray-500" size={16} />
                                        <input
                                            type="password"
                                            required
                                            className="block w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white text-sm focus:ring-2 focus:ring-green-500 transition-all outline-none"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="relative">
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">Confirm</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-3 text-gray-500" size={16} />
                                        <input
                                            type="password"
                                            required
                                            className="block w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white text-sm focus:ring-2 focus:ring-green-500 transition-all outline-none"
                                            placeholder="••••••••"
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* SUBMIT BUTTON */}
                            <button
                                disabled={loading}
                                className="w-full flex justify-center items-center py-4 px-4 rounded-xl shadow-lg text-sm font-bold text-black bg-green-500 hover:bg-green-400 disabled:opacity-50 transition-all duration-200 active:scale-95"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2" size={18} />
                                        CREATING ACCOUNT...
                                    </>
                                ) : (
                                    'CREATE ACCOUNT'
                                )}
                            </button>
                        </form>

                        {/* SWITCH TO LOGIN */}
                        <div className="mt-6 text-center border-t border-white/5 pt-6">
                            <p className="text-sm text-gray-400">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="text-green-400 hover:text-green-300 font-bold transition-colors"
                                    onClick={onSwitchToLogin}
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>

                        {/* TERMS AND CONDITION */}
                        <div className="mt-4 text-center">
                            <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-widest opacity-60">
                                By creating an account, you agree to our <span className="underline cursor-pointer">Terms</span> and <span className="underline cursor-pointer">Privacy</span>.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;