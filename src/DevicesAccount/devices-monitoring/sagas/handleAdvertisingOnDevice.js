import { call, put } from 'redux-saga/effects';

import api from 'Core/api';
import handleRequestDeviceContent from './handleRequestDeviceContent';
import { changeAdvertisingLoaderStatus } from '../action-creators';

const { REACT_APP_DEVICE_API } = process.env;


function* handleAdvertisingOnDevice({ data }) {
    try {
        yield put(changeAdvertisingLoaderStatus(true));
        yield call(api.post, `${REACT_APP_DEVICE_API}/device-management-microservice/devices/ChangeAdvertisementsState`, { id: data });
        yield put(changeAdvertisingLoaderStatus(false));
        yield* handleRequestDeviceContent({ data });
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

export default handleAdvertisingOnDevice;
