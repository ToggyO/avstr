/**
 * Проверка типа на "Object"
 * @param {*} value - сущность для проверки
 * @returns {boolean} - Булевое значение на проверяемую сущность
 */
export const checkTypeIsObject = (value) => typeof value === 'object' && value.constructor === Object;

/**
 * Имплементация lodash.get функции
 * https://gist.github.com/harish2704/d0ee530e6ee75bad6fd30c98e5ad9dab
 * @param {object} object - исходный объект
 * @param {string} keys - путь (path.path.path)
 * @param {*} defaultVal - значение по умолчанию
 * @returns {*} - значение объекта по указанному пути
 */
export const getProp = (object = {}, keys, defaultVal) => {
    if (!checkTypeIsObject(object) || typeof keys !== 'string') {
        return defaultVal;
    }

    const pathKeys = Array.isArray(keys) ? keys : keys.split('.');
    const source = object[pathKeys[0]];
    if (source && pathKeys.length > 1) {
        return getProp(source, pathKeys.slice(1).join('.'));
    }

    return source === undefined ? defaultVal : source;
};
