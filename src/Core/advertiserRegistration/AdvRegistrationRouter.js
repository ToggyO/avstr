import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ROOT_ROUTES } from '../constants';
import { ADV_REGISTER_ROUTES } from './constants';

import RegisterPageContainer from './RegisterPage/Container';
import ConfirmPageContainer from './ConfirmPage/Container';
import NotFoundBasic from '../root/NotFoundPage/NotFoundBasic';

const AdvRegistrationRouter = () => (
    <Switch>
        <Route exact path={ROOT_ROUTES.AD_REGISTRATION} component={RegisterPageContainer} />
        <Route exact path={ADV_REGISTER_ROUTES.CONFIRM} component={ConfirmPageContainer} />
        <Route component={NotFoundBasic} />
    </Switch>
);

export default AdvRegistrationRouter;
