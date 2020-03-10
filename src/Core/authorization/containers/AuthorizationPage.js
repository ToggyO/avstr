import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../action-creators';

import Authorization from '../components/Authorization/Authorization';


const AuthorizationPage = (props) => {
    const { loginAction } = props;
    return (
        <Authorization loginAction={loginAction} />
    );
};


AuthorizationPage.defaultProps = {};

AuthorizationPage.propTypes = {
    loginAction: PropTypes.func.isRequired,
};

// const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {
    loginAction: login,
};

export default connect(null, mapDispatchToProps)(AuthorizationPage);
