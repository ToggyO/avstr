/**
 * Функция для проверки эквивалентности массива или объекта
 * @param {array, obj} a Массив или объект
 * @param {array, obj} b Массив или объект
 * @returns {boolean}
 */

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export default isEqual;
