import { type SagaIterator } from '@redux-saga/core';
import { call, put, takeEvery } from 'redux-saga/effects';
 
import { type Song } from '../../types/songs';
import { songActions } from './slice';
import getSongs from '../../services/song/songs.api';

// Worker Sagas
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

// Watcher Saga
function* songsWatcherSaga(): SagaIterator {
    yield takeEvery(songActions.fetchAll.type, onGetSongs
    
    );
}

export default songsWatcherSaga;