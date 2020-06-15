import React, { Suspense, lazy, memo } from 'react';
import { Switch } from 'react-router-dom';

import { BasicLayout } from 'Core/ant';
import { ROOT_ROUTES } from 'Core/constants';
import { writeToLocalState, getFromLocalState } from 'Core/utils/local-storage';
import { UnAuthRoute, AuthRoute } from 'Core/routeManagement';

import AuthorizationPage from '../authorization/AuthorizationPage';
import CallbackPage from '../authorization/components/CallbackPage';
import LogoutPage from '../authorization/components/LogoutPage';
import Loader from '../common/Loader';
import SilentRenewPage from '../authorization/components/SilentRenewPage';
import { AccessRecoveryPage } from '../accessRecovery';
import AdvertiserRegistrationPage from '../advertiserRegistration/AdvertiserRegistrationPage';

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
            <UnAuthRoute exact path={REACT_APP_CALLBACK_PATH} component={CallbackPage} />
            <UnAuthRoute exact path="/" component={AuthorizationPage} />
            <UnAuthRoute exact path={REACT_APP_LOGOUT_PATH} component={LogoutPage} />
            <UnAuthRoute exact path={REACT_APP_SILENT_RENEW_PATH} component={SilentRenewPage} />
            <UnAuthRoute path={ROOT_ROUTES.RECOVERY} component={AccessRecoveryPage} />
            <UnAuthRoute path={ROOT_ROUTES.AD_REGISTRATION} component={AdvertiserRegistrationPage} />
            <BasicLayout>
                <Suspense fallback={<Loader />}>
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

// {!isAuthorized
//     ? (
//         <Switch>
//             <Route exact path={REACT_APP_CALLBACK_PATH} component={CallbackPage} />
//             <Route exact path="/" component={AuthorizationPage} />
//             <Route exact path={REACT_APP_LOGOUT_PATH} component={LogoutPage} />
//             <Route exact path={REACT_APP_SILENT_RENEW_PATH} component={SilentRenewPage} />
//             <UnAuthRoute isAuthorized={isAuthorized} path={ROOT_ROUTES.RECOVERY} component={AccessRecoveryPage} />
//         </Switch>
//     )
//     : (
//         <BasicLayout>
//             <Switch>
//                 <Suspense fallback={<Loader />}>
//                     <Route
//                         path={ROOT_ROUTES.AD_MANAGER}
//                         component={AdvertiserAccountRouter}
//                     />
//
//                     <Route
//                         path={ROOT_ROUTES.DEVICES}
//                         component={DevicesRouter}
//                     />
//
//                     <Route
//                         path={ROOT_ROUTES.TOKEN}
//                         component={TokenPage}
//                     />
//                 </Suspense>
//             </Switch>
//         </BasicLayout>
//     )}
