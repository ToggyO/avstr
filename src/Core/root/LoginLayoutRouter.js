import React from 'react';
import { Router, Switch } from 'react-router-dom';

import history from 'Core/history';
import { ROOT_ROUTES } from '../constants';
import UnAuthRoute from '../routeManagement/UnAuthRoute';
import { LoginLayout } from '../ant/components/Layouts';
import AdvertiserRegistrationPage from '../advertiserRegistration/AdvertiserRegistrationPage';
import AuthorizationPage from '../authorization/AuthorizationPage';


const LoginLayoutRouter = () => (
    <LoginLayout>
        <Router history={history}>
            <Switch>
                <UnAuthRoute exact path="/" component={AuthorizationPage} />
                <UnAuthRoute path={ROOT_ROUTES.AD_REGISTRATION} component={AdvertiserRegistrationPage} />
            </Switch>
        </Router>
    </LoginLayout>
);

export default LoginLayoutRouter;
