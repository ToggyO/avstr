import RequestError from './requestError';

export default function handleRequestErrors(status, err) {
    const { errorContent } = err;
    console.log(errorContent);
    switch (status) {
        case 400:
            throw new RequestError(`BadRequest (${status})`, 'BadRequest', errorContent);
        case 401:
            throw new RequestError(`AuthorizationError (${status})`, 'AuthorizationError', errorContent);
        case 403:
            throw new RequestError(`AccessError (${status})`, 'AccessError', errorContent);
        case 404:
            throw new RequestError(`NotFoundError (${status})`, 'NotFoundError', errorContent);
        case 500:
            throw new RequestError(`ServerError (${status})`, 'ServerError', errorContent);
        default:
            throw new RequestError(`IncorrectStatusCode (${status})`, 'IncorrectStatusCode', errorContent);
    }
}
