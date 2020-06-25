import { DEFAULT_TABLE_QUERY_PARAMS } from 'Core/constants';

/**
 * Функция для создания объекта пагинации для запросов к апи
 * @param {{ page: string | number, size: string | number}} queries - объект с параметрами
 * @returns {{ Page: string | number, Size: string | number}} - преобразованный безопасный объект с параметрами
 */
// eslint-disable-next-line import/prefer-default-export
export const createPaginationQuery = (queries) => ({
    ...queries,
    Page: parseInt(queries.Page, 10) || DEFAULT_TABLE_QUERY_PARAMS.PAGE,
    Size: parseInt(queries.Size, 10) || DEFAULT_TABLE_QUERY_PARAMS.SIZE,
});
