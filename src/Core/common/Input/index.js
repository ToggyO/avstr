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
    iconTypes,
    ...attrs
}) => (
    <div className={styles.wrap}>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            className={cn(styles.input, className)}
            {...attrs}
        />

        {iconTypes.map((iconType, i) => {
            const rightValue = i === 0 ? 20 : 16;
            const lastRightValue = i === 0 ? 0 : rightValue;
            return (
                <Icon
                    name={iconType}
                    className={styles.icon}
                    key={iconType + Math.random()}
                    style={{ right: `${lastRightValue * (i + 1) + rightValue * (i + 1)}px` }}
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
    iconTypes: [],
};

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    iconTypes: PropTypes.arrayOf(
        PropTypes.string,
    ),
};

export default Input;
