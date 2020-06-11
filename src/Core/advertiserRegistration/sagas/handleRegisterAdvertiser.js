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

        /* yield history.push({
            pathname: RECOVERY_ROUTES.SUCCESS,
            state: {
                resultType: SUCCESS_RESULT_TYPES.RECOVERY,
                recoveredEmail: payload,
            },
        }); */
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
    }
}

export default handleRegisterAdvertiser;
