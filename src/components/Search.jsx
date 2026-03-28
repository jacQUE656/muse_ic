import { Music, SearchIcon, X } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Added missing import
import { useSearch } from "../context/SearchContext";
import SongItem from "./SongItem";
import AlbumItem from "./AlbumItem";
import { useState } from "react";

const Search = () => {
  // 1. Removed duplicate 'isSearchActive' and fixed destructuring
  const { searchQuery, setSearchQuery, setIsSearchActive, isSearchActive, searchResults, clearSearch } = useSearch();
  const navigate = useNavigate(); // Added missing hook
   const [showSearchInput, setShowSearchInput] = useState(false);
  const { songs = [], albums = [] } = searchResults;
  const totalResults = (songs?.length || 0) + (albums?.length || 0);

  // 2. Fixed 'handleSearchClick' (Removed setShowSearchInput since it's not defined here)
  const handleSearchClick = () => {
    setIsSearchActive(true);
    navigate("/search");
    setShowSearchInput(true); // Ensure search input is shown when search is activated
  };

  const StateLayout = ({ icon: Icon, title, subtitle, animate = false }) => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 animate-in fade-in duration-500">
      <div className={`p-6 bg-white/5 rounded-full mb-6 ${animate ? 'animate-pulse' : ''}`}>
        <Icon className="w-12 h-12 text-green-500" />
      </div>
      <h2 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tighter">{title}</h2>
      <p className="text-gray-500 max-w-xs text-sm font-medium">{subtitle}</p>
    </div>
  );

  // 1. Initial State & Mobile Input
  // Fixed 'bg-gray' to 'bg-black' (standard Tailwind)
  if (!isSearchActive || (!searchQuery && totalResults === 0)) {
    return (
      <div className="flex flex-col min-h-screen bg-black-199">
        {/* Mobile-Only Search Header */}
        <div className="md:hidden p-4 pt-8">
            <div
              className="relative flex items-center bg-[#121212] rounded-2xl border border-white/5 px-4 py-3 focus-within:border-green-500/50 transition-all">
                <SearchIcon className="w-5 h-5 text-gray-400 mr-3" />
                <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onClick={handleSearchClick} // Ensure search is active on click
                    type="text"
                    placeholder="Artists, songs, or albums"
                    className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-gray-600"
                    autoFocus
                />
                {searchQuery && (
                    <button onClick={clearSearch}>
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                )}
            </div>
        </div>

        <StateLayout 
          icon={SearchIcon} 
          title="Search Muse" 
          subtitle="Explore millions of tracks and albums tailored for you."
          animate={true} 
        />
      </div>
    );
  }

  // 2. No Results State
  if (totalResults === 0 && searchQuery) {
    return (
      <StateLayout 
        icon={X} 
        title="No matches found" 
        subtitle={`We couldn't find anything for "${searchQuery}". Try a different keyword.`} 
      />
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 pb-32 max-w-7xl space-y-12 animate-in slide-in-from-bottom-4 duration-700">
      
      {/* Search Result Header */}
      <div className="border-b border-white/5 pb-8">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-3 uppercase italic tracking-tighter">Results</h1>
        <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-green-500 text-black text-[10px] font-black uppercase rounded-full">
                {totalResults} Hits
            </span>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">
                Showing top matches for <span className="text-white">"{searchQuery}"</span>
            </p>
        </div>
      </div>

      {/* Songs Section */}
      {songs.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Music className="w-5 h-5 text-green-500" />
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Top Songs</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {songs.map((song) => (
              <SongItem key={song.id} {...song} />
            ))}
          </div>
        </section>
      )}

      {/* Albums Section */}
      {albums.length > 0 && (
        <section className="pt-4">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
             <h2 className="text-xl font-black text-white uppercase tracking-tight">Featured Albums</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {albums.map((album) => (
              <AlbumItem 
                key={album.id} 
                {...album}
                image={album.imageUrl || album.image} 
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Search;