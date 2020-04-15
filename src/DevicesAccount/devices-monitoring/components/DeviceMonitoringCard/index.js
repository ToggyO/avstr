import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import history from 'Core/history';

import Button from 'Core/common/Button';

import styles from './index.module.scss';


class DeviceMonitoringCard extends Component {
    componentDidMount() {
        //
    }

    handleBackBtn = () => {
        history.push('/devices/main/list');
    };

    handleStopAdvertisingBtnClick = () => {

    };

    handleDeactivateBtnClick = () => {

    };

    render() {
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
                    <div className={styles.value}>KIA RIO C873EА777</div>
                </div>

                <div className={styles.divider} />

                <div className={styles.listPoint}>
                    <div className={styles.description}>Устройство:</div>
                    <div className={styles.value}>
                        12i3jhdasdgasdt8321321347234723471
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
    //
};

export default DeviceMonitoringCard;
