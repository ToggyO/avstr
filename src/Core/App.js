import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';


import io from 'socket.io-client';
import 'semantic-ui-css/semantic.min.css';
import 'antd/dist/antd.css';

import 'Core/scss/fonts/add-fonts.scss';
import store from './store';
import RootRouter from './root/RootRouter';


import './App.scss';
import userManager from './authorization/utils/userManager';


window.io = io;


const App = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    userManager.getUser().then((user) => {
        setIsAuthorized(user && !user.expired);
    });
    return (
        <Provider store={store}>
            <RootRouter isAuthorized={isAuthorized} />
        </Provider>
    );
};

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
