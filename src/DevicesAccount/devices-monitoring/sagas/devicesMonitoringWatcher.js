import { takeLatest } from 'redux-saga/effects';

import {
    REQUEST_DEVICE_CONTENT,
    START_ADVERTISING,
    STOP_ADVERTISING,
    ACTIVATE_DEVICE,
    DEACTIVATE_DEVICE,
    START_MEDIA_STREAM,
} from '../actions';

import handleRequestDeviceContent from './handleRequestDeviceContent';
import handleStartAdvertising from './advertising/handleStartAdvertising';
import handleStopAdvertising from './advertising/handleStopAdvertising';
import handleActivateDevice from './handleActivateDevice';
import handleDeactivateDevice from './handleDeactivateDevice';
import handleStartMediaStream from './video-streaming/handleStartMediaStream';


export default function* devicesMonitoringWatcher() {
    yield takeLatest(REQUEST_DEVICE_CONTENT, handleRequestDeviceContent);

    yield takeLatest(START_ADVERTISING, handleStartAdvertising);
    yield takeLatest(STOP_ADVERTISING, handleStopAdvertising);

    yield takeLatest(ACTIVATE_DEVICE, handleActivateDevice);
    yield takeLatest(DEACTIVATE_DEVICE, handleDeactivateDevice);

    yield takeLatest(START_MEDIA_STREAM, handleStartMediaStream);
}
