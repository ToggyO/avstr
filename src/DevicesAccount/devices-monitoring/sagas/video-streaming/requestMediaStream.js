import {
    put,
    call,
    take,
    delay,
} from 'redux-saga/effects';

import api from 'Core/api';
import streamStore from 'Core/streamStoreService';
import {
    receiveMediaStreamId,
    changeMediaStreamLoader,
    changeCurrentDeviceStatus,
    cleanMediaStreamId,
} from '../../action-creators';

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
            const { stream, connection, error } = yield take(webSocketChannel);
            switch (error) {
                case 'noRoom':
                    alert('Не удалось начать трансляцию, попробуйте еще раз.');
                    yield put(changeMediaStreamLoader(false));
                    yield put(cleanMediaStreamId());
                    streamStore.clean();
                    break;
                case 'StreamError':
                    alert('Ошибка. Трансляция будет перезапущена.');
                    delay(2000);
                    yield* requestMediaStream;
                    return;
                default:
                    break;
            }

            const streamId = streamStore.saveTranslation(stream, connection);
            yield put(receiveMediaStreamId(streamId));
            yield put(changeMediaStreamLoader(false));
        }
    } catch (err) {
        // console.dir(err);
        const { type } = err;
        switch (type) {
            case 'BadRequest':
                /* if (content /!*&& content[0] === 'DeviceIsNotConnected'*!/) {
                    alert(content);
                } else {
                    console.log('aaaaaaaaa');
                } */
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
