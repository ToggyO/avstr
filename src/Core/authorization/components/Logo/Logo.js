import React from 'react';
// import PropTypes from 'prop-types';

import styles from './Logo.module.scss';

const Logo = () => (
    <div className={styles.logo}>
        <img src="./" alt="AVAStar logo" />
    </div>
);


Logo.propTypes = {};

export default Logo;
