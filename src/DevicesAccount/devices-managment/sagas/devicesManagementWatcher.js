import { takeLatest } from 'redux-saga/effects';

import { REQUEST_DEVICES, REGISTER_DEVICE, RECEIVE_DEVICES_LOCATION } from '../actions';
import handleRequestDevices from './handleRequestDevices';
import handleRegisterDevice from './handleRegisterDevice';
import handleRequestLocation from './handleRequestLocation';

export default function* advertisingManagementWatcher() {
    yield takeLatest(REQUEST_DEVICES, handleRequestDevices);
    yield takeLatest(REGISTER_DEVICE, handleRegisterDevice);
    yield takeLatest(RECEIVE_DEVICES_LOCATION, handleRequestLocation);
}
