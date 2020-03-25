/**
 * Функция для форматирования даты и времени
 * @param {string} date Строка с датой в формате ISO 8601 Extended.
 * @param {boolean} withTime параметр, указывающий нужно ли время
 * @returns {string} возвращает строку с отформатированной датой ("12.12.12 10:00")
 */
import formatNumLess10 from './formatNumLess10';


export default function formatDate(date, withTime) {
    const dateObj = new Date(Date.parse(date));

    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = `${dateObj.getFullYear()}`;

    let formattedDate = `${formatNumLess10(day)}.${formatNumLess10(month)}.${formatNumLess10(year)}`;

    if (withTime) {
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        formattedDate = `${formattedDate} ${formatNumLess10(hours)}:${formatNumLess10(minutes)}`;
    }
    return formattedDate;
}
