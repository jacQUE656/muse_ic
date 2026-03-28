import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Download, ListMusic, ListMusicIcon, Maximize2, Mic, Minimize2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Speaker, Volume2 } from "lucide-react";
import { downloadSong } from "../services/ApiService";


const Player = () => {

  const { track, seekBar, seekBg, playStatus, play, pause, time, previous, next, seekSong, isRepeat,isShuffle,setIsRepeat, setIsShuffle,toggleMaximize  } = useContext(PlayerContext);

const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownload = async () => {
    if (!track || isDownloading) return;

    setIsDownloading(true);
    // track.id and track.name come from your context
    const result = await downloadSong(track.id, track.name, (percent) => {
      setDownloadProgress(percent);
    });

    if (!result.success) {
      alert(result.message);
    }

    // Reset progress after a delay so user sees completion
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadProgress(0);
    }, 1500);
  };

  return track ? (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4 sticky">
      {/* Visual Progress Bar overlay at the top of the player during download */}
      {isDownloading && (
        <div 
          className="absolute top-0 left-0 h-[2px] bg-green-500 transition-all duration-300 z-50" 
          style={{ width: `${downloadProgress}%` }}
        />
      )}
      <div className="hidden lg:flex items-center gap-4">
        <img src={track.image} alt="Album" className="w-12" />
        <div>
          <p>{track.name}</p>
          <p>{track.description?.slice(0, )}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <Shuffle onClick={()=>setIsShuffle(!isShuffle)}
          className={`w-4 h-5 cursor-pointer transition-colors ${isShuffle ? 'text-green-500': 'text-gray-400 hover:text-white'}` }/>
          <SkipBack onClick={previous} 
             className="w-4 h-5 cursor-pointer text-white hover:text-green-500 transition-colors" />
          {playStatus ? (
            <Pause onClick={pause}
             className="w-4 h-5 cursor-pointer text-white hover:text-green-500 transition-colors" />

          ) : (
            <Play onClick={play}
             className="w-4 h-5 cursor-pointer text-white hover:text-green-500 transition-colors" />
          )}
          <SkipForward onClick={next} className="w-4 h-5 cursor-pointer text-white hover:text-green-500 transition-colors" />
          <Repeat 
          onClick={()=>setIsRepeat(!isRepeat)}
                className={`w-4 h-5 cursor-pointer transition-colors ${isRepeat ? 'text-green-500': 'text-gray-400 hover:text-white'}` } />

        </div>
        <div className="flex items-center gap-5">
          <p>{time.currentTime.minute}:{time.currentTime.second}</p>

          <div ref={seekBg}
           onClick={seekSong} 
           className="w-[60vw] max-w[500px] bg-gray-300 rounded-full cursor-pointer">
            <hr 
            ref={seekBar}
             className="h-1 border-none w-0 bg-green-800 rounded-full" />
          </div>
          <p>{track.duration}</p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <Download 
          onClick={handleDownload}
          className={`w-4 h-5 cursor-pointer transition-colors mr-2 ${isDownloading ? 'text-green-500 animate-pulse' : 'text-white hover:text-green-500'}`} 
        />
        <ListMusic className="w-4 h-5 cursor-pointer text-white hover:text-green-500 transition-colors" />
        <Maximize2 onClick={toggleMaximize} className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors" />
      </div>

    </div>
  ) : null;
}

export default Player;