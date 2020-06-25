import React from 'react';
import { parse } from 'qs';

/**
 * Функция для добавления фильтра определенной колонке таблицы
 * @param {JSX.Element} Component - кастомный дропдаун с фильтрами
 * @param {object} location
 * @param {string} columnName - имя колонки
 * @returns {object} объект в парметрами фильтрации
 */
const addFilterToTableColumn = (Component, location, columnName) => {
    const queries = parse(location.search, { ignoreQueryPrefix: true });
    return {
        filterDropdown: (props) => <Component query={queries[columnName]} {...props} />,
        // TODO: возможные реализации
        // filterIcon: (filtered) => (
        //         <FilterFilled type="search" style={{ fontSize: '17px', color: filtered ? '#1890ff' : undefined }}/>
        // );
        // onFilterDropdownVisibleChange: (visible) => {
        //     if (visible) {
        //         setTimeout(() => console.log(visible));
        //     }
        // },
    };
};

export default addFilterToTableColumn;
