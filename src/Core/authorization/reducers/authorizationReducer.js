import { RECEIVE_REDIRECT_URL, SET_AUTH_ERR_MESSAGE } from '../actions';

const initialState = {
    redirectUrl: '',
    authErrMessage: '',
};

const authorizationReducer = (state = { ...initialState }, { type, data }) => {
    switch (type) {
        case RECEIVE_REDIRECT_URL:
            return {
                ...state,
                redirectUrl: data,
            };
        case SET_AUTH_ERR_MESSAGE:
            return {
                ...state,
                authErrMessage: data,
            };
        default:
            return state;
    }
};

export default authorizationReducer;
