import { takeLatest, call, put } from 'redux-saga/effects';
import history from '../../history';

import api from '../../api';
import userManager from '../userManager';

import { LOGIN } from '../actions';
import { receiveRedirectUrl } from '../action-creators';


// function* handleLogin({ data }) {
function* handleLogin() {
    try {
        const url = new URL(window.location);
        const ReturnUrl = url.searchParams.get('ReturnUrl');
        // alert(ReturnUrl);

        const { isOk, returnUrl } = yield call(api.post, 'http://84.201.128.17:30080/api/account', {
            Username: 'avastar-test@smarthead.ru',
            Password: 'Qwe123!',
            ReturnUrl,
            RememberLogin: true,
        });
        // console.log(isOk, returnUrl);

        if (isOk) {
            yield put(receiveRedirectUrl(returnUrl));
            history.push({
                pathname: returnUrl,
            });
        } else {
            //
        }
    } catch ({ type }) {
        switch (type) {
            case 'AuthorizationError':
                userManager.signinRedirect({
                    data: {
                        path: history.location.path,
                    },
                });
                break;
            default:
        }
    }
}

export default function* authorizationWatcher() {
    yield takeLatest(LOGIN, handleLogin);
}
