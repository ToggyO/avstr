import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import DeviceMonitoringCard from '../components/DeviceMonitoringCard';
import { requestDeviceContent, toggleAdvertisingOnDevice, toggleDeviceStatus } from '../action-creators';


class DeviceMonitoringCardContainer extends Component {
    componentDidMount() {
        const { requestDeviceContentAction } = this.props;
        const deviceId = window.location.pathname.match(/\d+/)[0];
        requestDeviceContentAction(deviceId);
    }

    render() {
        const {
            currentDevice,
            showAdvertisingLoader,
            toggleAdvertisingOnDeviceAction,
            showDeviceStatusLoader,
            toggleDeviceStatusAction,
        } = this.props;
        return (
            <DeviceMonitoringCard
                content={currentDevice}
                showAdvertisingLoader={showAdvertisingLoader}
                toggleAdvertisingHandler={toggleAdvertisingOnDeviceAction}
                showDeviceStatusLoader={showDeviceStatusLoader}
                toggleDeviceStatus={toggleDeviceStatusAction}
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
    requestDeviceContentAction: PropTypes.func.isRequired,
    showAdvertisingLoader: PropTypes.bool.isRequired,
    toggleAdvertisingOnDeviceAction: PropTypes.func.isRequired,
    showDeviceStatusLoader: PropTypes.bool.isRequired,
    toggleDeviceStatusAction: PropTypes.func.isRequired,
};


const mapStateToProps = ({
    devicesReducer: {
        devicesMonitoringReducer: {
            currentDevice,
            showAdvertisingLoader,
            showDeviceStatusLoader,
        },
    },
}) => ({
    currentDevice,
    showAdvertisingLoader,
    showDeviceStatusLoader,
});

const mapDispatchToProps = {
    requestDeviceContentAction: requestDeviceContent,
    toggleAdvertisingOnDeviceAction: toggleAdvertisingOnDevice,
    toggleDeviceStatusAction: toggleDeviceStatus,
};


export default connect(mapStateToProps, mapDispatchToProps)(DeviceMonitoringCardContainer);
