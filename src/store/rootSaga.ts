import { all, fork } from 'redux-saga/effects';

import songsWatcherSaga from './song/saga';

export function* rootSaga(): any {
    yield all([fork(songsWatcherSaga)]);
}

export default rootSaga;