import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Map from 'Core/common/Map';
import styles from './index.module.scss';


class DeviceMap extends Component {
    componentDidMount() {
        this.updateGeoPoints();
        this.timer = setInterval(
            () => this.updateGeoPoints(),
            5000,
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    updateGeoPoints = () => {
        const { getGeoPoints } = this.props;
        console.log('UPDATE GEO POINTS');
        getGeoPoints();
    };

    render() {
        const { geoPoints } = this.props;
        return (
            <Map
                className={styles.map}
                wrapClassName={styles.map}
                geoPoints={geoPoints}
            />
        );
    }
}


DeviceMap.propTypes = {
    getGeoPoints: PropTypes.func.isRequired,
    geoPoints: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            descr: PropTypes.string.isRequired,
            coords: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        }),
    ).isRequired,
};

export default DeviceMap;
