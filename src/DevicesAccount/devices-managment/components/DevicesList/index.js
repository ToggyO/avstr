// todo(nn):выяснить понадобится ли total
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useWindowResize, useThrottledFn } from 'beautiful-react-hooks';

import history from 'Core/history';

import {
    Table,
    List,
    Typography,
    Tag,
    Badge,
} from 'antd';
import { RightOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

const { Text } = Typography;

const DevicesList = ({
    pagination: {
        page,
        // total,
        size,
        itemsTotal,
    },
    devices,
    requestDevices,
}) => {
    const [width, setWidth] = useState(window.innerWidth);
    useWindowResize(useThrottledFn(() => {
        setWidth(window.innerWidth);
    }));

    const calculateDeviceStatus = (isActive, isRevokeRequired) => {
        let deviceMessage = 'Активно';
        let status = 'success';
        if (!isActive && !isRevokeRequired) {
            deviceMessage = 'Деактивировано';
            status = 'error';
        } else if (!isActive && isRevokeRequired) {
            deviceMessage = 'Активируется...';
            status = 'warning';
        }
        return {
            deviceMessage,
            status,
        };
    };
    const calculateAdvertisementStatus = (isAdvertisementsDisabled) => {
        let advertMessage = 'Запущена';
        let color = 'green';
        if (isAdvertisementsDisabled) {
            advertMessage = 'Приостановлена';
            color = 'red';
        }
        return {
            advertMessage,
            color,
        };
    };

    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Серийный номер',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
        },
        {
            title: 'Статус рекламы',
            dataIndex: 'advertStatus',
            key: 'advertStatus',
            render: (_, { isAdvertisementsDisabled }) => {
                const { advertMessage, color } = calculateAdvertisementStatus(isAdvertisementsDisabled);
                return (
                    <Tag color={color}>
                        {advertMessage}
                    </Tag>
                );
            },
        },
        {
            title: 'Статус устройства',
            dataIndex: 'deviceStatus',
            key: 'deviceStatus',
            render: (_, { isActive, isRevokeRequired }) => {
                const { deviceMessage, status } = calculateDeviceStatus(isActive, isRevokeRequired);
                return (
                    <Badge
                        className={styles.badge}
                        status={status}
                    >
                        {deviceMessage}
                    </Badge>
                );
            },
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            render: (id) => (
                <div className={styles.arrowWrap}>
                    <RightOutlined
                        className={styles.arrow}
                        key={id}
                    />
                </div>
            ),
        },
    ];

    const handleRowClick = (id) => () => {
        history.push(`/devices/monitoring/${id}`, { goBackPath: '/devices/main/list' });
    };
    const handlePageChange = (currentPage, pageSize) => {
        requestDevices({
            page: currentPage,
            size: pageSize,
        });
    };

    const paginationTableOptions = {
        position: ['topRight', 'bottomRight'],
        current: page,
        pageSize: size,
        total: itemsTotal,
        showSizeChanger: true,
        responsive: true,
        onChange: handlePageChange,
        onShowSizeChange: handlePageChange,
        className: styles.pagination,
    };
    const paginationListOptions = {
        ...paginationTableOptions,
        position: 'both',
    };

    return (
        <div className={styles.wrap}>
            <Text className={styles.text}>
                {`Показано устройств: ${devices.length} из ${itemsTotal}`}
            </Text>

            {width > 768
                ? (
                    <Table
                        dataSource={devices}
                        columns={columns}
                        rowClassName={styles.tableRow}
                        onRow={({ id }) => ({
                            onClick: handleRowClick(id),
                        })}
                        rowKey={(record) => record.id}
                        pagination={paginationTableOptions}
                    />
                )
                : (
                    <List
                        className={styles.list}
                        dataSource={devices}
                        itemLayout="vertical"
                        pagination={paginationListOptions}
                        renderItem={({
                            name,
                            serialNumber,
                            isActive,
                            isAdvertisementsDisabled,
                            isRevokeRequired,
                            id,
                        }) => {
                            const { deviceMessage, status } = calculateDeviceStatus(isActive, isRevokeRequired);
                            const { advertMessage, color } = calculateAdvertisementStatus(isAdvertisementsDisabled);
                            const devMessage = `Устройство ${deviceMessage.toLocaleLowerCase()}`;
                            const adMessage = `Реклама ${advertMessage.toLocaleLowerCase()}`;
                            return (
                                <List.Item
                                    onClick={handleRowClick(id)}
                                    className={styles.listItem}
                                >
                                    <div className={styles.listText}>{name}</div>
                                    <div className={styles.listText}>{serialNumber}</div>
                                    <div>
                                        <Tag color={color}>
                                            {adMessage}
                                        </Tag>
                                    </div>
                                    <div>
                                        <Badge
                                            className={styles.badge}
                                            status={status}
                                        >
                                            {devMessage}
                                        </Badge>
                                    </div>
                                </List.Item>
                            );
                        }}
                    />
                )}
            <Text className={styles.text}>
                {`Показано устройств: ${devices.length} из ${itemsTotal}`}
            </Text>
        </div>
    );
};

DevicesList.propTypes = {
    pagination: PropTypes.shape({
        page: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        itemsTotal: PropTypes.number.isRequired,
    }).isRequired,
    devices: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            serialNumber: PropTypes.string.isRequired,
            isActive: PropTypes.bool.isRequired,
            isRevokeRequired: PropTypes.bool,
        }),
    ).isRequired,
    requestDevices: PropTypes.func.isRequired,
};

export default DevicesList;
