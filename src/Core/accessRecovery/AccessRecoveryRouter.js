import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

import { ROOT_ROUTES } from 'Core/constants';
import { RECOVERY_ROUTES } from './constants';
import {
    RecoveryFormContainer,
    ChangePasswordFormContainer,
    SuccessResult,
} from './components';

const AccessRecoveryRouter = () => (
    <Switch>
        <Route exact path={ROOT_ROUTES.RECOVERY} render={() => <Redirect to={RECOVERY_ROUTES.SEND_LINK} />} />
        <Route exact path={RECOVERY_ROUTES.SEND_LINK} component={RecoveryFormContainer} />
        <Route exact path={RECOVERY_ROUTES.RESTORE_PASSWORD} component={ChangePasswordFormContainer} />
        <Route exact path={RECOVERY_ROUTES.SUCCESS} component={SuccessResult} />
    </Switch>
);

export default AccessRecoveryRouter;
