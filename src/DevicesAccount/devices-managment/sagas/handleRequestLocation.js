import { call } from 'redux-saga/effects';

import api from 'Core/api';
// import { receiveDevicesLocation } from '../action-creators';

const { REACT_APP_DEVICE_API } = process.env;


function* handleRequestLocation() {
    /* let queryParams = '';
    if (data) {
        const { page, size } = data;
        const pageParam = page ? `page=${page}` : 'page=1';
        const sizeParam = size ? `size=${size}` : 'size=10';
        queryParams = `?${pageParam}&${sizeParam}`;
    } */

    try {
        const res = yield call(api.get, `${REACT_APP_DEVICE_API}/device-management-microservice/devices/GpsInfo`);

        console.log(res);

        // const { content: { items, pagination } } = res;
        // yield put(receiveDevicesLocation(items));
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

export default handleRequestLocation;
