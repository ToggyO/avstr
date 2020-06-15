import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AuthContext } from 'Core/context';
import { ROOT_ROUTES } from 'Core/constants';

const CreateComponent = (Component, props) => <Component {...props} />;

const UnAuthRoute = ({ component: Component, ...rest }) => {
    const isAuthorized = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isAuthorized) return CreateComponent(Component, props);
                return <Redirect to={ROOT_ROUTES.AD_MANAGER} />;
            }}
        />
    );
};

UnAuthRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
};

export default UnAuthRoute;
