import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Play } from "lucide-react";

const SongItem = ({ name, image, description, id }) => {
  const { playWithId, toggleMaximize } = useContext(PlayerContext);

return (
    <div
      onClick={() => {
        playWithId(id);
        toggleMaximize();
      }}
      // Changed: removed w-50 h-50, set to w-full to fill grid cell
      className="p-3 my-4 w-full rounded-lg cursor-pointer hover:bg-white/10 bg-white/5 transition-all duration-300 group flex flex-col"
    >
      {/* Image Container: w-32 on mobile, w-full on larger screens */}
      <div className="relative aspect-square mb-3 w-32 md:w-full mx-auto md:mx-0">
        <img
          src={image}
          alt={name}
          className="rounded-md w-full h-full object-cover shadow-lg group-hover:shadow-2xl transition-shadow"
        />
        
        {/* Play Button - remains hidden on mobile */}
        <div className="absolute bottom-2 right-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden md:block">
          <div className="bg-green-500 p-3 rounded-full shadow-xl">
            <Play className="w-5 h-5 text-black fill-black" />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col flex-grow text-center md:text-left">
        <p className="font-bold text-white truncate text-sm md:text-base mb-1">
          {name}
        </p>
        <p className="text-gray-400 text-xs md:text-sm line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SongItem;