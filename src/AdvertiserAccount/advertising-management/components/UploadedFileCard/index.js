import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Icon } from 'semantic-ui-react';

import styles from './index.module.scss';


const UploadedFileCard = ({ pathToImg, partOfAdvertisement }) => {
    const cardStyles = cn(
        styles.card,
        { [styles.card__part]: partOfAdvertisement },
    );
    return (
        <div
            className={cardStyles}
            style={{ backgroundImage: `url(${pathToImg})` }}
        >
            <Icon
                name="image"
                className={cn(styles.icon, styles.imgIcon)}
            />
            {!partOfAdvertisement && (
                <Icon
                    name="delete"
                    className={cn(styles.icon, styles.deleteIcon)}
                />
            )}
        </div>
    );
};


UploadedFileCard.propTypes = {
    pathToImg: PropTypes.string.isRequired,
    partOfAdvertisement: PropTypes.bool.isRequired,
};

export default UploadedFileCard;
