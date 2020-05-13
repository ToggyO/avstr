import {
    RECEIVE_DEVICES,
    RECEIVE_PAGINATION,
    CHANGE_DEVICE_STATUS,
} from './actions';


const initialState = {
    pagination: {},
    devices: [],
    geoPoints: [],
    lastDeviceStatus: '',
};


const devicesManagementReducer = (state = { ...initialState }, { type, data }) => {
    switch (type) {
        case RECEIVE_PAGINATION:
            return {
                ...state,
                pagination: data,
            };
        case RECEIVE_DEVICES:
            return {
                ...state,
                devices: data,
            };
        case CHANGE_DEVICE_STATUS:
            return {
                ...state,
                lastDeviceStatus: data,
            };
        default:
            return state;
    }
};

export default devicesManagementReducer;
