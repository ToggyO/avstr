import {
    RECEIVE_DEVICES,
    RECEIVE_PAGINATION,
    RECEIVE_DEVICE_STATUS,
    RECEIVE_DEVICE_SERIAL,
} from './actions';


const initialState = {
    pagination: {},
    devices: [],
    lastDeviceStatus: '',
    lastDeviceSerialNumber: '',
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
        case RECEIVE_DEVICE_STATUS:
            return {
                ...state,
                lastDeviceStatus: data,
            };
        case RECEIVE_DEVICE_SERIAL:
            return {
                ...state,
                lastDeviceSerialNumber: data,
            };
        default:
            return state;
    }
};

export default devicesManagementReducer;
