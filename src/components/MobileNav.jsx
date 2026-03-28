import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Library, User } from 'lucide-react';

const MobileNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Helper to check if the current route is active
    const isActive = (path) => location.pathname === path;

    const navItems = [
        { label: 'Home', icon: Home, path: '/home' },
        { label: 'Search', icon: Search, path: '/search' },
        { label: 'Library', icon: Library, path: '/library' },
        { label: 'Profile', icon: User, path: '/profile' },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-lg border-t border-white/5 px-6 py-3">
            <div className="flex justify-between items-center max-w-md mx-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    
                    return (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.path)}
                            className="flex flex-col items-center gap-1 group relative"
                        >
                            {/* Icon with active color transition */}
                            <Icon 
                                size={24} 
                                strokeWidth={active ? 2.5 : 2}
                                className={`transition-all duration-300 ${
                                    active ? 'text-green-500 scale-110' : 'text-gray-400 group-hover:text-white'
                                }`} 
                            />
                            
                            {/* Label */}
                            <span className={`text-[10px] font-bold uppercase tracking-tighter transition-colors ${
                                active ? 'text-green-500' : 'text-gray-500'
                            }`}>
                                {item.label}
                            </span>

                            {/* Active Indicator Glow */}
                            {active && (
                                <div className="absolute -top-1 w-1 h-1 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]" />
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default MobileNav;