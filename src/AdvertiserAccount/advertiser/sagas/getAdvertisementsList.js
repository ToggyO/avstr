import { call, put } from 'redux-saga/effects';
import { stringify } from 'qs';

import api from 'Core/api';
import { API_URLS_ADVERTISER } from 'AdvertiserAccount/advertiser/constants';
import * as actions from '../actions';

const { REACT_APP_ADVERTISER_API } = process.env;

function* getAdvertisementsList({ data }) {
    try {
        const params = stringify(data, { addQueryPrefix: true });
        const response = yield call(
            api.get,
            `${REACT_APP_ADVERTISER_API}${API_URLS_ADVERTISER.PROMOTIONS}${params}`,
            {
                credentials: 'include',
            },
        );
        yield put({
            type: actions.GET_ADVERTISEMENTS_LIST_SUCCESS,
            data: response.content,
        });
    } catch (error) {
        // debugger; // FIXME: проверить приход ошибок
        yield put({ type: actions.GET_ADVERTISEMENTS_LIST_ERROR, data: error });
    }
}

export default getAdvertisementsList;
