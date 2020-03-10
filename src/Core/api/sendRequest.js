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
            handleRequestErrors(status);
        }
    } catch (err) {
        handleRequestErrors(status);
    }
    return result;
}

export default sendRequest;
