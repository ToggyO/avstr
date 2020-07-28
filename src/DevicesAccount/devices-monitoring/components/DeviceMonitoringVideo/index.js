import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import streamStore from 'Core/streamStoreService';

import styles from './index.module.scss';

const DeviceMonitoringVideo = ({ mediaStreamId }) => {
    const ref = useRef(null);

    useEffect(() => {
        const { getStream } = streamStore;
        const { current } = ref;
        current.srcObject = getStream(mediaStreamId);
    });

    return (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
            className={styles.video}
            ref={ref}
            autoPlay
            playsinline
            controls
        />
    );
};

DeviceMonitoringVideo.defaultProps = {
    mediaStreamId: null,
};

DeviceMonitoringVideo.propTypes = {
    mediaStreamId: PropTypes.number,
};

export default DeviceMonitoringVideo;
