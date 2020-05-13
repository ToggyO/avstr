import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import DeviceMap from '../../devices-common/components/DeviceMap';
import { requestAllGeoPoints } from '../../devices-common/action-creators';

class DevicesMapPage extends Component {
    componentDidMount() {
        const { requestAllGeoPointsAction } = this.props;
        requestAllGeoPointsAction();
    }

    render() {
        const { allGeoPoints, requestAllGeoPointsAction } = this.props;
        return (
            <DeviceMap
                getAllGeoPoints={requestAllGeoPointsAction}
                allGeoPoints={allGeoPoints}
            />
        );
    }
}

DevicesMapPage.propTypes = {
    requestAllGeoPointsAction: PropTypes.func.isRequired,
    allGeoPoints: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            descr: PropTypes.string.isRequired,
            coords: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        }),
    ).isRequired,
};

const mapStateToProps = ({
    devicesReducer: {
        devicesCommonReducer: {
            allGeoPoints,
        },
    },
}) => ({ allGeoPoints });

const mapDispatchToProps = {
    requestAllGeoPointsAction: requestAllGeoPoints,
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicesMapPage);
