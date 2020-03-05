import AuthorizationError from './errors/authorization-error';
import RequestError from './errors/request-error';
import AccessError from './errors/access-error';
import NotFoundError from './errors/not-found-error';
import ServerError from './errors/server-error';
import RequestCodeError from './errors/request-code-error';

function handleRequestErrors(status) {
    switch (status) {
        case 400:
            throw new RequestError(status);
        case 401:
            throw new AuthorizationError(status);
        case 403:
            throw new AccessError(status);
        case 404:
            throw new NotFoundError(status);
        case 500:
            throw new ServerError(status);
        default:
            throw new RequestCodeError(status);
    }
}

async function sendRequest(url, options, successCode) {
    const res = await fetch(url, options);
    const { status } = res;
    let result;

    try {
        if (status === 204) return null;

        let successFlag;
        if (Array.isArray(successCode)) {
            successFlag = successCode.includes(status);
        } else {
            successFlag = status === successCode;
        }

        if (successFlag) {
            result = await res.json();
        } else {
            handleRequestErrors(status);
        }
    } catch (err) {
        handleRequestErrors(status);
    }
    return result;
}

const api = {
    get(url) {
        return sendRequest(url, {}, 200);
    },

    post(url, body) {
        return sendRequest(
            url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(body),
            },
            [200, 201],
        );
    },

    put(url, body) {
        return sendRequest(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(body),
        }, 200);
    },

    delete(url) {
        return sendRequest(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        }, 204);
    },
};

export default api;
