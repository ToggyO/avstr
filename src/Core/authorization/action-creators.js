import { LOGIN, LOGOUT, SET_AUTH_ERR_MESSAGE } from './actions';


export const login = (data) => ({
    type: LOGIN,
    data,
});

export const logout = (data) => ({
    type: LOGOUT,
    data,
});

export const setErrMessage = (data) => ({
    type: SET_AUTH_ERR_MESSAGE,
    data,
});
