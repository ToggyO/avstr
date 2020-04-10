import { all } from 'redux-saga/effects';
import authorizationWatcher from '../authorization/sagas/authorizationWatcher';
import advertiserAccountWatcher from '../../AdvertiserAccount/advertiserAccountWatcher';
import devicesAccountWatcher from '../../DevicesAccount/devicesAccountWatcher';

export default function* rootSaga() {
    yield all([
        authorizationWatcher(),
        advertiserAccountWatcher(),
        devicesAccountWatcher(),
    ]);
}
