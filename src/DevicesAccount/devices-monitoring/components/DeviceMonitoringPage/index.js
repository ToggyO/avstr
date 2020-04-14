import React from 'react';
// import PropTypes from 'prop-types';

import Map from 'DevicesAccount/devices-managment/components/Map';
import DeviceMonitoringCard from '../DeviceMonitoringCard';

import styles from './index.module.scss';


const DeviceMonitoringPage = () => (
    <div className={styles.wrap}>
        <DeviceMonitoringCard />
        <Map
            className={styles.map}
            geoPoints={[]}
        />
    </div>
);


DeviceMonitoringPage.propTypes = {
    //
};

export default DeviceMonitoringPage;
