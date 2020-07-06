import { call, put } from 'redux-saga/effects';

import api from 'Core/api';
import { changeDeviceStatus, changeFieldsCleanNeededFlag } from '../action-creators';
import handleDeviceStatusRequest from './handleDeviceStatusRequest';

const { REACT_APP_DEVICE_API } = process.env;

function* handleRegisterDevice({ data: { name, serialNumberCrc, isFromPopup } }) {
    const body = { name, serialNumberCrc };
    try {
        const registerRes = yield call(api.post, `${REACT_APP_DEVICE_API}/device-management-microservice/devices`, body);
        if (isFromPopup) {
            yield put(changeDeviceStatus('popupPending'));
        } else {
            yield put(changeDeviceStatus('pending'));
        }

        const { content: { id } } = registerRes;
        if (!id || id <= 0) {
            yield put(changeDeviceStatus('notConnected'));
            return;
        }
        yield* handleDeviceStatusRequest(id);
    } catch (err) {
        const { type, content } = err;
        switch (type) {
            case 'BadRequest':
                if (content[0] === 'DeviceAlreadyConnected') {
                    alert('Это устройство уже зарегестрировано.');
                    yield put(changeFieldsCleanNeededFlag(true));
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

export default handleRegisterDevice;
