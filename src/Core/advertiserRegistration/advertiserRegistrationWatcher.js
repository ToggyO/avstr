import { takeLatest } from 'redux-saga/effects';
import * as actions from './actions';

import handleRegisterAdvertiser from './sagas/handleRegisterAdvertiser';
import handleConfirmAdvertiserRegistration from './sagas/handleConfirmAdvertiserRegistration';

export default function* advertiserRegistrationWatcher() {
    yield takeLatest(actions.REGISTER_ADVERTISER, handleRegisterAdvertiser);
    yield takeLatest(actions.CONFIRM_ADV_REGISTRATION, handleConfirmAdvertiserRegistration);
}
