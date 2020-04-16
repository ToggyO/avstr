import React from 'react';
import PropTypes from 'prop-types';

import history from 'Core/history';

import Button from 'Core/common/Button';

import styles from './index.module.scss';


const DeviceMonitoringCard = ({
    content: {
        name,
        serialNumber,
        // isActive,
        // isAdvertisementsDisabled,
    },
}) => {
    const handleBackBtn = () => {
        history.push('/devices/main/list');
    };

    const handleStopAdvertisingBtnClick = () => {

    };

    const handleDeactivateBtnClick = () => {

    };


    return (
        <div className={styles.wrap}>
            <Button
                size="small"
                onClick={handleBackBtn}
                className={styles.backBtn}
            >
                Назад
            </Button>

            <div className={styles.title}>Мониторинг устройства</div>

            <div className={styles.divider} />

            <div className={styles.listPoint}>
                <div className={styles.description}>Название:</div>
                <div className={styles.value}>{name}</div>
            </div>

            <div className={styles.divider} />

            <div className={styles.listPoint}>
                <div className={styles.description}>Устройство:</div>
                <div className={styles.value}>
                    {serialNumber}
                </div>
            </div>

            <div className={styles.divider} />

            <Button
                disabled
                size="small"
                onClick={handleStopAdvertisingBtnClick}
                className={styles.stopAdvBtn}
            >
                Приостановить показ рекламы
            </Button>

            <div className={styles.divider} />

            <Button
                disabled
                size="small"
                onClick={handleDeactivateBtnClick}
                className={styles.deactivateBtn}
            >
                Деактивировать устройство
            </Button>
        </div>
    );
};

DeviceMonitoringCard.defaultProps = {
    content: {
        name: '',
        serialNumber: '',
        isActive: true,
        isAdvertisementsDisabled: false,
    },
};

DeviceMonitoringCard.propTypes = {
    content: PropTypes.shape({
        name: PropTypes.string,
        serialNumber: PropTypes.string,
        isActive: PropTypes.bool,
        isAdvertisementsDisabled: PropTypes.bool,
    }),
};

export default DeviceMonitoringCard;
