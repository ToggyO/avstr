import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import DeviceMonitoringCard from '../components/DeviceMonitoringCard';


const DeviceMonitoringCardContainer = ({ devices }) => {
    const deviceId = window.location.pathname.match(/\d+/)[0];
    const findDeviceById = (id) => devices.find((device) => device.id === Number(id));

    return (
        <DeviceMonitoringCard content={findDeviceById(deviceId)} />
    );
};


DeviceMonitoringCardContainer.propTypes = {
    devices: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            serialNumber: PropTypes.string.isRequired,
            isActive: PropTypes.bool.isRequired,
        }),
    ).isRequired,
};


const mapStateToProps = ({
    devicesReducer: {
        devicesManagementReducer: {
            devices,
        },
    },
}) => ({
    devices,
});


export default connect(mapStateToProps)(DeviceMonitoringCardContainer);
