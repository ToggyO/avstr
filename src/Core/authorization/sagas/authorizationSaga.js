import { takeLatest, call, put } from 'redux-saga/effects';
import { LOGIN, LOGOUT } from '../actions';
import { setErrMessage } from '../action-creators';

import api from '../../api';


// function* handleLogin({ data }) {
function* handleLogin() {
    try {
        const url = new URL(window.location);
        const searchParam = new URL(url.searchParams.get('ReturnUrl'));
        const ReturnUrl = searchParam.pathname + searchParam.search + searchParam.hash;

        const { isOk } = yield call(api.post, 'http://accounts.avastar.smartheadtest.ru/api/account', {
            Username: 'avastar-test@smarthead.ru',
            Password: 'Qwe123!',
            ReturnUrl,
            RememberLogin: true,
        }, {
            credentials: 'include',
        });

        if (isOk) {
            window.location = '/advertiser';
        }
    } catch ({ type }) {
        switch (type) {
            case 'AuthorizationError':
                yield put(setErrMessage('Вы ввели неверные учетные данные. Попробуйте еще раз.'));
                break;
            case 'ServerError':
                yield put(setErrMessage('Что то пошло не так. Пожалуйста поробуйте позже.'));
                break;
            default:
                break;
        }
    }
}


function* handleLogout() {
    try {
        const { isOk } = yield call(api.get, 'http://accounts.avastar.smartheadtest.ru/api/account/logout', {
            credentials: 'include',
        });
        if (isOk) {
            window.location = '/';
        }
    } catch (err) {
        // console.log(err);
    }
}


export default function* authorizationWatcher() {
    yield takeLatest(LOGIN, handleLogin);
    yield takeLatest(LOGOUT, handleLogout);
}
