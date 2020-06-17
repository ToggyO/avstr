import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import Loader from 'Core/common/Loader';
import AdsListPage from './AdsListPage';
import AdPage from './AdPage';

const AdvertiserRouter = ({ match: { path } }) => (
    <Suspense fallback={<Loader />}>
        <Switch>
            <Redirect exact push from={`${path}`} to={`${path}/advertisements`} />

            <Route
                exact
                path={`${path}/advertisements`}
                component={AdsListPage}
            />

            <Route
                exact
                path={`${path}/advertisements/:id`}
                component={AdPage}
            />
        </Switch>
    </Suspense>
);

AdvertiserRouter.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string.isRequired,
    }).isRequired,
};

export default AdvertiserRouter;
