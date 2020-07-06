/**
 * Функция для определения валидности имени и фамилии
 * @param {string} name строка
 * @returns {boolean} возвращает булево значение
 */
export const isNameValid = (name) => /^[a-zа-яё\s'-]+$/i.test(name);

/**
 * Функция для определения валидности электронной почты
 * @param {string} email строка
 * @returns {boolean} возвращает булево значение
 */
export const isEmailValid = (email) => /^[!#$%&'*+-/=?^_{|}~.\w]+@[\w-]+\.\w+$/.test(email);

/**
 * Функция для проверки строки на содержание минимум 2х символов
 * @param {string} str строка
 * @returns {boolean} возвращает булево значение
 */
export const isLessThen2Symbols = (str) => str.length < 2;

/**
 * Функция для проверки достаточно ли сложен пароль
 * @param {string} password строка
 * @returns {boolean} возвращает булево значение
 */
export const isPasswordValid = (password) => /(?=.*[0-9])(?=.*[!"#$%&'()*+,-.:;<=>?@^_`{|}~])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g.test(password);
