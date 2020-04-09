import React from 'react';
import PropTypes from 'prop-types';

import DeviceItem from '../DeviceItem';

import styles from './index.module.scss';
import DevicesPagination from '../DevicesPagination';


const DevicesList = ({ pagination, devices, requestDevices }) => (
    <>
        <DevicesPagination
            pagination={pagination}
            requestDevices={requestDevices}
        />

        <table className={styles.table}>
            <thead>
                <tr className={styles.head}>
                    <th className={styles.num}>№</th>
                    <th className={styles.name}>Название</th>
                    <th className={styles.serial}>Серийный номер</th>
                    <th className={styles.status}>Статус</th>
                    <th>{}</th>
                </tr>
            </thead>
            <tbody className={styles.body}>
                {devices.map((device, i) => {
                    const { id } = device;
                    return (
                        <DeviceItem
                            content={device}
                            number={i + 1}
                            key={id}
                        />
                    );
                })}
            </tbody>
        </table>
    </>
);


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
        }),
    ).isRequired,
    requestDevices: PropTypes.func.isRequired,
};

export default DevicesList;
