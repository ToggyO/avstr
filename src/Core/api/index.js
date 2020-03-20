import sendRequest from './sendRequest';

const headers = {
    'Content-Type': 'application/json;charset=utf-8',
};
const constantHeader = {};
const defineConstantHeaders = (defaultOptions) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const prop in constantHeader) {
        if (Object.prototype.hasOwnProperty.call(constantHeader, prop)) {
            Object.defineProperty(defaultOptions.headers, prop, { value: constantHeader[prop] });
        }
    }
};

const api = {
    get(url, options) {
        const defaultOptions = {
            headers,
            ...options,
        };

        defineConstantHeaders(defaultOptions);

        return sendRequest(
            url,
            defaultOptions,
            200,
        );
    },

    post(url, body, options) {
        const defaultOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
            ...options,
        };

        defineConstantHeaders(defaultOptions);

        return sendRequest(
            url,
            defaultOptions,
            [200, 201],
        );
    },

    postFile(url, body) {
        const defaultOptions = {
            method: 'POST',
            headers: {},
            body,
            // credentials: 'include',
        };

        defineConstantHeaders(defaultOptions);

        return sendRequest(
            url,
            defaultOptions,
            [200, 201],
        );
    },

    put(url, body, options) {
        const defaultOptions = {
            method: 'PUT',
            headers,
            body: JSON.stringify(body),
            ...options,
        };

        defineConstantHeaders(defaultOptions);

        return sendRequest(
            url,
            defaultOptions,
            200,
        );
    },

    delete(url, options) {
        const defaultOptions = {
            method: 'DELETE',
            headers,
            ...options,
        };

        defineConstantHeaders(defaultOptions);

        return sendRequest(
            url,
            defaultOptions,
            204,
        );
    },

    setConstantHeader(name, value) {
        constantHeader[name] = value;
    },
};

export default api;
