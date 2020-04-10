import React, { useState } from 'react';
import PropTypes from 'prop-types';

import history from 'Core/history';

import NewDeviceForm from '../NewDeviceForm';
import NewDeviceSuccess from '../NewDeviceSuccess';


const NewDevice = ({
    deviceStatus,
    registerDevice,
    changeDeviceStatus,
    cancelRegistration,
}) => {
    const [codeText, setCodeText] = useState('');
    const [deviceNameText, setDeviceNameText] = useState('');

    const handleCodeChange = ({ target: { value } }) => {
        setCodeText(value);
    };
    const handleDeviceNameChange = ({ target: { value } }) => {
        setDeviceNameText(value);
    };

    const handleClosePopup = () => {
        changeDeviceStatus('');
        cancelRegistration();
    };

    const handleDeclineBtn = () => {
        handleClosePopup();
        history.push('/devices/main/list');
    };

    const okBtnHandler = () => {
        registerDevice({
            name: deviceNameText,
            serialNumberCrc: codeText,
            isFromPopup: false,
        });
    };

    const popupOkBtnHandler = () => {
        registerDevice({
            name: deviceNameText,
            serialNumberCrc: codeText,
            isFromPopup: true,
        });
    };

    return (
        deviceStatus === 'connected'
            ? <NewDeviceSuccess changeDeviceStatus={changeDeviceStatus} />
            : (
                <NewDeviceForm
                    deviceStatus={deviceStatus}
                    code={codeText}
                    deviceName={deviceNameText}
                    handleCodeChange={handleCodeChange}
                    handleDeviceNameChange={handleDeviceNameChange}
                    handleDeclineBtn={handleDeclineBtn}
                    okBtnHandler={okBtnHandler}
                    handleClosePopup={handleClosePopup}
                    popupOkBtnHandler={popupOkBtnHandler}
                />
            )
    );
};


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
