import React from 'react';
import PropTypes from 'prop-types';

import history from 'Core/history';
import streamStore from 'Core/streamStoreService';

import Button from 'Core/common/Button';

import styles from './index.module.scss';


const DeviceMonitoringCard = ({
    content: {
        name,
        serialNumber,
        isActive,
        isAdvertisementsDisabled,
        id,
    },
    showAdvertisingLoader,
    startAdvertising,
    stopAdvertising,
    showDeviceStatusLoader,
    activateDevice,
    deactivateDevice,
    cleanMediaStreamId,
}) => {
    const handleBackBtn = () => {
        history.push('/devices/main/list');
    };

    const handleStopAdvertisingBtnClick = () => {
        if (isAdvertisementsDisabled) {
            startAdvertising({ id });
        } else {
            stopAdvertising({ id });
        }
    };

    const handleActivateDeactivateBtnClick = () => {
        cleanMediaStreamId();
        streamStore.clean();

        if (isActive) {
            deactivateDevice({ id });
        } else {
            activateDevice({ id });
        }
    };

    const calcMessage = () => {
        let message;
        if (showAdvertisingLoader || showDeviceStatusLoader) {
            message = 'Загрузка';
        } else if (!isActive) {
            message = 'Деактивировано';
        } else if (isAdvertisementsDisabled) {
            message = 'Отключен показ рекламы';
        }
        return message;
    };

    return (
        <div className={styles.wrap}>
            <Button
                disabled={showDeviceStatusLoader || showAdvertisingLoader}
                size="small"
                onClick={handleBackBtn}
                className={styles.backBtn}
            >
                Назад
            </Button>

            <div className={styles.title}>Мониторинг устройства</div>
            <div>{calcMessage()}</div>
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
                disabled={showDeviceStatusLoader || showAdvertisingLoader || !isActive}
                size="small"
                onClick={handleStopAdvertisingBtnClick}
                className={styles.stopAdvBtn}
            >
                {isAdvertisementsDisabled
                    ? 'Запустить показ рекламы'
                    : 'Приостановить показ рекламы'}
            </Button>

            <div className={styles.divider} />

            <Button
                disabled={showDeviceStatusLoader || showAdvertisingLoader}
                size="small"
                onClick={handleActivateDeactivateBtnClick}
                className={styles.deactivateBtn}
            >
                {isActive
                    ? 'Деактивировать устройство'
                    : 'Активировать устройство'}
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
        id: null,
    },
};

DeviceMonitoringCard.propTypes = {
    content: PropTypes.shape({
        name: PropTypes.string,
        serialNumber: PropTypes.string,
        isActive: PropTypes.bool,
        isAdvertisementsDisabled: PropTypes.bool,
        id: PropTypes.number,
    }),
    showAdvertisingLoader: PropTypes.bool.isRequired,
    startAdvertising: PropTypes.func.isRequired,
    stopAdvertising: PropTypes.func.isRequired,
    showDeviceStatusLoader: PropTypes.bool.isRequired,
    activateDevice: PropTypes.func.isRequired,
    deactivateDevice: PropTypes.func.isRequired,
    cleanMediaStreamId: PropTypes.func.isRequired,
};

export default DeviceMonitoringCard;
