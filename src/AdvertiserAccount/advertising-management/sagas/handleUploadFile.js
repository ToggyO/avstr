import { put, call, take } from 'redux-saga/effects';
import api from 'Core/api';

import createUploadChanel from './createUploadChanel';
import {
    changeUploadStatus,
    receiveUploadedContent,
    saveXhr,
} from '../action-creators';

const { REACT_APP_ADVERTISER_API } = process.env;


function* handleUploadFile({ data }) {
    try {
        const formData = new FormData();
        Object.entries(data)
            .forEach(([key, val]) => {
                if (val) {
                    formData.append(key, val);
                }
            });

        const configuredRequest = yield call(
            api.configurePostFile,
            `${REACT_APP_ADVERTISER_API}/advertiser-microservice/admin/promotions`,
            'json',
        );

        const channel = yield call(createUploadChanel, configuredRequest, formData);
        yield put(saveXhr(configuredRequest));
        while (true) {
            const {
                progress = 0,
                err,
                success,
                abort,
            } = yield take(channel);

            if (success) {
                const { response } = success;
                yield put(changeUploadStatus('Success'));
                yield put(receiveUploadedContent(response.content));
                return;
            }
            if (abort) {
                yield put(changeUploadStatus(''));
                return;
            }
            if (err) {
                yield put(changeUploadStatus('Error'));
                return;
            }

            yield put(changeUploadStatus(progress));
        }
    } catch ({ type }) {
        switch (type) {
            case 'BadRequest':
                yield put(changeUploadStatus('Error'));
                break;
            case 'AuthorizationError':
                window.location = '/';
                break;
            case 'ServerError':
                alert('На сервере произошла ошибка.');
                break;
            default:
                yield put(changeUploadStatus('Error'));
        }
    }
}

export default handleUploadFile;
