// TODO(USERNAME): Обсудить с командой кейс по передаче ссылок и, возможно,
//  делать отдельный запрос для получения данных карточки девайса
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import history from 'Core/history';

import Button from 'Core/common/Button';

import styles from './index.module.scss';


class DeviceMonitoringCard extends Component {
    componentDidMount() {
        const { content } = this.props;
        if (!content) return;
        this.setDeviceCardToStorage(content);
    }

    getDeviceCardFromStorage = () => JSON.parse(localStorage.getItem('deviceCard'));

    setDeviceCardToStorage = (data) => localStorage.setItem('deviceCard', JSON.stringify(data));

    handleBackBtn = () => {
        history.push('/devices/main/list');
    };

    handleStopAdvertisingBtnClick = () => {

    };

    handleDeactivateBtnClick = () => {

    };

    render() {
        const { content } = this.props;
        let cardData;
        if (content) {
            cardData = content;
        } else {
            cardData = this.getDeviceCardFromStorage();
        }

        return (
            <div className={styles.wrap}>
                <Button
                    size="small"
                    onClick={this.handleBackBtn}
                    className={styles.backBtn}
                >
                    Назад
                </Button>

                <div className={styles.title}>Мониторинг устройства</div>

                <div className={styles.divider} />

                <div className={styles.listPoint}>
                    <div className={styles.description}>Название:</div>
                    <div className={styles.value}>{cardData.name}</div>
                </div>

                <div className={styles.divider} />

                <div className={styles.listPoint}>
                    <div className={styles.description}>Устройство:</div>
                    <div className={styles.value}>
                        {cardData.serialNumber}
                    </div>
                </div>

                <div className={styles.divider} />

                <Button
                    disabled
                    size="small"
                    onClick={this.handleStopAdvertisingBtnClick}
                    className={styles.stopAdvBtn}
                >
                    Приостановить показ рекламы
                </Button>

                <div className={styles.divider} />

                <Button
                    disabled
                    size="small"
                    onClick={this.handleDeactivateBtnClick}
                    className={styles.deactivateBtn}
                >
                    Деактивировать устройство
                </Button>
            </div>
        );
    }
}

DeviceMonitoringCard.propTypes = {
    content: PropTypes.shape({
        name: PropTypes.string.isRequired,
        serialNumber: PropTypes.string.isRequired,
        isActive: PropTypes.bool.isRequired,
        isAdvertisementsDisabled: PropTypes.bool.isRequired,
    }).isRequired,
};

export default DeviceMonitoringCard;
