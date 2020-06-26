// TODO(Негодов Никита): результаты данной функции возможно отправлять в форму. Но, нужно переработать функция
//  чтобы возвращала в нужном для формы формате (Олег)
import { message } from 'antd';

import ApplicationError from 'Core/api/applicationError';
import RequestError from './requestError';

export default function handleRequestErrors(status, err) {
    const { errorContent } = err;
    switch (status) {
        case 400:
            message.error('Неверный формат входных данных.', 5);
            // throw new RequestError(`BadRequest (${status})`, 'BadRequest', errorContent);
            throw new ApplicationError({
                ...err,
                status,
            });
        case 401:
            throw new RequestError(`AuthorizationError (${status})`, 'AuthorizationError', errorContent);
        case 403:
            message.error('У вас нет прав на этот запрос', 5);
            throw new ApplicationError({
                status: 403,
                subStatus: 'Forbidden',
                errorContent,
            });
        case 404:
            message.error('Не найдено', 5);
            throw new RequestError(`NotFoundError (${status})`, 'NotFoundError', errorContent);
        case 500:
            message.error('Что-то пошло не так. Попробуйте позже.', 5);
            throw new ApplicationError({
                status: 500,
                subStatus: 'Internal server error',
                errorContent: {},
            });
        default:
            message.error('Что-то пошло не так. Попробуйте позже.', 5);
            throw new RequestError(`IncorrectStatusCode (${status})`, 'IncorrectStatusCode', errorContent);
    }
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
