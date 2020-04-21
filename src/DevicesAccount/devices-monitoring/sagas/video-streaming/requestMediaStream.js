import { put, call, take } from 'redux-saga/effects';

import api from 'Core/api';
import { receiveMediaStream } from '../../action-creators';
import createWebSocketChanel from './createWebSocketChanel';

const { REACT_APP_DEVICE_API } = process.env;


function* requestMediaStream({ data: { id, serialNumber } }) {
    const { content } = yield call(api.get, `${REACT_APP_DEVICE_API}/device-management-microservice/Devices/MediaStream/${id}`);

    const options = {
        ...content,
        serialNumber,
    };

    const webSocketChannel = yield call(createWebSocketChanel, options);
    while (true) {
        const { stream, isEnded } = yield take(webSocketChannel);
        if (isEnded) {
            alert('stream ended');
            return;
        }
        /* const streamStore = new StreamStoreService();
        const streamId = streamStore.saveStream(stream); */
        yield put(receiveMediaStream(stream));
    }
}

export default requestMediaStream;
