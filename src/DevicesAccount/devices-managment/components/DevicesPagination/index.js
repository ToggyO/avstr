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
    },
}) => (
    <div className={styles.wrap}>
        <div>
            {`Показано устройств: ${size} из 10000`}
        </div>
        <div className={styles.controls}>
            {hasPrevious && <Icon name="arrowLeft" />}
            <div className={styles.text}>
                {`Страница ${page} из ${total}`}
            </div>
            {hasNext && (
                <>
                    <Icon name="arrowRight" />
                    <Icon name="arrowRightDouble" />
                </>
            )}

        </div>
    </div>
);


DevicesPagination.propTypes = {
    pagination: PropTypes.shape({
        page: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        hasPrevious: PropTypes.bool.isRequired,
        hasNext: PropTypes.bool.isRequired,
    }).isRequired,
};

export default DevicesPagination;
