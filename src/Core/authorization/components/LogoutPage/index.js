import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from '../../action-creators';


class LogoutPage extends Component {
    componentDidMount() {
        const { logoutAction } = this.props;
        logoutAction();
        localStorage.clear();
    }

    render() {
        return (
            <div />
        );
    }
}


LogoutPage.propTypes = {
    logoutAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    logoutAction: logout,
};

export default connect(null, mapDispatchToProps)(LogoutPage);
