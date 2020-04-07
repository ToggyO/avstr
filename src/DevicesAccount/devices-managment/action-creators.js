import {
    REQUEST_DEVICES,
    RECEIVE_DEVICES,
    REGISTER_DEVICE,
    RECEIVE_DEVICE_STATUS,
    RECEIVE_DEVICE_SERIAL,
} from './actions';


export const requestDevices = (data) => ({
    type: REQUEST_DEVICES,
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

export const receiveDeviceStatus = (data) => ({
    type: RECEIVE_DEVICE_STATUS,
    data,
});

export const receiveDeviceSerial = (data) => ({
    type: RECEIVE_DEVICE_SERIAL,
    data,
});
