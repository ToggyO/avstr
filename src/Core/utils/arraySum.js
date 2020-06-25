/**
 * Функция для сложения элементов массива, состоящего из числовых значений
 * @param {Array<number>} arr - массив числовых значений
 * @returns {number} sum - результат сложения элементов массива
 */
const arraySum = (arr) => {
    let sum;
    if (arr.length) {
        sum = arr.reduce((acc, curr) => (parseFloat(acc) || 0) + (parseFloat(curr) || 0));
    } else {
        sum = 0;
    }
    return sum;
};

export default arraySum;
