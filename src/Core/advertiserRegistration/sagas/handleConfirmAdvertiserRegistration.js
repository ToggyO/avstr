import { call, put } from 'redux-saga/effects';
import api from 'Core/api';
import history from 'Core/history';

import { API_URLS_ADV_REGISTRATION } from '../constants';
import * as actions from '../actions';

const { REACT_APP_AUTH_API } = process.env;

function* handleConfirmAdvertiserRegistration({ data }) {
    try {
        yield call(api.post, `${REACT_APP_AUTH_API}${API_URLS_ADV_REGISTRATION.CONFIRM}`, data, {
            credentials: 'include',
        });
        yield put({ type: actions.CONFIRM_ADV_REGISTRATION_SUCCESS });
    } catch (err) {
        const { type } = err;
        switch (type) {
            case 'BadRequest':
                yield put({ type: actions.CONFIRM_ADV_REGISTRATION_ERROR });
                break;
            case 'AuthorizationError':
                alert('Ошибка авторизации.');
                history.push('/');
                break;
            case 'ServerError':
                alert('На сервере произошла ошибка.');
                history.push('/');
                break;
            default:
                yield put({ type: actions.CONFIRM_ADV_REGISTRATION_ERROR });
        }
    }
}

export default handleConfirmAdvertiserRegistration;
