import { call, put } from 'redux-saga/effects';

import { setErrMessage } from '../action-creators';

import api from '../../api';

const { REACT_APP_AUTH_API } = process.env;

// function* handleLogin({ data }) {
function* handleLogin() {
    try {
        const url = new URL(window.location);
        const searchParam = new URL(url.searchParams.get('ReturnUrl'));
        const ReturnUrl = searchParam.pathname + searchParam.search + searchParam.hash;

        const { isOk /* ,  redirectPath */ } = yield call(api.post, `${REACT_APP_AUTH_API}/account`, {
            // ...data,
            ReturnUrl,
            Username: 'avastar-test@smarthead.ru',
            Password: 'Qwe123!',
            RememberLogin: true,
        }, {
            credentials: 'include',
        });

        if (isOk) {
            window.location = '/advertiser';
            // localStorage.setItem('redirectPath', redirectPath);
            // window.location = redirectPath;
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

export default handleLogin;
