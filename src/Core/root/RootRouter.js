// TODO(RootRouter): сделать общий роутинг для всех страниц приложения
// страницы вне роутинга не будут иметь доступ к withRouter, соответственно к объектам history и location
// явный импорт history из файла с history.js, вероятнее всего, будет возвращать другой инстанс
// (не тот, что прокинут в <Router history={history}>)
// FIXME: заменить хардкодный путь /recovery на константу
import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';

import { BasicLayout } from 'Core/ant';
import { writeToLocalState, getFromLocalState } from 'Core/utils/local-storage';
import history from '../history';
import AuthorizationPage from '../authorization/AuthorizationPage';
import CallbackPage from '../authorization/components/CallbackPage';
import LogoutPage from '../authorization/components/LogoutPage';
import Loader from '../common/Loader';
import SilentRenewPage from '../authorization/components/SilentRenewPage';
import { AccessRecoveryPage } from '../accessRecovery';

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
        case '/recovery': // FIXME:
            return <AccessRecoveryPage />;
        default:
            break;
    }

    let redirect;
    const usersStartPageUrl = '/ad-manager';
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
                            path="/ad-manager"
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
