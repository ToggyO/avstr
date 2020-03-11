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
                // alert(user);
                if (user && !user.expired) {
                    // alert(user.access_token);
                    return <Component {...props} />;
                }

                return userManager.signinRedirect({
                    data: {
                        path: history.location.path,
                    },
                });
            });
        }}
    />
);

PrivateRoute.propTypes = {
    component: PropTypes.node.isRequired,
};


export default PrivateRoute;
