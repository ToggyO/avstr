import { all } from 'redux-saga/effects';
import authorizationWatcher from '../authorization/sagas/authorizationSaga';

export default function* rootSaga() {
    yield all([
        authorizationWatcher(),
    ]);
}
