import React from 'react';
import PropTypes from 'prop-types';

import DeviceItem from '../DeviceItem';

import styles from './index.module.scss';


const DevicesList = ({ devices }) => (
    <table className={styles.table}>
        <thead>
            <tr className={styles.head}>
                <th className={styles.num}>№</th>
                <th className={styles.name}>Название</th>
                <th className={styles.serial}>Серийный номер</th>
                <th className={styles.status}>Статус</th>
            </tr>
        </thead>
        <tbody className={styles.body}>
            {devices.map((device, i) => {
                const { id } = device;
                return (
                    <DeviceItem
                        key={id}
                        content={device}
                        number={i}
                    />
                );
            })}
        </tbody>
    </table>
);


DevicesList.propTypes = {
    devices: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            serialNumber: PropTypes.number.isRequired,
            isActive: PropTypes.bool.isRequired,
        }),
    ).isRequired,
};

export default DevicesList;
