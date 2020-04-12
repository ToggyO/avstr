import {
    REQUEST_DEVICES,
    RECEIVE_DEVICES,
    RECEIVE_PAGINATION,
    REQUEST_GEO_POINTS,
    RECEIVE_GEO_POINTS,
    REGISTER_DEVICE,
    RECEIVE_DEVICE_STATUS,
    CANCEL_DEVICE_REGISTRATION,
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

export const requestGeoPoints = (data) => ({
    type: REQUEST_GEO_POINTS,
    data,
});

export const receiveGeoPoints = (data) => ({
    type: RECEIVE_GEO_POINTS,
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

export const cancelDeviceRegistration = (data) => ({
    type: CANCEL_DEVICE_REGISTRATION,
    data,
});
