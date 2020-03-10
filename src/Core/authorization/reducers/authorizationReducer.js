import { RECEIVE_REDIRECT_URL } from '../actions';

const initialState = {
    redirectUrl: '',
};

const authorizationReducer = (state = { ...initialState }, { type, data }) => {
    switch (type) {
        case RECEIVE_REDIRECT_URL:
            return {
                ...state,
                redirectUrl: data,
            };
        default:
            return state;
    }
};

export default authorizationReducer;
