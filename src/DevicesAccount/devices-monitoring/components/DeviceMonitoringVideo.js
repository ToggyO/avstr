import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import streamStore from 'Core/streamStoreService';


class DeviceMonitoringVideo extends Component {
    constructor(props) {
        super(props);
        this.ref = createRef(null);
    }

    componentDidMount() {
        const { mediaStreamId } = this.props;
        const { getStream } = streamStore;
        const { current } = this.ref;
        current.srcObject = getStream(mediaStreamId);
    }

    componentDidUpdate() {
        const { mediaStreamId } = this.props;
        const { getStream } = streamStore;
        const { current } = this.ref;
        current.srcObject = getStream(mediaStreamId);
    }

    componentWillUnmount() {
        const { cancelMediaStream, mediaStreamId } = this.props;
        cancelMediaStream();

        const connection = streamStore.getConnection(mediaStreamId);
        if (connection) {
            connection.closeSocket();
            connection.onstream = null;
            connection.onstreamended = null;
            connection.onMediaError = null;
            connection.error = null;
        }
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


DeviceMonitoringVideo.defaultProps = {
    mediaStreamId: null,
};

DeviceMonitoringVideo.propTypes = {
    mediaStreamId: PropTypes.number,
    cancelMediaStream: PropTypes.func.isRequired,
};

export default DeviceMonitoringVideo;
