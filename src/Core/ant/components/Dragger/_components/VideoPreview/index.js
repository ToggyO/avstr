import React from 'react';
import PropTypes from 'prop-types';

import UploadCard from '../UploadCard';

import styles from './index.module.scss';

const VideoPreview = ({
    selectedVideo,
    onRemove,
    videoRef,
    canvasRef,
}) => (
    <>
        {selectedVideo ? (
            <UploadCard
                fileName={selectedVideo.file.name}
                onRemove={onRemove}
            >
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video ref={videoRef} className={styles.video}>
                    <source
                        src={selectedVideo.blobData}
                        type={selectedVideo.file.type}
                    />
                    Your browser does not support HTML5 video.
                </video>
                <canvas
                    ref={canvasRef}
                    width="48"
                    height="48"
                    id="add-adv-canvas"
                    className={styles.canvas}
                />
            </UploadCard>

        )
            : null}
    </>
);

VideoPreview.propTypes = {
    selectedVideo: PropTypes.shape({
        file: PropTypes.shape({
            name: PropTypes.string,
            type: PropTypes.string,
            [PropTypes.string]: PropTypes.any,
        }),
        blobData: PropTypes.string,
    }),
    onRemove: PropTypes.func,
    videoRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any }),
    ]).isRequired,
    canvasRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any }),
    ]).isRequired,
};

VideoPreview.defaultProps = {
    selectedVideo: undefined,
    onRemove: Function.prototype,
};

export default VideoPreview;
