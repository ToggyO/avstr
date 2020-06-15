import { call, put } from 'redux-saga/effects';
import api from '../../api';
import { setErrMessage } from '../action-creators';

const { REACT_APP_AUTH_API } = process.env;

function* handleLogout() {
    try {
        yield call(api.post, `${REACT_APP_AUTH_API}/account/logout`, {}, {
            credentials: 'include',
        });

        window.location = '/';
    } catch (err) {
        const { type } = err;
        switch (type) {
            case 'BadRequest':
                window.location = '/';
                break;
            case 'ServerError':
                yield put(setErrMessage('Что то пошло не так. Пожалуйста поробуйте позже.'));
                break;
            default:
                throw err;
        }
    }
}

export default handleLogout;
