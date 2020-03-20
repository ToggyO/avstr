import { put, call } from 'redux-saga/effects';
import api from 'Core/api';
import { changeUploadStatus } from '../action-creators';

const { REACT_APP_API } = process.env;


function* handleUploadFile({ data: { advertisementText, file } }) {
    yield put(changeUploadStatus('pending'));

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', advertisementText);

    /* for (const [name, value] of formData) {
        console.log(`${name} = ${value}`);
    } */

    try {
        const res = yield call(api.postFile, `${REACT_APP_API}/advertiser-microservice/advertisements`, formData);
        console.log(res);
    } catch (err) {
        // alert(err);
    }
}

export default handleUploadFile;
