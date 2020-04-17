import { call, put } from 'redux-saga/effects';

import api from 'Core/api';
import { receiveDeviceContent, changeAdvertisingLoaderStatus } from '../action-creators';

const { REACT_APP_DEVICE_API } = process.env;


function* handleRequestDeviceContent({ data }) {
    try {
        yield put(changeAdvertisingLoaderStatus(true));
        const { content } = yield call(api.get, `${REACT_APP_DEVICE_API}/device-management-microservice/devices/${data}`);
        yield put(changeAdvertisingLoaderStatus(false));
        yield put(receiveDeviceContent(content));
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

export default handleRequestDeviceContent;
