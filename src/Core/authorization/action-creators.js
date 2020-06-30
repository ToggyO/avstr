import * as actions from './actions';

export const toggleGlobalLoading = (payload) => ({
    type: actions.TOGGLE_GLOBAL_LOADING,
    data: payload,
});

export const setAuthorized = (data) => ({
    type: actions.SET_AUTHORIZED,
    data,
});

export const login = (data) => ({
    type: actions.LOGIN_REQUEST,
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

export const authClearErrors = () => ({
    type: actions.CLEAR_ERRORS,
});
