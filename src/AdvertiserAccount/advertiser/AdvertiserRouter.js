import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Loader from 'Core/common/Loader';
import { ROOT_ROUTES } from 'Core/constants';
import { ADVERTISER_ROUTES } from './constants';
import AdsListPage from './AdsListPage';
import AdPage from './AdPage';

const AdvertiserRouter = () => (
    <Suspense fallback={<Loader />}>
        <Switch>
            <Redirect exact push from={ROOT_ROUTES.ADVERTISER} to={ADVERTISER_ROUTES.ADVERTISEMENTS} />

            <Route
                exact
                path={ADVERTISER_ROUTES.ADVERTISEMENTS}
                component={AdsListPage}
            />

            <Route
                exact
                path={ADVERTISER_ROUTES.ADVERTISEMENT_DETAILS(':id')}
                component={AdPage}
            />
        </Switch>
    </Suspense>
);

export default AdvertiserRouter;
