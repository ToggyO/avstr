import { REQUEST_DEVICES, RECEIVE_DEVICES } from './actions';


export const requestDevices = (data) => ({
    type: REQUEST_DEVICES,
    data,
});

export const receiveDevices = (data) => ({
    type: RECEIVE_DEVICES,
    data,
});
