import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { startMediaStream } from '../action-creators';

class DeviceMonitoringVideoContainer extends Component {
    constructor(props) {
        super(props);
        this.ref = createRef(null);
    }

    componentDidMount() {
        const { serialNumber, id, startMediaStreamAction } = this.props;
        startMediaStreamAction({ serialNumber, id });
    }

    componentDidUpdate(prevProps) {
        const { mediaStream } = this.props;
        if (mediaStream === prevProps.mediaStream) return;
        this.ref.current.srcObject = mediaStream;
    }

    render() {
        return (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
                ref={this.ref}
                autoPlay
                controls
            />
        );
    }
}
DeviceMonitoringVideoContainer.defaultProps = {
    mediaStream: null,
};

DeviceMonitoringVideoContainer.propTypes = {
    serialNumber: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    startMediaStreamAction: PropTypes.func.isRequired,
    mediaStream: PropTypes.shape(),
};


const mapStateToProps = ({
    devicesReducer: {
        devicesMonitoringReducer: {
            currentDevice: {
                serialNumber,
                id,
            },
            mediaStream,
        },
    },
}) => ({
    serialNumber,
    id,
    mediaStream,
});

const mapDispatchToProps = {
    startMediaStreamAction: startMediaStream,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceMonitoringVideoContainer);
