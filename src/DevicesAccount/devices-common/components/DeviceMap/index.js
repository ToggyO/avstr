import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Map from 'Core/common/Map';
import styles from './index.module.scss';


class DeviceMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMapLoaded: false,
        };
    }

    componentDidMount() {
        this.timer = setInterval(
            () => this.updateGeoPoints(), 5000,
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { isMapLoaded } = this.state;
        if (prevState.isMapLoaded === isMapLoaded) return;
        this.updateGeoPoints();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        const { cleanGeoPoint, cleanAllGeoPoints } = this.props;
        cleanGeoPoint();
        cleanAllGeoPoints();
    }

    getDeviceIdArr = () => window.location.pathname.match(/\d+/);

    updateGeoPoints = () => {
        const { getGeoPoint, getAllGeoPoints } = this.props;

        const deviceIdArr = this.getDeviceIdArr();
        if (deviceIdArr) {
            getGeoPoint(deviceIdArr[0]);
        } else {
            getAllGeoPoints();
        }
    };

    handleMapLoaded = (flag) => {
        if (!flag) return;
        this.setState({
            isMapLoaded: true,
        });
    };

    render() {
        const {
            geoPoint,
            allGeoPoints,
            isSizeChanged,
            className,
        } = this.props;

        let resultGeoPoints = geoPoint;
        if (allGeoPoints.length) resultGeoPoints = allGeoPoints;

        let mapClass = className;
        if (!className) mapClass = styles.map;

        const isDevicesMapPage = !this.getDeviceIdArr();

        return (
            <Map
                isSizeChanged={isSizeChanged}
                className={mapClass}
                geoPoints={resultGeoPoints}
                pointsWithBaloons={isDevicesMapPage}
                handleMapLoaded={this.handleMapLoaded}
            />
        );
    }
}

DeviceMap.defaultProps = {
    geoPoint: [],
    getGeoPoint: () => {},
    cleanGeoPoint: () => {},
    allGeoPoints: [],
    getAllGeoPoints: () => {},
    cleanAllGeoPoints: () => {},
    isSizeChanged: false,
    className: '',
};


DeviceMap.propTypes = {
    geoPoint: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            descr: PropTypes.string.isRequired,
            coords: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        }),
    ),
    getGeoPoint: PropTypes.func,
    cleanGeoPoint: PropTypes.func,
    allGeoPoints: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            descr: PropTypes.string.isRequired,
            coords: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        }),
    ),
    getAllGeoPoints: PropTypes.func,
    cleanAllGeoPoints: PropTypes.func,
    isSizeChanged: PropTypes.bool,
    className: PropTypes.string,
};

export default DeviceMap;
