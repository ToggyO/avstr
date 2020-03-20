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
        // console.log(`${REACT_APP_API}/advertiser-microservice/Advertisements`);
        const res = yield call(
            api.postFile,
            `${REACT_APP_API}}/advertiser-microservice/advertisements`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                credentials: 'include',
            },
            true,
        );
        alert(res);
    } catch (err) {
        // alert(err);
    }
}

export default handleUploadFile;
