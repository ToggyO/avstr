import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Loader from 'Core/common/Loader';
import NavBar from 'Core/common/NavBar';
import useIsLoggedIn from '../Core/authorization/utils/useIsLoggedIn';

const AdvertiserAccountPage = lazy(() => import('./AdvertiserAccountPage'));
const NewAdvertisementPage = lazy(() => import('./advertising-management/NewAdvertisementPage'));


const AdvertiserAccountRouter = ({ match: { path } }) => {
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
                                    component={AdvertiserAccountPage}
                                />
                                <Route
                                    path={`${path}/add`}
                                    component={NewAdvertisementPage}
                                />
                            </Switch>
                        </Suspense>
                    </div>
                )
                : <Loader />}
        </div>
    );
};


AdvertiserAccountRouter.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string.isRequired,
    }).isRequired,
};

export default AdvertiserAccountRouter;
