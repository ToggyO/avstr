import * as actions from './actions';

export const forgotPasswordRequest = (email) => ({
    type: actions.FORGOT_PASSWORD_REQUEST,
    data: email,
});

export const restorePasswordRequest = (data) => ({
    type: actions.RESTORE_PASSWORD_REQUEST,
    data,
});

export const recoveryClearErrors = () => ({
    type: actions.RECOVERY_CLEAR_ERRORS,
});
