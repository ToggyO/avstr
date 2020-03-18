import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './index.module.scss';

const Container = ({ children, className }) => (
    <div className={cn(styles.container, className)}>
        {children}
    </div>
);


Container.defaultProps = {
    className: '',
};

Container.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Container;
