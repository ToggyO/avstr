import { call, delay, put } from 'redux-saga/effects';
import { stringify } from 'qs';

import api from 'Core/api';
import { API_URLS_ADVERTISING_MANAGMENT } from '../constants';
import * as actions from '../actions';

const { REACT_APP_ADVERTISER_API } = process.env;

function* handleGetAdvertisersList({ data }) {
    try {
        yield delay(500);

        const params = stringify(data, { addQueryPrefix: true });

        const response = yield call(
            api.get,
            `${REACT_APP_ADVERTISER_API}${API_URLS_ADVERTISING_MANAGMENT.ADVERTISERS}${params}`,
        );

        yield put({
            type: actions.GET_ADVERTISERS_LIST_SUCCESS,
            data: response.content,
        });
    } catch (error) {
        yield put({ type: actions.GET_ADVERTISERS_LIST_ERROR, data: error });
    }
}

export default handleGetAdvertisersList;
