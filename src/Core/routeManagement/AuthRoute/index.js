import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AuthContext } from 'Core/context';

const CreateComponent = (Component, props) => <Component {...props} />;

const AuthRoute = ({ component: Component, ...rest }) => {
    const isAuthorized = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuthorized) return CreateComponent(Component, props);
                return <Redirect to="/" />;
            }}
        />
    );
};

AuthRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
};

export default AuthRoute;
