/**
 * Проверка что значение не пустое
 * @param {string} val - Значение для проверки
 * @return {boolean} - Булевый результат проверки
 */
export const isEmpty = (val) => val === undefined || val == null || val.length <= 0;

export const isEmptyObject = (obj) => {
    let flag = true;
    const keys = Object.keys(obj);
    if (keys.length > 0) {
        flag = false;
    }
    return flag;
};
