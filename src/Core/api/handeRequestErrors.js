import { message } from 'antd';

import ApplicationError from 'Core/api/applicationError';

export default function handleRequestErrors(status, err) {
    const { errorContent } = err;
    let errorMessage = '';
    let errorObj = {};
    switch (status) {
        case 400:
            errorMessage = 'Неверный формат входных данных.';
            errorObj = {
                ...err,
                status,
            };
            break;
        case 401:
            errorMessage = 'Неверное имя пользователя или пароль';
            errorObj = {
                ...err,
                status,
            };
            break;
        case 403:
            errorMessage = 'У вас нет прав на этот запрос';
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

// export default function handleRequestErrors(status, err) {
//     const { errorContent } = err;
//     switch (status) {
//         case 400:
//             message.error('Неверный формат входных данных.', 5);
//             throw new RequestError(`BadRequest (${status})`, 'BadRequest', errorContent);
//         case 401:
//             throw new RequestError(`AuthorizationError (${status})`, 'AuthorizationError', errorContent);
//         case 403:
//             message.error('У вас нет прав на этот запрос', 5);
//             // throw new RequestError(`AccessError (${status})`, 'AccessError', errorContent);
//             throw new ApplicationError({
//                 status: 403,
//                 subStatus: 'Forbidden',
//                 errorContent: {},
//             });
//         case 404:
//             message.error('Не найдено', 5);
//             throw new RequestError(`NotFoundError (${status})`, 'NotFoundError', errorContent);
//         case 500:
//             message.error('Что-то пошло не так. Попробуйте позже.', 5);
//             throw new RequestError(`ServerError (${status})`, 'ServerError', errorContent);
//         default:
//             message.error('Что-то пошло не так. Попробуйте позже.', 5);
//             throw new RequestError(`IncorrectStatusCode (${status})`, 'IncorrectStatusCode', errorContent);
//     }
// }
