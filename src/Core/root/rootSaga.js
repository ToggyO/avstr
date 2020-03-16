import { all } from 'redux-saga/effects';
import authorizationWatcher from '../authorization/sagas/authorizationWatcher';

export default function* rootSaga() {
    yield all([
        authorizationWatcher(),
    ]);
}
