// TODO: закомментированная функция создана для массива ролей.
//  если бэки пофиксят приходяющуюю строку при одной роли,
//  то можно раскомментить
import { REDIRECT_PATH_BY_ROLE } from 'Core/constants';

/**
 * Проверка пользовательской роли на соотвествие массиву допустимых ролей
 * @param {Array<string>} allowedRoles - массив допустимых ролей
 * @param {Array<string>} userRoles - массив ролей пользователя
 * @returns {boolean} - булевый результат проверки
 */
export const checkRoles = (allowedRoles = [], userRoles = []) => {
    if (!userRoles || !userRoles.length) return false;
    if (!allowedRoles.length) return true;

    let result = false;

    if (typeof userRoles === 'string' || userRoles instanceof String) {
        result = allowedRoles.includes(userRoles);
    }

    if (Array.isArray(userRoles)) {
        result = userRoles.some((role) => allowedRoles.includes(role));
    }

    return result;
};

// export const checkRoles = (allowedRoles = [], userRoles = []) => {
//     if (!userRoles || !userRoles.length) return false;
//     if (!allowedRoles.length) return true;
//
//     return userRoles.some((role) => allowedRoles.includes(role));
// };

// FIXME: функция потеряет необходимость, если бэки станут возвращать массив ролей
/**
 * Создание пути для редиректа в случае несоотвествия роли запрашиваемой странице
 * @param {Array<string>} userRoles - массив ролей пользователя
 * @returns {string} - строка для редиректа
 */
export const createRoleRedirect = (userRoles = []) => {
    let result = '/';

    if (typeof userRoles === 'string' || userRoles instanceof String) {
        result = REDIRECT_PATH_BY_ROLE[userRoles];
    }

    if (Array.isArray(userRoles)) {
        result = REDIRECT_PATH_BY_ROLE[userRoles[0]];
    }

    return result;
};
