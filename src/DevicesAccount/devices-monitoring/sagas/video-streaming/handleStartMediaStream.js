import { cancel, fork, take } from 'redux-saga/effects';
import { CANCEL_MEDIA_STREAM } from '../../actions';
import requestMediaStream from './requestMediaStream';

function* handleStartMediaStream(action) {
    const mediaStreaming = yield fork(requestMediaStream, action);
    yield take(CANCEL_MEDIA_STREAM);
    yield cancel(mediaStreaming);
}

export default handleStartMediaStream;
