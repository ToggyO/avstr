import { takeLatest, call, put } from 'redux-saga/effects';
import history from '../../history';

import api from '../../api';
// import userManager from '../userManager';

import { LOGIN } from '../actions';
import { receiveRedirectUrl } from '../action-creators';


// function* handleLogin({ data }) {
function* handleLogin() {
    try {
        const url = new URL(window.location);
        const searchParam = new URL(url.searchParams.get('ReturnUrl'));
        const ReturnUrl = searchParam.pathname + searchParam.search + searchParam.hash;

        const { isOk, returnUrl } = yield call(api.post, 'http://accounts.avastar.smartheadtest.ru/api/account', {
            Username: 'avastar-test@smarthead.ru',
            Password: 'Qwe123!',
            ReturnUrl,
            RememberLogin: true,
        }, {
            credentials: 'include',
        });
        // console.log(isOk, returnUrl);

        if (isOk) {
            // alert('ok');
            yield put(receiveRedirectUrl(returnUrl));
            history.push({
                pathname: '/advertiser',
            });
        } else {
            //
        }
    } catch ({ type }) {
        // alert('err');
        switch (type) {
            case 'AuthorizationError':
                /* userManager.signinRedirect({
                    data: {
                        path: history.location.path,
                    },
                }); */
                break;
            default:
                break;
        }
    }
}

export default function* authorizationWatcher() {
    yield takeLatest(LOGIN, handleLogin);
}
