import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const ProgressBar = ({ status }) => (
    <div className={styles.propgressBar}>
        {status}
    </div>
);


ProgressBar.propTypes = {
    status: PropTypes.string.isRequired,
};

export default ProgressBar;
