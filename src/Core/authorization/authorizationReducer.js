import * as actions from './actions';

const initialState = {
    isAuthorized: false,
    authErrMessage: '',
};

const authorizationReducer = (state = { ...initialState }, { type, data }) => {
    switch (type) {
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
