import { takeLatest } from 'redux-saga/effects';
import { LOGIN, LOGOUT } from '../actions';

import handleLogin from './handleLogin';
import handleLogout from './handleLogout';

export default function* authorizationWatcher() {
    yield takeLatest(LOGIN, handleLogin);
    yield takeLatest(LOGOUT, handleLogout);
}
