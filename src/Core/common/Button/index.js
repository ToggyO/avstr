import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Button as Btn } from 'semantic-ui-react';

import styles from './index.module.scss';

const Button = ({
    children,
    type,
    size,
    className,
    onClick,
}) => {
    const typeClass = cn({
        [styles.main]: type === 'main',
        [styles.outline]: type === 'secondary',
        [styles.link]: type === 'link',
        [styles.dark]: type === 'dark',
    });

    const sizeClass = cn({
        [styles.small]: size === 'small',
        [styles.medium]: size === 'medium',
        [styles.large]: size === 'large',
        [styles.icon]: size === 'icon',
        [styles.withIcon]: size === 'withIcon',
    });

    return (
        <Btn
            className={cn(className, styles.btn, typeClass, sizeClass)}
            onClick={onClick}
        >
            {children}
        </Btn>
    );
};


Button.defaultProps = {
    className: '',
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};


export default Button;
