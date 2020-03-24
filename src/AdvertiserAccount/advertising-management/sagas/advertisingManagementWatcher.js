import { takeLatest } from 'redux-saga/effects';

import { UPLOAD_FILE, REQUEST_ADVERTISEMENTS } from '../actions';
import handleUploadFile from './handleUploadFile';
import handleRequestAdvertisements from './handleRequestAdvertisements';


export default function* advertisingManagementWatcher() {
    yield takeLatest(UPLOAD_FILE, handleUploadFile);
    yield takeLatest(REQUEST_ADVERTISEMENTS, handleRequestAdvertisements);
}
