import {
    RECEIVE_DEVICE_CONTENT,
    CHANGE_ADVERTISING_LOADER_STATUS,
    CHANGE_DEVICE_STATUS_LOADER,
    RECEIVE_MEDIA_STREAM_ID,
    CLEAN_MEDIA_STREAM_ID,
    CHANGE_MEDIA_STREAM_LOADER,
    CHANGE_CURRENT_DEVICE_STATUS,
    RECEIVE_GEO_POINT,
    CLEAN_GEO_POINT,
} from './actions';


const initialState = {
    currentDevice: {
        name: '',
        serialNumber: '',
        isActive: true,
        isRevokeRequired: false,
        isAdvertisementsDisabled: false,
        id: null,
    },
    showAdvertisingLoader: false,
    showDeviceStatusLoader: false,
    mediaStreamId: null,
    showMediaStreamLoader: false,
    currentDeviceStatus: null,
    currentGeoPoint: [],
};


const devicesMonitoringReducer = (state = { ...initialState }, { type, data }) => {
    switch (type) {
        case RECEIVE_DEVICE_CONTENT:
            return {
                ...state,
                currentDevice: data,
            };
        case CHANGE_ADVERTISING_LOADER_STATUS:
            return {
                ...state,
                showAdvertisingLoader: data,
            };
        case CHANGE_DEVICE_STATUS_LOADER:
            return {
                ...state,
                showDeviceStatusLoader: data,
            };

        case RECEIVE_MEDIA_STREAM_ID:
            return {
                ...state,
                mediaStreamId: data,
            };
        case CLEAN_MEDIA_STREAM_ID:
            return {
                ...state,
                mediaStreamId: null,
            };
        case CHANGE_MEDIA_STREAM_LOADER:
            return {
                ...state,
                showMediaStreamLoader: data,
            };
        case CHANGE_CURRENT_DEVICE_STATUS:
            return {
                ...state,
                currentDeviceStatus: data,
            };

        case RECEIVE_GEO_POINT:
            return {
                ...state,
                currentGeoPoint: data,
            };
        case CLEAN_GEO_POINT:
            return {
                ...state,
                currentGeoPoint: [],
            };
        default:
            return state;
    }
};

export default devicesMonitoringReducer;
