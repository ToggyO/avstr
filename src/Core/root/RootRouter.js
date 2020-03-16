import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';

import AuthorizationPage from '../authorization/AuthorizationPage';
import AdvertiserAccountRouter from '../../AdvertiserAccount/AdvertiserAccountRouter';
import CallbackPage from '../authorization/components/CallbackPage/CallbackPage';
import LogoutPage from '../authorization/components/LogoutPage/LogoutPage';

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
                path="/advertiser"
                component={AdvertiserAccountRouter}
            />

            <Route
                exact
                path="/logout"
                component={LogoutPage}
            />
        </Switch>
    </Router>
);

export default RootRouter;
