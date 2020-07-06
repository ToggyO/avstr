import { call, put } from 'redux-saga/effects';

import api from 'Core/api';
import { receiveAllGeoPoints } from '../../devices-managment/action-creators';
import { receiveGeoPoint } from '../../devices-monitoring/action-creators';

const { REACT_APP_DEVICE_API } = process.env;

function* handleRequestGeoPoints({ data }) {
    try {
        const res = yield call(api.get, `${REACT_APP_DEVICE_API}/device-management-microservice/devices/GpsInfo/${data || ''}`);
        const { content } = res;

        if (data) {
            yield put(receiveGeoPoint(content));
        } else {
            yield put(receiveAllGeoPoints(content));
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

export default handleRequestGeoPoints;
