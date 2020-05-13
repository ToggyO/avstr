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

        const deviceIdArr = window.location.pathname.match(/\d+/);
        if (deviceIdArr) {
            getGeoPoints(deviceIdArr[0]);
        } else {
            getGeoPoints();
        }
    };

    render() {
        const { geoPoints, isSizeChanged, className } = this.props;
        let mapClass = className;
        if (!className) mapClass = styles.map;

        return (
            <Map
                isSizeChanged={isSizeChanged}
                className={mapClass}
                geoPoints={geoPoints}
            />
        );
    }
}

DeviceMap.defaultProps = {
    isSizeChanged: false,
    className: '',
};


DeviceMap.propTypes = {
    getGeoPoints: PropTypes.func.isRequired,
    geoPoints: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            descr: PropTypes.string.isRequired,
            coords: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        }),
    ).isRequired,
    isSizeChanged: PropTypes.bool,
    className: PropTypes.string,
};

export default DeviceMap;
