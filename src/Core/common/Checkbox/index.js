import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './index.module.scss';

const Checkbox = ({
    label,
    className,
    onChange,
    ...attrs
}) => (
    <label className={styles.wrap}>
        <input
            type="checkbox"
            className={cn(className, styles.hidden)}
            onChange={onChange}
            {...attrs}
        />

        <span className={styles.span}>
            {label && label}
        </span>
    </label>
);

Checkbox.defaultProps = {
    label: null,
    className: '',
};

Checkbox.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default Checkbox;
