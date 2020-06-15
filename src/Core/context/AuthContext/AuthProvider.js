import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import userManager from 'Core/authorization/utils/userManager';
import { getProp } from 'Core/utils/getProp';
import { setAuthorized } from 'Core/authorization/action-creators';
import api from 'Core/api';
import AuthContext from './AuthContext';

const AuthProvider = ({ children, isAuthorized, setAuthorizedFunc }) => {
    userManager.getUser().then((user) => {
        if (user !== null && !user.expired) {
            setAuthorizedFunc(true);
            api.setConstantHeader('Authorization', `Bearer ${user.access_token}`);
        }
    });

    return <AuthContext.Provider value={isAuthorized}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.element,
    isAuthorized: PropTypes.bool.isRequired,
    setAuthorizedFunc: PropTypes.func.isRequired,
};

AuthProvider.defaultProps = {
    children: null,
};

const mapStateToProps = ({ authorizationReducer }) => ({
    isAuthorized: getProp(authorizationReducer, 'isAuthorized'),
});

const mapDispatchToProps = {
    setAuthorizedFunc: setAuthorized,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider);
