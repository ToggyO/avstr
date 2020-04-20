import { put, call, take } from 'redux-saga/effects';
// import { call } from 'redux-saga/effects';
import api from 'Core/api';

import { receiveMediaStream } from '../../action-creators';
import createWebSocketChanel from './createWebSocketChanel';

const { REACT_APP_DEVICE_API } = process.env;


function* requestMediaStream({ data: { id, serialNumber } }) {
    const { content } = yield call(api.get, `${REACT_APP_DEVICE_API}/device-management-microservice/Devices/MediaStream/${id}`);
    console.log(content);

    const options = {
        ...content,
        serialNumber,
    };
    console.log(options);

    const webSocketChannel = yield call(createWebSocketChanel, options);

    while (true) {
        const { stream, isEnded } = yield take(webSocketChannel);
        if (isEnded) {
            alert('stream ended');
            return;
        }
        yield put(receiveMediaStream(stream));
    }
}

export default requestMediaStream;
