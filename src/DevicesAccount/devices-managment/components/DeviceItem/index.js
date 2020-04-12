import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import isEqual from 'Core/utils/isEqual';
import Icon from 'Core/common/Icon';

import styles from './index.module.scss';


const DeviceItem = ({
    content: {
        name,
        serialNumber,
        isActive,
    },
    number,
}) => {
    const [isHighlighted, setIsHighlighted] = useState(false);

    const deviceItemClasses = isHighlighted ? styles.active : '';

    const handleMouseOver = ({ target }) => {
        if (!target.closest(`.${styles.row}`)) return;
        setIsHighlighted(true);
    };
    const handleMouseOut = ({ relatedTarget }) => {
        if (relatedTarget && relatedTarget.closest(`.${styles.row}.${styles.active}`)) return;
        setIsHighlighted(false);
    };

    return (
        <tr
            className={cn(styles.row, deviceItemClasses)}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onFocus={handleMouseOver}
            onBlur={handleMouseOut}
        >
            <td>{number}</td>
            <td>{name}</td>
            <td>{serialNumber}</td>
            <td>{isActive && 'active'}</td>
            <td className={styles.iconWrap}>
                {isHighlighted
                    ? (
                        <Icon
                            className={styles.icon}
                            name="arrowRight"
                        />
                    )
                    : ''}
            </td>
        </tr>
    );
};


DeviceItem.propTypes = {
    content: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        serialNumber: PropTypes.string.isRequired,
        isActive: PropTypes.bool.isRequired,
    }).isRequired,
    number: PropTypes.number.isRequired,
};

export default memo(DeviceItem, ({ content }, nextProps) => (
    isEqual(content, nextProps.content)
));
