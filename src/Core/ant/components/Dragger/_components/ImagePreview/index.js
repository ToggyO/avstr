import React from 'react';
import PropTypes from 'prop-types';

import UploadCard from '../UploadCard';

import styles from './index.module.scss';

const ImagePreview = ({ selectedImage, onRemove }) => (
    <>
        {selectedImage ? (
            <UploadCard
                fileName={selectedImage.file.name}
                onRemove={onRemove}
            >
                <img src={selectedImage.blobData} alt="alt" style={{ maxWidth: 150 }} className={styles.image} />
            </UploadCard>
        )
            : null}
    </>
);

ImagePreview.propTypes = {
    selectedImage: PropTypes.shape({
        file: PropTypes.shape({
            name: PropTypes.string,
        }),
        blobData: PropTypes.string,
    }),
    onRemove: PropTypes.func,
};

ImagePreview.defaultProps = {
    selectedImage: undefined,
    onRemove: Function.prototype,
};

export default ImagePreview;
