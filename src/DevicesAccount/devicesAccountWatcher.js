import { all } from 'redux-saga/effects';
import devicesManagementWatcher from './devices-managment/sagas/devicesManagementWatcher';
import devicesMonitoringWatcher from './devices-monitoring/sagas/devicesMonitoringWatcher';

export default function* devicesAccountWatcher() {
    yield all([
        devicesManagementWatcher(),
        devicesMonitoringWatcher(),
    ]);
}
