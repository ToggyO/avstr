/**
 * Проверка пользовательской роли на соотвествие массиву допустимых ролей
 * @param {Array<string>} allowedRoles - массив допустимых ролей
 * @param {Array<string>} userRoles - массив ролей пользователя
 * @returns {boolean} - булевый результат проверки
 */
const checkRoles = (allowedRoles = [], userRoles = []) => {
    if (!userRoles || !userRoles.length) return false;
    if (!allowedRoles.length) return true;

    return userRoles.some((role) => allowedRoles.includes(role));
};

export default checkRoles;
