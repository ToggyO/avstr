import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AuthContext } from 'Core/context';
import { checkRoles } from 'Core/utils/checkRoles';

const CreateComponent = (Component, props) => <Component {...props} />;

const AuthRoute = ({ component: Component, allowedRoles, ...rest }) => {
    const { isAuthorized, roles } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuthorized && checkRoles(allowedRoles, roles)) {
                    // debugger;
                    return CreateComponent(Component, props);
                }
                // debugger;
                return <Redirect to="/" />;
            }}
        />
    );
};

AuthRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    allowedRoles: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOf([[], 'Administrator', 'DeviceManager', 'Advertiser']),
        ),
        PropTypes.string,
    ]),
};

AuthRoute.defaultProps = {
    allowedRoles: [],
};

export default AuthRoute;
