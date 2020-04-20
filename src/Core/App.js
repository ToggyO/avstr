import React, { createContext } from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import './App.scss';
import 'semantic-ui-css/semantic.min.css';

import 'Core/scss/fonts/add-fonts.scss';

import store from './store';
import RootRouter from './root/RootRouter';
// import configureMirage from './api/configureMirage';
// configureMirage();
import StreamStoreService from './streamStoreService';


const streamStore = new StreamStoreService();
const StreamStoreContext = createContext(streamStore);

const App = () => (
    <Provider store={store}>
        <StreamStoreContext.Provider value={streamStore}>
            <RootRouter />
        </StreamStoreContext.Provider>
    </Provider>
);


export default process.env.NODE_ENV === 'development' ? hot(App) : App;
