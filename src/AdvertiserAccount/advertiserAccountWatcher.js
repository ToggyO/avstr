import { all } from 'redux-saga/effects';
import advertiserWatcher from './advertiser/sagas/advertiserWatcher';
import advertisingManagementWatcher from './advertising-management/sagas/advertisingManagementWatcher';

export default function* advertiserAccountWatcher() {
    yield all([
        advertiserWatcher(),
        advertisingManagementWatcher(),
    ]);
}
