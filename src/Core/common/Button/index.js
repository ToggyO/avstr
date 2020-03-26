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
    ...props
}) => {
    const typeClass = cn({
        [styles.main]: type === 'main',
        [styles.outline]: type === 'outline',
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

    const allClasses = cn(className, styles.btn, typeClass, sizeClass);

    return (
        <span className={styles.btnWrap}>
            <Btn
                className={allClasses}
                onClick={onClick}
                {...props}
            >
                {children}
            </Btn>
        </span>
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
