import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../action-creators';

import Authorization from '../components/Authorization/Authorization';


const AuthorizationPage = ({ loginAction, authErrMessage }) => (
    <Authorization
        errMessage={authErrMessage}
        formSubmitHandler={loginAction}
    />
);


AuthorizationPage.propTypes = {
    authErrMessage: PropTypes.string.isRequired,
    loginAction: PropTypes.func.isRequired,
};


const mapStateToProps = ({ authorizationReducer: { authErrMessage } }) => ({ authErrMessage });

const mapDispatchToProps = {
    loginAction: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationPage);
