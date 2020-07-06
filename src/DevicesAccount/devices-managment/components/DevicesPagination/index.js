// todo(nn): разобраться для чего нужен параметр total в объекте пагинации
import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, Typography } from 'antd';

import styles from './index.module.scss';

const { Text } = Typography;

const DevicesPagination = ({
    pagination: {
        page,
        // total,
        size,
        itemsTotal,
    },
    requestDevices,
}) => {
    const handlePageChange = (currentPage, pageSize) => {
        requestDevices({
            page: currentPage,
            size: pageSize,
        });
    };

    const amountOfVisibleDevices = itemsTotal > size ? size : itemsTotal;

    return (
        <div className={styles.wrap}>
            <Text className={styles.text}>
                {`Показано устройств: ${amountOfVisibleDevices} из ${itemsTotal}`}
            </Text>

            <Pagination
                current={page}
                total={itemsTotal}
                showSizeChanger
                responsive
                onChange={handlePageChange}
                onShowSizeChange={handlePageChange}
            />
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
