import React from 'react';
import PropTypes from 'prop-types';

import history from 'Core/history';

// import Icon from 'Core/common/Icon';

import { Table } from 'antd';
import { RightOutlined } from '@ant-design/icons';
// import DeviceItem from '../DeviceItem';

// import styles from './index.module.scss';
import DevicesPagination from '../DevicesPagination';


const DevicesList = ({ pagination, devices, requestDevices }) => {
    const handleArrowClick = (id) => {
        history.push(`/devices/monitoring/${id}`);
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
        },
        {
            title: '',
            dataIndex: 'arrow',
            key: 'arrow',
            render: (id) => {
                console.log(id);
                return (
                    <RightOutlined onClick={handleArrowClick} />
                );
            },
        },
    ];

    return (
        <>
            <DevicesPagination
                pagination={pagination}
                requestDevices={requestDevices}
            />

            <Table
                dataSource={devices}
                columns={columns}
                pagination={false}
            />

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
