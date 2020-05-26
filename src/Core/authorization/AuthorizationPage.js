import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from './action-creators';
// import history from '../history';

import Authorization from './components/Authorization';
import userManager from './utils/userManager';


class AuthorizationPage extends Component {
    componentDidMount() {
        // const { redirect } = this.props;
        if (!window.location.search) {
            userManager.getUser().then((user) => {
                if (!user || user.expired) {
                    userManager.signinRedirect({
                        // data: { path: '/devices/main/list' },
                        data: { path: '' },
                    });
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
