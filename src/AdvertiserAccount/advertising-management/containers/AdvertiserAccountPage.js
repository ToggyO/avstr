import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { login } from '../../../Core/authorization/action-creators';

import AdvertiserAccount from '../components/AdvertiserAccount';
import userManager from '../../../Core/authorization/userManager';


class AdvertiserAccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
        };
    }

    componentDidMount() {
        userManager.getUser().then((user) => {
            if (!user || user.expired) {
                userManager.signinRedirect({
                    data: { path: '' },
                });
            } else {
                this.setState({
                    isLoggedIn: true,
                });
            }
        });
    }

    render() {
        const { isLoggedIn } = this.state;
        return (
            isLoggedIn ? <AdvertiserAccount /> : <div>Loading...</div>
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
