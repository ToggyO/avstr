import {
    REQUEST_DEVICE_CONTENT,
    RECEIVE_DEVICE_CONTENT,
    START_ADVERTISING,
    STOP_ADVERTISING,
    CHANGE_ADVERTISING_LOADER_STATUS,
    ACTIVATE_DEVICE,
    DEACTIVATE_DEVICE,
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


export const startAdvertising = (data) => ({
    type: START_ADVERTISING,
    data,
});
export const stopAdvertising = (data) => ({
    type: STOP_ADVERTISING,
    data,
});
export const changeAdvertisingLoaderStatus = (data) => ({
    type: CHANGE_ADVERTISING_LOADER_STATUS,
    data,
});


export const activateDevice = (data) => ({
    type: ACTIVATE_DEVICE,
    data,
});
export const deactivateDevice = (data) => ({
    type: DEACTIVATE_DEVICE,
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
