import { cancel, fork, take } from 'redux-saga/effects';
import { CANCEL_DEVICE_REGISTRATION } from '../actions';

import requestDeviceStatus from './requestDeviceStatus';

function* handleDeviceStatusRequest(deviceId) {
    const requestStatusChain = yield fork(requestDeviceStatus, deviceId);
    yield take(CANCEL_DEVICE_REGISTRATION);
    yield cancel(requestStatusChain);
}

export default handleDeviceStatusRequest;
