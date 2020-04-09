import {
    REQUEST_DEVICES,
    RECEIVE_DEVICES,
    RECEIVE_PAGINATION,
    REGISTER_DEVICE,
    RECEIVE_DEVICE_STATUS,
    RECEIVE_DEVICE_SERIAL,
} from './actions';


export const requestDevices = (data) => ({
    type: REQUEST_DEVICES,
    data,
});

export const receivePagination = (data) => ({
    type: RECEIVE_PAGINATION,
    data,
});

export const receiveDevices = (data) => ({
    type: RECEIVE_DEVICES,
    data,
});


export const registerDevice = (data) => ({
    type: REGISTER_DEVICE,
    data,
});

export const changeDeviceStatus = (data) => ({
    type: RECEIVE_DEVICE_STATUS,
    data,
});

export const receiveDeviceSerial = (data) => ({
    type: RECEIVE_DEVICE_SERIAL,
    data,
});
