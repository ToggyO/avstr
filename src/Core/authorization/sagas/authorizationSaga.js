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
        const searchParams = url.searchParams.get('ReturnUrl');
        const ReturnUrl = new URL(searchParams);
        const Re = ReturnUrl.pathname + ReturnUrl.search + ReturnUrl.hash;

        const { isOk, returnUrl } = yield call(api.post, 'http://accounts.avastar.smartheadtest.ru/api/account', {
            Username: 'avastar-test@smarthead.ru',
            Password: 'Qwe123!',
            ReturnUrl: Re,
            RememberLogin: true,
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
