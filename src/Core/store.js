import { createStore, compose, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';
// import createOidcMiddleware from 'redux-oidc';

// import userManager from './authorization/userManager';

import rootReducer from './root/rootReducer';
import rootSaga from './root/rootSaga';


const composeEnhancers = process.env.NODE_ENV !== 'production'
    && typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

// const oidcMiddleware = createOidcMiddleware(userManager);
const sagaMiddleware = createSagaMiddleware();

const configureStore = (preloadedState) => (
    createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(
            // oidcMiddleware,
            applyMiddleware(sagaMiddleware),
        ),
    )
);

const store = configureStore({});
sagaMiddleware.run(rootSaga);


export default store;
