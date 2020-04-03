import { all } from 'redux-saga/effects';
import authorizationWatcher from '../authorization/sagas/authorizationWatcher';
import advertiserAccountWatcher from '../../AdvertiserAccount/advertiserAccountWatcher';
import devicesManagementWatcher from '../../DevicesAccount/devices-managment/sagas/devicesManagementWatcher';

export default function* rootSaga() {
    yield all([
        authorizationWatcher(),
        advertiserAccountWatcher(),
        devicesManagementWatcher(),
    ]);
}
