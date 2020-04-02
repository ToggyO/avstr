import { takeLatest } from 'redux-saga/effects';

import { REQUEST_DEVICES } from '../actions';
import handleRequestDevices from './handleRequestDevices';

export default function* advertisingManagementWatcher() {
    yield takeLatest(REQUEST_DEVICES, handleRequestDevices);
}
