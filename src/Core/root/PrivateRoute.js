import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import userManager from '../authorization/userManager';
import history from '../history';


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            userManager.getUser().then((user) => {
                if (!user || user.expired) {
                    userManager.signinRedirect({
                        data: {
                            path: history.location.pathname,
                        },
                    });
                }
            });
            return <Component {...props} />;
        }}
    />
);


PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
};


export default PrivateRoute;
