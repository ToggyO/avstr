import { cancel, fork, take } from 'redux-saga/effects';
import { CANCEL_MEDIA_STREAM } from '../../actions';
import requestMediaStream from './requestMediaStream';

function* handleStartMediaStream(deviceId) {
    const mediaStreaming = yield fork(requestMediaStream, deviceId);
    yield take(CANCEL_MEDIA_STREAM);
    yield cancel(mediaStreaming);
}

export default handleStartMediaStream;
