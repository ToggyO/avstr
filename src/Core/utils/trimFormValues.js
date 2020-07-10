/**
 * Функция для форматирования данных формы перед отправкой на сервер
 * @param {object} values - объект с полями формы
 * @returns {object} - форматированный объект с полями формы
 */
const trimFormValues = (values = {}) => Object.entries(values).reduce(
    (acc, [key, val]) => {
        let resultValue = val;
        if (typeof val === 'boolean') {
            resultValue = val;
        }
        if (typeof val === 'number' || typeof val === 'string') {
            resultValue = (val || '').trim();
        }
        if (typeof val === 'object' || Array.isArray(val)) {
            resultValue = val;
        }
        return {
            ...acc,
            [key]: resultValue,
        };
    },
    {},
);

export default trimFormValues;
