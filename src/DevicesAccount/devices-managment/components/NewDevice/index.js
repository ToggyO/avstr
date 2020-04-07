import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import Container from 'Core/common/Container';
import Title from 'Core/common/Title';
import Input from 'Core/common/Input';
import Button from 'Core/common/Button';
import { Icon } from 'semantic-ui-react';
import NewDeviceTextItem from '../NewDeviceTextItem';

import styles from './index.module.scss';


const NewDevice = () => {
    const [codeText, setCodeText] = useState('');
    const [deviceNameText, setDeviceNameText] = useState('');

    const handleCodeChange = ({ target: { value } }) => {
        setCodeText(value);
    };

    const handleDeviceNameChange = ({ target: { value } }) => {
        setDeviceNameText(value);
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

            <div>
                <Button
                    type="outline"
                    size="medium"
                    className={styles.declineBtn}
                    // onClick={}
                >
                    Отменить
                </Button>

                <Button
                    type="main"
                    size="medium"
                    disabled={!codeText || !deviceNameText}
                    className={styles.okBtn}
                    // onClick={}
                >
                    Далее
                    <Icon name="arrow circle right" />
                </Button>
            </div>
        </Container>
    );
};


NewDevice.propTypes = {};

export default NewDevice;
