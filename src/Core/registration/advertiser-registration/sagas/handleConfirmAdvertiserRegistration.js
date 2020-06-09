import { call } from 'redux-saga/effects';
import api from 'Core/api';


const { REACT_APP_AUTH_API } = process.env;

function* handleConfirmAdvertiserRegistration({ data }) {
    try {
        yield call(api.post, `${REACT_APP_AUTH_API}/Registration/ConfirmEmail`, { data }, {
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
    }
}

export default handleConfirmAdvertiserRegistration;
