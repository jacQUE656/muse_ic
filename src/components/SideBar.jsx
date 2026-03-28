import { ArrowRight, Home, Library, Plus, Search, Trash2, X, User } from "lucide-react"; // Added User icon
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { PlaylistContext } from "../context/PlaylistContext";

const SideBar = () => {
    const navigate = useNavigate();
    const [showSearchInput, setShowSearchInput] = useState(false);
    const { searchQuery, setSearchQuery, setIsSearchActive, clearSearch } = useSearch();
    const { playlists, createPlaylist, loading, removePlaylist } = useContext(PlaylistContext);

    const handleSearchClick = () => {
        setIsSearchActive(true);
        setShowSearchInput(true);
        navigate("/search");
    };

    const handleClearSearch = () => {
        setShowSearchInput(false);
        clearSearch();
    };

    const handleCreatePlaylist = async () => {
        const pName = prompt("Enter playlist name :");
        if (!pName) return;
        const pDesc = prompt("Enter playlist description :");
        if (!pDesc) return;
        await createPlaylist(pName, pDesc);
    };

    return (
        <div className="h-full p-2 flex flex-col gap-2 text-white hidden md:flex md:w-[90px] lg:w-[25%] transition-all duration-300">
            
            {/* TOP NAVIGATION SECTION */}
            <div className="bg-[#121212] rounded-lg flex flex-col py-2">
                
                {/* PROFILE SECTION */}
                <div
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-4 px-6 py-3 cursor-pointer hover:text-green-400 transition-colors group relative"
                >
                    <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-green-400 transition-all">
                        <User className="w-4 h-4" />
                    </div>
                    <p className="font-bold hidden lg:block">Profile</p>
                    {/* Tooltip for tablet mode */}
                    <span className="absolute left-16 bg-gray-800 text-white text-xs p-2 rounded hidden md:group-hover:block lg:hidden z-50">Profile</span>
                </div>

                <div className="h-[1px] bg-white/5 mx-6 my-1 hidden lg:block" />

                <div
                    onClick={() => navigate('/home')}
                    className="flex items-center gap-4 px-6 py-3 cursor-pointer hover:text-green-400 transition-colors group relative"
                >
                    <Home className="w-6 h-6 shrink-0" />
                    <p className="font-bold hidden lg:block">Home</p>
                    <span className="absolute left-16 bg-gray-800 text-white text-xs p-2 rounded hidden md:group-hover:block lg:hidden z-50">Home</span>
                </div>

                <div className="px-2 lg:px-6 py-2">
                    {!showSearchInput ? (
                        <div
                            onClick={handleSearchClick}
                            className="flex items-center gap-4 px-4 py-1 hover:text-green-400 transition-colors cursor-pointer relative group"
                        >
                            <Search className="w-6 h-6 shrink-0" />
                            <p className="font-bold hidden lg:block">Search</p>
                            <span className="absolute left-16 bg-gray-800 text-white text-xs p-2 rounded hidden md:group-hover:block lg:hidden z-50">Search</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Search className="w-5 h-5 text-gray-400 shrink-0 hidden lg:block" />
                            <input
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-[#2a2a2a] text-white placeholder-gray-400 px-3 py-1.5 rounded-full text-xs focus:outline-none focus:ring-1 focus:ring-green-400 hidden lg:block"
                                autoFocus
                            />
                            <button onClick={handleClearSearch} className="lg:hidden p-2">
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                            <button onClick={handleClearSearch} className="hidden lg:block">
                                <X className="w-4 h-4 text-gray-400 hover:text-white" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* LIBRARY SECTION */}
            <div className="bg-[#121212] flex-1 rounded-lg flex flex-col overflow-hidden">
                <div className="p-4 flex items-center justify-center lg:justify-between">
                    <div className="flex items-center gap-3">
                        <Library className="w-6 h-6 text-gray-400 shrink-0" />
                        <p className="font-semibold text-gray-400 hidden lg:block">Your Library</p>
                    </div>
                    <div className="hidden lg:flex items-center gap-3">
                        <Plus
                            onClick={handleCreatePlaylist}
                            className="w-5 h-5 cursor-pointer hover:text-green-400 transition-colors" 
                        />
                        <ArrowRight className="w-5 h-5 cursor-pointer hover:text-green-400 transition-colors" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-2 lg:px-4 py-2 custom-scrollbar">
                    {playlists.length > 0 ? (
                        playlists.map((playlist) => (
                            <div 
                                key={playlist.id} 
                                onClick={() => navigate(`/playlist/${playlist.id}`)}
                                className="group flex items-center justify-between cursor-pointer hover:bg-[#ffffff10] rounded-md p-2 transition-colors"
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="w-10 h-10 bg-[#282828] shrink-0 rounded flex items-center justify-center text-gray-400 font-bold">
                                        {playlist.name[0]?.toUpperCase()}
                                    </div>
                                    <div className="hidden lg:block overflow-hidden">
                                        <p className="font-medium truncate text-sm text-white">{playlist.name}</p>
                                        <p className="text-xs text-gray-400">Playlist</p>
                                    </div>
                                </div>
                                
                                <button
                                    className="hidden lg:block opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-all"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if(confirm("Delete playlist?")) removePlaylist(playlist.id);
                                    }}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 bg-[#242424] rounded-lg hidden lg:block">
                            <h1 className="text-sm font-bold">Create your first playlist</h1>
                            <p className="text-xs font-light mt-1">It's easy, we'll help you</p>
                            <button
                                onClick={handleCreatePlaylist}
                                disabled={loading}
                                className="px-4 py-1.5 bg-white text-xs font-bold text-black rounded-full mt-4 hover:scale-105 transition-transform"
                            >
                                {loading ? "Creating..." : "Create playlist"}
                            </button>
                        </div>
                    )}
                </div>

                <div className="hidden lg:block p-4 bg-[#242424] m-4 rounded-lg">
                    <h1 className="text-sm font-bold">Find podcasts to follow</h1>
                    <button className="px-4 py-1.5 bg-white text-xs font-bold text-black rounded-full mt-3 hover:scale-105 transition-transform">
                        Browse podcasts
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SideBar;