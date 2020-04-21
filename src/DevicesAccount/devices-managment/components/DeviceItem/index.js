import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import history from 'Core/history';

import isEqual from 'Core/utils/isEqual';
import Icon from 'Core/common/Icon';

import styles from './index.module.scss';


const DeviceItem = ({
    content: {
        name,
        serialNumber,
        isActive,
        isAdvertisementsDisabled,
        id,
    },
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

    const handleArrowClick = () => {
        history.push(`/devices/monitoring/${id}`);
    };

    return (
        <tr
            className={cn(styles.row, deviceItemClasses)}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onFocus={handleMouseOver}
            onBlur={handleMouseOut}
        >
            <td>{name}</td>
            <td>{serialNumber}</td>
            <td>
                {!isActive
                    ? <div>Деактивировано</div>
                    : isAdvertisementsDisabled
                    && <div>Отключен показ рекламы</div>}
            </td>
            <td className={styles.iconWrap}>
                {isHighlighted
                    ? (
                        <Icon
                            className={styles.icon}
                            name="arrowRight"
                            onClick={handleArrowClick}
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
        isAdvertisementsDisabled: PropTypes.bool.isRequired,
    }).isRequired,
};

export default memo(DeviceItem, ({ content }, nextProps) => (
    isEqual(content, nextProps.content)
));
