import { RECEIVE_DEVICES } from './actions';


const initialState = {
    devices: [],
};


const devicesManagementReducer = (state = { ...initialState }, { type, data }) => {
    switch (type) {
        case RECEIVE_DEVICES:
            return {
                ...state,
                devices: data,
            };
        default:
            return state;
    }
};

export default devicesManagementReducer;
