import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import AdvertiserAccountPage from './AdvertiserAccountPage';
import NewAdvertisement from './advertising-management/components/NewAdvertisement/NewAdvertisement';

const AdvertiserAccountRouter = ({ match: { path } }) => (
    <div>
        <Switch>
            <Route
                exact
                path={`${path}`}
                component={AdvertiserAccountPage}
            />
            <Route
                path={`${path}/add`}
                component={NewAdvertisement}
            />
        </Switch>
    </div>
);


AdvertiserAccountRouter.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string.isRequired,
    }).isRequired,
};

export default AdvertiserAccountRouter;
