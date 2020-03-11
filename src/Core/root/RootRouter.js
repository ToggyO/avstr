import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import PrivateRoute from './PrivateRoute';
import AuthorizationPage from '../authorization/containers/AuthorizationPage';
import AdvertiserAccountRouter from '../../AdvertiserAccount/AdvertiserAccountRouter';


const RootRouter = () => (
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={AuthorizationPage} />
            <PrivateRoute exact path="/advertiser" component={AdvertiserAccountRouter} />
        </Switch>
    </Router>
);


export default RootRouter;
