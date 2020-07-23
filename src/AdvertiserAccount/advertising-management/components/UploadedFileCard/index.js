import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Icon } from 'semantic-ui-react';

import styles from './index.module.scss';

const UploadedFileCard = ({
    pathToImg,
    preview,
    partOfAdvertisement,
    isVideo,
}) => {
    const cardStyles = cn(
        styles.card,
        { [styles.card__part]: partOfAdvertisement },
    );
    const imgUrl = isVideo ? preview : pathToImg;
    return (
        <div
            className={cardStyles}
            style={{ backgroundImage: `url(${imgUrl})` }}
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

UploadedFileCard.defaultProps = {
    preview: undefined,
    partOfAdvertisement: false,
    isVideo: false,
};

UploadedFileCard.propTypes = {
    pathToImg: PropTypes.string.isRequired,
    preview: PropTypes.string,
    partOfAdvertisement: PropTypes.bool,
    isVideo: PropTypes.bool,
};

export default UploadedFileCard;
