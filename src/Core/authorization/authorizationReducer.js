import * as actions from './actions';
import { LOGIN_REQUEST } from './actions';

const initialState = {
    loading: true,
    loginRequestLoading: false,
    isAuthorized: false,
    userInfo: {},
    errors: {},
    authErrMessage: '',
};

const authorizationReducer = (state = { ...initialState }, { type, data }) => {
    switch (type) {
        case actions.TOGGLE_GLOBAL_LOADING:
            return {
                ...state,
                loading: data,
            };
        case LOGIN_REQUEST:
            return {
                ...state,
                loginRequestLoading: true,
            };
        case actions.SET_AUTHORIZED:
            return {
                ...state,
                isAuthorized: true,
                userInfo: data,
                loginRequestLoading: false,
            };
        case actions.LOGIN_ERROR:
            return {
                ...state,
                errors: data,
                loginRequestLoading: false,
            };
        case actions.SET_AUTH_ERR_MESSAGE:
            return {
                ...state,
                authErrMessage: data,
            };
        case actions.LOGOUT:
            return {
                ...state,
                isAuthorized: false,
                userInfo: {},
            };
        default:
            return state;
    }
};

export default authorizationReducer;
