import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import io from 'socket.io-client';

import 'semantic-ui-css/semantic.min.css';
import 'antd/dist/antd.css';

import 'Core/scss/fonts/add-fonts.scss';
import store from './store';
import RootRouter from './root/RootRouter';
import { AuthProvider } from './context';

import './App.scss';
import history from './history';

window.io = io;

const browserHistory = syncHistoryWithStore(history, store);

const App = () => (
    <Provider store={store}>
        <AuthProvider>
            <Router history={browserHistory}>
                <RootRouter />
            </Router>
        </AuthProvider>
    </Provider>
);

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
