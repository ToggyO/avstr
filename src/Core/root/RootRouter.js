import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthorizationPage from '../authorization/containers/AuthorizationPage';
import AdvertiserAccountRouter from '../../AdvertiserAccount/AdvertiserAccountRouter';


const RootRouter = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={AuthorizationPage} />
            <Route exact path="/advertiser" component={AdvertiserAccountRouter} />
        </Switch>
    </BrowserRouter>
);


export default RootRouter;
