import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import { PageLoading } from 'Core/ant';

const AdvertiserAccountPage = lazy(() => import('./AdvertiserAccountPage'));
const NewAdvertisementPage = lazy(() => import('./advertising-management/NewAdvertisementPage'));


const AdvertiserAccountRouter = ({ match: { path } }) => (
    <Suspense fallback={<PageLoading />}>
        <Switch>
            <Route
                exact
                path={`${path}`}
                component={AdvertiserAccountPage}
            />
            <Route
                path={`${path}/add`}
                component={NewAdvertisementPage}
            />
        </Switch>
    </Suspense>
);


AdvertiserAccountRouter.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string.isRequired,
    }).isRequired,
};

export default AdvertiserAccountRouter;
