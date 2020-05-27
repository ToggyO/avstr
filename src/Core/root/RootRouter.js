// todo(nn): Вынести пути в переменные окружения;
import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';

import AuthorizationPage from '../authorization/AuthorizationPage';
import CallbackPage from '../authorization/components/CallbackPage';
import LogoutPage from '../authorization/components/LogoutPage';
import Loader from '../common/Loader';
import SilentRenewPage from '../authorization/components/SilentRenewPage';

const TokenPage = lazy(() => import('../authorization/components/TokenPage'));
const AdvertiserAccountRouter = lazy(() => import('AdvertiserAccount/AdvertiserAccountRouter'));
const DevicesRouter = lazy(() => import('DevicesAccount/DevicesRouter'));


const RootRouter = ({ isAuthorized }) => {
    if (window.location.pathname === '/callback') {
        return <CallbackPage />;
    }

    let redirect;
    if (!window.location.search) {
        if (window.location.pathname === '/') {
            redirect = '/devices/main/list'; // отдельный сервис для получения пути в зависимости от роли
            // alert(redirect);
        } else {
            redirect = window.location.pathname;
            // alert(redirect);
        }
        localStorage.setItem('redirect', redirect);
    } else {
        const redirectKey = localStorage.getItem('redirect');
        if (!redirectKey) {
            redirect = '/devices/main/list';
            localStorage.setItem('redirect', redirect);
        }
    }

    if (!isAuthorized) {
        return <AuthorizationPage />;
    }

    return (
        <Router history={history}>
            <Switch>
                {/* <Route
                    exact
                    path="/"
                    component={AuthorizationPage}
                /> */}
                {/* <Route
                    path="/callback"
                    component={CallbackPage}
                /> */}
                <Route
                    exact
                    path="/logout"
                    component={LogoutPage}
                />
                <Route
                    exact
                    path="/silentRenew"
                    component={SilentRenewPage}
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

                    <Route
                        path="/devices"
                        component={DevicesRouter}
                    />
                </Suspense>
            </Switch>
        </Router>
    );
};

RootRouter.defaultProps = {
    isAuthorized: false,
};

RootRouter.propTypes = {
    isAuthorized: PropTypes.bool,
};

export default RootRouter;
