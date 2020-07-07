import { useEffect } from 'react';
import { parse } from 'qs';
import { message } from 'antd';

import { createPaginationQuery } from 'Core/ant';
import { isEmptyObject } from './isEmpty';

/**
 * Хук для получения списка данных с параметрами для пагинациии,
 * полученными из квери-параметров
 * @param {Function} func - action-creator для выполнения
 * @param {string} search - строка с квери-параметрами
 * @returns {void}
 */
export const useGetDataWithQueries = (func, search) => {
    useEffect(() => {
        const queries = parse(search, { ignoreQueryPrefix: true });
        func(createPaginationQuery(queries));
    }, [func, search]);
};

/**
 * Хук для общей обработки ошибки при совершения запроса
 * @param {Array<{}>} errors - массив объектов с ошибками
 * @returns {void}
 */
export const useShowError = (errors) => {
    useEffect(() => {
        if (!isEmptyObject(errors)) {
            message.error('Что то пошло не так');
        }
    }, [errors]);
};

/**
 * Хук для очистки ошибок в конкретном редьюсере
 * @param {Function} clearErrorFunc - функция для очистки ошибок в конкретном редьюсере
 * @returns {void}
 */
export const useClearError = (clearErrorFunc) => {
    useEffect(() => () => clearErrorFunc(), [clearErrorFunc]);
};
