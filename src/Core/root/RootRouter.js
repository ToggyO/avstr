import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import AuthorizationPage from '../authorization/containers/AuthorizationPage';
import AdvertiserAccountRouter from '../../AdvertiserAccount/AdvertiserAccountRouter';


const RootRouter = () => (
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={AuthorizationPage} />
            <Route exact path="/advertiser" component={AdvertiserAccountRouter} />
        </Switch>
    </Router>
);


export default RootRouter;
