import {
    RECEIVE_DEVICE_CONTENT,
    CHANGE_ADVERTISING_LOADER_STATUS,
    CHANGE_DEVICE_STATUS_LOADER,
    RECEIVE_MEDIA_STREAM_OPTIONS,
    RECEIVE_MEDIA_STREAM,
} from './actions';


const initialState = {
    currentDevice: {
        name: '',
        serialNumber: '',
        isActive: true,
        isAdvertisementsDisabled: false,
        id: null,
    },
    showAdvertisingLoader: false,
    showDeviceStatusLoader: false,
    mediaStreamOptions: '',
    mediaStream: null,
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
        case RECEIVE_MEDIA_STREAM_OPTIONS:
            return {
                ...state,
                mediaStreamOptions: data,
            };
        case RECEIVE_MEDIA_STREAM:
            return {
                ...state,
                mediaStream: data,
            };
        default:
            return state;
    }
};

export default devicesMonitoringReducer;
