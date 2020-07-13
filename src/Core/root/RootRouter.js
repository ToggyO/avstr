import React, { memo, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { ROOT_ROUTES } from 'Core/constants';
import { writeToLocalState, getFromLocalState } from 'Core/utils/local-storage';
import { UnAuthRoute } from 'Core/routeManagement';

import CallbackPage from '../authorization/components/CallbackPage';
import LogoutPage from '../authorization/components/LogoutPage';
import SilentRenewPage from '../authorization/components/SilentRenewPage';
import { AccessRecoveryPage } from '../accessRecovery';
import LoginLayoutRouter from './LoginLayoutRouter';
import BasicLayoutRouter from './BasicLayoutRouter';
import PageLoading from '../ant/components/Loader/PageLoading';

import RECOVERY_ROUTES from '../accessRecovery/constants/routes';
import ADV_REGISTER_ROUTES from '../advertiserRegistration/constants/routes';

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
        <Suspense fallback={<PageLoading />}>
            <Switch>
                <Route exact path="/null" render={() => <Redirect to={ROOT_ROUTES.AD_MANAGER} />} />
                <UnAuthRoute exact path={REACT_APP_CALLBACK_PATH} component={CallbackPage} />
                <UnAuthRoute exact path={REACT_APP_LOGOUT_PATH} component={LogoutPage} />
                <UnAuthRoute exact path={REACT_APP_SILENT_RENEW_PATH} component={SilentRenewPage} />

                <UnAuthRoute
                    path={[
                        ROOT_ROUTES.RECOVERY,
                        RECOVERY_ROUTES.SEND_LINK,
                        RECOVERY_ROUTES.RESTORE_PASSWORD,
                        RECOVERY_ROUTES.SUCCESS,
                    ]}
                    component={AccessRecoveryPage}
                />
                <Route
                    path={[
                        ROOT_ROUTES.AD_MANAGER,
                        ROOT_ROUTES.DEVICES,
                        ROOT_ROUTES.ADVERTISER,
                        ROOT_ROUTES.TOKEN,
                    ]}
                    component={BasicLayoutRouter}
                />
                <UnAuthRoute
                    path={[
                        '/',
                        ROOT_ROUTES.AD_REGISTRATION,
                        ADV_REGISTER_ROUTES.CONFIRM,
                    ]}
                    component={LoginLayoutRouter}
                />
            </Switch>
        </Suspense>
    );
};

export default memo(RootRouter);
