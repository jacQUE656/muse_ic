import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PlaylistContext } from "../context/PlaylistContext";
import { Clock3, Play, Trash2, Music, Edit2 } from "lucide-react";
import { PlayerContext } from "../context/PlayerContext";

const DisplayPlaylist = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { removePlaylist, fetchSinglePlaylist, updatePlaylistName, removeSong } = useContext(PlaylistContext);
    const { toggleMaximize, playPlaylist, track } = useContext(PlayerContext);

    const [playlistData, setPlaylistData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            
            const result = await fetchSinglePlaylist(id);
            if (result.success) {
                setPlaylistData(result.data);
                 setLoading(false);
            } else {
                setPlaylistData(null);
            }
           
        };
        loadData();
    }, [id, fetchSinglePlaylist]);

    const handleDelete = async (pid) => {
        if (window.confirm("Delete this playlist?")) {
            const success = await removePlaylist(pid);
            if (success) navigate('/');
        }
    };

    const handleRename = async () => {
        const newName = prompt("Enter new playlist name:", playlistData.name);
        if (newName && newName !== playlistData.name) {
            const result = await updatePlaylistName(id, newName);
            if (result.success) {
                setPlaylistData(prev => ({ ...prev, name: newName }));
            }
        }
    };

    const handleRemoveSongFromPlaylist = async (playlistId, songId) => {
        const result = await removeSong(playlistId, songId);
        if (result.success) {
            // Update local state to reflect removal immediately
            setPlaylistData(prev => ({
                ...prev,
                songs: prev.songs.filter(s => s.id !== songId)
            }));
        } else {
            alert("Error: " + result.message);
        }
    };

    if (loading) return <div className="text-white p-8 animate-pulse text-center mt-20">Loading playlist...</div>;

    if (!playlistData) return (
        <div className="text-white p-8 text-center mt-20">
            <h2 className="text-2xl font-bold">Playlist not found</h2>
            <button onClick={() => navigate('/home')} className="mt-4 text-green-500 hover:underline">Return Home</button>
        </div>
    );

    return (
        <div className="flex-1 h-full text-white overflow-y-auto bg-gradient-to-b from-gray-900 to-black">
            {/* Header Section */}
            <div className="mt-6 md:mt-12 flex flex-col md:flex-row items-center md:items-end gap-6 px-6">
                {/* Responsive Image/Fallback */}
                <div className="w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 bg-gradient-to-br from-gray-700 to-black shadow-2xl flex items-center justify-center text-6xl md:text-8xl font-bold rounded-lg border border-white/10 shrink-0">
                    {playlistData.name[0].toUpperCase()}
                </div>

                <div className="flex flex-col items-center md:items-start gap-2 w-full overflow-hidden">
                    <p className="text-xs md:text-sm font-bold uppercase tracking-wider">Playlist</p>
                    <div className="flex items-center gap-3 w-full justify-center md:justify-start">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black truncate py-2">
                            {playlistData.name}
                        </h1>
                        <button onClick={handleRename} className="p-2 hover:bg-white/10 rounded-full transition-all shrink-0">
                            <Edit2 className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                        </button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="font-bold hover:underline cursor-pointer text-white">
                            {playlistData.ownerName || "User"}
                        </span>
                        <span>• {playlistData.songs?.length || 0} songs</span>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-6 p-6">
                <button
                    onClick={() => playlistData.songs?.length > 0 && playPlaylist(playlistData.songs, 0)}
                    className="w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-lg active:scale-95"
                >
                    <Play className="fill-black text-black w-6 h-6 ml-1" />
                </button>

                <button
                    onClick={() => handleDelete(playlistData.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                >
                    <Trash2 className="w-6 h-6 md:w-7 md:h-7" />
                </button>
            </div>

            {/* Song Table */}
            <div className="px-2 md:px-6 pb-24">
                {/* Table Header - Hidden on mobile for cleaner look */}
                <div className="hidden md:grid grid-cols-[16px_4fr_3fr_1fr_40px] gap-4 px-4 py-2 border-b border-white/10 text-gray-400 text-sm mb-4 uppercase tracking-widest font-semibold">
                    <p>#</p>
                    <p>Title</p>
                    <p>Album</p>
                    <div className="flex justify-end"><Clock3 className="w-4 h-4" /></div>
                    <div className="text-right"></div>
                </div>

                {/* Song List */}
                <div className="flex flex-col">
                    {playlistData.songs && playlistData.songs.length > 0 ? (
                        playlistData.songs.map((item, index) => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    playPlaylist(playlistData.songs, index);
                                    toggleMaximize();
                                }}
                                // Mobile: 2 columns | Desktop: 5 columns
                                className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[16px_4fr_3fr_1fr_40px] gap-3 md:gap-4 px-3 md:px-4 py-2 rounded-md hover:bg-white/10 group transition-colors cursor-pointer items-center"
                            >
                                {/* Rank/Index - Hidden on extra small mobile */}
                                <p className={`hidden md:block ${track?.id === item.id ? "text-green-500" : "text-gray-400"}`}>
                                    {index + 1}
                                </p>

                                {/* Title & Artist */}
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="relative shrink-0">
                                        {item.image || item.imageUrl ? (
                                            <img src={item.imageUrl || item.image} alt="" className="w-10 h-10 md:w-12 md:h-12 object-cover rounded" />
                                        ) : (
                                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 flex items-center justify-center rounded">
                                                <Music className="w-5 h-5 text-gray-500" />
                                            </div>
                                        )}
                                        {track?.id === item.id && (
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="truncate">
                                        <p className={`font-medium truncate ${track?.id === item.id ? "text-green-500" : "text-white"}`}>
                                            {item.name}
                                        </p>
                                        <p className="text-xs md:text-sm text-gray-400 group-hover:text-white truncate">
                                            {item.artist}
                                        </p>
                                    </div>
                                </div>

                                {/* Album - Hidden on Mobile */}
                                <p className="hidden md:block text-gray-400 text-sm truncate">
                                    {item.album || "Single"}
                                </p>

                                {/* Duration - Hidden on Mobile */}
                                <p className="hidden md:block text-gray-400 text-sm text-right">
                                    {item.duration || "3:45"}
                                </p>

                                {/* Remove Button */}
                                <div className="flex justify-end">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveSongFromPlaylist(playlistData.id, item.id);
                                        }}
                                        className="p-2 text-gray-400 hover:text-red-500 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 opacity-50">
                            <Music className="w-16 h-16 mb-4" />
                            <p className="text-lg">This playlist is currently empty.</p>
                            <button onClick={() => navigate('/search')} className="mt-2 text-green-500 hover:underline">
                                Find songs to add
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DisplayPlaylist;