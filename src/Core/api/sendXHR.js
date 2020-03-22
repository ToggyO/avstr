import handleRequestErrors from './handeRequestErrors';


function sendXHR(url, options) {
    const { body, method, headers } = options;
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.responseType = 'json';


    // eslint-disable-next-line no-restricted-syntax
    for (const header in headers) {
        if ({}.hasOwnProperty.call(headers, header)) {
            xhr.setRequestHeader(header, options.headers[header]);
        }
    }

    try {
        xhr.upload.onprogress = ({ loaded, total }) => {
            console.log(`Отправлено ${loaded} из ${total}`);
        };

        xhr.onloadend = () => {
            const { status } = xhr;
            if (status === 201) {
                console.log('Отправлено успешно!');
            } else {
                console.log('Ошибка при отправке');
            }
        };
        xhr.send(body);
    } catch (err) {
        handleRequestErrors(xhr.status);
    }
}

export default sendXHR;
