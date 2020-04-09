import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { registerDevice, changeDeviceStatus, cancelDeviceRegistration } from '../action-creators';

import NewDevice from '../components/NewDevice';


const NewDevicePage = ({
    lastDeviceSerialNumber,
    lastDeviceStatus,
    registerDeviceAction,
    changeDeviceStatusAction,
    cancelDeviceRegistrationAction,
}) => (
    <NewDevice
        deviceSerial={lastDeviceSerialNumber}
        deviceStatus={lastDeviceStatus}
        registerDevice={registerDeviceAction}
        changeDeviceStatus={changeDeviceStatusAction}
        cancelRegistration={cancelDeviceRegistrationAction}
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
    changeDeviceStatusAction: PropTypes.func.isRequired,
    cancelDeviceRegistrationAction: PropTypes.func.isRequired,
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
    changeDeviceStatusAction: changeDeviceStatus,
    cancelDeviceRegistrationAction: cancelDeviceRegistration,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDevicePage);
