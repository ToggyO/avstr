import { all } from 'redux-saga/effects';
import advertisingManagementWatcher from './advertising-management/sagas/advertisingManagementWatcher';

export default function* advertiserAccountWatcher() {
    yield all([
        advertisingManagementWatcher(),
    ]);
}
