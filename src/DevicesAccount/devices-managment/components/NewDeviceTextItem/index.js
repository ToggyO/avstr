import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './index.module.scss';

const NewDeviceTextItem = ({ number, text, className }) => (
    <div className={cn(styles.wrap, className)}>
        <span className={styles.number}>
            {number}
            {'. '}
        </span>
        {text}
    </div>
);

NewDeviceTextItem.defaultProps = {
    className: '',
};

NewDeviceTextItem.propTypes = {
    number: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default NewDeviceTextItem;
