import { cancel, fork, take } from 'redux-saga/effects';
import { CANCEL_DEVICE_ACTIVATION } from '../../actions';
import handleActivateDevice from './handleActivateDevice';

function* handleStartDeviceActivation(action) {
    const deviceActivation = yield fork(handleActivateDevice, action);
    yield take(CANCEL_DEVICE_ACTIVATION);
    yield cancel(deviceActivation);
}

export default handleStartDeviceActivation;
