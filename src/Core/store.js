import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const composeEnhancers = process.env.NODE_ENV !== 'production'
    && typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;


const sagaMiddleware = createSagaMiddleware();
const configureStore = (preloadedState) => (
    createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(
            applyMiddleware(sagaMiddleware),
        ),
    )
);

const store = configureStore({});
sagaMiddleware.run(rootSaga);

export default store;
