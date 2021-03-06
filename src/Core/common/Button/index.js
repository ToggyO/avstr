import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Button as Btn } from 'semantic-ui-react';

import styles from './index.module.scss';

const Button = ({
    children,
    type,
    size,
    icon,
    withIcon,
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
        [styles.icon]: icon,
        [styles.withIcon]: withIcon,
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
    type: 'main',
    size: 'medium',
    icon: false,
    withIcon: false,
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    size: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.bool,
    withIcon: PropTypes.bool,
};

export default Button;
