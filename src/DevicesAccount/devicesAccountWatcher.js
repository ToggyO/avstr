import { all } from 'redux-saga/effects';
import devicesCommonWatcher from './devices-common/sagas/devicesCommonWatcher';
import devicesManagementWatcher from './devices-managment/sagas/devicesManagementWatcher';
import devicesMonitoringWatcher from './devices-monitoring/sagas/devicesMonitoringWatcher';


export default function* devicesAccountWatcher() {
    yield all([
        devicesCommonWatcher(),
        devicesManagementWatcher(),
        devicesMonitoringWatcher(),
    ]);
}
