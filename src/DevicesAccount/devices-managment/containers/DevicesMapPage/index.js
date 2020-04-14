import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Map from '../../components/Map';
import { requestGeoPoints } from '../../action-creators';

import styles from './index.module.scss';

class DevicesMapPage extends Component {
    componentDidMount() {
        const { requestGeoPointsAction } = this.props;
        requestGeoPointsAction();
    }

    render() {
        const { geoPoints } = this.props;

        return (
            <Map
                className={styles.map}
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
