import { useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext";

const PlaylistModal = ({ onClose, onSelect }) => {
  const { playlists } = useContext(PlaylistContext);

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center">
      <div className="bg-zinc-900 p-6 rounded-lg w-80 text-white shadow-xl">
        <h2 className="text-lg font-bold mb-4">Add to Playlist</h2>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => onSelect(playlist.id)}
              className="w-full text-left p-2 hover:bg-zinc-800 rounded transition"
            >
              {playlist.name}
            </button>
          ))}
        </div>
        <button 
          onClick={onClose} 
          className="mt-4 w-full text-gray-400 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PlaylistModal;