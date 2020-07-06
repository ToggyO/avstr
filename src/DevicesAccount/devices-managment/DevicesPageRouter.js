import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import { PageLoading } from 'Core/ant';
import DevicesHeaderContainer from './containers/DevicesHeaderContainer';

const DevicesListPage = lazy(() => import('./containers/DevicesListPage'));
const DevicesMapPage = lazy(() => import('./containers/DevicesMapPage'));

const DevicesPageRouter = ({ match: { path } }) => (
    <>
        <DevicesHeaderContainer />
        <Suspense fallback={<PageLoading />}>
            <Switch>
                <Route
                    path={`${path}/list`}
                    component={DevicesListPage}
                />
                <Route
                    path={`${path}/map`}
                    component={DevicesMapPage}
                />
            </Switch>
        </Suspense>
    </>
);

DevicesPageRouter.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string.isRequired,
    }).isRequired,
};

export default DevicesPageRouter;
