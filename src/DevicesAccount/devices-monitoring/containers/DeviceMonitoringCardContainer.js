import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import DeviceMonitoringCard from '../components/DeviceMonitoringCard';
import { requestDeviceContent, toggleAdvertisingOnDevice } from '../action-creators';


class DeviceMonitoringCardContainer extends Component {
    componentDidMount() {
        const { requestDeviceContentAction } = this.props;
        const deviceId = window.location.pathname.match(/\d+/)[0];
        requestDeviceContentAction(deviceId);
    }

    render() {
        const { currentDevice, showAdvertisingLoader, toggleAdvertisingOnDeviceAction } = this.props;
        return (
            <DeviceMonitoringCard
                content={currentDevice}
                showAdvertisingLoader={showAdvertisingLoader}
                stopAdvertisingHandler={toggleAdvertisingOnDeviceAction}
            />
        );
    }
}


DeviceMonitoringCardContainer.propTypes = {
    currentDevice: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        serialNumber: PropTypes.string,
        isActive: PropTypes.bool,
    }).isRequired,
    showAdvertisingLoader: PropTypes.bool.isRequired,
    requestDeviceContentAction: PropTypes.func.isRequired,
    toggleAdvertisingOnDeviceAction: PropTypes.func.isRequired,
};


const mapStateToProps = ({
    devicesReducer: {
        devicesMonitoringReducer: {
            currentDevice,
            showAdvertisingLoader,
        },
    },
}) => ({
    currentDevice,
    showAdvertisingLoader,
});

const mapDispatchToProps = {
    requestDeviceContentAction: requestDeviceContent,
    toggleAdvertisingOnDeviceAction: toggleAdvertisingOnDevice,
};


export default connect(mapStateToProps, mapDispatchToProps)(DeviceMonitoringCardContainer);
