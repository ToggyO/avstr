import { takeLatest } from 'redux-saga/effects';

import * as actions from '../actions';
import getAdvertisementsList from './getAdvertisementsList';

export default function* advertiserWatcher() {
    yield takeLatest(actions.GET_ADVERTISEMENTS_LIST_REQUEST, getAdvertisementsList);
}
