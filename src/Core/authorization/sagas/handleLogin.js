import { call, put } from 'redux-saga/effects';

import api from 'Core/api';
import { writeToLocalState, getFromLocalState } from 'Core/utils/ls';
import { setErrMessage } from '../action-creators';
import userManager from '../utils/userManager';


const { REACT_APP_AUTH_API } = process.env;

function* handleLogin({ data }) {
    writeToLocalState('userName', data.username);
    try {
        const url = new URL(window.location);
        const searchParam = new URL(url.searchParams.get('ReturnUrl'));
        const ReturnUrl = searchParam.pathname + searchParam.search + searchParam.hash;

        yield call(api.post, `${REACT_APP_AUTH_API}/account/login`,
            {
                ...data,
                ReturnUrl,
            }, {
                credentials: 'include',
            });

        const redirect = getFromLocalState('redirect');
        userManager.signinRedirect({
            data: { path: redirect },
        });
    } catch (err) {
        const { type } = err;
        switch (type) {
            case 'AuthorizationError':
                yield put(setErrMessage('Неверное имя пользователя или пароль'));
                break;
            case 'ServerError':
                yield put(setErrMessage('Что то пошло не так. Пожалуйста поробуйте позже.'));
                break;
            default:
                throw err;
        }
    }
}

export default handleLogin;
