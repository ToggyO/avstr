import React from 'react';
import { FilterFilled } from '@ant-design/icons';
import { parse } from 'qs';
import PropTypes from 'prop-types';

import {
    StandardTable,
    addSortToTableColumns,
    addFilterToTableColumn,
    CheckboxFilter,
} from 'Core/ant';
import { useGetDataWithQueries, useShowError, useClearError } from 'Core/utils/userHooks';
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

    // useShowError(errorsFromBackend);
    // useShowError(transformErrorToForm(errorsFromBackend));

    useClearError(clearErrors);

    const columnsWithSort = addSortToTableColumns(getColumns(), location);
    const columnsWithFilter = columnsWithSort.map((column) => {
        const queries = parse(location.search, { ignoreQueryPrefix: true });
        if (column.dataIndex === 'status') {
            return {
                ...column,
                ...addFilterToTableColumn(CheckboxFilter, location, 'status'),
                defaultFilteredValue: queries.status || '',
            };
        }
        return { ...column };
    });

    return (
        <StandardTable
            columns={columnsWithFilter}
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
    errorsFromBackend: PropTypes.shape({
        [PropTypes.string]: PropTypes.any,
    }),
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
