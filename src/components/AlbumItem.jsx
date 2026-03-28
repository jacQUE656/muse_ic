import { useNavigate } from "react-router-dom";

const AlbumItem = ({ image, name, description, id }) => {
  const navigate = useNavigate();
return (
    <div
      onClick={() => navigate(`/albums/${id}`)}
      // 'relative' acts as the container, 'rounded-full' makes it circular
      className="p-3 cursor-pointer hover:bg-white/10 transition-all duration-300 flex flex-col h-auto group relative overflow-hidden rounded-full"
    >
      {/* Image Wrapper */}
      <div className="relative aspect-square w-full">
        <img
          src={image}
          alt={name}
          // 'rounded-full' ensures the image itself is a circle
          className="rounded-full w-full h-full object-cover shadow-lg transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Absolute Hover Overlay: 'rounded-full' matches the parent shape */}
        <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-full">
          <p className="font-bold text-white text-center text-sm md:text-base mb-1 truncate w-full">
            {name}
          </p>
          <p className="text-gray-200 text-xs md:text-sm text-center line-clamp-2 px-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlbumItem;