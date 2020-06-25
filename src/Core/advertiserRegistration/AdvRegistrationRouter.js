import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ROOT_ROUTES } from '../constants';
import { ADV_REGISTER_ROUTES } from './constants';

import AdvRegisterFormContainer from './containers/AdvRegisterFormContainer';
import AdvRegisterConfirmContainer from './containers/AdvRegisterConfirmContainer';


const AdvRegistrationRouter = () => (
    <Switch>
        <Route exact path={ROOT_ROUTES.AD_REGISTRATION} component={AdvRegisterFormContainer} />
        <Route exact path={ADV_REGISTER_ROUTES.CONFIRM} component={AdvRegisterConfirmContainer} />
    </Switch>
);

export default AdvRegistrationRouter;
