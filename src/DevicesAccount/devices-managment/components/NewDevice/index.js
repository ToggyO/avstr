import React, { useState } from 'react';
import PropTypes from 'prop-types';

import history from 'Core/history';

import Container from 'Core/common/Container';
import Title from 'Core/common/Title';
import Input from 'Core/common/Input';
import Button from 'Core/common/Button';
import { Icon } from 'semantic-ui-react';
import NewDeviceTextItem from '../NewDeviceTextItem';

import styles from './index.module.scss';


const NewDevice = ({
    // deviceSerial,
    deviceStatus,
    registerDevice,
}) => {
    const [serialText, setSerialText] = useState('');
    const [deviceNameText, setDeviceNameText] = useState('');

    const handleCodeChange = ({ target: { value } }) => {
        setSerialText(value);
    };
    const handleDeviceNameChange = ({ target: { value } }) => {
        setDeviceNameText(value);
    };

    const handleDeclineBtn = () => {
        history.push('/devices/main/list');
    };
    const okBtnHandler = () => {
        registerDevice({
            name: deviceNameText,
            serialNumberCrc: serialText,
        });
    };

    return (
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
                value={serialText}
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
                    disabled={!serialText || !deviceNameText}
                    className={styles.okBtn}
                    onClick={okBtnHandler}
                >
                    Далее
                    <Icon name="arrow circle right" />
                </Button>
                {deviceStatus === 'pending'
                && (
                    <div className={styles.status}>
                        Подождите, ожидается подключение устройства.
                    </div>
                )}
            </div>
        </Container>
    );
};


NewDevice.defaultProps = {
    // deviceSerial: '',
    deviceStatus: '',
};

NewDevice.propTypes = {
    // deviceSerial: PropTypes.string,
    deviceStatus: PropTypes.string,
    registerDevice: PropTypes.func.isRequired,
};

export default NewDevice;
