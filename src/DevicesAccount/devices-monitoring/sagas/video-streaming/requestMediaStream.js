import {
    put,
    call,
    take,
    delay,
} from 'redux-saga/effects';

import api from 'Core/api';
import streamStore from 'Core/streamStoreService';
import { receiveMediaStreamId } from '../../action-creators';
import createWebSocketChanel from './createWebSocketChanel';


const { REACT_APP_DEVICE_API } = process.env;

function* requestMediaStream({ data: { id, serialNumber } }) {
    alert('Трансляция начнется примерно через 15 секунд');
    yield delay(15000);
    const { content } = yield call(api.get, `${REACT_APP_DEVICE_API}/device-management-microservice/Devices/MediaStream/${id}`);

    const options = {
        ...content,
        serialNumber,
    };

    const webSocketChannel = yield call(createWebSocketChanel, options);
    while (true) {
        const { stream, error } = yield take(webSocketChannel);
        if (error) {
            delay(15000);
            alert('Ошибка. Трансляция будет перезапущена в течении 15 секунд');
            yield* requestMediaStream;
            return;
        }

        const streamId = streamStore.saveStream(stream);
        yield put(receiveMediaStreamId(streamId));
    }
}

export default requestMediaStream;
