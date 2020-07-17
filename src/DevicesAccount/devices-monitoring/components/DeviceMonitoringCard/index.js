import React, { Component } from 'react';
import {
    Badge,
    Button,
    Divider,
    PageHeader,
    Row, Space,
    Tag,
    Typography,
} from 'antd';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import history from 'Core/history';
import streamStore from 'Core/streamStoreService';

import styles from './index.module.scss';

const { Text } = Typography;

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

    calcDeviceStatusBadge = () => {
        const {
            content: {
                isActive,
                isRevokeRequired,
            },
            showAdvertisingLoader,
        } = this.props;

        let message;
        let status;
        if (showAdvertisingLoader) {
            message = 'Загрузка...';
            status = 'processing';
        } else if (!isActive && !isRevokeRequired) {
            message = 'Деактивировано';
            status = 'error';
        } else if (!isActive && isRevokeRequired) {
            message = 'Активация...';
            status = 'warning';
        } else if (isActive && !isRevokeRequired) {
            message = 'Активно';
            status = 'success';
        }

        return <Badge status={status} text={message} />;
    };

    calcAdvertisementStatusBadge = () => {
        const {
            content: { isAdvertisementsDisabled },
        } = this.props;

        let text;
        let color;
        switch (isAdvertisementsDisabled) {
            case false:
                text = 'Запущена';
                color = 'green';
                break;
            case true:
                text = 'Приостановлена';
                color = 'red';
                break;
            default:
                text = 'Не запущена';
                color = 'default';
                break;
        }

        return <Tag color={color}>{text}</Tag>;
    }

    render() {
        const {
            content: {
                name = '',
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

        return (
            <PageHeader
                title={name}
                subTitle=" "
                onBack={() => this.handleBackBtn(goBackPath)}
                className={styles.wrapper}
            >
                <Divider className={styles.divider} />

                <Row>
                    <Space direction="vertical">
                        <Text>{serialNumber}</Text>
                        {this.calcDeviceStatusBadge()}
                    </Space>
                </Row>

                <Divider className={styles.divider} dashed />

                <Row>
                    <Space direction="vertical">
                        <Text strong>Реклама</Text>
                        {this.calcAdvertisementStatusBadge()}
                    </Space>
                </Row>

                <Divider className={styles.divider} />

                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Button
                        block
                        htmlType="button"
                        loading={showAdvertisingLoader}
                        disabled={!isActive}
                        onClick={this.handleStopAdvertisingBtnClick}
                    >
                        {isAdvertisementsDisabled
                            ? <CaretRightOutlined />
                            : <PauseOutlined />}
                        {isAdvertisementsDisabled
                            ? 'Запустить показ рекламы'
                            : 'Приостановить показ рекламы'}
                    </Button>

                    <Button
                        type={(isActive && !isRevokeRequired) || (!isActive && isRevokeRequired)
                            ? 'danger'
                            : 'primary'}
                        htmlType="button"
                        loading={showDeviceStatusLoader}
                        disabled={!isActive && isRevokeRequired}
                        onClick={this.handleActivateDeactivateBtnClick}
                        block
                        ghost
                    >
                        {(isActive && !isRevokeRequired) || (!isActive && isRevokeRequired)
                            ? 'Деактивировать устройство'
                            : 'Активировать устройство'}
                    </Button>
                </Space>
            </PageHeader>
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

// <div className={styles.wrap}>
//     <Button
//         // disabled={showDeviceStatusLoader || showAdvertisingLoader}
//         size="small"
//         onClick={() => this.handleBackBtn(goBackPath)}
//         className={styles.backBtn}
//     >
//         {goBackPath === '/devices/main/map'
//             ? 'Назад к карте'
//             : 'Назад к списку'}
//     </Button>
//
//     <div className={styles.title}>Мониторинг устройства</div>
//     <div>{this.calcMessage()}</div>
//     <div className={styles.divider} />
//
//     <div className={styles.listPoint}>
//         <div className={styles.description}>Название:</div>
//         <div className={styles.value}>{name}</div>
//     </div>
//
//     <div className={styles.divider} />
//
//     <div className={styles.listPoint}>
//         <div className={styles.description}>Устройство:</div>
//         <div className={styles.value}>
//             {serialNumber}
//         </div>
//     </div>
//
//     <div className={styles.divider} />
//
//     <Button
//         disabled={showDeviceStatusLoader || showAdvertisingLoader || !isActive}
//         size="small"
//         onClick={this.handleStopAdvertisingBtnClick}
//         className={styles.stopAdvBtn}
//     >
//         {isAdvertisementsDisabled
//             ? 'Запустить показ рекламы'
//             : 'Приостановить показ рекламы'}
//     </Button>
//
//     <div className={styles.divider} />
//
//     <Button
//         disabled={showAdvertisingLoader || (showDeviceStatusLoader && !isRevokeRequired)}
//         size="small"
//         onClick={this.handleActivateDeactivateBtnClick}
//         className={styles.deactivateBtn}
//     >
//         {(isActive && !isRevokeRequired) || (!isActive && isRevokeRequired)
//             ? 'Деактивировать устройство'
//             : 'Активировать устройство'}
//     </Button>
// </div>
