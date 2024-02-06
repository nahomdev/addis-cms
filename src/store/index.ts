import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';

import { rootSaga } from './rootSaga';
import rootReducer from './rootReducer';

const makeStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const store = configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                thunk: false,
                serializableCheck: false,
            }).concat(sagaMiddleware),
         
    });

    sagaMiddleware.run(rootSaga);

    return store;
};

export const store = makeStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;