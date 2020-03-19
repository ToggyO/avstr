import { put, call } from 'redux-saga/effects';
import api from 'Core/api';
import { changeUploadStatus } from '../action-creators';

const { REACT_APP_API } = process.env;

function* handleUploadFile({ data }) {
    yield put(changeUploadStatus('pending'));

    const formData = new FormData();
    formData.append('File', data);

    try {
        const res = yield call(api.post(`${REACT_APP_API}/advertiser-microservice/advertisements`, data));
        alert(res);
    } catch (err) {
        alert(err);
    }
}

export default handleUploadFile;
