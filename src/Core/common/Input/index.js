import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Icon from '../Icon';

import styles from './index.module.scss';

const Input = forwardRef(({
    type,
    placeholder,
    value,
    className,
    icons,
    error,
    ...attrs
}, ref) => (
    <div className={styles.wrap}>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            className={cn(styles.input, className, { [styles.error]: error })}
            {...attrs}
            ref={ref}
        />

        {icons.map(({ name, iconClass, handler }, i) => {
            const rightValue = i === 0 && 20;
            return (
                <Icon
                    name={name}
                    style={i === 0 ? { right: `${rightValue * (i + 1)}px` } : null}
                    className={cn(styles.icon, iconClass)}
                    key={name + Math.random()}

                    onClick={handler}
                />
            );
        })}
    </div>
));

Input.defaultProps = {
    type: 'text',
    placeholder: '',
    value: '',
    className: '',
    icons: [],
    error: false,
};

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    icons: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            iconClass: PropTypes.string,
            handler: PropTypes.func,
        }),
    ),
    error: PropTypes.bool,
};

export default Input;
