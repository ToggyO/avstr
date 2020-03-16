import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import AdvertiserAccountPage from './AdvertiserAccountPage';


const AdvertiserAccountRouter = ({ match: { path } }) => (
    <Switch>
        <Route exact path={`${path}`} component={AdvertiserAccountPage} />
    </Switch>
);


AdvertiserAccountRouter.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string.isRequired,
    }).isRequired,
};

export default AdvertiserAccountRouter;
