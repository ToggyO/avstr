import React from 'react';
import PropTypes from 'prop-types';
import { useWillUnmount } from 'beautiful-react-hooks';

import { connect } from 'react-redux';
import {
    registerDevice,
    changeDeviceStatus,
    cancelDeviceRegistration,
    changeFieldsCleanNeededFlag,
} from '../action-creators';

import NewDevice from '../components/NewDevice';

const NewDevicePage = ({
    lastDeviceStatus,
    registerDeviceAction,
    changeDeviceStatusAction,
    cancelDeviceRegistrationAction,
    isFieldsCleanNeeded,
    changeFieldsCleanNeededFlagAction,
}) => {
    useWillUnmount(() => {
        changeDeviceStatusAction('');
        cancelDeviceRegistrationAction();
    });

    return (
        <NewDevice
            deviceStatus={lastDeviceStatus}
            registerDevice={registerDeviceAction}
            changeDeviceStatus={changeDeviceStatusAction}
            cancelRegistration={cancelDeviceRegistrationAction}
            isFieldsCleanNeeded={isFieldsCleanNeeded}
            changeFieldsCleanNeededFlag={changeFieldsCleanNeededFlagAction}
        />
    );
};

NewDevicePage.defaultProps = {
    lastDeviceStatus: '',
};

NewDevicePage.propTypes = {
    lastDeviceStatus: PropTypes.string,
    registerDeviceAction: PropTypes.func.isRequired,
    changeDeviceStatusAction: PropTypes.func.isRequired,
    cancelDeviceRegistrationAction: PropTypes.func.isRequired,
    isFieldsCleanNeeded: PropTypes.bool.isRequired,
    changeFieldsCleanNeededFlagAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({
    devicesReducer: {
        devicesManagementReducer: {
            lastDeviceStatus,
            isFieldsCleanNeeded,
        },
    },
}) => ({
    lastDeviceStatus,
    isFieldsCleanNeeded,
});

const mapDispatchToProps = {
    registerDeviceAction: registerDevice,
    changeDeviceStatusAction: changeDeviceStatus,
    cancelDeviceRegistrationAction: cancelDeviceRegistration,
    changeFieldsCleanNeededFlagAction: changeFieldsCleanNeededFlag,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDevicePage);
