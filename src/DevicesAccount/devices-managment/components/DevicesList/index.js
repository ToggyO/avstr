import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useWindowResize, useThrottledFn } from 'beautiful-react-hooks';

import history from 'Core/history';

import { Table, List, Avatar } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import DevicesPagination from '../DevicesPagination';

// import Icon from 'Core/common/Icon';
// import DeviceItem from '../DeviceItem';
// import styles from './index.module.scss';


const DevicesList = ({ pagination, devices, requestDevices }) => {
    const [width, setWidth] = useState(window.innerWidth);
    useWindowResize(useThrottledFn(() => {
        setWidth(window.innerWidth);
    }));

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
            render: (_, device) => {
                const { isActive, isAdvertisementsDisabled, isRevokeRequired } = device;
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

    const handleRowClick = (id) => {
        history.push(`/devices/monitoring/${id}`);
    };
    console.log(width);

    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];

    return (
        <>
            <DevicesPagination
                pagination={pagination}
                requestDevices={requestDevices}
            />

            {width > 768
                ? (
                    <Table
                        dataSource={devices}
                        columns={columns}
                        pagination={false}
                        // scroll={{ x: true }}
                        onRow={({ id }) => ({
                            onClick: handleRowClick.bind(this, id),
                            // onMouseEnter: event => {},
                            // onMouseLeave: event => {},
                        })}
                        rowKey={(record) => record.id}
                    />
                )
                : (
                    // <div>тынц</div>
                    <List
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    }
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </List.Item>
                        )}
                    />
                )}

            {/* <table className={styles.table}>
                <thead>
                    <tr className={styles.head}>
                        <th className={styles.name}>Название</th>
                        <th className={styles.serial}>Серийный номер</th>
                        <th className={styles.status}>Статус</th>
                        <th>{}</th>
                    </tr>
                </thead>
                <tbody className={styles.body}>
                    {devices.map((device) => {
                        const { id } = device;
                        return (
                            <DeviceItem
                                content={device}
                                key={id}
                            />
                        );
                    })}
                </tbody>
            </table> */}
        </>
    );
};


DevicesList.propTypes = {
    pagination: PropTypes.shape({
        page: PropTypes.number,
        total: PropTypes.number,
        size: PropTypes.number,
        hasPrevious: PropTypes.bool,
        hasNext: PropTypes.bool,
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
