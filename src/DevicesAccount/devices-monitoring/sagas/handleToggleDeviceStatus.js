import { call, put } from 'redux-saga/effects';

import api from 'Core/api';
import handleRequestDeviceContent from './handleRequestDeviceContent';
import { changeDeviceStatusLoader } from '../action-creators';

const { REACT_APP_DEVICE_API } = process.env;


function* handleToggleDeviceStatus({ data }) {
    try {
        yield put(changeDeviceStatusLoader(true));
        yield call(api.post, `${REACT_APP_DEVICE_API}/device-management-microservice/devices/ChangeActivationState`, { id: data });
        yield put(changeDeviceStatusLoader(false));
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

export default handleToggleDeviceStatus;
