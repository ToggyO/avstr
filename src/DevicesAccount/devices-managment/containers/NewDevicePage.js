import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { registerDevice, changeDeviceStatus, cancelDeviceRegistration } from '../action-creators';

import NewDevice from '../components/NewDevice';


const NewDevicePage = ({
    lastDeviceStatus,
    registerDeviceAction,
    changeDeviceStatusAction,
    cancelDeviceRegistrationAction,
}) => (
    <NewDevice
        deviceStatus={lastDeviceStatus}
        registerDevice={registerDeviceAction}
        changeDeviceStatus={changeDeviceStatusAction}
        cancelRegistration={cancelDeviceRegistrationAction}
    />
);


NewDevicePage.defaultProps = {
    lastDeviceStatus: '',
};

NewDevicePage.propTypes = {
    lastDeviceStatus: PropTypes.string,
    registerDeviceAction: PropTypes.func.isRequired,
    changeDeviceStatusAction: PropTypes.func.isRequired,
    cancelDeviceRegistrationAction: PropTypes.func.isRequired,
};


const mapStateToProps = ({
    devicesReducer: {
        devicesManagementReducer: {
            lastDeviceStatus,
        },
    },
}) => ({
    lastDeviceStatus,
});

const mapDispatchToProps = {
    registerDeviceAction: registerDevice,
    changeDeviceStatusAction: changeDeviceStatus,
    cancelDeviceRegistrationAction: cancelDeviceRegistration,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDevicePage);
