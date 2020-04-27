import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import streamStore from 'Core/streamStoreService';


const DeviceMonitoringVideo = ({ mediaStreamId, cancelMediaStream }) => {
    const ref = useRef(null);

    useEffect(() => {
        const { getStream } = streamStore;
        const { current } = ref;
        current.srcObject = getStream(mediaStreamId);

        return () => {
            cancelMediaStream();

            const connection = streamStore.getConnection(mediaStreamId);
            if (connection) {
                connection.closeSocket();
                connection.onstream = null;
                connection.onstreamended = null;
                connection.onMediaError = null;
                connection.error = null;
            }
        };
    }, [mediaStreamId, cancelMediaStream]);

    return (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
            ref={ref}
            autoPlay
            controls
        />
    );
};


DeviceMonitoringVideo.defaultProps = {
    mediaStreamId: null,
};

DeviceMonitoringVideo.propTypes = {
    mediaStreamId: PropTypes.number,
    cancelMediaStream: PropTypes.func.isRequired,
};

export default DeviceMonitoringVideo;
