import { RECEIVE_DEVICES, RECEIVE_DEVICE_STATUS, RECEIVE_DEVICE_SERIAL } from './actions';


const initialState = {
    devices: [],
    lastDeviceSerialNumber: '',
    lastDeviceStatus: '',
};


const devicesManagementReducer = (state = { ...initialState }, { type, data }) => {
    switch (type) {
        case RECEIVE_DEVICES:
            return {
                ...state,
                devices: data,
            };
        case RECEIVE_DEVICE_SERIAL:
            return {
                ...state,
                lastDeviceSerialNumber: data,
            };
        case RECEIVE_DEVICE_STATUS:
            return {
                ...state,
                lastDeviceStatus: data,
            };
        default:
            return state;
    }
};

export default devicesManagementReducer;
