import { call, put } from 'redux-saga/effects';
import api from 'Core/api';
import { setErrMessage } from '../action-creators';


const { REACT_APP_AUTH_API } = process.env;

function* handleLogin({ data }) {
    try {
        const url = new URL(window.location);
        const searchParam = new URL(url.searchParams.get('ReturnUrl'));
        const ReturnUrl = searchParam.pathname + searchParam.search + searchParam.hash;

        const { content } = yield call(api.post, `${REACT_APP_AUTH_API}/account/login`, {
            ...data,
            ReturnUrl,
            /* Username: 'avastar-test@smarthead.ru',
            Password: 'Qwe123!',
            RememberLogin: true, */
        }, {
            credentials: 'include',
        });

        localStorage.setItem('redirectPath', content);
        window.location = content;
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
