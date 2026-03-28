import { ChevronLeft, ChevronRight, LogOut, User, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            logout();
        }
    }

    // Safely extract username from email
    const username = user?.includes('@') ? user.split('@')[0] : user;

    return (
        <nav className="w-full flex justify-between items-center font-semibold p-4 bg-transparent sticky top-0 z-50">
            {/* Left Side: Navigation Controls */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => navigate(-1)}
                    className="w-8 h-8 md:w-9 md:h-9 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-black transition-all active:scale-90"
                    aria-label="Go back"
                >
                    <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                    onClick={() => navigate(1)}
                    className="hidden sm:flex w-8 h-8 md:w-9 md:h-9 bg-black/60 backdrop-blur-md rounded-full items-center justify-center cursor-pointer hover:bg-black transition-all active:scale-90"
                    aria-label="Go forward"
                >
                    <ChevronRight className="w-5 h-5 text-white" />
                </button>
            </div>

            {/* Right Side: Actions & Profile */}
            <div className="flex items-center gap-2 md:gap-4">
                {/* Premium Button - Hidden on small mobile */}
                <button className="hidden lg:flex items-center gap-1 bg-white text-black text-[13px] md:text-[14px] px-4 py-1.5 rounded-full hover:scale-105 transition-transform active:scale-95">
                    <Sparkles className="w-3.5 h-3.5 fill-black" />
                    Explore Premium
                </button>

                {/* Install App / Mini Button - Visible on smaller screens but not smallest */}
                <p className="hidden md:block bg-black text-white text-[13px] px-4 py-1.5 rounded-full border border-white/20 cursor-pointer hover:border-white transition-colors">
                    Install App
                </p>

                {/* User Profile */}
                <div className="flex items-center gap-2 bg-black/50 px-2 py-1 md:px-3 md:py-1.5 rounded-full border border-white/10">
                    <div className="bg-purple-600 p-1 rounded-full">
                        <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white text-sm hidden sm:inline-block max-w-[100px] truncate">
                        {username || "Guest"}
                    </span>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    title="Logout"
                    className="bg-red-600 hover:bg-red-700 text-white p-2 md:px-4 md:py-1.5 rounded-full text-[14px] cursor-pointer transition-all flex items-center gap-2 active:scale-95"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden md:inline">Logout</span>
                </button>
            </div>
        </nav>
    );
}

export default NavBar;