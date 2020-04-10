import { call, delay, put } from 'redux-saga/effects';

import api from 'Core/api';
import { changeDeviceStatus } from '../action-creators';

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
    }
}

export default requestDeviceStatus;
