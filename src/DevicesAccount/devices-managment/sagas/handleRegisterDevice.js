import { call, put, delay } from 'redux-saga/effects';

import api from 'Core/api';
import { receiveDeviceStatus, receiveDeviceSerial } from '../action-creators';

const { REACT_APP_DEVICE_API } = process.env;


function* handleRegisterDevice({ data }) {
    try {
        const registerRes = yield call(api.post, `${REACT_APP_DEVICE_API}/device-management-microservice/devices`, data);
        yield put(receiveDeviceStatus('pending'));

        const { content: { id } } = registerRes;
        if (!id || id <= 0) {
            yield put(receiveDeviceStatus('notConnected'));
            return;
        }


        let isRequestsFinish = false;
        let isRegistered = false;
        setTimeout(() => {
            isRequestsFinish = true;
        }, 10000);

        while (!isRequestsFinish) {
            const statusRes = yield call(api.get, `${REACT_APP_DEVICE_API}/device-management-microservice/Devices/IsConnected/${id}`);
            const { content: { isConnected } } = statusRes;
            if (isConnected) {
                isRequestsFinish = true;
                isRegistered = isConnected;
            }
            yield delay(1000);
        }

        if (isRegistered) {
            const { serialNumber } = data;
            yield put(receiveDeviceSerial(serialNumber));
            yield put(receiveDeviceStatus('connected'));
        } else {
            yield put(receiveDeviceStatus('notConnected'));
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

export default handleRegisterDevice;
