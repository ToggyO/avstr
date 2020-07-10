import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ROOT_ROUTES } from 'Core/constants';
import NotFoundPage from 'Core/root/NotFoundPage';
import { ADVERTISER_ROUTES } from './constants';
import { AdsListContainer } from './AdsListPage';
import AdPage from './AdPage';

const AdvertiserRouter = () => (
    <Switch>
        <Redirect exact push from={ROOT_ROUTES.ADVERTISER} to={ADVERTISER_ROUTES.ADVERTISEMENTS} />

        <Route
            exact
            path={ADVERTISER_ROUTES.ADVERTISEMENTS}
            component={AdsListContainer}
        />

        <Route
            exact
            path={ADVERTISER_ROUTES.ADVERTISEMENT_DETAILS(':id')}
            component={AdPage}
        />

        <Route component={NotFoundPage} />
    </Switch>
);

export default AdvertiserRouter;
