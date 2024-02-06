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
    },
});

// Actions
export const songActions = {
    fetchAll: createAction(`${songsSlice.name}`),
    fetchAllisLoading: songsSlice.actions.fetchAllisLoading,
    fetchAllSucceeded: songsSlice.actions.fetchAllSucceeded,
    fetchAllFailure: songsSlice.actions.fetchAllFailure,
};

// Selectors
export const selectSongs = (state: RootState): Song[] => state.songs.data;

// Reducer
export default songsSlice.reducer;