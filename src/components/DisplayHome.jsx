import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import AlbumItem from "./AlbumItem.jsx";
import SongItem from "./SongItem.jsx";


const DisplayHome = () => {

  const { songsData, albumsData } = useContext(PlayerContext);

  return (
    <>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl text-white">
          Featured Albums
        </h1>
       <div className="h-60 grid grid-cols-2 lg:grid-cols-6 gap-4 ">
  {albumsData.length > 0 ? (
    albumsData.map((item, index) => (
      <AlbumItem
        key={item.id} // Use item.id instead of index for better performance
        name={item.name}
        description={item.description}
        id={item.id}
        image={item.imageUrl}
      />
    ))
  ) : (
    <p className="text-gray-400">Loading albums...</p>
  )}
</div>
      </div>
      <div className="mb-4 mt-30">
        <h1 className="my-5 font-bold text-2xl text-white">
          Today's biggest hits
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">     

          {/* Display Songs Data */}
          {songsData.map((item, index) => (
            <SongItem
              key={index}
              name={item.name}
              description={item.description}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>

      </div>
    </>

  )
}

export default DisplayHome;