import React, { useState } from 'react';
import { Skeleton, Spin } from 'antd';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const MediaFile = ({ src }) => {
    const [loading, setLoading] = useState(true);

    return (
        <div>
            {src
                ? (
                    <Spin size="small" spinning={loading}>
                        <div className={styles.imageContainer}>
                            <img
                                src={src}
                                alt="mediafile"
                                onLoad={() => setLoading(false)}
                                style={{
                                    backgroundColor: loading ? '#f2f2f2' : 'none',
                                    opacity: loading ? 0.15 : 1,
                                }}
                            />
                        </div>
                    </Spin>
                )
                : <Skeleton avatar={{ shape: 'square' }} title={false} paragraph={false} />}
        </div>
    );
};

MediaFile.propTypes = {
    src: PropTypes.string,
};

MediaFile.defaultProps = {
    src: '',
};

export default MediaFile;
