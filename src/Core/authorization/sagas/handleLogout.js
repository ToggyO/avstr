import { call } from 'redux-saga/effects';
import api from '../../api';

const { REACT_APP_AUTH_API } = process.env;


function* handleLogout() {
    try {
        yield call(api.post, `${REACT_APP_AUTH_API}/account/logout`, {}, {
            credentials: 'include',
        });

        window.location = '/';
    } catch (err) {
        // console.log(err);
    }
}

export default handleLogout;
