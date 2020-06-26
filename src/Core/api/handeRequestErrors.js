// TODO(Негодов Никита): результаты данной функции возможно отправлять в форму. Но, нужно переработать функция
//  чтобы возвращала в нужном для формы формате (Олег)
import { message } from 'antd';

import RequestError from './requestError';

export default function handleRequestErrors(status, err) {
    const { errorContent } = err;
    switch (status) {
        case 400:
            message.error('Неверный формат входных данных.', 5);
            throw new RequestError(`BadRequest (${status})`, 'BadRequest', errorContent);
        case 401:
            throw new RequestError(`AuthorizationError (${status})`, 'AuthorizationError', errorContent);
        case 403:
            message.error('У вас нет прав на этот запрос', 5);
            throw new RequestError(`AccessError (${status})`, 'AccessError', errorContent);
        case 404:
            message.error('Не найдено', 5);
            throw new RequestError(`NotFoundError (${status})`, 'NotFoundError', errorContent);
        case 500:
            message.error('Что-то пошло не так. Попробуйте позже.', 5);
            throw new RequestError(`ServerError (${status})`, 'ServerError', errorContent);
        default:
            message.error('Что-то пошло не так. Попробуйте позже.', 5);
            throw new RequestError(`IncorrectStatusCode (${status})`, 'IncorrectStatusCode', errorContent);
    }
}
