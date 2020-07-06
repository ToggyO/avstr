import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getFromLocalState } from 'Core/utils/local-storage';
import { authClearErrors, login } from './action-creators';
import Authorization from './components/Authorization';
import userManager from './utils/userManager';

class AuthorizationPage extends Component {
    componentDidMount() {
        const redirect = getFromLocalState('redirect');
        if (!window.location.search) {
            userManager.getUser().then((user) => {
                if (!user || user.expired) {
                    userManager.signinRedirect({
                        data: { path: redirect },
                    });
                }
            });
        }
    }

    render() {
        const {
            authErrMessage,
            loginAction,
            loginRequestLoading,
            clearErrors,
        } = this.props;
        return (
            <Authorization
                errMessage={authErrMessage}
                formSubmitHandler={loginAction}
                loading={loginRequestLoading}
                clearErrors={clearErrors}
            />
        );
    }
}

AuthorizationPage.propTypes = {
    authErrMessage: PropTypes.string.isRequired,
    loginAction: PropTypes.func.isRequired,
    loginRequestLoading: PropTypes.bool,
    clearErrors: PropTypes.func,
};

AuthorizationPage.defaultProps = {
    loginRequestLoading: false,
    clearErrors: Function.prototype,
};

const mapStateToProps = ({ authorizationReducer: { authErrMessage, loginRequestLoading } }) => ({
    authErrMessage,
    loginRequestLoading,
});

const mapDispatchToProps = {
    loginAction: login,
    clearErrors: authClearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationPage);
