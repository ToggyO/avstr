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
    userInfo,
    setAuthorizedFunc,
    loading,
    globalLoading,
}) => {
    const { profile = {} } = userInfo;

    useEffect(() => {
        globalLoading(true);
        userManager.getUser().then((user) => {
            if (user !== null && !user.expired) {
                // console.log(user);
                setAuthorizedFunc(user);
                globalLoading(false);
                api.setConstantHeader('Authorization', `Bearer ${user.access_token}`);
            } else {
                globalLoading(false);
            }
        });
    }, [setAuthorizedFunc, globalLoading]);

    return (
        <AuthContext.Provider
            value={{
                isAuthorized,
                roles: profile['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || [],
            }}
        >
            {loading
                ? <PageLoading />
                : children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
    isAuthorized: PropTypes.bool.isRequired,
    userInfo: PropTypes.shape({
        profile: PropTypes.objectOf(PropTypes.any),
    }),
    setAuthorizedFunc: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    globalLoading: PropTypes.func.isRequired,
};

AuthProvider.defaultProps = {
    children: null,
    userInfo: {},
};

const mapStateToProps = ({ authorizationReducer }) => ({
    loading: getProp(authorizationReducer, 'loading'),
    isAuthorized: getProp(authorizationReducer, 'isAuthorized'),
    userInfo: getProp(authorizationReducer, 'userInfo'),
});

const mapDispatchToProps = {
    setAuthorizedFunc: setAuthorized,
    globalLoading: toggleGlobalLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider);
