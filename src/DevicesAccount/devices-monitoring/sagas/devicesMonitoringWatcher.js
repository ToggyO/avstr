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
import handleToogleAdvertising from './handleToggleAdvertising';
import handleActivateDevice from './device-status-changing/handleActivateDevice';
import handleDeactivateDevice from './device-status-changing/handleDeactivateDevice';
import handleStartMediaStream from './video-streaming/handleStartMediaStream';


export default function* devicesMonitoringWatcher() {
    yield takeLatest(REQUEST_DEVICE_CONTENT, handleRequestDeviceContent);

    yield takeLatest(START_ADVERTISING, handleToogleAdvertising, false);
    yield takeLatest(STOP_ADVERTISING, handleToogleAdvertising, true);

    yield takeLatest(ACTIVATE_DEVICE, handleActivateDevice);
    yield takeLatest(DEACTIVATE_DEVICE, handleDeactivateDevice);

    yield takeLatest(START_MEDIA_STREAM, handleStartMediaStream);
}
