import { call, put } from 'redux-saga/effects';

import api from 'Core/api';
import { receiveDeviceStatus /* , receiveDeviceSerial */ } from '../action-creators';

const { REACT_APP_DEVICE_API } = process.env;


function* handleRequestDevices({ data }) {
    try {
        const response = yield call(api.post, `${REACT_APP_DEVICE_API}/device-management-microservice/devices`, data);
        yield put(receiveDeviceStatus('pending'));

        const { content: { id } } = response;
        if (!id || id <= 0) {
            yield put(receiveDeviceStatus('notConnected'));
            // return;
        }

        // second response
        /* if(...){
            yield put(receiveDeviceStatus('connected'));
            yield put(receiveDeviceSerial(serialNumber));
        } else {
            yield put(receiveDeviceStatus('notConnected'));
        } */
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
