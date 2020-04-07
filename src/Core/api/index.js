import sendRequest from './sendRequest';
import configureXHR from './configureXHR';

const headers = {
    'Content-Type': 'application/json;charset=utf-8',
};
const constantHeaders = {};
const defineConstantHeaders = (defaultOptions) => {
    const options = { ...defaultOptions };
    const oldHeaders = options.headers;

    Object.keys(constantHeaders).forEach((header) => {
        options.headers = {
            ...oldHeaders,
            [header]: constantHeaders[header],
        };
    });
    return options;
};

const api = {
    get(url, options) {
        const defaultOptions = {
            headers,
            ...options,
        };

        const opt = defineConstantHeaders(defaultOptions);

        return sendRequest(
            url,
            opt,
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
        console.log(headers);
        const opt = defineConstantHeaders(defaultOptions);

        return sendRequest(
            url,
            opt,
            [200, 201],
        );
    },

    configurePostFile(url, responseType) {
        const defaultOptions = {
            method: 'POST',
            headers: {},
        };

        const options = defineConstantHeaders(defaultOptions);

        return configureXHR(url, options, responseType);
    },

    put(url, body, options) {
        const defaultOptions = {
            method: 'PUT',
            headers,
            body: JSON.stringify(body),
            ...options,
        };

        const opt = defineConstantHeaders(defaultOptions);

        return sendRequest(
            url,
            opt,
            200,
        );
    },

    delete(url, options) {
        const defaultOptions = {
            method: 'DELETE',
            headers,
            ...options,
        };

        const opt = defineConstantHeaders(defaultOptions);

        return sendRequest(
            url,
            opt,
            204,
        );
    },

    setConstantHeader(name, value) {
        constantHeaders[name] = value;
    },
};

export default api;
