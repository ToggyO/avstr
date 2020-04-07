import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { registerDevice } from '../action-creators';

import NewDevice from '../components/NewDevice';


const NewDevicePage = ({ registerDeviceAction, lastDeviceSerialNumber, lastDeviceStatus }) => (
    <NewDevice
        deviceSerial={lastDeviceSerialNumber}
        deviceStatus={lastDeviceStatus}
        registerDevice={registerDeviceAction}
    />
);


NewDevicePage.defaultProps = {
    lastDeviceSerialNumber: '',
    lastDeviceStatus: '',
};

NewDevicePage.propTypes = {
    lastDeviceSerialNumber: PropTypes.string,
    lastDeviceStatus: PropTypes.string,
    registerDeviceAction: PropTypes.func.isRequired,
};


const mapStateToProps = ({
    devicesReducer: {
        devicesManagementReducer: {
            lastDeviceSerialNumber,
            lastDeviceStatus,
        },
    },
}) => ({
    lastDeviceSerialNumber,
    lastDeviceStatus,
});

const mapDispatchToProps = {
    registerDeviceAction: registerDevice,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDevicePage);
