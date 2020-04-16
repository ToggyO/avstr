import { call, put } from 'redux-saga/effects';

import api from 'Core/api';
import { receiveDeviceContent } from '../action-creators';

const { REACT_APP_DEVICE_API } = process.env;


function* handleRequestDeviceContent({ data }) {
    try {
        const { content } = yield call(api.get, `${REACT_APP_DEVICE_API}/device-management-microservice/devices/${data}`);
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
