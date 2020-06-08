import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';

import { BasicLayout, AccessRecoveryLayout } from '@Core/ant';
import { writeToLocalState, getFromLocalState } from '@Core/utils/ls';
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
    const {
        REACT_APP_CALLBACK_PATH,
        REACT_APP_LOGOUT_PATH,
        REACT_APP_SILENT_RENEW_PATH,
    } = process.env;
    const { pathname } = window.location;

    switch (pathname) {
        case REACT_APP_CALLBACK_PATH:
            return <CallbackPage />;
        case REACT_APP_LOGOUT_PATH:
            return <LogoutPage />;
        case REACT_APP_SILENT_RENEW_PATH:
            return <SilentRenewPage />;
        // FIXME: temporary solution
        case '/recovery':
            return <AccessRecoveryLayout>111</AccessRecoveryLayout>;
        default:
            break;
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
        writeToLocalState('redirect', redirect);
    } else {
        const redirectKey = getFromLocalState('redirect');
        if (!redirectKey) {
            writeToLocalState('redirect', usersStartPageUrl);
        }
    }

    if (!isAuthorized) {
        return <AuthorizationPage />;
    }

    return (
        <Router history={history}>
            <BasicLayout>
                <Switch>
                    <Suspense fallback={<Loader />}>
                        <Route
                            path="/advertiser"
                            component={AdvertiserAccountRouter}
                        />

                        <Route
                            path="/devices"
                            component={DevicesRouter}
                        />

                        <Route
                            path="/token"
                            component={TokenPage}
                        />
                    </Suspense>
                </Switch>
            </BasicLayout>
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
