import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import DeviceMonitoringCard from '../components/DeviceMonitoringCard';
import {
    requestDeviceContent,
    toggleAdvertisingOnDevice,
    toggleDeviceStatus,
    startMediaStream,
} from '../action-creators';


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
            isTranslationShowing,
            startMediaStreamAction,
        } = this.props;
        return (
            <DeviceMonitoringCard
                content={currentDevice}
                showAdvertisingLoader={showAdvertisingLoader}
                toggleAdvertisingHandler={toggleAdvertisingOnDeviceAction}
                showDeviceStatusLoader={showDeviceStatusLoader}
                toggleDeviceStatus={toggleDeviceStatusAction}
                isTranslationShowing={isTranslationShowing}
                startMediaStream={startMediaStreamAction}
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
    isTranslationShowing: PropTypes.bool.isRequired,
    startMediaStreamAction: PropTypes.func.isRequired,
};


const mapStateToProps = ({
    devicesReducer: {
        devicesMonitoringReducer: {
            currentDevice,
            showAdvertisingLoader,
            showDeviceStatusLoader,
            isTranslationShowing,
        },
    },
}) => ({
    currentDevice,
    showAdvertisingLoader,
    showDeviceStatusLoader,
    isTranslationShowing,
});

const mapDispatchToProps = {
    requestDeviceContentAction: requestDeviceContent,
    toggleAdvertisingOnDeviceAction: toggleAdvertisingOnDevice,
    toggleDeviceStatusAction: toggleDeviceStatus,
    startMediaStreamAction: startMediaStream,
};


export default connect(mapStateToProps, mapDispatchToProps)(DeviceMonitoringCardContainer);
