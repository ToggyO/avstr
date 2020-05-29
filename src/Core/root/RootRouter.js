// todo(nn):
//  1.Вынести пути в переменные окружения
//  2.Переписать код с получением путей для редиректа и вынести его

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
    const { REACT_APP_CALLBACK_PATH } = process.env;
    const { pathname } = window.location;

    if (pathname === REACT_APP_CALLBACK_PATH) {
        return <CallbackPage />;
    }

    let redirect;
    const usersStartPageUrl = '/advertiser';
    const { search } = window.location;

    if (!search) {
        if (pathname === '/') {
            redirect = usersStartPageUrl;
        } else {
            redirect = pathname;
        }
        localStorage.setItem('redirect', redirect);
    } else {
        const redirectKey = localStorage.getItem('redirect');
        if (!redirectKey) {
            localStorage.setItem('redirect', usersStartPageUrl);
        }
    }

    if (!isAuthorized) {
        return <AuthorizationPage />;
    }

    return (
        <Router history={history}>
            <Switch>
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
