import { takeLatest } from 'redux-saga/effects';

import {
    REQUEST_DEVICE_CONTENT,
    START_ADVERTISING,
    STOP_ADVERTISING,
    ACTIVATE_DEVICE,
    DEACTIVATE_DEVICE,
    START_MEDIA_STREAM,
    REQUEST_GEO_POINT,
} from '../actions';

import handleRequestDeviceContent from './handleRequestDeviceContent';
import handleToggleAdvertising from './handleToggleAdvertising';
import handleStartDeviceActivation from './device-status-changing/handleStartDeviceActivation';
import handleDeactivateDevice from './device-status-changing/handleDeactivateDevice';
import handleStartMediaStream from './video-streaming/handleStartMediaStream';
import handleRequestGeoPoints from '../../devices-common/sagas/handleRequestGeoPoints';

export default function* devicesMonitoringWatcher() {
    yield takeLatest(REQUEST_DEVICE_CONTENT, handleRequestDeviceContent);

    yield takeLatest(START_ADVERTISING, handleToggleAdvertising, false);
    yield takeLatest(STOP_ADVERTISING, handleToggleAdvertising, true);

    yield takeLatest(ACTIVATE_DEVICE, handleStartDeviceActivation);
    yield takeLatest(DEACTIVATE_DEVICE, handleDeactivateDevice);

    yield takeLatest(START_MEDIA_STREAM, handleStartMediaStream);

    yield takeLatest(REQUEST_GEO_POINT, handleRequestGeoPoints);
}
