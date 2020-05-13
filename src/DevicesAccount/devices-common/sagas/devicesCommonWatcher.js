import { takeLatest } from 'redux-saga/effects';

import { REQUEST_GEO_POINT, REQUEST_ALL_GEO_POINTS } from '../actions';
import handleRequestGeoPoints from './handleRequestGeoPoints';

export default function* devicesCommonWatcher() {
    yield takeLatest(REQUEST_GEO_POINT, handleRequestGeoPoints);
    yield takeLatest(REQUEST_ALL_GEO_POINTS, handleRequestGeoPoints);
}
