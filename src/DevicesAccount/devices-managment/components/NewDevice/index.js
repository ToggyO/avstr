import React from 'react';
import PropTypes from 'prop-types';

import NewDeviceForm from '../NewDeviceForm';
import NewDeviceSuccess from '../NewDeviceSuccess';


const NewDevice = ({
    deviceStatus,
    registerDevice,
    changeDeviceStatus,
    cancelRegistration,
}) => (
    deviceStatus === 'connected'
        ? <NewDeviceSuccess changeDeviceStatus={changeDeviceStatus} />
        : (
            <NewDeviceForm
                deviceStatus={deviceStatus}
                registerDevice={registerDevice}
                changeDeviceStatus={changeDeviceStatus}
                cancelRegistration={cancelRegistration}
            />
        )
);


NewDevice.defaultProps = {
    deviceStatus: '',
};

NewDevice.propTypes = {
    deviceStatus: PropTypes.string,
    registerDevice: PropTypes.func.isRequired,
    changeDeviceStatus: PropTypes.func.isRequired,
    cancelRegistration: PropTypes.func.isRequired,
};

export default NewDevice;
