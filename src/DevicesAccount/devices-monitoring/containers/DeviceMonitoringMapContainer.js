import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DeviceMap from '../../devices-common/components/DeviceMap';
import { requestGeoPoint } from '../action-creators';


const DeviceMonitoringMapContainer = ({
    currentGeoPoint,
    requestGeoPointAction,
    isMapSizeChanged,
    className,
}) => (
    <DeviceMap
        geoPoint={currentGeoPoint}
        getGeoPoint={requestGeoPointAction}
        isSizeChanged={isMapSizeChanged}
        className={className}
    />
);


DeviceMonitoringMapContainer.defaultProps = {
    className: '',
};

DeviceMonitoringMapContainer.propTypes = {
    requestGeoPointAction: PropTypes.func.isRequired,
    currentGeoPoint: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            descr: PropTypes.string.isRequired,
            coords: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        }),
    ).isRequired,
    isMapSizeChanged: PropTypes.bool.isRequired,
    className: PropTypes.string,
};

const mapStateToProps = ({
    devicesReducer: {
        devicesMonitoringReducer: {
            currentGeoPoint,
        },
    },
}) => ({ currentGeoPoint });

const mapDispatchToProps = {
    requestGeoPointAction: requestGeoPoint,
};


export default connect(mapStateToProps, mapDispatchToProps)(DeviceMonitoringMapContainer);
