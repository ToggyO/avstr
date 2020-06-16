import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Loader from 'Core/common/Loader';

const Page = () => (<div>Advertiser Page</div>);

const AdvertiserRouter = ({ match: { path } }) => (
    <Suspense fallback={<Loader />}>
        <Switch>
            <Route
                exact
                path={`${path}`}
                component={Page}
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
