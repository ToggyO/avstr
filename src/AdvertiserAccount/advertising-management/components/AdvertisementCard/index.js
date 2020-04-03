import React, { memo } from 'react';
import PropTypes from 'prop-types';

import formatDate from 'Core/utils/formatDate';
import isEqual from 'Core/utils/isEqual';

import { Icon } from 'semantic-ui-react';
import UploadedFileCard from '../UploadedFileCard';


import styles from './index.module.scss';


const AdvertisementCard = ({
    content: {
        name,
        url,
        creationTime,
        id,
        isVideo,
    },
    deleteAdvertisement,
}) => {
    const handleDeleteIconClick = () => {
        deleteAdvertisement(id);
    };

    return (
        <div className={styles.card}>
            <UploadedFileCard
                pathToImg={url}
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
        creationTime: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        isVideo: PropTypes.bool.isRequired,
    }).isRequired,
    deleteAdvertisement: PropTypes.func.isRequired,
};

export default memo(AdvertisementCard, ({ advertisements }, nextProps) => (
    isEqual(advertisements, nextProps.advertisements)
));
