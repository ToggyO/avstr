import { call, put } from 'redux-saga/effects';

import api from 'Core/api';
import { receiveDeviceStatus, receiveDeviceSerial } from '../action-creators';

const { REACT_APP_DEVICE_API } = process.env;


function* handleRequestDevices() {
    try {
        const { content: { serialNumber, gatewayKey: { isActive } } } = yield call(api.post, `${REACT_APP_DEVICE_API}/device-management-microservice/devices`);
        yield put(receiveDeviceSerial(serialNumber));
        yield put(receiveDeviceStatus(isActive));
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

export default handleRequestDevices;
