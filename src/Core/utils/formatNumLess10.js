/**
 * Функция для добавления "0" впереди числа, если оно < 10
 * @param {number} num Число
 * @returns {string}
 */

export default function formatNumLess10(num) {
    return `${num < 10 ? `0${num}` : num}`;
}
