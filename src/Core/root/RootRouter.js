import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';

import AuthorizationPage from '../authorization/containers/AuthorizationPage';
import AdvertiserAccountRouter from '../../AdvertiserAccount/AdvertiserAccountRouter';
import CallbackPage from '../authorization/components/CallbackPage/CallbackPage';


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
        </Switch>
    </Router>
);

export default RootRouter;
