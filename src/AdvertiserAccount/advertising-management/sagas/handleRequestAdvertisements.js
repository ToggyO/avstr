import { call, put } from 'redux-saga/effects';

import api from 'Core/api';
import * as actions from '../actions';

const { REACT_APP_ADVERTISER_API } = process.env;

function* handleRequestAdvertisements() {
    try {
        const { content } = yield call(api.get, `${REACT_APP_ADVERTISER_API}/advertiser-microservice/admin/promotions`);
        yield put({
            type: actions.GET_ADVERTISEMENTS_SUCCESS,
            data: content,
        });
    } catch (error) {
        yield put({ type: actions.GET_ADVERTISEMENTS_ERROR, data: error });
    }
}

export default handleRequestAdvertisements;
