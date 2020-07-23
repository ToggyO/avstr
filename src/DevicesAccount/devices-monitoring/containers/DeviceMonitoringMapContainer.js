import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DeviceMap from '../../devices-common/components/DeviceMap';
import { requestGeoPoint, cleanGeoPoint } from '../action-creators';

const DeviceMonitoringMapContainer = ({
    currentGeoPoint,
    requestGeoPointAction,
    cleanGeoPointAction,
    isMapSizeChanged,
    className,
}) => (
    <DeviceMap
        geoPoint={currentGeoPoint}
        getGeoPoint={requestGeoPointAction}
        cleanGeoPoint={cleanGeoPointAction}
        isSizeChanged={isMapSizeChanged}
        className={className}
        zoomWithUpdate
    />
);

DeviceMonitoringMapContainer.defaultProps = {
    className: '',
};

DeviceMonitoringMapContainer.propTypes = {
    currentGeoPoint: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            descr: PropTypes.string,
            coords: PropTypes.arrayOf(PropTypes.number),
        }),
    ).isRequired,
    requestGeoPointAction: PropTypes.func.isRequired,
    cleanGeoPointAction: PropTypes.func.isRequired,
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
    cleanGeoPointAction: cleanGeoPoint,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceMonitoringMapContainer);
