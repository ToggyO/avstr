import { takeLatest } from 'redux-saga/effects';

import { REQUEST_DEVICES, REGISTER_DEVICE, REQUEST_ALL_GEO_POINTS } from '../actions';
import handleRequestDevices from './handleRequestDevices';
import handleRegisterDevice from './handleRegisterDevice';
import handleRequestGeoPoints from '../../devices-common/sagas/handleRequestGeoPoints';


export default function* devicesManagementWatcher() {
    yield takeLatest(REQUEST_DEVICES, handleRequestDevices);
    yield takeLatest(REGISTER_DEVICE, handleRegisterDevice);
    yield takeLatest(REQUEST_ALL_GEO_POINTS, handleRequestGeoPoints);
}
