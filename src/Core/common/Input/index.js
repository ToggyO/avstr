import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Icon } from 'semantic-ui-react';

import styles from './index.module.scss';


const Input = ({
    type,
    placeholder,
    value,
    className,
    icons,
    error,
    ...attrs
}) => (
    <div className={styles.wrap}>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            className={cn(styles.input, className, { [styles.error]: error })}
            {...attrs}
        />

        {icons.map(({ name, iconClass, handler }, i) => {
            const rightValue = i === 0 && 20;
            return (
                <Icon
                    name={name}
                    className={cn(styles.icon, iconClass)}
                    key={name + Math.random()}
                    style={i === 0 ? { right: `${rightValue * (i + 1)}px` } : null}
                    onClick={handler}
                />
            );
        })}
    </div>
);


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
