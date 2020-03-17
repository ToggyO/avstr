import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { logout } from '../Core/authorization/action-creators';

import Loader from '../Core/common/Loader/Loader';
import Advertisements from './advertising-management/components/Advertisements/Advertisements';

import history from '../Core/history';
import userManager from '../Core/authorization/userManager';


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

    handleAddBtn = () => {
        history.push('/advertiser/add');
    };

    handleLogout = () => {
        userManager.signoutRedirect();
        userManager.removeUser();
        const { logoutAction } = this.props;
        logoutAction();
    };

    render() {
        const { isLoggedIn } = this.state;
        return (
            isLoggedIn
                ? (
                    <Advertisements
                        title="Здесь пока нет объявлений"
                        addBtnHandler={this.handleAddBtn}
                        navBarBtnHandler={this.handleLogout}
                    />
                )
                : <Loader />
        );
    }
}

AdvertiserAccountPage.defaultProps = {};

AdvertiserAccountPage.propTypes = {
    logoutAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    logoutAction: logout,
};

export default connect(null, mapDispatchToProps)(AdvertiserAccountPage);
