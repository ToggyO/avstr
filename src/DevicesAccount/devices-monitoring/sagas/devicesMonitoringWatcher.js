import { takeLatest } from 'redux-saga/effects';

import {
    REQUEST_DEVICE_CONTENT,
    TOGGLE_ADVERTISING_ON_DEVICE,
    TOGGLE_DEVICE_STATUS,
    START_MEDIA_STREAM,
} from '../actions';

import handleRequestDeviceContent from './handleRequestDeviceContent';
import handleAdvertisingOnDevice from './handleAdvertisingOnDevice';
import handleToggleDeviceStatus from './handleToggleDeviceStatus';
import handleStartMediaStream from './video-streaming/handleStartMediaStream';


export default function* devicesMonitoringWatcher() {
    yield takeLatest(REQUEST_DEVICE_CONTENT, handleRequestDeviceContent);
    yield takeLatest(TOGGLE_ADVERTISING_ON_DEVICE, handleAdvertisingOnDevice);
    yield takeLatest(TOGGLE_DEVICE_STATUS, handleToggleDeviceStatus);
    yield takeLatest(START_MEDIA_STREAM, handleStartMediaStream);
}
