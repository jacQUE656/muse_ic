import { useContext } from "react";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/assets";
import { Clock } from "lucide-react";

const DisplayAlbum = ({ album }) => {
  const { id } = useParams();
  const { albumsData, songsData, playWithId, toggleMaximize } = useContext(PlayerContext);

  return album && albumsData ? (
    <div className="mt-5 md:mt-10">
      {/* HEADER SECTION */}
      <div className="flex gap-6 flex-col items-center text-center md:flex-row md:items-end md:text-left">
        <img 
          src={album.imageUrl} 
          alt={album.name} 
          className="w-40 sm:w-48 rounded shadow-2xl transition-transform hover:scale-105 duration-300" 
        />
        <div className="flex flex-col">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">Playlist</p>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold mt-2 mb-4 text-white">
            {album.name}
          </h2>
          <h4 className="text-gray-300 text-sm sm:text-base line-clamp-2 md:line-clamp-none">
            {album.description}
          </h4>
          <div className="mt-3 flex items-center justify-center md:justify-start gap-2 text-sm text-green-600">
            <img src={assets.logo2} alt="logo" className="w-5" />
            <span className="font-bold">Musify</span>
            <span className="hidden sm:inline">• 1,23,456 likes</span>
            <span className="font-bold ml-1">{songsData.filter(s => s.album === album.name).length} Songs,</span>
            <span className="text-gray-400">about 2 hr 30 min</span>
          </div>
        </div>
      </div>

      {/* TABLE HEADER */}
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] text-sm uppercase font-medium border-b border-[#ffffff1a] pb-2">
        <p className="flex items-center">
          <b className="mr-4">#</b>
          Title
        </p>
        <p className="hidden md:block">Album</p>
        <p className="hidden sm:block">Date Added</p>
        <div className="flex justify-center sm:justify-end pr-4">
            <Clock className="w-4" />
        </div>
      </div>

      {/* SONGS LIST */}
      <div className="flex flex-col mb-20">
        {songsData
          .filter(song => song.album === album.name)
          .map((item, index) => (
            <div
              onClick={() => {
                playWithId(item.id);
                toggleMaximize();
              }}
              className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff1a] rounded-md group cursor-pointer transition-colors"
              key={item.id || index}
            >
              <div className="flex items-center text-white overflow-hidden">
                <span className="mr-4 w-4 text-[#a7a7a7] text-center hidden sm:inline-block">
                    {index + 1}
                </span>
                <img src={item.image} alt={item.name} className="w-10 h-10 rounded shrink-0 mr-3" />
                <div className="flex flex-col overflow-hidden">
                    <p className="truncate font-medium text-sm sm:text-base">{item.name}</p>
                    <p className="text-xs text-gray-400 sm:hidden">MUSE</p>
                </div>
              </div>

              {/* Album name hidden on small mobile, shown on Tablet+ */}
              <p className="text-[13px] hidden md:block truncate pr-4">
                {album.name}
              </p>

              {/* Date hidden on mobile */}
              <p className="text-[13px] hidden sm:block">
                {item.dateAdded}
              </p>

              {/* Duration right aligned on desktop, center on mobile */}
              <p className="text-[13px] text-center sm:text-right sm:pr-4">
                {item.duration}
              </p>
            </div>
          ))}
      </div>
    </div>
  ) : null;
};

export default DisplayAlbum;