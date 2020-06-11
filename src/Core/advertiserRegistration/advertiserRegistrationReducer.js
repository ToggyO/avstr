import * as actions from './actions';

const initialState = {
    loading: false,
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
        case actions.CONFIRM_ADV_REGISTRATION_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case actions.REGISTER_ADVERTISER_ERROR:
        case actions.CONFIRM_ADV_REGISTRATION_ERROR:
            return {
                ...state,
                loading: false,
                errors: data,
            };
        default:
            return state;
    }
};

export default advertiserRegistrationReducer;
