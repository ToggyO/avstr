import { call, put } from 'redux-saga/effects';
import api from 'Core/api';
import { changeRegisterLoader } from '../action-creators';


const { REACT_APP_AUTH_API } = process.env;

function* handleRegisterAdvertiser({ data }) {
    yield put(changeRegisterLoader(true));
    try {
        yield call(api.post, `${REACT_APP_AUTH_API}/Registration/RegisterAdvertiser`, { data }, {
            credentials: 'include',
        });
    } catch (err) {
        const { type } = err;
        switch (type) {
            case 'AuthorizationError':
                break;
            case 'ServerError':
                break;
            default:
                throw err;
        }
    } finally {
        yield put(changeRegisterLoader(false));
    }
}

export default handleRegisterAdvertiser;
