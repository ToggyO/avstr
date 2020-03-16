import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from './action-creators';
import history from '../history';

import Authorization from './components/Authorization/Authorization';
import userManager from './userManager';


class AuthorizationPage extends Component {
    componentDidMount() {
        if (!window.location.search) {
            userManager.getUser().then((user) => {
                if (!user || user.expired) {
                    userManager.signinRedirect({
                        data: { path: '' },
                    });
                } else {
                    const redirectPath = localStorage.getItem('redirectPath');
                    history.push(redirectPath);
                }
            });
        }
    }

    render() {
        const { authErrMessage, loginAction } = this.props;
        return (
            <Authorization
                errMessage={authErrMessage}
                formSubmitHandler={loginAction}
            />
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
