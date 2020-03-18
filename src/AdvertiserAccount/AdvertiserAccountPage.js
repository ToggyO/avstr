import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import history from 'Core/history';

import Advertisements from './advertising-management/components/Advertisements';


class AdvertiserAccountPage extends Component {
    handleAddBtn = () => {
        history.push('/advertiser/add');
    };

    render() {
        const advertisements = [1];
        return (
            <Advertisements
                title={advertisements.length ? 'Объявления' : 'Здесь пока нет объявлений'}
                addBtnHandler={this.handleAddBtn}
                navBarBtnHandler={this.handleLogout}
            />
        );
    }
}


AdvertiserAccountPage.propTypes = {

};

const mapDispatchToProps = {

};

export default connect(null, mapDispatchToProps)(AdvertiserAccountPage);
