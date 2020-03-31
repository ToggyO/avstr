import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as IconLogo } from './logo.svg';

import styles from './index.module.scss';


const Logo = ({ size, className, ...attrs }) => {
    const logoClasses = cn(
        styles.logo,
        styles.normal,
        { [styles.small]: size === 'small' },
        className,
    );

    return (
        <IconLogo
            size
            className={logoClasses}
            {...attrs}
        />
    );
};


Logo.defaultProps = {
    size: 'normal',
    className: '',
};

Logo.propTypes = {
    size: PropTypes.string,
    className: PropTypes.string,
};


export default Logo;
