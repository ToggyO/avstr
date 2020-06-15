import * as actions from './actions';


export const registerAdvertiser = (data) => ({
    type: actions.REGISTER_ADVERTISER,
    data,
});

export const confirmAdRegistration = (data) => ({
    type: actions.CONFIRM_ADV_REGISTRATION,
    data,
});
