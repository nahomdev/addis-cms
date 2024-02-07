import { type SagaIterator } from '@redux-saga/core';
import { call, put, takeEvery } from 'redux-saga/effects';
 
import { type Song } from '../../types/songs';
import { songActions } from './slice';
import getSongs, { createSongApi, updateSongApi } from '../../services/song/songs.api';
import { PayloadAction } from '@reduxjs/toolkit';
 
function* onGetSongs(): SagaIterator {
    try {
        const posts: Song[] = yield call(getSongs);
        yield put(songActions.fetchAllSucceeded(posts));
    } catch (e: unknown) {
        if (e instanceof Error) {
            yield put(songActions.fetchAllFailure(e.message.toString()));
        }
    }
}
 
function* onUpdateSong(action:{id: string; updatedSong: Song}): SagaIterator {
    try {
        const { id, updatedSong } = action;
    const _updatedSong: Song = yield call(updateSongApi, id, updatedSong);
    yield put(songActions.updateSongSucceeded(_updatedSong)); 
    yield put(songActions.fetchAll());
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(songActions.updateSongFailure(error.message.toString()));
    }
  }
}

function* onCreateSong(action:{ payload: Song}): SagaIterator {
    try {
        const { payload } = action;
    const _createdSong: Song = yield call(createSongApi, payload);
    yield put(songActions.fetchAll());
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(songActions.updateSongFailure(error.message.toString()));
    }
  }
}


function* songsWatcherSaga(): SagaIterator {
    yield takeEvery(songActions.fetchAll.type, onGetSongs);
    yield takeEvery<PayloadAction<Song>>(songActions.createSong.type, onCreateSong);
    //  yield takeEvery<PayloadAction<{id: string, updatedSong: Song}>>(songActions.updateSong.type, onUpdateSong);
}

export default songsWatcherSaga;