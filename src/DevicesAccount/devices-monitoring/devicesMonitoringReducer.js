import {
    RECEIVE_DEVICE_CONTENT,
    CHANGE_ADVERTISING_LOADER_STATUS,
    CHANGE_DEVICE_STATUS_LOADER,
    RECEIVE_MEDIA_STREAM_ID,
    CHANGE_TRANSLATION_SHOWING,
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
    mediaStreamId: null,
    isTranslationShowing: false,
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
        case CHANGE_TRANSLATION_SHOWING:
            return {
                ...state,
                isTranslationShowing: data,
            };
        default:
            return state;
    }
};

export default devicesMonitoringReducer;
