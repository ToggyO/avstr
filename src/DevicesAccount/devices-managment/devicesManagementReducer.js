import {
    RECEIVE_DEVICES,
    RECEIVE_PAGINATION,
    RECEIVE_GEO_POINTS,
    RECEIVE_DEVICE_STATUS,
} from './actions';


const initialState = {
    pagination: {},
    devices: [],
    geoPoints: [],
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
        case RECEIVE_GEO_POINTS:
            return {
                ...state,
                geoPoints: data,
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
