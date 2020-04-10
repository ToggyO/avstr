import React, { useState } from 'react';
import PropTypes from 'prop-types';

import history from 'Core/history';

import Container from 'Core/common/Container';
import Title from 'Core/common/Title';
import Input from 'Core/common/Input';
import Button from 'Core/common/Button';
import { Icon as SemanticIcon } from 'semantic-ui-react';
import NewDeviceTextItem from '../NewDeviceTextItem';
import NewDeviceErrPopup from '../NewDeviceErrPopup';
import NewDeviceWarnPopup from '../NewDeviceWarnPopup';

import styles from './index.module.scss';


const NewDeviceForm = ({
    deviceStatus,
    registerDevice,
    changeDeviceStatus,
    cancelRegistration,
}) => {
    const [codeText, setCodeText] = useState('');
    const [deviceNameText, setDeviceNameText] = useState('');
    const [showWarningPopup, setShowWarningPopup] = useState(false);

    const handleCodeChange = ({ target: { value } }) => {
        setCodeText(value);
    };
    const handleDeviceNameChange = ({ target: { value } }) => {
        setDeviceNameText(value);
    };
    const handleDeclineBtn = () => {
        setShowWarningPopup(true);
    };
    const okBtnHandler = () => {
        registerDevice({
            name: deviceNameText,
            serialNumberCrc: codeText,
            isFromPopup: false,
        });
    };

    const handleCloseErrPopup = () => {
        changeDeviceStatus('');
        cancelRegistration();
    };

    const handleCloseWarnPopup = () => {
        setShowWarningPopup(false);
    };

    const declineRegistration = () => {
        handleCloseErrPopup();
        history.push('/devices/main/list');
    };


    const retryRegistration = () => {
        registerDevice({
            name: deviceNameText,
            serialNumberCrc: codeText,
            isFromPopup: true,
        });
    };

    return (
        <>
            <Container className={styles.newDevice}>
                <Title
                    text="Новое устройство"
                    className={styles.title}
                />
                <NewDeviceTextItem
                    number={1}
                    text="Включите устройство"
                    className={styles.firstPoint}
                />

                <NewDeviceTextItem
                    number={2}
                    text="Введите код с экрана устройства"
                    className={styles.otherPoints}
                />
                <Input
                    className={styles.firstInput}
                    value={codeText}
                    onChange={handleCodeChange}
                />

                <NewDeviceTextItem
                    number={3}
                    text="Придумайте название"
                    className={styles.otherPoints}
                />
                <Input
                    placeholder="Устройство 1"
                    className={styles.secondInput}
                    value={deviceNameText}
                    onChange={handleDeviceNameChange}
                />

                <div className={styles.btnsWrap}>
                    <Button
                        type="outline"
                        size="medium"
                        className={styles.declineBtn}
                        onClick={handleDeclineBtn}
                    >
                        Отменить
                    </Button>

                    <Button
                        type="main"
                        size="medium"
                        disabled={!codeText || !deviceNameText}
                        className={styles.okBtn}
                        onClick={okBtnHandler}
                    >
                        Далее
                        <SemanticIcon name="arrow circle right" />
                    </Button>
                    {deviceStatus === 'pending'
                    && (
                        <div className={styles.status}>
                            Подождите, ожидается подключение устройства.
                        </div>
                    )}
                </div>
            </Container>

            <NewDeviceErrPopup
                show={deviceStatus === 'notConnected' || deviceStatus === 'popupPending'}
                deviceStatus={deviceStatus}
                closeBtnHandler={handleCloseErrPopup}
                declineBtnHandler={declineRegistration}
                okBtnHandler={retryRegistration}
            />

            <NewDeviceWarnPopup
                show={showWarningPopup}
                noBtnHandler={handleCloseWarnPopup}
                yesBtnHandler={declineRegistration}
            />
        </>
    );
};

NewDeviceForm.propTypes = {
    deviceStatus: PropTypes.string.isRequired,
    registerDevice: PropTypes.func.isRequired,
    changeDeviceStatus: PropTypes.func.isRequired,
    cancelRegistration: PropTypes.func.isRequired,
};

export default NewDeviceForm;
