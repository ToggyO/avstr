import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import './App.scss';

import store from './store';
import RootRouter from './root/RootRouter';


const App = () => (
    <Provider store={store}>
        <RootRouter />
    </Provider>
);


export default process.env.NODE_ENV === 'development' ? hot(App) : App;
