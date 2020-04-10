import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import ComponentMap from '../components/Map';
import { receiveDevicesLocation } from '../action-creators';

class DevicesMapPage extends Component {
    componentDidMount() {
        const { requestDevicesLocationAction } = this.props;

        requestDevicesLocationAction();
    }

    render() {
        return (
            <ComponentMap />
        );
    }
}

DevicesMapPage.propTypes = {
    requestDevicesLocationAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({
    devicesReducer: {
        devicesManagementReducer: {
            locationInfo,
        },
    },
}) => ({ locationInfo });

const mapDispatchToProps = {
    requestDevicesLocationAction: receiveDevicesLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicesMapPage);
