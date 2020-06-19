/**
 * Функция для создания заголовка вкладки браузера
 * @param {string} pathname - строка URL от корня
 * @returns {string} - преобразованная строка для вставки в Helmet
 */
export const getPageTitle = ({
    pathname,
}) => {
    if (pathname === '/') {
        return ' - Home';
    }
    const splittedPathname = pathname.split('/');
    return splittedPathname.reduce((acc, curr) => {
        if (!curr.length) return acc;
        // eslint-disable-next-line no-param-reassign
        acc += ` - ${curr[0].toUpperCase()}${curr.slice(1)}`;
        return acc;
    }, '');
};

export const getHeaderTitle = ({
    pathname,
}) => {
    if (pathname === '/') {
        return ' - Home';
    }
    const splittedPathname = pathname.split('/');
    return `${splittedPathname[splittedPathname.length - 1]}`;
};

// TODO: реализовать функцию обработки ошибок с бэкэнда
export const transformErrorToForm = () => {};

/**
 * Функция валидации поля FormItemWrapper
 * @param {object} form - инстанс формы Ant Design
 * @param {{ [key]: (any | boolean) }} validationObj - объект в паттернами валидации
 * @param {string} fieldName - имя валидируемого поля
 * @return {Promise} - результат валидации
 */
export const validatePasswordBySteps = ({ isFieldTouched }, validationObj, fieldName) => {
    let status;
    const validPatternsRulesCount = Object.values(validationObj).reduce((acc, currVal) => {
        if (currVal) {
            acc.push(currVal);
        }
        return acc;
    }, []).length;
    const isTouched = isFieldTouched(fieldName);

    switch (validPatternsRulesCount) {
        case !isTouched && 0:
            status = Promise.resolve();
            break;
        case 1:
        case 2:
            status = Promise.reject('Пароль слишком простой');
            break;
        case 3:
        case 4:
            status = Promise.reject('Пароль недостаточно сложный');
            break;
        case 5:
            status = Promise.resolve('Огонь!');
            break;
        default:
            status = Promise.resolve('Огонь!');
            break;
    }
    return status;
};
