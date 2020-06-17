// TODO(nn): отдельный инстанс роутинга следует убрать и объединить все в один роутинг
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from 'Core/history';
import { ADV_REGISTER_ROUTES } from './constants';

import AdvRegisterFormContainer from './containers/AdvRegisterFormContainer';
import AdvRegisterConfirmContainer from './containers/AdvRegisterConfirmContainer';


const AdvRegistrationRouter = () => (
    <Router history={history}>
        <Switch>
            <Route exact path={ADV_REGISTER_ROUTES.SEND_LINK} component={AdvRegisterFormContainer} />
            <Route exact path={ADV_REGISTER_ROUTES.CONFIRM} component={AdvRegisterConfirmContainer} />
        </Switch>
    </Router>
);

export default AdvRegistrationRouter;
