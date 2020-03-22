import { eventChannel, END } from 'redux-saga';
import { put, call, take } from 'redux-saga/effects';
import api from 'Core/api';
// import handleRequestErrors from 'Core/api/handeRequestErrors';
import { changeUploadStatus } from '../action-creators';

const { REACT_APP_API } = process.env;


function createUploadChanel(xhr, file) {
    return eventChannel((emitter) => {
        const onProgress = (e) => {
            if (e.lengthComputable) {
                const progress = `${e.loaded} / ${e.total}`;
                emitter({ progress });
            }
        };

        const onFailure = () => {
            emitter({ err: true });
            emitter(END);
        };

        const onSuccess = () => {
            const { status, response } = xhr;
            if (status === 201) {
                emitter({ success: { response } });
                emitter(END);
            } else {
                onFailure(null);
            }
        };

        xhr.upload.addEventListener('progress', onProgress);
        xhr.upload.addEventListener('error', onFailure);
        xhr.upload.addEventListener('abort', onFailure);
        xhr.addEventListener('loadend', onSuccess);

        xhr.send(file);

        return () => {
            xhr.upload.removeEventListener('progress', onProgress);
            xhr.upload.removeEventListener('error', onFailure);
            xhr.upload.removeEventListener('abort', onFailure);
            xhr.removeEventListener('loadend', onSuccess);
            xhr.abort();
        };
    });
}


function* handleUploadFile({ data: { advertisementText, file } }) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', advertisementText);

    const configuredRequest = yield call(api.configurePostFile, `${REACT_APP_API}/advertiser-microservice/advertisements`, 'json');

    const channel = yield call(createUploadChanel, configuredRequest, formData);

    while (true) {
        const { progress = 0, err, success } = yield take(channel);

        if (success) {
            const { response } = success;
            console.log(response);
            yield put(changeUploadStatus('Success'));
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
