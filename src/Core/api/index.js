import sendRequest from './sendRequest';

const headers = {
    'Content-Type': 'application/json;charset=utf-8',
};
const constantHeader = {};
const defineConstantHeaders = (defaultOptions) => {
    const options = { ...defaultOptions };
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const prop in constantHeader) {
        options.headers = {
            [prop]: constantHeader[prop],
        };
    }
    return options;
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

        const opt = defineConstantHeaders(defaultOptions);

        return sendRequest(
            url,
            opt,
            [200, 201],
        );
    },

    postFile(url, body) {
        const defaultOptions = {
            method: 'POST',
            headers: {
                Authorization: '',
            },
            body,
        };

        const options = defineConstantHeaders(defaultOptions);

        return sendRequest(
            url,
            options,
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
