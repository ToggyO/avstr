import { call, put } from 'redux-saga/effects';
import api from 'Core/api';
// import history from 'Core/history';
import API_URLS_ADV_REGISTRATION from '../constants/api-urls';
import * as actions from '../actions';

const { REACT_APP_AUTH_API } = process.env;


function* handleRegisterAdvertiser({ data }) {
    try {
        yield call(api.post, `${REACT_APP_AUTH_API}${API_URLS_ADV_REGISTRATION.REGISTER}`, data, {
            credentials: 'include',
        });
        yield put({ type: actions.REGISTER_ADVERTISER_SUCCESS });
    } catch (error) {
        const { errorContent } = error;

        if (errorContent && errorContent[0] === 'DuplicateUserName') {
            yield put({
                type: actions.REGISTER_ADVERTISER_ERROR,
                data: {
                    Email: ['Рекламодатель с такой почтой уже существует'],
                },
            });
        } else {
            yield put({ type: actions.REGISTER_ADVERTISER_ERROR, data: errorContent });
        }
    }
}

export default handleRegisterAdvertiser;
