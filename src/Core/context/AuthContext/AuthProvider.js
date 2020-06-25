import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import userManager from 'Core/authorization/utils/userManager';
import { getProp } from 'Core/utils/getProp';
import { PageLoading } from 'Core/ant';
import { setAuthorized, toggleGlobalLoading } from 'Core/authorization/action-creators';
import api from 'Core/api';
import AuthContext from './AuthContext';

const AuthProvider = ({
    children,
    isAuthorized,
    setAuthorizedFunc,
    loading,
    globalLoading,
}) => {
    useEffect(() => {
        globalLoading(true);
        userManager.getUser().then((user) => {
            if (user !== null && !user.expired) {
                setAuthorizedFunc(true);
                globalLoading(false);
                api.setConstantHeader('Authorization', `Bearer ${user.access_token}`);
            } else {
                globalLoading(false);
            }
        });
    }, [setAuthorizedFunc, globalLoading]);

    return (
        <AuthContext.Provider value={isAuthorized}>
            {loading
                ? <PageLoading />
                : children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
    isAuthorized: PropTypes.bool.isRequired,
    setAuthorizedFunc: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    globalLoading: PropTypes.func.isRequired,
};

AuthProvider.defaultProps = {
    children: null,
};

const mapStateToProps = ({ authorizationReducer }) => ({
    loading: getProp(authorizationReducer, 'loading'),
    isAuthorized: getProp(authorizationReducer, 'isAuthorized'),
});

const mapDispatchToProps = {
    setAuthorizedFunc: setAuthorized,
    globalLoading: toggleGlobalLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider);
