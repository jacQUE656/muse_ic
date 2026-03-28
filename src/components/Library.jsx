import React, { useContext, useState, useRef } from 'react';
import { PlaylistContext } from '../context/PlaylistContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Music, Search, X, Trash2, Edit2, Info } from 'lucide-react';
import toast from 'react-hot-toast';

const Library = () => {
    const { playlists, createPlaylist, removePlaylist, updatePlaylist } = useContext(PlaylistContext);
    const [filterQuery, setFilterQuery] = useState("");
    const [selectedPlaylist, setSelectedPlaylist] = useState(null); 
    const navigate = useNavigate();
    const timerRef = useRef(null);

    // --- LONG PRESS LOGIC (For Mobile Feel) ---
    const startPress = (playlist) => {
        timerRef.current = setTimeout(() => {
            setSelectedPlaylist(playlist);
            if (window.navigator.vibrate) window.navigator.vibrate(50); // Haptic feedback
        }, 600); 
    };

    const endPress = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
    };

    // --- HANDLERS ---
    const handleCreate = async () => {
        const pName = prompt("Playlist Name:");
        if (pName) await createPlaylist(pName, "My Muse Collection");
    };

    const handleRename = async () => {
        const newName = prompt("New Name:", selectedPlaylist.name);
        if (newName && newName !== selectedPlaylist.name) {
            await updatePlaylist(selectedPlaylist.id, newName);
            toast.success("Renamed!");
        }
        setSelectedPlaylist(null);
    };

    const handleDelete = async () => {
        if (window.confirm(`Delete "${selectedPlaylist.name}"?`)) {
            await removePlaylist(selectedPlaylist.id);
            toast.success("Removed");
            setSelectedPlaylist(null);
        }
    };

    const filtered = playlists.filter(p => 
        p.name.toLowerCase().includes(filterQuery.toLowerCase())
    );

    return (
        <div className="flex-1 bg-gradient-to-b from-[#1a1a1a] to-black min-h-screen p-6 pb-40 overflow-y-auto custom-scrollbar">
            
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Library</h1>
                <button onClick={handleCreate} className="p-2 bg-green-500 rounded-full shadow-lg active:scale-90 transition-transform">
                    <Plus className="text-black" size={20} strokeWidth={3} />
                </button>
            </div>

            {/* SEARCH BAR */}
            <div className="relative mb-8 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-500 transition-colors" size={18} />
                <input 
                    type="text"
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    placeholder="Search your collection..."
                    className="w-full bg-[#121212] border border-white/5 text-white text-sm pl-12 pr-10 py-3 rounded-2xl focus:outline-none focus:ring-1 focus:ring-green-500/50 transition-all"
                />
            </div>

            {/* GRID DISPLAY */}
            <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {filtered.map((playlist) => (
                    <div 
                        key={playlist.id} 
                        onTouchStart={() => startPress(playlist)}
                        onTouchEnd={endPress}
                        onMouseDown={() => startPress(playlist)}
                        onMouseUp={endPress}
                        onClick={() => !selectedPlaylist && navigate(`/playlist/${playlist.id}`)}
                        className="bg-[#121212]/50 backdrop-blur-sm p-3 rounded-2xl border border-white/5 active:scale-95 transition-all"
                    >
                        <div className="aspect-square w-full bg-gradient-to-br from-neutral-800 to-black rounded-xl mb-3 flex items-center justify-center shadow-lg">
                            <Music className="text-white/20" size={32} />
                        </div>
                        <p className="text-white font-bold truncate text-sm">{playlist.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase font-black mt-1">Playlist</p>
                    </div>
                ))}
            </div>

            {/* --- ACTION MENU OVERLAY (Long Press) --- */}
            {selectedPlaylist && (
                <div className="fixed inset-0 z-[110] flex items-end justify-center px-4 pb-10">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedPlaylist(null)} />
                    
                    <div className="relative w-full max-w-sm bg-[#1a1a1a] border border-white/10 rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-10">
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/5">
                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-500">
                                <Music size={24} />
                            </div>
                            <h3 className="text-white font-bold">{selectedPlaylist.name}</h3>
                        </div>

                        <div className="space-y-2">
                            <button onClick={handleRename} className="w-full flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl text-white">
                                <Edit2 size={20} className="text-green-400" />
                                <span className="font-semibold text-sm">Rename</span>
                            </button>
                            <button onClick={handleDelete} className="w-full flex items-center gap-4 p-4 hover:bg-red-500/10 rounded-2xl text-red-500">
                                <Trash2 size={20} />
                                <span className="font-semibold text-sm">Delete Playlist</span>
                            </button>
                            <button onClick={() => setSelectedPlaylist(null)} className="w-full mt-4 p-4 bg-white/5 rounded-2xl text-gray-400 font-bold text-xs uppercase tracking-widest text-center">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Library;