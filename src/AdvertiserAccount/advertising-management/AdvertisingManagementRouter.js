import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import { PageLoading } from 'Core/ant';
import NotFoundPage from 'Core/root/NotFoundPage';

const AdvertisingManagementPage = lazy(() => import('./AdvertisingManagementPage'));
const NewAdvertisementPage = lazy(() => import('./NewAdvertisementPage'));

const AdvertisingManagementRouter = ({ match: { path } }) => (
    <Suspense fallback={<PageLoading />}>
        <Switch>
            <Route
                exact
                path={`${path}`}
                component={AdvertisingManagementPage}
            />
            <Route
                path={`${path}/add`}
                component={NewAdvertisementPage}
            />
            <Route component={NotFoundPage} />
        </Switch>
    </Suspense>
);

AdvertisingManagementRouter.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string.isRequired,
    }).isRequired,
};

export default AdvertisingManagementRouter;
