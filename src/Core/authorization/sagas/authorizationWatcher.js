import { takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, LOGOUT } from '../actions';

import handleLogin from './handleLogin';
import handleLogout from './handleLogout';

export default function* authorizationWatcher() {
    yield takeLatest(LOGIN_REQUEST, handleLogin);
    yield takeLatest(LOGOUT, handleLogout);
}
