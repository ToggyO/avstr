import { RECEIVE_DEVICES, RECEIVE_DEVICE_STATUS, RECEIVE_DEVICE_SERIAL } from './actions';


const initialState = {
    devices: [],
    lastDeviceSerialNumber: null,
    isLastDeviceRegistered: null,
};


const devicesManagementReducer = (state = { ...initialState }, { type, data }) => {
    switch (type) {
        case RECEIVE_DEVICES:
            return {
                ...state,
                devices: data,
            };
        case RECEIVE_DEVICE_STATUS:
            return {
                ...state,
                isLastDeviceRegistered: data,
            };
        case RECEIVE_DEVICE_SERIAL:
            return {
                ...state,
                isLastDeviceRegistered: data,
            };
        default:
            return state;
    }
};

export default devicesManagementReducer;
