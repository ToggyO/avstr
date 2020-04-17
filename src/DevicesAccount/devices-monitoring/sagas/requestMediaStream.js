// import { put, call, take } from 'redux-saga/effects';
// import api from 'Core/api';

// const { REACT_APP_ADVERTISER_API } = process.env;


function* requestMediaStream() {
    // const configuredRequest = yield call(api.configurePostFile,
    // `${REACT_APP_ADVERTISER_API}/advertiser-microservice/promotions`, 'json');

    // const webSocketChannel = yield call(createUploadChanel, 11);

    /* while (true) {
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
    } */
}

export default requestMediaStream;
