import { SET_AUTH_ERR_MESSAGE } from './actions';

const initialState = {
    authErrMessage: '',
};

const authorizationReducer = (state = { ...initialState }, { type, data }) => {
    switch (type) {
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
