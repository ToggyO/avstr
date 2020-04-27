import {
    REQUEST_DEVICE_CONTENT,
    RECEIVE_DEVICE_CONTENT,
    TOGGLE_ADVERTISING_ON_DEVICE,
    CHANGE_ADVERTISING_LOADER_STATUS,
    TOGGLE_DEVICE_STATUS,
    CHANGE_DEVICE_STATUS_LOADER,
    START_MEDIA_STREAM,
    RECEIVE_MEDIA_STREAM_ID,
    CLEAN_MEDIA_STREAM_ID,
    CHANGE_MEDIA_STREAM_LOADER,
    CANCEL_MEDIA_STREAM,
    CHANGE_CURRENT_DEVICE_STATUS,
} from './actions';


export const requestDeviceContent = (data) => ({
    type: REQUEST_DEVICE_CONTENT,
    data,
});
export const receiveDeviceContent = (data) => ({
    type: RECEIVE_DEVICE_CONTENT,
    data,
});


export const toggleAdvertisingOnDevice = (data) => ({
    type: TOGGLE_ADVERTISING_ON_DEVICE,
    data,
});
export const changeAdvertisingLoaderStatus = (data) => ({
    type: CHANGE_ADVERTISING_LOADER_STATUS,
    data,
});


export const toggleDeviceStatus = (data) => ({
    type: TOGGLE_DEVICE_STATUS,
    data,
});
export const changeDeviceStatusLoader = (data) => ({
    type: CHANGE_DEVICE_STATUS_LOADER,
    data,
});


export const startMediaStream = (data) => ({
    type: START_MEDIA_STREAM,
    data,
});
export const receiveMediaStreamId = (data) => ({
    type: RECEIVE_MEDIA_STREAM_ID,
    data,
});
export const cleanMediaStreamId = () => ({
    type: CLEAN_MEDIA_STREAM_ID,
});
export const cancelMediaStream = (data) => ({
    type: CANCEL_MEDIA_STREAM,
    data,
});

export const changeMediaStreamLoader = (data) => ({
    type: CHANGE_MEDIA_STREAM_LOADER,
    data,
});
export const changeCurrentDeviceStatus = (data) => ({
    type: CHANGE_CURRENT_DEVICE_STATUS,
    data,
});