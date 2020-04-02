import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import Container from 'Core/common/Container';
import Title from 'Core/common/Title';
import Button from 'Core/common/Button';
import DevicesList from '../DevicesList';

import styles from './index.module.scss';


const Devices = ({ devices, addBtnHandler }) => (
    <Container>
        <div className={styles.wrap}>
            <Title
                className={styles.title}
                text={devices.length ? 'Устройства' : 'Нет зарегистрированных устройств'}
            />
            <Button
                type="main"
                size="withIcon"
                className={styles.btn}
                onClick={addBtnHandler}
            >
                <Icon name="plus" />
                Добавить
            </Button>
        </div>
        {devices.length
            ? (
                <DevicesList devices={devices} />
            )
            : ''}
    </Container>
);


Devices.propTypes = {
    devices: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            serialNumber: PropTypes.number.isRequired,
            isActive: PropTypes.bool.isRequired,
        }),
    ).isRequired,
    addBtnHandler: PropTypes.func.isRequired,
};

export default Devices;
