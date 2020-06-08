// TODO(toleg): отдельный инстанс роутинга следует убрать и объединить все в один роутинг
// Инстанс history здесь другой. Он не относится к history d rootRouter.js
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from 'Core/history';
import { RECOVERY_ROUTES } from './constants';
// import { SuccessResult } from './components';
// import { RecoveryForm, ChangePasswordForm, SuccessResult } from './components';
import { RecoveryForm } from './components';

const AccessRecoveryRouter = () => (
    <Router history={history}>
        <Switch>
            {/* <Route exact path="/recovery" component={SuccessResult} /> */}
            <Route exact path={RECOVERY_ROUTES.SEND_LINK} component={RecoveryForm} />
            {/* <Route exact path={RECOVERY_ROUTES.RESTORE_PASSWORD} component={ChangePasswordForm} /> */}
            {/* <Route exact path={RECOVERY_ROUTES.SUCCESS} component={} /> */}
        </Switch>
    </Router>
);

export default AccessRecoveryRouter;
