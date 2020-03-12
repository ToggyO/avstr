import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';

import history from '../history';

import AuthorizationPage from '../authorization/containers/AuthorizationPage';
import AdvertiserAccountRouter from '../../AdvertiserAccount/AdvertiserAccountRouter';
import CallbackPage from '../authorization/components/CallbackPage/CallbackPage';


const RootRouter = ({ isLoadingUser }) => {
    if (isLoadingUser || !history.location) {
        return <div>Loading...</div>;
    }

    return (
        <Router history={history}>
            <Switch>
                <Route
                    exact
                    path="/"
                    component={AuthorizationPage}
                />
                <Route
                    path="/callback"
                    component={CallbackPage}
                />
                <Route
                    exact
                    path="/advertiser"
                    component={AdvertiserAccountRouter}
                />
            </Switch>
        </Router>
    );
};


RootRouter.propTypes = {
    isLoadingUser: PropTypes.bool.isRequired,
};


const mapStateToProps = ({ oidcReducer: { user, isLoadingUser } }) => ({
    user,
    isLoadingUser,
});

export default connect(mapStateToProps)(RootRouter);
