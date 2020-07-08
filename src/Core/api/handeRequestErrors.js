import { message } from 'antd';

import ApplicationError from 'Core/api/applicationError';

export default function handleRequestErrors(status, err = {}) {
    const { errorContent = {}, subStatus } = err;
    let errorMessage = '';
    let errorObj = {};
    switch (status) {
        case 400:
            errorMessage = subStatus === 'EmailNotSent'
                ? 'Письмо не отправлено. Попробуйте позже.'
                : 'Неверный формат входных данных.';
            errorObj = {
                ...err,
                status,
                // errorContent: errorContent === null ? {} : errorContent,
            };
            break;
        case 401:
            errorMessage = 'Неверное имя пользователя или пароль.';
            errorObj = {
                ...err,
                status,
            };
            break;
        case 403:
            errorMessage = 'У вас нет прав на этот запрос.';
            errorObj = {
                status,
                subStatus: 'Forbidden',
                errorContent,
            };
            break;
        case 404:
            errorMessage = 'Не найдено';
            errorObj = {
                status,
                subStatus: 'Not found',
                errorContent,
            };
            break;
        case 500:
            errorMessage = 'Что-то пошло не так. Попробуйте позже.';
            errorObj = {
                status,
                subStatus: 'Internal server error',
                errorContent,
            };
            break;
        default:
            errorMessage = 'Что-то пошло не так. Попробуйте позже.';
            errorObj = {
                status,
                subStatus: 'Internal server error',
                errorContent,
            };
            break;
    }

    if (errorMessage) {
        message.error(errorMessage, 5);
    }

    throw new ApplicationError(errorObj);
}
