import sendRequest from './sendRequest';

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
