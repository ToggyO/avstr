import { call, put } from 'redux-saga/effects';
import api from 'Core/api';
import API_URLS_ADV_REGISTRATION from '../constants/api-urls';
// import history from '../../history';

import * as actions from '../actions';

const { REACT_APP_AUTH_API } = process.env;


function* handleRegisterAdvertiser({ data }) {
    try {
        yield call(api.post, `${REACT_APP_AUTH_API}${API_URLS_ADV_REGISTRATION.REGISTER}`, data, {
            credentials: 'include',
        });
        yield put({ type: actions.REGISTER_ADVERTISER_SUCCESS });
    } catch (err) {
        const { type, content } = err;
        switch (type) {
            case 'BadRequest':
                if (content && content[0] === 'DuplicateUserName') {
                    yield put({
                        type: actions.REGISTER_ADVERTISER_ERROR,
                        data: 'Рекламодатель с такой почтой уже существует',
                    });
                } else {
                    throw err;
                }
                break;
            case 'AuthorizationError':
                break;
            case 'ServerError':
                break;
            default:
                throw err;
        }
    }
}

export default handleRegisterAdvertiser;

// "errorContent": [
//     {
//         "code": "DuplicateUserName",
//         "description": "User name 'admin@test.ru' is already taken."
//     }
// ],
