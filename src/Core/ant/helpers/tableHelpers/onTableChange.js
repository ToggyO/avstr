import { stringify } from 'qs';
import { DEFAULT_TABLE_QUERY_PARAMS } from '../../../constants';
import arraySum from '../../../utils/arraySum';

/**
 * Функция для обработки изменения в таблице
 * @param {object} paginationParams - объект с параметрами пагинации (генерируется таблицей)
 * @param {object} filters - объект с параметрами фильрации (генерируется таблицей)
 * @param {object} sorter - объект с параметрами сортировки (генерируется таблицей)
 * @param {object} history
 * @returns {Array<object>} newColumns - массив объектов с параметрами c с обновленным полем sortOrder
 */
const onTableChange = (
    paginationParams,
    filters,
    sorter,
    history,
) => {
    console.log('Various parameters', paginationParams, filters, sorter);
    const { location } = history;

    const params = {};

    // sort
    let sorterResult;
    if (Array.isArray(sorter)) {
    // eslint-disable-next-line prefer-destructuring
        sorterResult = sorter[0];
    } else {
        sorterResult = sorter;
    }
    const { field, order } = sorterResult;
    const resultOrder = order === 'ascend';
    if (!order) {
        delete params.Order;
        delete params.Asc;
    } else {
        params.Order = field;
        params.Asc = resultOrder;
    }

    // pagination
    const { current, pageSize } = paginationParams;
    if (current === DEFAULT_TABLE_QUERY_PARAMS.PAGE) {
        delete params.Page;
        delete params.Size;
    } else {
        params.Page = current;
        params.Size = pageSize;
    }

    // filters
    Object.keys(filters).forEach((key) => {
        if (Array.isArray(filters[key])) {
            if (filters[key].length) {
                params[key] = arraySum(filters[key]);
            } else {
                delete params[key];
            }
        }
        if (typeof filters[key] === 'string') {
            // TODO: возможная реализация
        }
    });

    const queriesString = stringify(params, { addQueryPrefix: true });
    history.push(`${location.pathname}${queriesString}`);
    window.scrollTo(0, 0);
};

export default onTableChange;
