import { takeLatest, call, put } from 'redux-saga/effects';
import history from '../../history';

import api from '../../api';

import { LOGIN } from '../actions';
import { receiveRedirectUrl } from '../action-creators';


// function* handleLogin({ data }) {
function* handleLogin() {
    try {
        console.log('login');
        const { isOk, redirectUrl } = yield call(api.post, 'http://84.201.128.17:30080/api/account', {
            Username: 'avastar-test@smarthead.ru',
            Password: 'Qwe123!',
            ReturnUrl: 'avastar.com',
            RememberLogin: true,
        });

        if (isOk) {
            yield put(receiveRedirectUrl(redirectUrl));
        } else {
            history.push({
                pathname: '/',
            });
        }
    } catch ({ type }) {
        switch (type) {
            case 'AuthorizationError':
                history.push({
                    pathname: '/',
                });
                break;
            default:
        }
    }
}

export default function* authorizationWatcher() {
    yield takeLatest(LOGIN, handleLogin);
}
