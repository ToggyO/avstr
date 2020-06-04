import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import useIsLoggedIn from 'Core/authorization/utils/useIsLoggedIn';

import Loader from 'Core/common/Loader';


const DevicesPageRouter = lazy(() => import('./devices-managment/DevicesPageRouter'));
const NewDevicePage = lazy(() => import('./devices-managment/containers/NewDevicePage'));
const DeviceMonitoringPage = lazy(() => import('./devices-monitoring/containers/DeviceMonitoringPage'));


const DevicesRouter = ({ match: { path } }) => {
    const isLoggedIn = useIsLoggedIn();
    return (
        <>
            {isLoggedIn
                ? (
                    <Suspense fallback={<Loader />}>
                        <Switch>
                            <Route
                                path={`${path}/main`}
                                component={DevicesPageRouter}
                            />
                            <Route
                                path={`${path}/add`}
                                component={NewDevicePage}
                            />
                            <Route
                                path={`${path}/monitoring`}
                                component={DeviceMonitoringPage}
                            />
                        </Switch>
                    </Suspense>
                )
                : <Loader />}
        </>
    );
};


DevicesRouter.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string.isRequired,
    }).isRequired,
};

export default DevicesRouter;
