import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import DeviceMonitoringCard from '../components/DeviceMonitoringCard';
import {
    requestDeviceContent,
    startAdvertising,
    stopAdvertising,
    activateDevice,
    deactivateDevice,
    cleanMediaStreamId,
    cancelMediaStream,
    cancelDeviceActivation,
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
            startAdvertisingAction,
            stopAdvertisingAction,
            showDeviceStatusLoader,
            mediaStreamId,
            activateDeviceAction,
            deactivateDeviceAction,
            cleanMediaStreamIdAction,
            cancelMediaStreamAction,
            cancelDeviceActivationAction,
        } = this.props;
        return (
            <DeviceMonitoringCard
                content={currentDevice}
                showAdvertisingLoader={showAdvertisingLoader}
                startAdvertising={startAdvertisingAction}
                stopAdvertising={stopAdvertisingAction}
                showDeviceStatusLoader={showDeviceStatusLoader}
                activateDevice={activateDeviceAction}
                deactivateDevice={deactivateDeviceAction}
                cleanMediaStreamId={cleanMediaStreamIdAction}
                cancelMediaStream={cancelMediaStreamAction}
                mediaStreamId={mediaStreamId}
                cancelDeviceActivation={cancelDeviceActivationAction}
            />
        );
    }
}


DeviceMonitoringCardContainer.defaultProps = {
    mediaStreamId: null,
};

DeviceMonitoringCardContainer.propTypes = {
    currentDevice: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        serialNumber: PropTypes.string,
        isActive: PropTypes.bool,
        isAdvertisementsDisabled: PropTypes.bool,
        isRevokeRequired: PropTypes.bool,
    }).isRequired,
    requestDeviceContentAction: PropTypes.func.isRequired,
    showAdvertisingLoader: PropTypes.bool.isRequired,
    startAdvertisingAction: PropTypes.func.isRequired,
    stopAdvertisingAction: PropTypes.func.isRequired,
    showDeviceStatusLoader: PropTypes.bool.isRequired,
    activateDeviceAction: PropTypes.func.isRequired,
    deactivateDeviceAction: PropTypes.func.isRequired,
    cleanMediaStreamIdAction: PropTypes.func.isRequired,
    cancelMediaStreamAction: PropTypes.func.isRequired,
    mediaStreamId: PropTypes.number,
    cancelDeviceActivationAction: PropTypes.func.isRequired,
};


const mapStateToProps = ({
    devicesReducer: {
        devicesMonitoringReducer: {
            currentDevice,
            showAdvertisingLoader,
            showDeviceStatusLoader,
            mediaStreamId,
        },
    },
}) => ({
    currentDevice,
    showAdvertisingLoader,
    showDeviceStatusLoader,
    mediaStreamId,
});

const mapDispatchToProps = {
    requestDeviceContentAction: requestDeviceContent,
    startAdvertisingAction: startAdvertising,
    stopAdvertisingAction: stopAdvertising,
    activateDeviceAction: activateDevice,
    deactivateDeviceAction: deactivateDevice,
    cleanMediaStreamIdAction: cleanMediaStreamId,
    cancelMediaStreamAction: cancelMediaStream,
    cancelDeviceActivationAction: cancelDeviceActivation,
};


export default connect(mapStateToProps, mapDispatchToProps)(DeviceMonitoringCardContainer);
