import React, { Suspense, lazy, memo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { BasicLayout, PageLoading } from 'Core/ant';
import { ROOT_ROUTES } from 'Core/constants';
import { writeToLocalState, getFromLocalState } from 'Core/utils/local-storage';
import { UnAuthRoute, AuthRoute } from 'Core/routeManagement';

import CallbackPage from '../authorization/components/CallbackPage';
import LogoutPage from '../authorization/components/LogoutPage';
import SilentRenewPage from '../authorization/components/SilentRenewPage';
import { AccessRecoveryPage } from '../accessRecovery';
import LoginLayoutRouter from './LoginLayoutRouter';
import ADV_REGISTER_ROUTES from '../advertiserRegistration/constants/routes';


const TokenPage = lazy(() => import('../authorization/components/TokenPage'));
const AdvertiserAccountRouter = lazy(() => import('AdvertiserAccount/AdvertiserAccountRouter'));
const DevicesRouter = lazy(() => import('DevicesAccount/DevicesRouter'));

const RootRouter = () => {
    const {
        REACT_APP_CALLBACK_PATH,
        REACT_APP_LOGOUT_PATH,
        REACT_APP_SILENT_RENEW_PATH,
    } = process.env;
    const { pathname } = window.location;

    let redirect;
    const usersStartPageUrl = ROOT_ROUTES.AD_MANAGER;
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

    return (
        <Switch>
            <Route exact path="/null" render={() => <Redirect to={ROOT_ROUTES.AD_MANAGER} />} />
            <Route exact path={['/', ROOT_ROUTES.AD_REGISTRATION, ADV_REGISTER_ROUTES.CONFIRM]} component={LoginLayoutRouter} />
            <UnAuthRoute exact path={REACT_APP_CALLBACK_PATH} component={CallbackPage} />
            <UnAuthRoute exact path={REACT_APP_LOGOUT_PATH} component={LogoutPage} />
            <UnAuthRoute exact path={REACT_APP_SILENT_RENEW_PATH} component={SilentRenewPage} />
            <UnAuthRoute path={ROOT_ROUTES.RECOVERY} component={AccessRecoveryPage} />
            <BasicLayout>
                <Suspense fallback={<PageLoading />}>
                    <AuthRoute
                        path={ROOT_ROUTES.AD_MANAGER}
                        component={AdvertiserAccountRouter}
                    />

                    <AuthRoute
                        path={ROOT_ROUTES.DEVICES}
                        component={DevicesRouter}
                    />

                    <AuthRoute
                        path={ROOT_ROUTES.TOKEN}
                        component={TokenPage}
                    />
                </Suspense>
            </BasicLayout>
        </Switch>
    );
};

export default memo(RootRouter);
