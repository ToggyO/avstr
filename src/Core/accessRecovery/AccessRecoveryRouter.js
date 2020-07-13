import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

import NotFoundBasic from 'Core/root/NotFoundPage/NotFoundBasic';
import { RECOVERY_ROUTES } from './constants';
import {
    RecoveryFormContainer,
    ChangePasswordFormContainer,
    SuccessResult,
} from './components';

const AccessRecoveryRouter = () => (
    <Switch>
        <Route exact path={RECOVERY_ROUTES.ROOT} render={() => <Redirect to={RECOVERY_ROUTES.SEND_LINK} />} />
        <Route exact path={RECOVERY_ROUTES.SEND_LINK} component={RecoveryFormContainer} />
        <Route exact path={RECOVERY_ROUTES.RESTORE_PASSWORD} component={ChangePasswordFormContainer} />
        <Route exact path={RECOVERY_ROUTES.SUCCESS} component={SuccessResult} />
        <Route component={NotFoundBasic} />
    </Switch>
);

export default AccessRecoveryRouter;
