import { takeLatest } from 'redux-saga/effects';

import { REQUEST_GEO_POINTS } from '../actions';
import handleRequestGeoPoints from './handleRequestGeoPoints';

export default function* devicesCommonWatcher() {
    yield takeLatest(REQUEST_GEO_POINTS, handleRequestGeoPoints);
}
