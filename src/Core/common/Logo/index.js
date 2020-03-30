import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './index.module.scss';


const Logo = ({ className }) => (
    <div className={cn(styles.logo, className)}>
        <img
            src=""
            alt="AVAStar logo"
        />
    </div>
);


Logo.defaultProps = {
    className: '',
};

Logo.propTypes = {
    className: PropTypes.string,
};


export default Logo;
