import React from 'react';
import { Table, Typography, Space } from 'antd';
import { useMediaQuery } from 'beautiful-react-hooks';
import PropTypes from 'prop-types';

import {
    onTableChange,
    paginationInformationString,
    renderNoDataContent,
} from 'Core/ant/helpers';
import { BREAKPOINTS } from 'Core/ant/constants';

import styles from './index.module.scss';

const { Text } = Typography;

const StandardTable = ({
    history,
    dataSource,
    loading,
    pagination,
    ...rest
}) => {
    const { total, pageSize, current } = pagination;

    const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.LG}px)`);

    return (
        <Space
            className={styles.container}
            direction="vertical"
            size="middle"
        >
            <Text>
                {paginationInformationString({ current, pageSize, total })}
            </Text>
            <Table
                size={isMobile ? 'small' : 'default'}
                bordered
                className="custom-ant-table"
                rowClassName={() => 'custom-ant-table__rows'}
                locale={{ emptyText: renderNoDataContent(6, dataSource, loading) }}
                dataSource={dataSource}
                pagination={pagination}
                loading={loading}
                onChange={(paginationParams, filters, sorter) => (
                    onTableChange(paginationParams, filters, sorter, history)
                )}
                {...rest}
            />
        </Space>
    );
};

StandardTable.propTypes = {
    history: PropTypes.shape({
        [PropTypes.string]: PropTypes.any,
    }).isRequired,
    pagination: PropTypes.shape({
        total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        pageSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    // eslint-disable-next-line react/forbid-prop-types
    dataSource: PropTypes.array,
    loading: PropTypes.bool,
};

StandardTable.defaultProps = {
    pagination: {
        total: '',
        current: '',
        pageSize: '',
    },
    dataSource: [],
    loading: false,
};

export default StandardTable;
