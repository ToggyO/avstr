function configureXHR(url, options, responseType) {
    const { method, headers } = options;
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.responseType = responseType;

    Object.keys(headers).forEach((header) => {
        xhr.setRequestHeader(header, headers[header]);
    });

    return xhr;
}

export default configureXHR;
