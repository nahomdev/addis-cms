import { type Action, combineReducers } from '@reduxjs/toolkit';
import songsReducer from './song/slice';

const appReducer = combineReducers({
    songs: songsReducer,
});

const rootReducer = (
    state: any,
    action: Action,
): ReturnType<typeof appReducer> => {
    return appReducer(state, action);
};

export default rootReducer;