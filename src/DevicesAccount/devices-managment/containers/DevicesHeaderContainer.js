import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import history from 'Core/history';

import DevicesHeader from '../components/DevicesHeader';
import { requestDevices } from '../action-creators';

class DevicesHeaderContainer extends Component {
    componentDidMount() {
        const { requestDevicesAction } = this.props;
        requestDevicesAction();
    }

    handleAddBtn = () => {
        history.push('/devices/add');
    };

    handleMapBtn = () => {
        history.push('/devices/main/map');
    };

    handleListBtn = () => {
        history.push('/devices/main/list');
    };

    render() {
        const { location } = this.props;
        return (
            <DevicesHeader
                text="Устройства"
                // text={devices.length ? 'Устройства' : 'Нет зарегистрированных устройств'}
                handleAddBtn={this.handleAddBtn}
                handleMapBtn={this.handleMapBtn}
                handleListBtn={this.handleListBtn}
                location={location}
            />
        );
    }
}

DevicesHeaderContainer.propTypes = {
    requestDevicesAction: PropTypes.func.isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ devicesReducer: { devicesManagementReducer: { devices } } }) => ({ devices });

const mapDispatchToProps = {
    requestDevicesAction: requestDevices,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(DevicesHeaderContainer);
