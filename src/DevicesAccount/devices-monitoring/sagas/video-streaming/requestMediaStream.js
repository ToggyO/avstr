import {
    put,
    call,
    take,
    delay,
} from 'redux-saga/effects';

import api from 'Core/api';
import streamStore from 'Core/streamStoreService';
import { receiveMediaStreamId, changeMediaStreamLoader, changeCurrentDeviceStatus } from '../../action-creators';
import createWebSocketChanel from './createWebSocketChanel';


const { REACT_APP_DEVICE_API } = process.env;

function* requestMediaStream({ data: { id, serialNumber } }) {
    try {
        yield put(changeMediaStreamLoader(true));
        yield put(changeCurrentDeviceStatus('connected'));

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
            yield put(changeMediaStreamLoader(false));
        }
    } catch (err) {
        const { type, content } = err;
        switch (type) {
            case 'BadRequest':
                if (content) {
                    console.log(content);
                } else {
                    console.log(err);
                }
                break;
            case 'AuthorizationError':
                window.location = '/';
                break;
            case 'ServerError':
                alert('На сервере произошла ошибка.');
                break;
            default:
                break;
        }
    }
}

export default requestMediaStream;
