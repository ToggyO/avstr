// TODO(Негодов Никита): с после errors в редьюсере нет необходимости в обратке ошибок внутри клиента fetch
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
            const error = await res.json();
            handleRequestErrors(status, error);
        }
    } catch (err) {
        if (err.type === 'BadRequest') throw err;
        handleRequestErrors(status, err);
    }
    return result;
}

export default sendRequest;
