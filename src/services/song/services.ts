import { useCallback } from 'react';

import { songActions, selectSongs } from '../../store/song/slice';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { type Song } from '../../types/songs';

interface SongServiceOperators {
    songs: Song[];
    fetchAllSongs: () => void;
}

const useSongService = (): Readonly<SongServiceOperators> => {
    const dispatch = useAppDispatch();

    return {
        songs: useAppSelector(selectSongs),
       
        fetchAllSongs: useCallback(() => {
            dispatch(songActions.fetchAllisLoading());
            dispatch(songActions.fetchAll());
        }, [dispatch]),
    };
};

 
export default useSongService;