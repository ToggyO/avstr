import { call, put } from 'redux-saga/effects';

import api from 'Core/api';
import { receivePagination, receiveDevices } from '../action-creators';

const { REACT_APP_DEVICE_API } = process.env;


function* handleRequestDevices({ data }) {
    let queryParams = '';
    if (data) {
        const { page, size } = data;
        const pageParam = page ? `page=${page}` : 'page=1';
        const sizeParam = size ? `size=${size}` : 'size=10';
        queryParams = `?${pageParam}&${sizeParam}`;
    }

    try {
        const res = yield call(api.get, `${REACT_APP_DEVICE_API}/device-management-microservice/devices${queryParams}`);
        const { content: { items, pagination } } = res;
        yield put(receivePagination(pagination));
        yield put(receiveDevices(items));
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
