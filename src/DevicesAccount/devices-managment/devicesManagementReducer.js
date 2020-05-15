import {
    RECEIVE_DEVICES,
    RECEIVE_PAGINATION,
    CHANGE_DEVICE_STATUS,
    RECEIVE_ALL_GEO_POINTS,
} from './actions';


const initialState = {
    pagination: {},
    devices: [],
    allGeoPoints: [],
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
        case RECEIVE_ALL_GEO_POINTS:
            return {
                ...state,
                allGeoPoints: data,
            };
        default:
            return state;
    }
};

export default devicesManagementReducer;
