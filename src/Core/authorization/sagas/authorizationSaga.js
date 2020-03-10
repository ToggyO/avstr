import { takeLatest, call, put } from 'redux-saga/effects';
import history from '../../history';

import api from '../../api';

import { LOGIN } from '../actions';
import { receiveRedirectUrl } from '../action-creators';


function* handleLogin({ data }) {
    try {
        console.log('login');
        const { isOk, redirectUrl } = yield call(api.post, 'url', data);

        if (isOk) {
            yield put(receiveRedirectUrl(redirectUrl));
        } else {
            history.push('/qwerty');
        }
    } catch ({ type }) {
        switch (type) {
            case 'AuthorizationError':
                history.push('/');
                break;
            default:
        }
    }
}

export default function* authorizationWatcher() {
    yield takeLatest(LOGIN, handleLogin);
}
