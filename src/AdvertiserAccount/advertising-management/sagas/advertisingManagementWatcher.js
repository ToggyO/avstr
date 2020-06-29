import { takeLatest } from 'redux-saga/effects';

import {
    UPLOAD_FILE,
    REQUEST_ADVERTISEMENTS,
    DELETE_ADVERTISEMENT,
    GET_ADVERTISERS_LIST_REQUEST,
} from '../actions';
import handleUploadFile from './handleUploadFile';
import handleRequestAdvertisements from './handleRequestAdvertisements';
import handleDeleteAdvertisement from './handleDeleteAdvertisement';
import handleGetAdvertisersList from './handleGetAdvertisersList';

export default function* advertisingManagementWatcher() {
    yield takeLatest(UPLOAD_FILE, handleUploadFile);
    yield takeLatest(REQUEST_ADVERTISEMENTS, handleRequestAdvertisements);
    yield takeLatest(DELETE_ADVERTISEMENT, handleDeleteAdvertisement);
    yield takeLatest(GET_ADVERTISERS_LIST_REQUEST, handleGetAdvertisersList);
}
