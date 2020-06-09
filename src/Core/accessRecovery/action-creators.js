import * as actions from './actions';

export const forgotPasswordRequest = (email) => ({
    type: actions.FORGOT_PASSWORD_REQUEST,
    payload: email,
});

export const restorePasswordRequest = (data) => ({
    type: actions.FORGOT_PASSWORD_REQUEST,
    payload: data,
});
