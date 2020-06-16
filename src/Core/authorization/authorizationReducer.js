import * as actions from './actions';
import { getFromLocalState } from '../utils/local-storage';

const initialState = {
    loading: true,
    isAuthorized: false,
    tokens: getFromLocalState('userInfo') || {},
    authErrMessage: '',
};

const authorizationReducer = (state = { ...initialState }, { type, data }) => {
    switch (type) {
        case actions.TOGGLE_GLOBAL_LOADING:
            return {
                ...state,
                loading: data,
            };
        case actions.SET_AUTHORIZED:
            return {
                ...state,
                isAuthorized: data,
            };
        case actions.SET_AUTH_ERR_MESSAGE:
            return {
                ...state,
                authErrMessage: data,
            };
        default:
            return state;
    }
};

export default authorizationReducer;
