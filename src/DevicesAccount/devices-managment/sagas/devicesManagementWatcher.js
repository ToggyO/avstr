import { takeLatest } from 'redux-saga/effects';

import { REQUEST_DEVICES, REGISTER_DEVICE } from '../actions';
import handleRequestDevices from './handleRequestDevices';
import handleRegisterDevice from './handleRegisterDevice';


export default function* devicesManagementWatcher() {
    yield takeLatest(REQUEST_DEVICES, handleRequestDevices);
    yield takeLatest(REGISTER_DEVICE, handleRegisterDevice);
}
