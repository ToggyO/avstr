// TODO(Олег): протестить отправку ошибок в redux store
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

function* restorePassword({ data }) {
    try {
        yield call(api.post, `${REACT_APP_AUTH_URL}${API_URLS_RECOVERY.RESTORE_PASSWORD}`, {
            ...data,
        }, {
            credentials: 'include',
        });
        yield put({ type: types.RESTORE_PASSWORD_SUCCESS });
        yield history.push({
            pathname: RECOVERY_ROUTES.SUCCESS,
        }, {
            resultType: SUCCESS_RESULT_TYPES.RESTORE_PASSWORD,
        });
    } catch (error) {
        const { errorContent } = error;
        yield put({ type: types.RESTORE_PASSWORD_ERROR, data: errorContent });
    }
}

export default restorePassword;
