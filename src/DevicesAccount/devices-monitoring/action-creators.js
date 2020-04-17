import {
    REQUEST_DEVICE_CONTENT,
    RECEIVE_DEVICE_CONTENT,
    TOGGLE_ADVERTISING_ON_DEVICE,
    CHANGE_ADVERTISING_LOADER_STATUS,
    TOGGLE_DEVICE_STATUS,
    CHANGE_DEVICE_STATUS_LOADER,
    REQUEST_MEDIA_STREAM_OPTIONS,
    RECEIVE_MEDIA_STREAM_OPTIONS,
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


export const requestMediaStreamOptions = (data) => ({
    type: REQUEST_MEDIA_STREAM_OPTIONS,
    data,
});
export const receiveMediaStreamOptions = (data) => ({
    type: RECEIVE_MEDIA_STREAM_OPTIONS,
    data,
});
