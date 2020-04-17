import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import DeviceMap from '../components/DeviceMap';
import { requestGeoPoints } from '../action-creators';

class DevicesMapPage extends Component {
    componentDidMount() {
        const { requestGeoPointsAction } = this.props;

        requestGeoPointsAction();
    }

    render() {
        const { geoPoints, requestGeoPointsAction } = this.props;

        // Необходимо передать полученный стейт geoPoints в компонент map,
        // так как метод onLoad библиотеки react-yandex-maps может сработать один раз и не отрендерить изменный стейт
        return geoPoints.length
            && (
                <DeviceMap
                    getGeoPoints={requestGeoPointsAction}
                    geoPoints={geoPoints}
                />
            );
    }
}

DevicesMapPage.propTypes = {
    requestGeoPointsAction: PropTypes.func.isRequired,
    geoPoints: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            descr: PropTypes.string.isRequired,
            coords: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        }),
    ).isRequired,
};

const mapStateToProps = ({
    devicesReducer: {
        devicesManagementReducer: {
            geoPoints,
        },
    },
}) => ({ geoPoints });

const mapDispatchToProps = {
    requestGeoPointsAction: requestGeoPoints,
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicesMapPage);
