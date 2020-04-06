import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import Container from 'Core/common/Container';
import Title from 'Core/common/Title';
import Button from 'Core/common/Button';
import DevicesList from '../DevicesList';

import styles from './index.module.scss';


const Devices = ({
    devices,
    addBtnHandler,
    mapBtnHandler,
    handleListBtn,
}) => (
    <Container>
        <div className={styles.wrap}>
            <Title
                className={styles.title}
                text={devices.length ? 'Устройства' : 'Нет зарегистрированных устройств'}
            />
            <div>
                <Button
                    type="outline"

                    className={styles.btn}
                    onClick={handleListBtn}
                >
                    Списком
                </Button>
                <Button
                    type="outline"
                    className={styles.btn}
                    onClick={mapBtnHandler}
                >
                    На карте
                </Button>
            </div>

            <Button
                type="main"
                withIcon
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
            serialNumber: PropTypes.string.isRequired,
            isActive: PropTypes.bool.isRequired,
        }),
    ).isRequired,
    addBtnHandler: PropTypes.func.isRequired,
    mapBtnHandler: PropTypes.func.isRequired,
    handleListBtn: PropTypes.func.isRequired,
};

export default Devices;
