import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { StandardTable, addSortToTableColumns } from 'Core/ant';
import { useGetDataWithQueries, useShowError } from 'Core/utils/userHooks';
import getColumns from './_components/tableColumns';

const AdsListView = ({
    history,
    location,
    loading,
    pagination,
    advList,
    getAdv,
    errorsFromBackend,
    clearErrors,
}) => {
    useGetDataWithQueries(getAdv, location.search);

    useShowError(errorsFromBackend, clearErrors);

    const signalColumnsWithSort = addSortToTableColumns(getColumns(), location);

    return (
        <StandardTable
            columns={signalColumnsWithSort}
            scroll={{ x: 1100, scrollToFirstRowOnChange: true }}
            dataSource={advList}
            loading={loading}
            pagination={pagination}
            rowKey={(record) => record.creationTime}
            history={history}
        />
    );
};

AdsListView.propTypes = {
    history: PropTypes.shape({
        [PropTypes.string]: PropTypes.any,
    }).isRequired,
    location: PropTypes.shape({
        state: PropTypes.shape({
            [PropTypes.string]: PropTypes.any,
        }),
        search: PropTypes.string,
        [PropTypes.string]: PropTypes.any,
    }).isRequired,
    loading: PropTypes.bool,
    pagination: PropTypes.shape({
        total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        pageSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    advList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            startDate: PropTypes.string,
            endDate: PropTypes.string,
            creationTime: PropTypes.string,
            frequency: PropTypes.number,
            status: PropTypes.oneOf([1, 2, 4, 8]),
            url: PropTypes.string,
            filePath: PropTypes.string,
        }),
    ),
    getAdv: PropTypes.func,
    errorsFromBackend: PropTypes.arrayOf(
        PropTypes.shape({
            [PropTypes.string]: PropTypes.any,
        }),
    ),
    clearErrors: PropTypes.func,
};

AdsListView.defaultProps = {
    loading: false,
    pagination: {
        total: '',
        current: '',
        pageSize: '',
    },
    advList: Function.prototype,
    getAdv: Function.prototype,
    errorsFromBackend: [],
    clearErrors: Function.prototype,
};

export default AdsListView;
