import { LogIn } from 'lucide-react';

const GoogleButton = ({ text }) => {
    const handleGoogleLogin = () => {
        const GOOGLE_AUTH_URL = "https://muse-backend-1.onrender.com/oauth2/authorization/google";
        window.location.href = GOOGLE_AUTH_URL;
    };

    return (
        <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full bg-white text-black py-3 px-4 rounded-full font-bold transition-all hover:bg-gray-200 active:scale-95 shadow-md mb-4"
        >
            {/* Lucide Icon */}
            <LogIn size={20} strokeWidth={2.5} />
            
            <span>{text}</span>
        </button>
    );
};