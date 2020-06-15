import * as actions from './actions';

export const setAuthorized = (data) => ({
    type: actions.SET_AUTHORIZED,
    data,
});

export const login = (data) => ({
    type: actions.LOGIN,
    data,
});

export const logout = (data) => ({
    type: actions.LOGOUT,
    data,
});

export const setErrMessage = (data) => ({
    type: actions.SET_AUTH_ERR_MESSAGE,
    data,
});
