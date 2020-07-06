import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './index.module.scss';

const Title = ({ text, className }) => (
    <h1 className={cn(styles.title, className)}>
        {text}
    </h1>
);

Title.defaultProps = {
    className: '',
};

Title.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default Title;
