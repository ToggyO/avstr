import { call, put } from 'redux-saga/effects';

import api from 'Core/api';
import { receiveDevices } from '../action-creators';

const { REACT_APP_API } = process.env;


function* handleRequestDevices() {
    try {
        const { content } = yield call(api.get, `${REACT_APP_API}/device-management-microservice/devices`);
        yield put(receiveDevices(content));
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
