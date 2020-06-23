import React from 'react';
import { Skeleton } from 'antd';
import PropTypes from 'prop-types';

const MediaFile = ({ src }) => (
    <div>
        {src
            ? (
                <img src={src} alt="mediafile" />
            )
            : <Skeleton avatar={{ shape: 'square' }} title={false} paragraph={false} />}
    </div>
);

MediaFile.propTypes = {
    src: PropTypes.string,
};

MediaFile.defaultProps = {
    src: '',
};

export default MediaFile;
