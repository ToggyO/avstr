import { put, call, take } from 'redux-saga/effects';
import api from 'Core/api';

import createUploadChanel from './createUploadChanel';
import { changeUploadStatus, receiveUploadedContent } from '../action-creators';

const { REACT_APP_API } = process.env;


function* handleUploadFile({ data: { advertisementText, file } }) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', advertisementText);

    const configuredRequest = yield call(api.configurePostFile, `${REACT_APP_API}/advertiser-microservice/promotions`, 'json');

    const channel = yield call(createUploadChanel, configuredRequest, formData);

    while (true) {
        const { progress = 0, err, success } = yield take(channel);
        if (success) {
            const { response } = success;

            yield put(changeUploadStatus('Success'));
            yield put(receiveUploadedContent(response.content));
            return;
        }
        if (err) {
            yield put(changeUploadStatus('Error'));
            return;
        }
        yield put(changeUploadStatus(progress));
    }
}

export default handleUploadFile;
