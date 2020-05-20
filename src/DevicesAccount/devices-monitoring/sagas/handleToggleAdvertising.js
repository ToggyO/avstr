import { call, put } from 'redux-saga/effects';

import api from 'Core/api';
import handleRequestDeviceContent from './handleRequestDeviceContent';
import { changeAdvertisingLoaderStatus } from '../action-creators';

const { REACT_APP_DEVICE_API } = process.env;


function* handleToggleAdvertising(isAdvertisementsDisabled, { data }) {
    let advertisingFlag = 'DisableAdvertisements';
    if (isAdvertisementsDisabled) {
        advertisingFlag = 'EnableAdvertisements';
    }

    try {
        yield put(changeAdvertisingLoaderStatus(true));
        yield* handleRequestDeviceContent({ data });
        yield call(api.post, `${REACT_APP_DEVICE_API}/device-management-microservice/devices/${advertisingFlag}`, { id: data });
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
    } finally {
        yield put(changeAdvertisingLoaderStatus(false));
    }
}

export default handleToggleAdvertising;
