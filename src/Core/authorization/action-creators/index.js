import { LOGIN, RECEIVE_REDIRECT_URL, SET_AUTH_ERR_MESSAGE } from '../actions';


export const login = (data) => ({
    type: LOGIN,
    data,
});

export const receiveRedirectUrl = (data) => ({
    type: RECEIVE_REDIRECT_URL,
    data,
});

export const setErrMessage = (data) => ({
    type: SET_AUTH_ERR_MESSAGE,
    data,
});
