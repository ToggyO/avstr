import {
    REQUEST_DEVICE_CONTENT,
    RECEIVE_DEVICE_CONTENT,
    TOGGLE_ADVERTISING_ON_DEVICE,
    // TOGGLE_DEVICE_STATUS
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


/* export const toggleDeviceStatus = (data) => ({
    type: TOGGLE_DEVICE_STATUS,
    data,
}); */
