import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './index.module.scss';

const ErrorMessage = ({ text, className }) => (
    <div className={cn(styles.err, className)}>
        {text}
    </div>
);

ErrorMessage.defaultProps = {
    className: PropTypes.string,
};

ErrorMessage.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default ErrorMessage;
