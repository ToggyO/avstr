import { CHANGE_REGISTER_LOADER } from './actions';

const initialState = {
    showRegisterLoader: false,
};

const advertiserRegistrationReducer = (state = { ...initialState }, { type, data }) => {
    switch (type) {
        case CHANGE_REGISTER_LOADER:
            return {
                ...state,
                showRegisterLoader: data,
            };
        default:
            return state;
    }
};

export default advertiserRegistrationReducer;
