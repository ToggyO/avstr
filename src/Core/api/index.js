import handleRequestErrors from './handeRequestErrors';

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
