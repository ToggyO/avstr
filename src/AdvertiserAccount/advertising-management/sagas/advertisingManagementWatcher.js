import { takeLatest } from 'redux-saga/effects';

import { UPLOAD_FILE } from '../actions';
import handleUploadFile from './handleUploadFile';

export default function* advertisingManagementWatcher() {
    yield takeLatest(UPLOAD_FILE, handleUploadFile);
}
