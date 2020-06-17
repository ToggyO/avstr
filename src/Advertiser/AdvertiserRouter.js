import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import Loader from 'Core/common/Loader';
import AdvertisementsListPage from './AdvertisementsListPage';
import AdvertisementPage from './AdvertisementPage';

const AdvertiserRouter = ({ match: { path } }) => (
    <Suspense fallback={<Loader />}>
        <Switch>
            <Redirect exact push from={`${path}`} to={`${path}/advertisements`} />

            <Route
                exact
                path={`${path}/advertisements`}
                component={AdvertisementsListPage}
            />

            <Route
                exact
                path={`${path}/advertisements/:id`}
                component={AdvertisementPage}
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
