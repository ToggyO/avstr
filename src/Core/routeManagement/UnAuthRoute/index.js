import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AuthContext } from 'Core/context';
import { createRoleRedirect } from 'Core/utils/checkRoles';
// import { REDIRECT_PATH_BY_ROLE } from 'Core/constants';

const CreateComponent = (Component, props) => <Component {...props} />;

const UnAuthRoute = ({ component: Component, ...rest }) => {
    const { isAuthorized, roles } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isAuthorized) {
                    return CreateComponent(Component, props);
                }
                // return <Redirect to={REDIRECT_PATH_BY_ROLE[roles[0]] || '/'} />;
                return <Redirect to={createRoleRedirect(roles)} />;
            }}
        />
    );
};

UnAuthRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
};

export default UnAuthRoute;
