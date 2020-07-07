import * as actions from './actions';

const initialState = {
    loading: false,
    isRegisterReqSuccess: false,
    isConfirmSuccess: false,
    errors: {},
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
            return {
                ...state,
                loading: false,
                isRegisterReqSuccess: false,
                errors: data,
            };
        case actions.CONFIRM_ADV_REGISTRATION_ERROR:
            return {
                ...state,
                loading: false,
                isConfirmSuccess: false,
            };
        case actions.SET_DEFAULT_STATE:
            return initialState;
        case actions.CLEAN_ERROR:
            return {
                ...state,
                errors: {},
            };
        default:
            return state;
    }
};

export default advertiserRegistrationReducer;
