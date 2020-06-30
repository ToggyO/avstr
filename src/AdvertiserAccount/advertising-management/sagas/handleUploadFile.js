import { put, call, take } from 'redux-saga/effects';
import api from 'Core/api';

import createUploadChanel from './createUploadChanel';
import {
    changeUploadStatus,
    receiveUploadedContent,
    saveXhr,
} from '../action-creators';
import * as actions from '../actions';
import handleRequestErrors from '../../../Core/api/handeRequestErrors';

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
                isErr,
                status,
                error = {},
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
            if (isErr) {
                yield put(changeUploadStatus('Error'));
                yield handleRequestErrors(status, error);
            }
            yield put(changeUploadStatus(progress));
        }
    } catch (error) {
        const { errorContent } = error;
        yield put({ type: actions.ADVERTISER_MANAGEMENT_PUT_ERRORS, data: errorContent });
    }
}

export default handleUploadFile;
