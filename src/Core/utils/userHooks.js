import { useEffect } from 'react';
import { parse } from 'qs';
import { message } from 'antd';

import { createPaginationQuery } from 'Core/ant';

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
 * @param {Function} clearErrorFunc - функция для очистки ошибок в конкретном редьюсере
 * @returns {void}
 */
export const useShowError = (errors, clearErrorFunc) => {
    useEffect(() => {
        if (errors.length) {
            message.error('Что то пошло не так');
        }
        return () => clearErrorFunc();
    }, [errors, clearErrorFunc]);
};
