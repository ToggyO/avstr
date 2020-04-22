import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import streamStore from 'Core/streamStoreService';

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
        const { mediaStreamId } = this.props;
        if (mediaStreamId === prevProps.mediaStreamId) return;

        const { getStream } = streamStore;
        const { current } = this.ref;
        current.srcObject = getStream(mediaStreamId);
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
    mediaStreamId: null,
};

DeviceMonitoringVideoContainer.propTypes = {
    serialNumber: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    startMediaStreamAction: PropTypes.func.isRequired,
    mediaStreamId: PropTypes.number,
};


const mapStateToProps = ({
    devicesReducer: {
        devicesMonitoringReducer: {
            currentDevice: {
                serialNumber,
                id,
            },
            mediaStreamId,
        },
    },
}) => ({
    serialNumber,
    id,
    mediaStreamId,
});

const mapDispatchToProps = {
    startMediaStreamAction: startMediaStream,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceMonitoringVideoContainer);
