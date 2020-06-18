import { takeLatest } from 'redux-saga/effects';

import * as types from '../actions';
import forgotPassword from './forgotPassword';
import restorePassword from './restorePassword';

export default function* accessRecoveryWatcher() {
    yield takeLatest(types.FORGOT_PASSWORD_REQUEST, forgotPassword);
    yield takeLatest(types.RESTORE_PASSWORD_REQUEST, restorePassword);
}
