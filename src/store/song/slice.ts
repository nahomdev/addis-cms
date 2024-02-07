import {
    createAction,
    createSlice,
    type PayloadAction,
} from '@reduxjs/toolkit';

import type { RootState } from '../index';
import { type Song } from '../../types/songs';

export interface SongState {
    data: Song[];
    loading: boolean;
    error: string;
}

const initialState: SongState = {
    data: [],
    loading: false,
    error: '',
};

// slice
export const songsSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        fetchAllisLoading(state) {
            state.loading = true;
        },
        fetchAllSucceeded(state, action: PayloadAction<Song[]>) {
            state.data = action.payload;
            state.loading = false;
        },
        fetchAllFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        },
        updateSongLoading(state) {
      state.loading = true;
        },
        updateSongSucceeded(state, action: PayloadAction<Song>) {
        const updatedSong = action.payload;
        state.data = state.data.map(song =>
            song.id === updatedSong.id ? updatedSong : song
        );
        state.loading = false;
        },
        updateSongFailure(state, action: PayloadAction<string>) {
        state.error = action.payload;
        state.loading = false;
        },

         createSongLoading(state) {
      state.loading = true;
        },
        createSongFailure(state, action: PayloadAction<string>) {
        state.error = action.payload;
        state.loading = false;
        },
    },
});

// Actions
export const songActions = {
    fetchAll: createAction(`${songsSlice.name}`),
    fetchAllisLoading: songsSlice.actions.fetchAllisLoading,
    fetchAllSucceeded: songsSlice.actions.fetchAllSucceeded,
    fetchAllFailure: songsSlice.actions.fetchAllFailure,

    //update
     updateSong: createAction<{ id: string; updatedSong: Song }>(
    `${songsSlice.name}/updateSong`),
    updateSongLoading: songsSlice.actions.updateSongLoading,
    updateSongSucceeded: songsSlice.actions.updateSongSucceeded,
    updateSongFailure: songsSlice.actions.updateSongFailure,


    //create
    createSong: createAction<PayloadAction<Song>>(`${songsSlice.name}/create`),
    createSongLoading: songsSlice.actions.createSongLoading, 
    createSongFailure: songsSlice.actions.createSongFailure,
};

// Selectors
export const selectSongs = (state: RootState): Song[] => state.songs.data;

// Reducer
export default songsSlice.reducer;