import {
    RECEIVE_DEVICES,
    RECEIVE_PAGINATION,
    CHANGE_DEVICE_STATUS,
    RECEIVE_ALL_GEO_POINTS,
    CHANGE_FIELDS_CLEAN_NEEDED_FLAG, REQUEST_DEVICES,
    RECEIVE_DEVICES_ERROR,
} from './actions';

const initialState = {
    pagination: {},
    devices: [],
    allGeoPoints: [],
    lastDeviceStatus: '',
    isFieldsCleanNeeded: false,
    loading: false,
};

const devicesManagementReducer = (state = { ...initialState }, { type, data }) => {
    switch (type) {
        case REQUEST_DEVICES:
            return {
                ...state,
                loading: true,
            };
        case RECEIVE_PAGINATION:
            return {
                ...state,
                pagination: data,
            };

        case RECEIVE_DEVICES:
            return {
                ...state,
                devices: data,
                loading: false,
            };
        case CHANGE_DEVICE_STATUS:
            return {
                ...state,
                lastDeviceStatus: data,
            };

        case CHANGE_FIELDS_CLEAN_NEEDED_FLAG:
            return {
                ...state,
                isFieldsCleanNeeded: data,
            };

        case RECEIVE_ALL_GEO_POINTS:
            return {
                ...state,
                allGeoPoints: data,
            };
        case RECEIVE_DEVICES_ERROR:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default devicesManagementReducer;
