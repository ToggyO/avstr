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

function* restorePassword({ payload }) {
    try {
        // debugger;
        yield call(api.post, API_URLS_RECOVERY.RESTORE_PASSWORD, {
            ...payload,
        }, {
            credentials: 'include',
        });
        yield put({ type: types.RESTORE_PASSWORD_SUCCESS });
        yield history.push({
            pathname: RECOVERY_ROUTES.SUCCESS,
            state: {
                resultType: SUCCESS_RESULT_TYPES.RESTORE_PASSWORD,
            },
        });
    } catch (error) {
        // debugger; // FIXME: удалить после тестов
        yield put({ type: types.RESTORE_PASSWORD_ERROR });
    }
}

export default restorePassword;
