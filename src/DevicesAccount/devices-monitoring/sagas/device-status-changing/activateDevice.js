import { call, put, delay } from 'redux-saga/effects';
import api from 'Core/api';
import { changeDeviceStatusLoader, receiveDeviceContent } from '../../action-creators';


const { REACT_APP_DEVICE_API } = process.env;

function* activateDevice({ data: { id } }) {
    try {
        yield put(changeDeviceStatusLoader(true));
        yield call(api.post, `${REACT_APP_DEVICE_API}/device-management-microservice/devices/activate`, { id });

        let isRequestsFinish = false;

        setTimeout(() => {
            isRequestsFinish = true;
        }, 60000);

        while (!isRequestsFinish) {
            const { content } = yield call(api.get, `${REACT_APP_DEVICE_API}/device-management-microservice/devices/${id}`);
            yield put(receiveDeviceContent(content));
            const { isActive } = content;
            if (isActive) return;
            yield delay(1000);
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

export default activateDevice;
