import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import history from 'Core/history';

import Container from 'Core/common/Container';
import Title from 'Core/common/Title';
import Input from 'Core/common/Input';
import ErrMessage from 'Core/common/ErrorMessage';
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
    isFieldsCleanNeeded,
    changeFieldsCleanNeededFlag,
}) => {
    const [codeText, setCodeText] = useState('');
    const [showCodeError, setShowCodeError] = useState(false);
    const [deviceNameText, setDeviceNameText] = useState('');
    const [showWarningPopup, setShowWarningPopup] = useState(false);

    const handleDeviceNameChange = ({ target: { value } }) => {
        setDeviceNameText(value);
    };

    const checkCode = (code) => {
        if (/^\d{9}$/.test(code)) {
            setShowCodeError(false);
        } else {
            setShowCodeError(true);
        }
    };
    const handleInputCodeBlur = () => {
        checkCode(codeText);
    };
    const handleCodeChange = ({ target: { value } }) => {
        if (value.length > 8) checkCode(value);
        setCodeText(value);
    };

    const handleDeclineBtn = () => {
        setShowWarningPopup(true);
    };
    const handleOkBtn = () => {
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

    useEffect(() => {
        if (isFieldsCleanNeeded) {
            setCodeText('');
            setDeviceNameText('');
            changeFieldsCleanNeededFlag(false);
        }
    }, [isFieldsCleanNeeded, changeFieldsCleanNeededFlag]);

    return (
        <>
            <Container>
                <div className={styles.wrap}>
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
                    <div className={styles.codeInputWrap}>
                        <Input
                            placeholder="123456789"
                            className={styles.codeInput}
                            value={codeText}
                            error={showCodeError}
                            onChange={handleCodeChange}
                            onBlur={handleInputCodeBlur}
                        />
                        {showCodeError
                        && (
                            <ErrMessage
                                text="Код должен состоять из 9 цифр"
                                className={styles.err}
                            />
                        )}
                    </div>

                    <NewDeviceTextItem
                        number={3}
                        text="Придумайте название"
                        className={styles.otherPoints}
                    />
                    <Input
                        placeholder="Устройство 1"
                        className={styles.nameInput}
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
                            disabled={showCodeError || !deviceNameText || deviceStatus === 'pending'}
                            className={styles.okBtn}
                            onClick={handleOkBtn}
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
    isFieldsCleanNeeded: PropTypes.bool.isRequired,
    changeFieldsCleanNeededFlag: PropTypes.func.isRequired,
};

export default NewDeviceForm;
