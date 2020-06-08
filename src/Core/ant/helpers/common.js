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
