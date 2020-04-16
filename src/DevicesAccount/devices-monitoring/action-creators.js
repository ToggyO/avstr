import {
    REQUEST_DEVICE_CONTENT,
    RECEIVE_DEVICE_CONTENT,
    // TOGGLE_SHOW_ADVERTISEMENTS,
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


/* export const toggleShowAdvertisements = (data) => ({
    type: TOGGLE_SHOW_ADVERTISEMENTS,
    data,
}); */


/* export const toggleDeviceStatus = (data) => ({
    type: TOGGLE_DEVICE_STATUS,
    data,
}); */
