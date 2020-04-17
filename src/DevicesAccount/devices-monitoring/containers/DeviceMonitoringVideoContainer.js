import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { requestMediaStreamOptions } from '../action-creators';

class DeviceMonitoringVideoContainer extends Component {
    componentDidMount() {
        const { serialNumber, requestMediaStreamOptionsAction } = this.props;
        requestMediaStreamOptionsAction(serialNumber);
    }

    render() {
        return (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video />
        );
    }
}

DeviceMonitoringVideoContainer.propTypes = {
    serialNumber: PropTypes.string.isRequired,
    requestMediaStreamOptionsAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({
    devicesReducer: {
        devicesMonitoringReducer: {
            currentDevice,
        },
    },
}) => ({
    serialNumber: currentDevice.serialNumber,
});

const mapDispatchToProps = {
    requestMediaStreamOptionsAction: requestMediaStreamOptions,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceMonitoringVideoContainer);
