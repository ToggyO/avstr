import RequestError from './requestError';

export default function handleRequestErrors(status) {
    switch (status) {
        case 400:
            throw new RequestError(`BadRequest (${status})`, 'BadRequest');
        case 401:
            throw new RequestError(`AuthorizationError (${status})`, 'AuthorizationError');
        case 403:
            throw new RequestError(`AccessError (${status})`, 'AccessError');
        case 404:
            throw new RequestError(`NotFoundError (${status})`, 'NotFoundError');
        case 500:
            throw new RequestError(`ServerError (${status})`, 'ServerError');
        default:
            throw new RequestError(`IncorrectStatusCode (${status})`, 'IncorrectStatusCode');
    }
}
