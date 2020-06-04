import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { LoginLayout } from '@Core/ant/components';
import { login } from './action-creators';
import Authorization from './components/Authorization';
import userManager from './utils/userManager';


class AuthorizationPage extends Component {
    componentDidMount() {
        const redirect = localStorage.getItem('redirect');
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
        const { authErrMessage, loginAction } = this.props;
        return (
            <LoginLayout>
                <Authorization
                    errMessage={authErrMessage}
                    formSubmitHandler={loginAction}
                />
            </LoginLayout>
        );
    }
}


AuthorizationPage.propTypes = {
    authErrMessage: PropTypes.string.isRequired,
    loginAction: PropTypes.func.isRequired,
};


const mapStateToProps = ({ authorizationReducer: { authErrMessage } }) => ({ authErrMessage });

const mapDispatchToProps = {
    loginAction: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationPage);
