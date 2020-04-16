import { takeLatest } from 'redux-saga/effects';

import { REQUEST_DEVICE_CONTENT, TOGGLE_ADVERTISING_ON_DEVICE } from '../actions';
import handleRequestDeviceContent from './handleRequestDeviceContent';
import handleAdvertisingOnDevice from './handleAdvertisingOnDevice';

export default function* devicesMonitoringWatcher() {
    yield takeLatest(REQUEST_DEVICE_CONTENT, handleRequestDeviceContent);
    yield takeLatest(TOGGLE_ADVERTISING_ON_DEVICE, handleAdvertisingOnDevice);
    // yield takeLatest(TOGGLE_DEVICE_STATUS, handleRequestGeoPoints);
}
