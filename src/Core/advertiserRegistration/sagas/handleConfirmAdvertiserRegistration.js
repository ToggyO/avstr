import { call } from 'redux-saga/effects';
import api from 'Core/api';
import history from 'Core/history';
import { API_URLS_ADV_REGISTRATION /* , ADV_REGISTER_ROUTES */ } from '../constants';


const { REACT_APP_AUTH_API } = process.env;

function* handleConfirmAdvertiserRegistration({ data }) {
    try {
        yield call(api.post, `${REACT_APP_AUTH_API}${API_URLS_ADV_REGISTRATION.CONFIRM}`, data, {
            credentials: 'include',
        });
        yield history.push('/');
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


export default handleConfirmAdvertiserRegistration;
