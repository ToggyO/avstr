import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';

import { PageLoading } from 'Core/ant';
import NotFoundPage from 'Core/root/NotFoundPage';

const DevicesPageRouter = lazy(() => import('./devices-managment/DevicesPageRouter'));
const NewDevicePage = lazy(() => import('./devices-managment/containers/NewDevicePage'));
const DeviceMonitoringPage = lazy(() => import('./devices-monitoring/containers/DeviceMonitoringPage'));

const DevicesRouter = ({ match: { path } }) => (
    <Suspense fallback={<PageLoading />}>
        <Switch>
            <Route exact path={path} render={() => <Redirect to={`${path}/main`} />} />
            <Route
                path={`${path}/main`}
                component={DevicesPageRouter}
            />
            <Route
                path={`${path}/add`}
                component={NewDevicePage}
            />
            <Route
                path={`${path}/monitoring/:id`}
                component={DeviceMonitoringPage}
            />
            <Route component={NotFoundPage} />
        </Switch>
    </Suspense>
);

DevicesRouter.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string.isRequired,
    }).isRequired,
};

export default DevicesRouter;
