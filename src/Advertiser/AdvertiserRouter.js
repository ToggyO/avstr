import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Loader from 'Core/common/Loader';

const Advertisements = () => (<div>Advertisements List Page</div>);
const Advertisement = () => (<div>Advertisement Page</div>);

const AdvertiserRouter = ({ match: { path } }) => (
    <Suspense fallback={<Loader />}>
        <Switch>
            <Route
                exact
                path={`${path}`}
                component={Advertisements}
            />

            <Route
                exact
                path={`${path}/advertisements`}
                component={Advertisements}
            />

            <Route
                exact
                path={`${path}/advertisements/:id`}
                component={Advertisement}
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
