import React, { Component } from 'react';
import PropTypes from 'prop-types';

import history from 'Core/history';
import streamStore from 'Core/streamStoreService';

import Button from 'Core/common/Button';

import styles from './index.module.scss';

class DeviceMonitoringCard extends Component {
    componentWillUnmount() {
        const { cancelDeviceActivation } = this.props;
        cancelDeviceActivation();
    }

    handleBackBtn = (pathname) => {
        history.push(pathname);
    };

    handleStopAdvertisingBtnClick = () => {
        const {
            content: {
                isAdvertisementsDisabled,
                id,
            },
            stopAdvertising,
            startAdvertising,
        } = this.props;

        if (isAdvertisementsDisabled) {
            stopAdvertising(id);
        } else {
            startAdvertising(id);
        }
    };

    handleActivateDeactivateBtnClick = () => {
        const {
            content: {
                isActive,
                isRevokeRequired,
                id,
            },
            cleanMediaStreamId,
            deactivateDevice,
            activateDevice,
            cancelDeviceActivation,
        } = this.props;

        cancelDeviceActivation();
        cleanMediaStreamId();
        streamStore.clean();

        const isDeactivation = (isActive && !isRevokeRequired) || (!isActive && isRevokeRequired);
        if (isDeactivation) {
            deactivateDevice({ id });
        } else {
            activateDevice({ id });
        }
    };

    calcMessage = () => {
        const {
            content: {
                isActive,
                isAdvertisementsDisabled,
                isRevokeRequired,
            },
            showAdvertisingLoader,
        } = this.props;

        let message;
        if (showAdvertisingLoader) {
            message = 'Загрузка...';
        } else if (!isActive && !isRevokeRequired) {
            message = 'Деактивировано';
        } else if (!isActive && isRevokeRequired) {
            message = 'Активация...';
        } else if (isAdvertisementsDisabled) {
            message = 'Отключен показ рекламы';
        }
        return message;
    };

    render() {
        const {
            content: {
                name,
                serialNumber,
                isActive,
                isAdvertisementsDisabled,
                isRevokeRequired,
            },
            showDeviceStatusLoader,
            showAdvertisingLoader,
            location,
        } = this.props;
        const { state: { goBackPath = '/devices/main/list' } = {} } = location;
        console.log(goBackPath);
        return (
            <div className={styles.wrap}>
                <Button
                    // disabled={showDeviceStatusLoader || showAdvertisingLoader}
                    size="small"
                    onClick={() => this.handleBackBtn(goBackPath)}
                    className={styles.backBtn}
                >
                    {goBackPath === '/devices/main/map'
                        ? 'Назад к карте'
                        : 'Назад к списку'}
                </Button>

                <div className={styles.title}>Мониторинг устройства</div>
                <div>{this.calcMessage()}</div>
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
                    onClick={this.handleStopAdvertisingBtnClick}
                    className={styles.stopAdvBtn}
                >
                    {isAdvertisementsDisabled
                        ? 'Запустить показ рекламы'
                        : 'Приостановить показ рекламы'}
                </Button>

                <div className={styles.divider} />

                <Button
                    disabled={showAdvertisingLoader || (showDeviceStatusLoader && !isRevokeRequired)}
                    size="small"
                    onClick={this.handleActivateDeactivateBtnClick}
                    className={styles.deactivateBtn}
                >
                    {(isActive && !isRevokeRequired) || (!isActive && isRevokeRequired)
                        ? 'Деактивировать устройство'
                        : 'Активировать устройство'}
                </Button>
            </div>
        );
    }
}

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
        isRevokeRequired: PropTypes.bool,
        id: PropTypes.number,
    }),
    showAdvertisingLoader: PropTypes.bool.isRequired,
    startAdvertising: PropTypes.func.isRequired,
    stopAdvertising: PropTypes.func.isRequired,
    showDeviceStatusLoader: PropTypes.bool.isRequired,
    activateDevice: PropTypes.func.isRequired,
    deactivateDevice: PropTypes.func.isRequired,
    cleanMediaStreamId: PropTypes.func.isRequired,
    cancelDeviceActivation: PropTypes.func.isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DeviceMonitoringCard;
