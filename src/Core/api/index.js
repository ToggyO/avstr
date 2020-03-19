import sendRequest from './sendRequest';

const headers = {
    'Content-Type': 'application/json;charset=utf-8',
};

const constantHeader = {};

const api = {
    get(url, options) {
        return sendRequest(
            url,
            {
                headers: {
                    ...constantHeader,
                },
                ...options,
            },
            200,
        );
    },

    post(url, body, options) {
        const defaultOptions = {
            method: 'POST',
            headers: {
                ...headers,
            },
            body: JSON.stringify(body),
        };


        // eslint-disable-next-line no-restricted-syntax
        for (const prop in constantHeader) {
            if (Object.prototype.hasOwnProperty.call(constantHeader, prop)) {
                Object.defineProperty(defaultOptions.headers, prop, { value: constantHeader[prop] });
            }
        }

        return sendRequest(
            url,
            {
                ...defaultOptions,
                ...options,
            },
            [200, 201],
        );
    },

    put(url, body, options) {
        return sendRequest(url, {
            method: 'PUT',
            headers: {
                ...headers,
                ...constantHeader,
            },
            body: JSON.stringify(body),
            ...options,
        }, 200);
    },

    delete(url, options) {
        return sendRequest(url, {
            method: 'DELETE',
            headers: {
                ...headers,
                ...constantHeader,
            },
            ...options,
        }, 204);
    },

    setConstantHeader(name, value) {
        alert(name, value);
        constantHeader[name] = value;
    },
};

export default api;
