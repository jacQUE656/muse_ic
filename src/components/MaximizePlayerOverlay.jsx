import { useContext, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Minimize2, Play, Pause, SkipBack, SkipForward, PlusCircle, Download } from "lucide-react";
import { PlaylistContext } from "../context/PlaylistContext";
import PlaylistModal from "./PlaylistModal";
import { downloadSong } from "../services/ApiService";

const MaximizePlayerOverlay = () => {
  const { 
    track, 
    toggleMaximize, 
    playStatus, 
    play, 
    pause, 
    next, 
    previous,
    seekBg, 
    seekBar, 
    seekSong,
    time
  } = useContext(PlayerContext);

  const { addSong } = useContext(PlaylistContext);
  const [showModal, setShowModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownload = async () => {
    if (!track || isDownloading) return;
    setIsDownloading(true);
    const result = await downloadSong(track.id, track.name, (percent) => {
      setDownloadProgress(percent);
    });
    if (!result.success) alert(result.message);
    setTimeout(() => { setIsDownloading(false); setDownloadProgress(0); }, 1500);
  };

  const handleAddToPlaylist = async (playlistId) => {
    const result = await addSong(playlistId, track.id);
    if (result.success) {
      alert("Song added to playlist!");
      setShowModal(false);
    } else {
      alert("Error : " + result.message);
    }
  };

  if (!track) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in duration-300 overflow-y-auto">
      {/* Minimize Button */}
      <button onClick={toggleMaximize} className="absolute top-6 left-6 text-white hover:text-gray-400 transition">
        <Minimize2 size={32} />
      </button>

      {/* Album Art */}
      <img src={track.image} alt="Album Art" className="w-64 h-64 md:w-96 md:h-96 rounded-lg shadow-2xl mb-8 object-cover" />

      {/* Track Info */}
      <div className="text-center mb-6 w-full max-w-md">
        <h1 className="text-2xl md:text-3xl font-bold text-white truncate">{track.name}</h1>
        <p className="text-lg text-gray-400">{track.description}</p>
      </div>

      {/* SeekBar Implementation */}
      <div className="w-full max-w-md mb-8">
        <div ref={seekBg} onClick={seekSong} className="w-full bg-gray-600 rounded-full h-1.5 cursor-pointer">
          <div ref={seekBar} className="bg-green-500 h-1.5 rounded-full w-0" />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <p>{time.currentTime.minute}:{time.currentTime.second.toString().padStart(2, '0')}</p>
          <p>{time.totalTime.minute}:{time.totalTime.second.toString().padStart(2, '0')}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-8 mb-8">
        <SkipBack onClick={previous} size={40} className="text-gray-400 cursor-pointer hover:text-green-500" />
        <div className="bg-white p-4 rounded-full cursor-pointer hover:scale-105 transition">
          {playStatus ? (
            <Pause onClick={pause} size={40} className="text-black" />
          ) : (
            <Play onClick={play} size={40} className="text-black fill-black" />
          )}
        </div>
        <SkipForward onClick={next} size={40} className="text-gray-400 cursor-pointer hover:text-green-500" />
        <Download 
          onClick={handleDownload}
          size={32}
          className={`cursor-pointer transition-colors ${isDownloading ? 'text-green-500 animate-pulse' : 'text-white hover:text-green-500'}`} 
        />
      </div>

      <button onClick={() => setShowModal(true)} className="flex items-center gap-2 text-white hover:text-green-500 transition">
        <PlusCircle size={32} />
        <span>Add to playlist</span>
      </button>

      {showModal && (
        <PlaylistModal onClose={() => setShowModal(false)} onSelect={handleAddToPlaylist} />
      )}
    </div>
  );
};

export default MaximizePlayerOverlay;