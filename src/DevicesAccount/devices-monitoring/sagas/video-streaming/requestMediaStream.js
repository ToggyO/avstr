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
    yield put(changeMediaStreamLoader(true));

    try {
        let isRequestsFinish = false;
        let isRegistered = false;

        setTimeout(() => {
            isRequestsFinish = true;
        }, 10000);

        while (!isRequestsFinish) {
            const statusRes = yield call(api.get, `${REACT_APP_DEVICE_API}/device-management-microservice/Devices/IsConnected/${id}`);
            const { content: { isConnected } } = statusRes;
            if (isConnected) {
                isRequestsFinish = true;
                isRegistered = isConnected;
            }
            yield delay(1000);
        }

        if (isRegistered) {
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
        } else {
            yield put(changeCurrentDeviceStatus('notConnected'));
        }
    } catch ({ type }) {
        switch (type) {
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
