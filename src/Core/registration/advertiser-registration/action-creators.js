import {
    REGISTER_ADVERTISER,
    CHANGE_REGISTER_LOADER,
    CONFIRM_ADVERTISER_REGISTRATION,
} from './actions';


export const registerAdvertiser = (data) => ({
    type: REGISTER_ADVERTISER,
    data,
});
export const changeRegisterLoader = (data) => ({
    type: CHANGE_REGISTER_LOADER,
    data,
});


export const confirmAdvertiserRegistration = (data) => ({
    type: CONFIRM_ADVERTISER_REGISTRATION,
    data,
});
