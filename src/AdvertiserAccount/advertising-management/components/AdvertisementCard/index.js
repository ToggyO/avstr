import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';

import { formatDate } from 'Core/utils/formatDate';
import isEqual from 'Core/utils/isEqual';

import { Icon } from 'semantic-ui-react';
import UploadedFileCard from '../UploadedFileCard';

import styles from './index.module.scss';

const AdvertisementCard = ({
    content: {
        name,
        url,
        thumbnailUrl,
        creationTime,
        id,
        isVideo,
    },
    deleteAdvertisement,
}) => {
    const [isDelBtnDisabled, setIsDelBtnDisabled] = useState(false);

    const handleDeleteIconClick = () => {
        if (isDelBtnDisabled) return;
        deleteAdvertisement(id);
        setIsDelBtnDisabled(true);
    };

    return (
        <div className={styles.card}>
            <UploadedFileCard
                pathToImg={url}
                preview={thumbnailUrl}
                isVideo={isVideo}
                partOfAdvertisement
            />
            <div className={styles.description}>
                <div className={styles.title}>{name}</div>
                <div className={styles.time}>{formatDate(creationTime)}</div>

                <Icon
                    name="delete"
                    className={styles.deleteIcon}
                    onClick={handleDeleteIconClick}
                />
            </div>
        </div>
    );
};

AdvertisementCard.propTypes = {
    content: PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        thumbnailUrl: PropTypes.string,
        creationTime: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        isVideo: PropTypes.bool.isRequired,
    }).isRequired,
    deleteAdvertisement: PropTypes.func.isRequired,
};

export default memo(AdvertisementCard, ({ advertisements }, nextProps) => (
    isEqual(advertisements, nextProps.advertisements)
));
