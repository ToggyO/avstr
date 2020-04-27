import { call, put, delay } from 'redux-saga/effects';
import api from 'Core/api';
import { changeDeviceStatusLoader, receiveDeviceContent } from '../action-creators';


const { REACT_APP_DEVICE_API } = process.env;

function* handleToggleDeviceStatus({ data: { id, isDeactivate } }) {
    try {
        yield put(changeDeviceStatusLoader(true));
        yield call(api.post, `${REACT_APP_DEVICE_API}/device-management-microservice/devices/ChangeActivationState`, { id });

        let isRequestsFinish = false;
        let isToggled = false;
        let result = null;

        setTimeout(() => {
            isRequestsFinish = true;
        }, 10000);

        while (!isRequestsFinish) {
            const { content } = yield call(api.get, `${REACT_APP_DEVICE_API}/device-management-microservice/devices/${id}`);
            const { isActive } = content;
            isToggled = isActive !== isDeactivate;
            if (isToggled) {
                isRequestsFinish = true;
                result = content;
            }
            yield delay(1000);
        }

        if (isToggled) {
            yield put(receiveDeviceContent(result));
        } else {
            alert('failed...');
        }
        yield put(changeDeviceStatusLoader(false));
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

export default handleToggleDeviceStatus;
