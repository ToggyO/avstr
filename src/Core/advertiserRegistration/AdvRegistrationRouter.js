// TODO(nn): отдельный инстанс роутинга следует убрать и объединить все в один роутинг
// Инстанс history здесь другой. Он не относится к history в rootRouter.js
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from 'Core/history';
import { ADV_REGISTER_ROUTES } from './constants';

import AdvRegisterForm from './containers/AdvRegisterForm';

const AdvRegistrationRouter = () => (
    <Router history={history}>
        <Switch>
            <Route exact path={ADV_REGISTER_ROUTES.SEND_LINK} component={AdvRegisterForm} />
        </Switch>
    </Router>
);

export default AdvRegistrationRouter;
