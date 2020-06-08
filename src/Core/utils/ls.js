/* eslint-disable no-useless-catch */
const { REACT_APP_PREFIX } = process.env;
console.log(REACT_APP_PREFIX);
export function writeToLocalState(key, state) {
    try {
        localStorage.setItem(`${REACT_APP_PREFIX}_${key}`, JSON.stringify(state));
    } catch (e) {
        throw e;
    }
}

export function getFromLocalState(key) {
    let state;

    try {
        state = JSON.parse(localStorage.getItem(`${REACT_APP_PREFIX}_${key}`));
    } catch (e) {
        throw e;
    }

    return state;
}

export function clearLocalState(key) {
    try {
        localStorage.removeItem(`${REACT_APP_PREFIX}_${key}`);
    } catch (e) {
        throw e;
    }
}
