import React from 'react';
// import PropTypes from 'prop-types';

import styles from './index.module.scss';
import DeviceMonitoringCard from '../DeviceMonitoringCard';
// import Map from '../../../devices-managment/components/Map';


const DeviceMonitoringPage = () => (
    <div className={styles.wrap}>
        <DeviceMonitoringCard />
        <div className={styles.map}>Map</div>
        {/* <Map /> */}
    </div>
);


DeviceMonitoringPage.propTypes = {
    //
};

export default DeviceMonitoringPage;
