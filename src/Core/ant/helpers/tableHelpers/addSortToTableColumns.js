import { parse } from 'qs';

/**
 * Функция для обработки сортировочного поля sortOrder в колонках таблицы
 * @param {Array<object>} columns - массив объектов с параметрами колонок
 * @param {object} location
 * @returns {Array<object>} newColumns - массив объектов с параметрами c с обновленным полем sortOrder
 */
const addSortToTableColumns = (columns, location) => {
    const newColumns = columns.map((column) => ({ ...column }));
    const { search = '' } = location;
    const queries = parse(search, { ignoreQueryPrefix: true });

    const { Order: sortedField = '', Asc: isAsc = '' } = queries;
    const sortColumnIndex = columns.findIndex((column) => sortedField === column.dataIndex);

    let sortOrder;
    if (isAsc && isAsc === 'true') {
        sortOrder = 'ascend';
    } else {
        sortOrder = 'descend';
    }

    // eslint-disable-next-line no-bitwise
    if (~sortColumnIndex && isAsc) {
        newColumns[sortColumnIndex].sortOrder = sortOrder;
    }

    newColumns.forEach((column, index) => {
        if (column.children) {
            newColumns[index].children = addSortToTableColumns(newColumns[index].children, location);
        }
    });

    return newColumns;
};

export default addSortToTableColumns;
