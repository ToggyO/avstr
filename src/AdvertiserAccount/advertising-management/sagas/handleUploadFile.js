import { put, call } from 'redux-saga/effects';
import api from 'Core/api';
import { changeUploadStatus } from '../action-creators';

const { REACT_APP_API } = process.env;

function* handleUploadFile({ data }) {
    yield put(changeUploadStatus('pending'));

    const formData = new FormData();
    formData.append('File', data);

    try {
        // console.log(`${REACT_APP_API}/advertiser-microservice/advertisements`);
        const res = yield call(api.post, `${REACT_APP_API}/advertiser-microservice/advertisements`, formData, {
            headers: {},
            'Content-Type': 'form/multipart',
        });
        alert(res);
    } catch (err) {
        alert(err);
    }
}

export default handleUploadFile;
