function configureXHR(url, options, responseType) {
    const { method, headers } = options;
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    // xhr.responseType = 'json';
    xhr.responseType = responseType;

    // eslint-disable-next-line no-restricted-syntax
    for (const header in headers) {
        if ({}.hasOwnProperty.call(headers, header)) {
            xhr.setRequestHeader(header, options.headers[header]);
        }
    }
    return xhr;
}

export default configureXHR;
