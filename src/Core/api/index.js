import sendRequest from './sendRequest';

const api = {
    get(url, options) {
        return sendRequest(url, { ...options }, 200);
    },

    post(url, body, options) {
        return sendRequest(
            url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(body),
                ...options,
            },
            [200, 201],
        );
    },

    put(url, body, options) {
        return sendRequest(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(body),
            ...options,
        }, 200);
    },

    delete(url, options) {
        return sendRequest(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            ...options,
        }, 204);
    },
};

export default api;
