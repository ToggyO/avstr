import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import DeviceMonitoringCard from '../components/DeviceMonitoringCard';
import {
    requestDeviceContent,
    toggleAdvertisingOnDevice,
    activateDevice,
    deactivateDevice,
    cleanMediaStreamId,
    cancelMediaStream,
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
            mediaStreamId,
            activateDeviceAction,
            deactivateDeviceAction,
            cleanMediaStreamIdAction,
            cancelMediaStreamAction,
        } = this.props;
        return (
            <DeviceMonitoringCard
                content={currentDevice}
                showAdvertisingLoader={showAdvertisingLoader}
                toggleAdvertisingHandler={toggleAdvertisingOnDeviceAction}
                showDeviceStatusLoader={showDeviceStatusLoader}
                activateDevice={activateDeviceAction}
                deactivateDevice={deactivateDeviceAction}
                cleanMediaStreamId={cleanMediaStreamIdAction}
                cancelMediaStream={cancelMediaStreamAction}
                mediaStreamId={mediaStreamId}
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
    }).isRequired,
    requestDeviceContentAction: PropTypes.func.isRequired,
    showAdvertisingLoader: PropTypes.bool.isRequired,
    toggleAdvertisingOnDeviceAction: PropTypes.func.isRequired,
    showDeviceStatusLoader: PropTypes.bool.isRequired,
    activateDeviceAction: PropTypes.func.isRequired,
    deactivateDeviceAction: PropTypes.func.isRequired,
    cleanMediaStreamIdAction: PropTypes.func.isRequired,
    cancelMediaStreamAction: PropTypes.func.isRequired,
    mediaStreamId: PropTypes.number,
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
    toggleAdvertisingOnDeviceAction: toggleAdvertisingOnDevice,
    activateDeviceAction: activateDevice,
    deactivateDeviceAction: deactivateDevice,
    cleanMediaStreamIdAction: cleanMediaStreamId,
    cancelMediaStreamAction: cancelMediaStream,
};


export default connect(mapStateToProps, mapDispatchToProps)(DeviceMonitoringCardContainer);
