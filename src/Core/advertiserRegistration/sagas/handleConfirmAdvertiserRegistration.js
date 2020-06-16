import { call, put } from 'redux-saga/effects';
import api from 'Core/api';
import { API_URLS_ADV_REGISTRATION /* , ADV_REGISTER_ROUTES */ } from '../constants';

import * as actions from '../actions';

const { REACT_APP_AUTH_API } = process.env;

function* handleConfirmAdvertiserRegistration({ data }) {
    try {
        yield call(api.post, `${REACT_APP_AUTH_API}${API_URLS_ADV_REGISTRATION.CONFIRM}`, data, {
            credentials: 'include',
        });
        yield put({ type: actions.CONFIRM_ADV_REGISTRATION_SUCCESS });
    } catch (err) {
        const { type, content } = err;
        switch (type) {
            case 'BadRequest':
                if (content && content[0].code === 'InvalidToken') {
                    yield put({
                        type: actions.CONFIRM_ADV_REGISTRATION_ERROR,
                        data: 'InvalidToken',
                    });
                } else {
                    throw err;
                }
                break;
            case 'AuthorizationError':
                break;
            case 'ServerError':
                break;
            default:
                throw err;
        }
    }
}


export default handleConfirmAdvertiserRegistration;
