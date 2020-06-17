import * as actions from './actions';

const initialState = {
    loading: false,
    isRegisterReqSuccess: false,
    isConfirmSuccess: false,
    error: null,
};

const advertiserRegistrationReducer = (state = { ...initialState }, { type, data }) => {
    switch (type) {
        case actions.REGISTER_ADVERTISER:
        case actions.CONFIRM_ADV_REGISTRATION:
            return {
                ...state,
                loading: true,
            };
        case actions.REGISTER_ADVERTISER_SUCCESS:
            return {
                ...state,
                loading: false,
                isRegisterReqSuccess: true,
            };
        case actions.CONFIRM_ADV_REGISTRATION_SUCCESS:
            return {
                ...state,
                loading: false,
                isConfirmSuccess: true,
            };
        case actions.REGISTER_ADVERTISER_ERROR:
        case actions.CONFIRM_ADV_REGISTRATION_ERROR:
            return {
                ...state,
                loading: false,
                error: data,
            };
        case actions.CLEAN_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export default advertiserRegistrationReducer;
