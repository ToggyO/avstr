import { LOGIN, RECEIVE_REDIRECT_URL } from '../actions';


export const login = (data) => ({
    type: LOGIN,
    data,
});

export const receiveRedirectUrl = (data) => ({
    type: RECEIVE_REDIRECT_URL,
    data,
});
