import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';

import AuthorizationPage from '../authorization/AuthorizationPage';
import CallbackPage from '../authorization/components/CallbackPage';
import LogoutPage from '../authorization/components/LogoutPage';
import AdvertiserAccountRouter from '../../AdvertiserAccount/AdvertiserAccountRouter';
import TokenPage from '../authorization/components/TokenPage';


const RootRouter = () => (
    <Router history={history}>
        <Switch>
            <Route
                exact
                path="/"
                component={AuthorizationPage}
            />
            <Route
                path="/callback"
                component={CallbackPage}
            />
            <Route
                exact
                path="/logout"
                component={LogoutPage}
            />
            <Route
                path="/token"
                component={TokenPage}
            />

            <Route
                path="/advertiser"
                component={AdvertiserAccountRouter}
            />
        </Switch>
    </Router>
);

export default RootRouter;
