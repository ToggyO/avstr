import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import DeviceMap from '../../devices-common/components/DeviceMap';
import { requestAllGeoPoints, cleanAllGeoPoints } from '../action-creators';

class DevicesMapPage extends Component {
    componentDidMount() {
        const { requestAllGeoPointsAction } = this.props;
        requestAllGeoPointsAction();
    }

    render() {
        const { allGeoPoints, requestAllGeoPointsAction, cleanAllGeoPointsAction } = this.props;
        return (
            <DeviceMap
                getAllGeoPoints={requestAllGeoPointsAction}
                allGeoPoints={allGeoPoints}
                cleanAllGeoPoints={cleanAllGeoPointsAction}
            />
        );
    }
}

DevicesMapPage.propTypes = {
    allGeoPoints: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            descr: PropTypes.string.isRequired,
            coords: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        }),
    ).isRequired,
    requestAllGeoPointsAction: PropTypes.func.isRequired,
    cleanAllGeoPointsAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({
    devicesReducer: {
        devicesManagementReducer: {
            allGeoPoints,
        },
    },
}) => ({ allGeoPoints });

const mapDispatchToProps = {
    requestAllGeoPointsAction: requestAllGeoPoints,
    cleanAllGeoPointsAction: cleanAllGeoPoints,
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicesMapPage);
