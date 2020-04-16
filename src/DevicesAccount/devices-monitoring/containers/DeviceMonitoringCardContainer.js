import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import DeviceMonitoringCard from '../components/DeviceMonitoringCard';
import { requestDeviceContent } from '../action-creators';


class DeviceMonitoringCardContainer extends Component {
    componentDidMount() {
        const { requestDeviceContentAction } = this.props;
        const deviceId = window.location.pathname.match(/\d+/)[0];
        requestDeviceContentAction(deviceId);
    }

    render() {
        const { currentDevice } = this.props;
        return (
            <DeviceMonitoringCard content={currentDevice} />
        );
    }
}


DeviceMonitoringCardContainer.propTypes = {
    currentDevice: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            serialNumber: PropTypes.string.isRequired,
            isActive: PropTypes.bool.isRequired,
        }),
    ).isRequired,
    requestDeviceContentAction: PropTypes.func.isRequired,
};


const mapStateToProps = ({
    devicesReducer: {
        devicesMonitoringReducer: {
            currentDevice,
        },
    },
}) => ({
    currentDevice,
});

const mapDispatchToProps = {
    requestDeviceContentAction: requestDeviceContent,
};


export default connect(mapStateToProps, mapDispatchToProps)(DeviceMonitoringCardContainer);
