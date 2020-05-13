import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DeviceMap from '../../devices-common/components/DeviceMap';
import { requestGeoPoints } from '../../devices-common/action-creators';


const DeviceMonitoringMapContainer = ({
    geoPoints,
    requestGeoPointsAction,
    isMapSizeChanged,
    className,
}) => (
    <DeviceMap
        isSizeChanged={isMapSizeChanged}
        geoPoints={geoPoints}
        getGeoPoints={requestGeoPointsAction}
        className={className}
    />
);


DeviceMonitoringMapContainer.defaultProps = {
    className: '',
};

DeviceMonitoringMapContainer.propTypes = {
    requestGeoPointsAction: PropTypes.func.isRequired,
    geoPoints: PropTypes.arrayOf(
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
        devicesCommonReducer: {
            geoPoints,
        },
    },
}) => ({ geoPoints });

const mapDispatchToProps = {
    requestGeoPointsAction: requestGeoPoints,
};


export default connect(mapStateToProps, mapDispatchToProps)(DeviceMonitoringMapContainer);
