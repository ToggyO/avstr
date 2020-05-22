import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useWindowResize, useThrottledFn } from 'beautiful-react-hooks';

import history from 'Core/history';

import { Table, List, Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons';
// import DevicesPagination from '../DevicesPagination';

// import Icon from 'Core/common/Icon';
// import DeviceItem from '../DeviceItem';

import styles from './index.module.scss';

const { Text } = Typography;

const DevicesList = ({
    pagination: {
        page,
        // total,
        size,
        itemsTotal,
    }, devices,
    requestDevices,
}) => {
    const [width, setWidth] = useState(window.innerWidth);
    useWindowResize(useThrottledFn(() => {
        setWidth(window.innerWidth);
    }));

    const calculateStatus = (isActive, isAdvertisementsDisabled, isRevokeRequired) => {
        let message;
        if (!isActive && !isRevokeRequired) {
            message = 'Деактивировано';
        } else if (!isActive && isRevokeRequired) {
            message = 'Активация...';
        } else if (isAdvertisementsDisabled) {
            message = 'Отключен показ рекламы';
        }
        return message;
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
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (_, { isActive, isAdvertisementsDisabled, isRevokeRequired }) => {
                let message;
                if (!isActive && !isRevokeRequired) {
                    message = 'Деактивировано';
                } else if (!isActive && isRevokeRequired) {
                    message = 'Активация...';
                } else if (isAdvertisementsDisabled) {
                    message = 'Отключен показ рекламы';
                }
                return message;
            },
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            render: (id) => <RightOutlined key={id} />,
        },
    ];

    const handleRowClick = (id) => () => {
        history.push(`/devices/monitoring/${id}`);
    };

    const handlePageChange = (currentPage, pageSize) => {
        requestDevices({
            page: currentPage,
            size: pageSize,
        });
    };

    const amountOfVisibleDevices = itemsTotal > size ? size : itemsTotal;

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
                {`Показано устройств: ${amountOfVisibleDevices} из ${itemsTotal}`}
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
                        }) => (
                            // eslint-disable-next-line react/jsx-no-bind
                            <List.Item
                                onClick={handleRowClick(id)}
                                className={styles.listItem}
                            >
                                <div className={styles.listText}>{name}</div>
                                <div className={styles.listText}>{serialNumber}</div>
                                <div className={styles.listText}>
                                    {calculateStatus(isActive, isAdvertisementsDisabled, isRevokeRequired)}
                                </div>
                            </List.Item>
                        )}
                    />
                )}
            <Text className={styles.text}>
                {`Показано устройств: ${amountOfVisibleDevices} из ${itemsTotal}`}
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
