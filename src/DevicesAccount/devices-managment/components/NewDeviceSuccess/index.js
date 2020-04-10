import React from 'react';
import PropTypes from 'prop-types';
import history from 'Core/history';

import Container from 'Core/common/Container';
import Icon from 'Core/common/Icon';
import Button from 'Core/common/Button';

import styles from './index.module.scss';


const NewDeviceSuccess = ({ changeDeviceStatus }) => {
    const handleBtnClick = () => {
        changeDeviceStatus('');
        history.push('/devices/main/list');
    };
    return (
        <Container className={styles.newDevice}>
            <div className={styles.wrap}>
                <div className={styles.circle}>
                    <Icon
                        name="checkMark"
                        className={styles.icon}
                    />
                </div>
                <div className={styles.description}>
                    Устройство зарегистрировано
                </div>
                <Button onClick={handleBtnClick}>
                    Перейти к списку устройств
                </Button>
            </div>
        </Container>
    );
};


NewDeviceSuccess.propTypes = {
    changeDeviceStatus: PropTypes.func.isRequired,
};

export default NewDeviceSuccess;
