import { call, put } from 'redux-saga/effects';

import api from 'Core/api';
import { receiveAdvertisements } from '../action-creators';

const { REACT_APP_API } = process.env;


function* handleRequestAdvertisements() {
    try {
        const { content } = yield call(api.get, `${REACT_APP_API}/advertiser-microservice/advertisements`);
        yield put(receiveAdvertisements(content));
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

export default handleRequestAdvertisements;
