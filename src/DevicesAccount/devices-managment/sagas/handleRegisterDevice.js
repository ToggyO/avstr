import {
    call,
    put,
    delay,
    fork,
    take,
    cancel,
    cancelled,
} from 'redux-saga/effects';

import api from 'Core/api';
import { changeDeviceStatus } from '../action-creators';
import { CANCEL_DEVICE_REGISTRATION } from '../actions';

const { REACT_APP_DEVICE_API } = process.env;

function* requestDeviceStatus(deviceId) {
    try {
        let isRequestsFinish = false;
        let isRegistered = false;

        setTimeout(() => {
            isRequestsFinish = true;
        }, 10000);

        while (!isRequestsFinish) {
            const statusRes = yield call(api.get, `${REACT_APP_DEVICE_API}/device-management-microservice/Devices/IsConnected/${deviceId}`);
            const { content: { isConnected } } = statusRes;
            if (isConnected) {
                isRequestsFinish = true;
                isRegistered = isConnected;
            }
            yield delay(1000);
        }

        if (isRegistered) {
            yield put(changeDeviceStatus('connected'));
        } else {
            yield put(changeDeviceStatus('notConnected'));
        }
    } catch ({ type }) {
        switch (type) {
            case 'AuthorizationError':
                window.location = '/';
                break;
            case 'ServerError':
                alert('На сервере произошла ошибка.');
                break;
            default:
                break;
        }
    } finally {
        if (yield cancelled()) {
            yield put(changeDeviceStatus(''));
        }
    }
}


function* handleDeviceStatusRequest(deviceId) {
    const requestStatusChain = yield fork(requestDeviceStatus, deviceId);
    yield take(CANCEL_DEVICE_REGISTRATION);
    yield cancel(requestStatusChain);
}


function* handleRegisterDevice({ data }) {
    try {
        const registerRes = yield call(api.post, `${REACT_APP_DEVICE_API}/device-management-microservice/devices`, data);
        yield put(changeDeviceStatus('pending'));

        const { content: { id } } = registerRes;
        if (!id || id <= 0) {
            yield put(changeDeviceStatus('notConnected'));
            return;
        }
        yield* handleDeviceStatusRequest(id);
    } catch ({ type }) {
        switch (type) {
            case 'AuthorizationError':
                window.location = '/';
                break;
            case 'ServerError':
                alert('На сервере произошла ошибка.');
                break;
            default:
                break;
        }
    }
}

export default handleRegisterDevice;
