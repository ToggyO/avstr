import React, { Suspense, lazy } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';

import AuthorizationPage from '../authorization/AuthorizationPage';
import CallbackPage from '../authorization/components/CallbackPage';
import LogoutPage from '../authorization/components/LogoutPage';
import Loader from '../common/Loader';

const AdvertiserAccountRouter = lazy(() => import('../../AdvertiserAccount/AdvertiserAccountRouter'));
const TokenPage = lazy(() => import('../authorization/components/TokenPage'));


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

            <Suspense fallback={<Loader />}>
                <Route
                    path="/token"
                    component={TokenPage}
                />

                <Route
                    path="/advertiser"
                    component={AdvertiserAccountRouter}
                />
            </Suspense>
        </Switch>
    </Router>
);

export default RootRouter;
