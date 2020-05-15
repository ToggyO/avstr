import {
    REQUEST_DEVICES,
    RECEIVE_DEVICES,
    RECEIVE_PAGINATION,
    REGISTER_DEVICE,
    CHANGE_DEVICE_STATUS,
    CANCEL_DEVICE_REGISTRATION,
    REQUEST_ALL_GEO_POINTS,
    RECEIVE_ALL_GEO_POINTS,
    CLEAN_ALL_GEO_POINTS,
    CHANGE_FIELDS_CLEAN_NEEDED_FLAG,
} from './actions';


export const requestDevices = (data) => ({
    type: REQUEST_DEVICES,
    data,
});
export const receiveDevices = (data) => ({
    type: RECEIVE_DEVICES,
    data,
});


export const receivePagination = (data) => ({
    type: RECEIVE_PAGINATION,
    data,
});


export const registerDevice = (data) => ({
    type: REGISTER_DEVICE,
    data,
});
export const changeDeviceStatus = (data) => ({
    type: CHANGE_DEVICE_STATUS,
    data,
});
export const cancelDeviceRegistration = (data) => ({
    type: CANCEL_DEVICE_REGISTRATION,
    data,
});
export const changeFieldsCleanNeededFlag = (data) => ({
    type: CHANGE_FIELDS_CLEAN_NEEDED_FLAG,
    data,
});


export const requestAllGeoPoints = (data) => ({
    type: REQUEST_ALL_GEO_POINTS,
    data,
});
export const receiveAllGeoPoints = (data) => ({
    type: RECEIVE_ALL_GEO_POINTS,
    data,
});
export const cleanAllGeoPoints = (data) => ({
    type: CLEAN_ALL_GEO_POINTS,
    data,
});
