import React, { useEffect } from 'react';
import usePhotoService from '../services/song/services';
import useSongService from '../services/song/services';
const SongList: React.FC = () => { 
    const { songs, fetchAllSongs} = useSongService();
      

    useEffect(() => {
        fetchAllSongs();
    }, [fetchAllSongs]);

    return <div>
        <div>song lists</div>
        <div>songs :{songs.toString()}</div>
    </div>
}


export default SongList;