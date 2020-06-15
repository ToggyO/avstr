import React from 'react';
import {
    Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

import history from 'Core/history';
import { ROOT_ROUTES } from 'Core/constants';
import { RECOVERY_ROUTES } from './constants';
import { RecoveryForm, ChangePasswordForm, SuccessResult } from './components';

const AccessRecoveryRouter = () => (
    <Router history={history}>
        <Switch>
            <Route exact path={ROOT_ROUTES.RECOVERY} render={() => <Redirect to={RECOVERY_ROUTES.SEND_LINK} />} />
            <Route exact path={RECOVERY_ROUTES.SEND_LINK} component={RecoveryForm} />
            <Route exact path={RECOVERY_ROUTES.RESTORE_PASSWORD} component={ChangePasswordForm} />
            <Route exact path={RECOVERY_ROUTES.SUCCESS} component={SuccessResult} />
        </Switch>
    </Router>
);

export default AccessRecoveryRouter;
