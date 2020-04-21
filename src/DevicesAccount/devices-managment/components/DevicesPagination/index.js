import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'Core/common/Icon';

import styles from './index.module.scss';

const DevicesPagination = ({
    pagination: {
        page,
        total,
        size,
        hasPrevious,
        hasNext,
        itemsTotal,
    },
    requestDevices,
}) => {
    const handlePageChange = (e) => {
        const icon = e.target.closest('svg[name]');
        const name = icon.getAttribute('name');
        if (!icon || !name) return;
        switch (name) {
            case 'arrowLeft':
                if (!hasPrevious) return;
                requestDevices({
                    page: page - 1,
                });
                break;
            case 'arrowRight':
                if (!hasNext) return;
                requestDevices({
                    page: page + 1,
                });
                break;
            case 'arrowRightDouble':
                if (!hasNext) return;
                requestDevices({
                    page: total,
                });
                break;
            default:
                break;
        }
    };
    const amountOfVisibleDevices = itemsTotal > size ? size : itemsTotal;

    return (
        <div className={styles.wrap}>
            <div>
                {`Показано устройств: ${amountOfVisibleDevices} из ${itemsTotal}`}
            </div>
            <div className={styles.controls}>
                <Icon
                    name="arrowLeft"
                    onClick={handlePageChange}
                />

                <div className={styles.text}>
                    {`Страница ${page} из ${total}`}
                </div>

                <Icon
                    name="arrowRight"
                    onClick={handlePageChange}
                />
                <Icon
                    name="arrowRightDouble"
                    onClick={handlePageChange}
                />
            </div>
        </div>
    );
};


DevicesPagination.propTypes = {
    pagination: PropTypes.shape({
        page: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        hasPrevious: PropTypes.bool.isRequired,
        hasNext: PropTypes.bool.isRequired,
        itemsTotal: PropTypes.number.isRequired,
    }).isRequired,
    requestDevices: PropTypes.func.isRequired,
};

export default DevicesPagination;
