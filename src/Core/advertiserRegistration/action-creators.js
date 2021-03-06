import * as actions from './actions';

export const registerAdvertiser = (data) => ({
    type: actions.REGISTER_ADVERTISER,
    data,
});

export const confirmAdRegistration = (data) => ({
    type: actions.CONFIRM_ADV_REGISTRATION,
    data,
});

export const cleanError = () => ({
    type: actions.CLEAN_ERROR,
});

export const setDefaultState = () => ({
    type: actions.SET_DEFAULT_STATE,
});
