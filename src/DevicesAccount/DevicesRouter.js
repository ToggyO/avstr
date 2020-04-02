import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import useIsLoggedIn from 'Core/authorization/utils/useIsLoggedIn';

import Loader from 'Core/common/Loader';
import NavBar from 'Core/common/NavBar';

const DevicesPage = lazy(() => import('./DevicesPage'));
// const NewAdvertisementPage = lazy(() => import('./advertising-management/NewAdvertisementPage'));


const DevicesRouter = ({ match: { path } }) => {
    const isLoggedIn = useIsLoggedIn();
    return (
        <div>
            {isLoggedIn
                ? (
                    <div>
                        <NavBar />
                        <Suspense fallback={<Loader />}>
                            <Switch>
                                <Route
                                    exact
                                    path={`${path}`}
                                    component={DevicesPage}
                                />
                                {/* <Route
                                        path={`${path}/add`}
                                        component={NewAdvertisementPage}
                                    /> */}
                            </Switch>
                        </Suspense>
                    </div>
                )
                : <Loader />}
        </div>
    );
};


DevicesRouter.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string.isRequired,
    }).isRequired,
};

export default DevicesRouter;
