import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { login } from '../../../Core/authorization/action-creators';

import AdvertiserAccount from '../components/AdvertiserAccount';


class AdvertiserAccountPage extends Component {
    componentDidMount() {
        // const { loginAction } = this.props;
        // loginAction();
    }

    render() {
        return (
            <AdvertiserAccount />
        );
    }
}

AdvertiserAccountPage.defaultProps = {

};

AdvertiserAccountPage.propTypes = {
    // loginAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    loginAction: login,
};

export default connect(null, mapDispatchToProps)(AdvertiserAccountPage);
