import { takeLatest } from 'redux-saga/effects';

import { REQUEST_DEVICE_CONTENT } from '../actions';
import handleRequestDeviceContent from './handleRequestDeviceContent';

export default function* devicesMonitoringWatcher() {
    yield takeLatest(REQUEST_DEVICE_CONTENT, handleRequestDeviceContent);
    // yield takeLatest(TOGGLE_SHOW_ADVERTISEMENTS, handleToggleShowAdvertisements);
    // yield takeLatest(TOGGLE_DEVICE_STATUS, handleRequestGeoPoints);
}
