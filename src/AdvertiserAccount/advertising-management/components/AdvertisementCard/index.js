import React from 'react';
import PropTypes from 'prop-types';

import formatDate from 'Core/utils/formatDate';

import { Icon } from 'semantic-ui-react';
import UploadedFileCard from '../UploadedFileCard';


import styles from './index.module.scss';


const AdvertisementCard = ({ content: { name, url, creationTime } }) => (
    <div className={styles.card}>
        <UploadedFileCard
            pathToImg={url}
            partOfAdvertisement
        />
        <div className={styles.description}>
            <div className={styles.title}>{name}</div>
            <div className={styles.time}>{formatDate(creationTime)}</div>

            <Icon
                name="delete"
                className={styles.deleteIcon}
            />
        </div>
    </div>
);


AdvertisementCard.propTypes = {
    content: PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        creationTime: PropTypes.string.isRequired,
    }).isRequired,
};

export default AdvertisementCard;
