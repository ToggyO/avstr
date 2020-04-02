import React from 'react';
import PropTypes from 'prop-types';

import DeviceItem from '../DeviceItem';

import styles from './index.module.scss';


const DevicesList = ({ devices }) => (
    <table className={styles.table}>
        <thead>
            <tr className="table-row">
                <th className="th-date">№</th>
                <th className="th-sum">Название</th>
                <th className="th-loadDate">Серийный номер</th>
                <th className="th-period">Статус</th>
            </tr>
        </thead>
        <tbody>
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
