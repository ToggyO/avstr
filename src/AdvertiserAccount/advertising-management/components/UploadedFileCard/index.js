import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Icon } from 'semantic-ui-react';

import styles from './index.module.scss';


const UploadedFileCard = ({ pathToImg }) => {
    console.log(pathToImg);
    const path = 'http://placehold.it/349x146';
    return (
        <div
            className={styles.card}
            style={{ backgroundImage: `url(${path})` }}
        >
            <Icon
                name="image"
                className={cn(styles.icon, styles.imgIcon)}
            />
            <Icon
                name="delete"
                className={cn(styles.icon, styles.deleteIcon)}
            />
        </div>
    );
};

UploadedFileCard.propTypes = {
    pathToImg: PropTypes.string.isRequired,
};

export default UploadedFileCard;
