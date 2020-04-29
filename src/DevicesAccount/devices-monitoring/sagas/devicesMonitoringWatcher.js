import { takeLatest } from 'redux-saga/effects';

import {
    REQUEST_DEVICE_CONTENT,
    TOGGLE_ADVERTISING_ON_DEVICE,
    ACTIVATE_DEVICE,
    DEACTIVATE_DEVICE,
    START_MEDIA_STREAM,
} from '../actions';

import handleRequestDeviceContent from './handleRequestDeviceContent';
import handleAdvertisingOnDevice from './handleAdvertisingOnDevice';
import handleActivateDevice from './handleActivateDevice';
import handleDeactivateDevice from './handleDeactivateDevice';
import handleStartMediaStream from './video-streaming/handleStartMediaStream';


export default function* devicesMonitoringWatcher() {
    yield takeLatest(REQUEST_DEVICE_CONTENT, handleRequestDeviceContent);
    yield takeLatest(TOGGLE_ADVERTISING_ON_DEVICE, handleAdvertisingOnDevice);
    yield takeLatest(ACTIVATE_DEVICE, handleActivateDevice);
    yield takeLatest(DEACTIVATE_DEVICE, handleDeactivateDevice);
    yield takeLatest(START_MEDIA_STREAM, handleStartMediaStream);
}
