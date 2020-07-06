import { call, put } from 'redux-saga/effects';
import api from 'Core/api';
import { changeDeviceStatusLoader, receiveDeviceContent } from '../../action-creators';

const { REACT_APP_DEVICE_API } = process.env;

function* deactivateDevice({ data: { id } }) {
    try {
        yield put(changeDeviceStatusLoader(true));
        yield call(api.post, `${REACT_APP_DEVICE_API}/device-management-microservice/devices/deactivate`, { id });
        const { content } = yield call(api.get, `${REACT_APP_DEVICE_API}/device-management-microservice/devices/${id}`);

        const { isActive } = content;
        if (!isActive) {
            yield put(receiveDeviceContent(content));
        } else {
            alert('Устройство не деактивировано, попробуйте еще раз');
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
    } finally {
        yield put(changeDeviceStatusLoader(false));
    }
}

export default deactivateDevice;
