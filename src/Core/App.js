import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import io from 'socket.io-client';
import 'semantic-ui-css/semantic.min.css';
import 'antd/dist/antd.css';

import 'Core/scss/fonts/add-fonts.scss';
import store from './store';
import RootRouter from './root/RootRouter';

import './App.scss';


window.io = io;

const App = () => (
    <Provider store={store}>
        <RootRouter />
    </Provider>
);

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
