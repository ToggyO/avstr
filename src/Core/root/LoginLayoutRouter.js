import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ROOT_ROUTES } from '../constants';
import UnAuthRoute from '../routeManagement/UnAuthRoute';
import { LoginLayout } from '../ant/components/Layouts';
import AdvertiserRegistrationPage from '../advertiserRegistration/AdvertiserRegistrationPage';
import AuthorizationPage from '../authorization/AuthorizationPage';
import NotFoundBasic from './NotFoundPage/NotFoundBasic';

const LoginLayoutRouter = () => (
    <LoginLayout>
        <Switch>
            <UnAuthRoute exact path="/" component={AuthorizationPage} />
            <UnAuthRoute path={ROOT_ROUTES.AD_REGISTRATION} component={AdvertiserRegistrationPage} />
            <Route component={NotFoundBasic} />
        </Switch>
    </LoginLayout>
);

export default LoginLayoutRouter;
