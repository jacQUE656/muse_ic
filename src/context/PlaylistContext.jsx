import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { addPlaylist, addSongToPlaylist, deletePlaylist, getPlaylistById, getUserPlaylists, removeSongFromPlaylist, renamePlaylist } from "../services/ApiService";
import toast from "react-hot-toast";

export const PlaylistContext = createContext();

export const PlaylistContextProvider = ({ children }) => {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { userId } = useContext(AuthContext);


    useEffect(() => {
       if (userId) {
        fetchUserPlayList();
       }
    }, [userId])

    const createPlaylist = async (manualName, manualDesc) => {

        const finalName = manualName || name;
        const finalDesc = manualDesc || description;
        const activeId = userId || localStorage.getItem("userId");

        setError('');
        setLoading(true);
        if (!finalName || !finalDesc || !activeId) {
            setError('Please fill in all fields');
            toast.error('Please fill in all fields');
            return;
        }

        try {
            const result = await addPlaylist(finalName, finalDesc, activeId);
            if (result.success) {
                toast.success("Playlist successfully created!");
                setPlaylists(prev => [...prev, result.data]);
                setName("");
                setDescription("");


            } else {
                toast.error(result.message);

            }


        } catch {
            toast.error('Error creating Playlist...');
            setError(e.message);

        } finally {
            setLoading(false);
        }
    }

    const fetchUserPlayList = async (e) => {

        const activeId = userId || localStorage.getItem("userId");
        setLoading(true);
        try {
            const result = await getUserPlaylists(activeId);
            if (result.success) {
                setPlaylists(result.data);
            }

        } catch (error) {
            console.error("failed to fetch playlist");

        } finally {
            setLoading(false);
        }

    }
    const removePlaylist = async (id) => {
        if(!window.confirm("Are you sure  you to delete this playlist?")) return;
        try {
            const result = await deletePlaylist(id);
            if (result.success) {
                toast.success("Playlist deleted");
                setPlaylists(prev => prev.filter(pl => pl.id !== id));
            }else{
                toast.error(result.message);
            }
        } catch (error) {
             toast.error("An error occured while deleting playlist")
        }
    }

    const fetchSinglePlaylist = async (id) =>{
        setLoading(true);
        const result = await getPlaylistById(id);
        setLoading(false);
        return result;
    }
    const updatePlaylistName  = async (id , newName) => {
        const result = await renamePlaylist(id , newName);
        if (result.success) {
            setPlaylists(prev => prev.map(pl => pl.id === id ? {...pl, name : newName} : pl));
            toast.success("Playlist renamed!");
        }else{
            toast.error(result.message);
        }
    }
       const addSong = async (playlistId, songId) => {
        const result = await addSongToPlaylist(playlistId, songId);
        if (result.success) {
            return { success: true };
        }
        return {
            success: false,
            message: result.message
        }
    };
    const removeSong = async  (playlistId, songId) => {
         if(!window.confirm("Are you sure  you to reomove this song from your playlist?")) return;
        const result = await removeSongFromPlaylist(playlistId , songId);
        if (result.success) {
            setPlaylists(prevPlaylists => 
                prevPlaylists.map(pl =>{
                    if (pl.id === playlistId) {
                         return{
                        ...pl,
                        songs: pl.songs.filter(song => song.id !== songId)
                    }
                    }
                    return pl;
                   
                })
            )
            return result;
        }
        return {
            success: false,
            message: result.message
        }

    };
    

    const contextValue = {
        playlists,
        setPlaylists,
        createPlaylist,
        name,
        setName,
        description,
        setDescription,
        loading,
        removePlaylist,
        fetchSinglePlaylist,
        updatePlaylistName,
        addSong,
        removeSong
    }


    return (
        <PlaylistContext.Provider value={contextValue}>
            {children}
        </PlaylistContext.Provider>

    )

}