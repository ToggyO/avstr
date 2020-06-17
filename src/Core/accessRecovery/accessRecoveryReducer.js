import * as actions from './actions';

const initialState = {
    loading: false,
    errors: [],
};

const reducer = (state = { ...initialState }, { type, payload }) => {
    switch (type) {
        case actions.FORGOT_PASSWORD_REQUEST:
        case actions.RESTORE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actions.FORGOT_PASSWORD_SUCCESS:
        case actions.RESTORE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case actions.FORGOT_PASSWORD_ERROR:
        case actions.RESTORE_PASSWORD_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload,
            };
        case actions.RECOVERY_CLEAR_ERRORS:
            return {
                ...state,
                errors: [],
            };
        default:
            return state;
    }
};

export default reducer;
