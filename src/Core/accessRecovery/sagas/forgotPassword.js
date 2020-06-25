import { call, put } from 'redux-saga/effects';

import api from 'Core/api';
import history from 'Core/history';
import {
    RECOVERY_ROUTES,
    SUCCESS_RESULT_TYPES,
    API_URLS_RECOVERY,
} from 'Core/accessRecovery/constants';
import * as types from '../actions';

const { REACT_APP_AUTH_URL } = process.env;

function* forgotPassword({ data }) {
    try {
        yield call(api.post, `${REACT_APP_AUTH_URL}${API_URLS_RECOVERY.FORGOT_PASSWORD}`, {
            ...data,
        }, {
            credentials: 'include',
        });
        yield put({ type: types.FORGOT_PASSWORD_SUCCESS });
        yield history.push({
            pathname: RECOVERY_ROUTES.SUCCESS,
        }, {
            resultType: SUCCESS_RESULT_TYPES.RECOVERY,
            recoveredEmail: data.email,
        });
    } catch (error) {
        yield put({ type: types.FORGOT_PASSWORD_ERROR, data: error });
    }
}

export default forgotPassword;
